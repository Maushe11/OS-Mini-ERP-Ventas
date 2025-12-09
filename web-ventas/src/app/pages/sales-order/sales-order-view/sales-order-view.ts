import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';

import { SalesOrderService } from '../../../core/services/sales-order.services';
import { InvoiceService } from '../../../core/services/invoice.service';

import { MessageService } from 'primeng/api';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Divider } from 'primeng/divider';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-sales-order-view',
  templateUrl: './sales-order-view.html',
  styleUrl: './sales-order-view.scss',
  imports: [
    NgIf,
    DatePipe,
    DecimalPipe,
    FormsModule,
    Panel,
    Button,
    TableModule,
    Divider,
    Tag,
    ToastModule,
    DialogModule,
    Select
  ],
  providers: [MessageService]
})
export class SalesOrderView {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(SalesOrderService);
  private invoiceService = inject(InvoiceService);
  private messageService = inject(MessageService);

  loading = signal(false);
  order = signal<any | null>(null);
  orderId = signal<number | null>(null);

  details = computed(() => this.order()?.details ?? []);

  showInvoiceDialog = signal(false);
  invoiceTypeModel: 'BOLETA' | 'FACTURA' | null = null;

  invoiceTypes = [
    { label: 'Boleta', value: 'BOLETA' as const },
    { label: 'Factura', value: 'FACTURA' as const }
  ];

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    this.orderId.set(id);

    if (id != null && !Number.isNaN(id)) {
      this.loadOrder(id);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Identificador de orden inválido.'
      });
      this.router.navigate(['/sales-order']);
    }
  }

  loadOrder(id: number) {
    this.loading.set(true);

    this.orderService.getById(id).subscribe({
      next: (res: any) => {
        this.order.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la orden.'
        });
        this.router.navigate(['/sales-order']);
      }
    });
  }

  getStatusSeverity(status: string | undefined): 'secondary' | 'success' | 'info' {
    const s = (status ?? '').toUpperCase();
    if (s === 'REGISTRADO') return 'secondary';
    if (s === 'PAID' || s === 'PAGADA' || s === 'FACTURADO') return 'success';
    return 'info';
  }

  openInvoiceDialog() {
    this.invoiceTypeModel = 'BOLETA';
    this.showInvoiceDialog.set(true);
  }

  resetInvoiceDialog() {
    this.invoiceTypeModel = null;
  }

  generateInvoice() {
    const orderId = this.orderId();
    if (!orderId || !this.invoiceTypeModel) return;

    this.loading.set(true);

    this.invoiceService.generate(orderId, { type: this.invoiceTypeModel }).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.showInvoiceDialog.set(false);

        this.order.update(o =>
          o ? { ...o, status: 'FACTURADO' } : o
        );

        this.messageService.add({
          severity: 'success',
          summary: 'Comprobante generado',
          detail: `Se generó el comprobante ${res.type} ${res.number}.`
        });
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo generar el comprobante.'
        });
      }
    });
  }

  isInvoiced(): boolean {
    const s = (this.order()?.status ?? '').toUpperCase();
    return s === 'FACTURADO';
  }

  goBack() {
    this.router.navigate(['/sales-order']);
  }

}
