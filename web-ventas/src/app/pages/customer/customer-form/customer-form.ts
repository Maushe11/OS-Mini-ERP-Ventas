import {Component, effect, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {CustomerService} from '../../../core/services/customer.service';
import {MessageService} from 'primeng/api';

import {Panel} from 'primeng/panel';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {FloatLabel} from 'primeng/floatlabel';
import {Message} from 'primeng/message';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Select} from 'primeng/select';

@Component({
  standalone: true,
  selector: 'app-customer-form',
  imports: [
    ReactiveFormsModule,
    Panel,
    InputText,
    Textarea,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabel,
    Message,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    Select
  ],
  providers: [CustomerService],
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);

  id = signal<number | null>(null);
  loading = signal(false);

  documentTypes = signal<any[]>([
    { label: 'DNI', value: 'DNI' },
    { label: 'RUC', value: 'RUC' }
  ]);

  paramProcessed = signal(false);

  form = this.fb.group({
    documentType: ['DNI', Validators.required],
    document: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required]
  });

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.invalid && c.touched);
  }

  getError(control: string) {
    const c = this.form.get(control);
    if (!c || !c.errors || !c.touched) return null;

    if (c.errors['required']) return 'required';
    if (c.errors['pattern']) return 'pattern';

    return 'unknown';
  }

  constructor() {
    const docTypeControl = this.form.get('documentType');
    const docControl = this.form.get('document');

    // Cambiar validaciones según el tipo seleccionado
    docTypeControl?.valueChanges.subscribe(type => {
      if (type === 'DNI') {
        docControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{8}$/)
        ]);
      } else {
        docControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[0-9]{11}$/)
        ]);
      }

      docControl?.updateValueAndValidity();
    });

    // Cargar datos si es edición
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id.set(Number(paramId));
      this.loadCustomer(Number(paramId));
    }
  }

  loadCustomer(id: number) {
    this.loading.set(true);

    this.customerService.getById(id).subscribe({
      next: (customer) => {

        const type = customer.document.length === 8 ? 'DNI' : 'RUC';

        this.form.get('documentType')?.setValue(type, { emitEvent: true });

        this.form.patchValue(customer);

        this.form.get('document')?.updateValueAndValidity();

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el cliente'
        });
      }
    });
  }

  submit() {

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loading.set(true);
    const data = this.form.value;

    const request$ = this.id()
      ? this.customerService.update(this.id()!, data)
      : this.customerService.create(data);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: this.id() ? 'Cliente actualizado' : 'Cliente registrado'
        });

        this.router.navigate(['/customer']);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al guardar'
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/customer']);
  }

}
