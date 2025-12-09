import {Component, computed, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators, FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {DecimalPipe, NgIf} from '@angular/common';
import {CustomerService} from '../../../core/services/customer.service';
import {ProductService} from '../../../core/services/product.service';
import {MessageService} from 'primeng/api';
import {Panel} from 'primeng/panel';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {InputNumber} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {Message} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import { OrderDetailRequest, OrderRequestDto, SalesOrderService } from '../../../core/services/sales-order.services';

interface CustomerOption {
  id: number;
  fullName: string;
}

interface ProductOption {
  id: number;
  name: string;
  price: number;
}

interface DetailRow {
  product: ProductOption | null;
  quantity: number;
  price: number;
  subtotal: number;
}

@Component({
  standalone: true,
  selector: 'app-sales-order-form',
  templateUrl: './sales-order-form.html',
  styleUrl: './sales-order-form.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    DecimalPipe,
    Panel,
    Button,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabel,
    Select,
    InputNumber,
    TableModule,
    Message,
    ToastModule
  ],
  providers: [CustomerService, ProductService, MessageService]
})
export class SalesOrderForm {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private customerService = inject(CustomerService);
  private productService = inject(ProductService);
  private salesOrderService = inject(SalesOrderService);
  private messageService = inject(MessageService);

  loading = signal(false);

  customers = signal<CustomerOption[]>([]);
  products = signal<ProductOption[]>([]);
  details = signal<DetailRow[]>([]);

  total = computed(() =>
    this.details().reduce((sum, d) => sum + d.subtotal, 0)
  );

  form = this.fb.group({
    customerId: [null as number | null, Validators.required]
  });

  constructor() {
    this.loadCustomers();
    this.loadProducts();
    this.addDetail();
  }

  private loadCustomers() {
    this.customerService.search('', 0, 50, 'name').subscribe({
      next: (resp: any) => {
        const content = resp.content ?? resp;
        const mapped: CustomerOption[] = (content ?? []).map((c: any) => ({
          id: c.id ?? c.idCustomer ?? c.customerId,
          fullName:
            c.fullName ??
            c.name ??
            `${c.firstName ?? ''} ${c.lastName ?? ''}`.trim()
        }));
        this.customers.set(mapped);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los clientes.'
        });
      }
    });
  }

  private loadProducts() {
    this.productService.search('', 0, 100, 'name').subscribe({
      next: (resp: any) => {
        const content = resp.content ?? resp;
        const mapped: ProductOption[] = (content ?? []).filter((p: any) => p.active).map((p: any) => ({
          id: p.id ?? p.idProduct ?? p.productId,
          name: p.name,
          price: p.price ?? 0
        }));
        this.products.set(mapped);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los productos.'
        });
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const ctrl = this.form.get(controlName);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  addDetail() {
    this.details.update(list => [
      ...list,
      {product: null, quantity: 1, price: 0, subtotal: 0}
    ]);
  }

  removeDetail(index: number) {
    this.details.update(list => list.filter((_, i) => i !== index));
  }

  onProductChange(index: number, product: ProductOption | null) {
    this.details.update(list => {
      const copy = [...list];
      const row = {...copy[index]};

      row.product = product;
      row.price = product?.price ?? 0;
      row.subtotal = row.quantity * row.price;

      copy[index] = row;
      return copy;
    });
  }

  onQuantityChange(index: number, quantity: number | null) {
    this.details.update(list => {
      const copy = [...list];
      const row = {...copy[index]};

      const qty = Number(quantity ?? 0);
      row.quantity = qty;
      row.subtotal = qty * row.price;

      copy[index] = row;
      return copy;
    });
  }

  onPriceChange(index: number, price: number | null) {
    this.details.update(list => {
      const copy = [...list];
      const row = {...copy[index]};

      const pr = Number(price ?? 0);
      row.price = pr;
      row.subtotal = row.quantity * pr;

      copy[index] = row;
      return copy;
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const validDetails = this.details().filter(
      d => d.product && d.quantity > 0
    );

    if (validDetails.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validación',
        detail: 'Debe incluir al menos un producto con cantidad mayor a cero.'
      });
      return;
    }

    this.loading.set(true);

    const header = this.form.value;

    const details: OrderDetailRequest[] = validDetails.map(d => ({
      productId: d.product!.id,
      quantity: d.quantity
    }));

    const dto: OrderRequestDto = {
      customerId: header.customerId!,
      details
    };

    this.salesOrderService.create(dto).subscribe({
      next: res => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'success',
          summary: 'Orden registrada',
          detail: `Orden #${res.idOrder ?? ''} registrada correctamente.`
        });
        this.router.navigate(['/sales-order']);
      },
      error: err => {
        console.error(err);
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un problema al registrar la orden.'
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/sales-order']);
  }
}
