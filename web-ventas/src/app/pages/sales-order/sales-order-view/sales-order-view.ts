import { Component, effect, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';

import { SalesOrderService } from '../../../core/services/sales-order.services';

import { MessageService } from 'primeng/api';
import { Panel } from 'primeng/panel';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Divider } from 'primeng/divider';
import { Tag } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-sales-order-view',
  templateUrl: './sales-order-view.html',
  styleUrl: './sales-order-view.scss',
  imports: [
    // Angular
    NgIf,
    NgForOf,
    DatePipe,
    DecimalPipe,
    // PrimeNG
    Panel,
    Button,
    TableModule,
    Divider,
    Tag,
    ToastModule
  ],
  providers: [MessageService]
})
export class SalesOrderView {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(SalesOrderService);
  private messageService = inject(MessageService);

  loading = signal(false);
  order = signal<any | null>(null);

  // id de la ruta
  orderId = signal<number | null>(null);

  // detalles de la orden (según lo que devuelva tu backend)
  details = computed(() => this.order()?.details ?? []);

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
    if (s === 'PAID' || s === 'PAGADA') return 'success';
    return 'info';
  }

  goBack() {
    this.router.navigate(['/sales-order']);
  }

}
