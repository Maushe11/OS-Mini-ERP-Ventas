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
    ButtonLabel
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

  form = this.fb.group({
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

  constructor() {
    effect(() => {
      const paramId = this.route.snapshot.paramMap.get('id');
      if (paramId) {
        this.id.set(Number(paramId));
        this.loadCustomer(Number(paramId));
      }
    });
  }

  loadCustomer(id: number) {
    this.loading.set(true);

    this.customerService.getById(id).subscribe({
      next: (customer) => {
        this.form.patchValue(customer);
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
