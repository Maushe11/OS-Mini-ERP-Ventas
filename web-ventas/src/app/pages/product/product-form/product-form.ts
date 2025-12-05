import {Component, effect, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../core/services/product.service';
import {MessageService} from 'primeng/api';

import {CustomerService} from '../../../core/services/customer.service';

import {Panel} from 'primeng/panel';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {InputNumber} from 'primeng/inputnumber';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {FloatLabel} from 'primeng/floatlabel';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Message} from 'primeng/message';

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    Panel,
    Button,
    InputText,
    Textarea,
    InputNumber,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabel,
    ToggleSwitch,
    Message,
    ButtonLabel,
    ButtonDirective,
    ButtonIcon
  ],
  providers: [CustomerService],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private messageService = inject(MessageService);

  id = signal<number | null>(null);
  loading = signal(false);

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    minStock: [0, [Validators.required, Validators.min(0)]],
    active: [true]
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
        this.loadProduct(Number(paramId));
      }
    });
  }

  loadProduct(id: number) {
    this.loading.set(true);

    this.productService.getById(id).subscribe({
      next: (product) => {
        this.form.patchValue(product);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el producto'
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
      ? this.productService.update(this.id()!, data)
      : this.productService.create(data);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: this.id() ? 'Producto actualizado' : 'Producto creado'
        });

        this.router.navigate(['/product']);
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
    this.router.navigate(['/product']);
  }

}
