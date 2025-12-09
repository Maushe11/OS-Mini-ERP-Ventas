import {Component, effect, inject, signal} from '@angular/core';
import {Panel} from 'primeng/panel';
import {InputGroup} from 'primeng/inputgroup';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Paginator} from 'primeng/paginator';
import {Divider} from 'primeng/divider';
import {Tag} from 'primeng/tag';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DatePipe, DecimalPipe, NgIf} from '@angular/common';
import {ToastModule} from 'primeng/toast';
import { SalesOrderListItem, SalesOrderService } from '../../../core/services/sales-order.services';


@Component({
  standalone: true,
  selector: 'app-sales-order-list',
  imports: [
    Panel,
    InputGroup,
    Button,
    TableModule,
    Paginator,
    Divider,
    Tag,
    FormsModule,
    ToastModule,
    DecimalPipe,
    DatePipe
  ],
  providers: [MessageService],
  templateUrl: './sales-order-list.html',
  styleUrl: './sales-order-list.scss'
})
export class SalesOrderList {

  private orderService = inject(SalesOrderService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  orders = signal<SalesOrderListItem[]>([]);
  totalRecords = signal(0);
  loading = signal(false);

  filter = signal('');
  page = signal(0);
  size = signal(10);
  sortBy = signal('date');

  constructor() {
    effect(() => {
      this.loadOrders(this.filter(), this.page(), this.size(), this.sortBy());
    });
  }

  loadOrders(filter: string, page: number, size: number, sortBy: string) {
    this.loading.set(true);

    this.orderService.search(filter, page, size, sortBy)
      .subscribe({
        next: (resp) => {
          this.orders.set(resp.content);
          this.totalRecords.set(resp.totalElements);
          this.loading.set(false);

          if (resp.content.length === 0) {
            this.messageService.add({
              severity: 'info',
              summary: 'Sin resultados',
              detail: 'No se encontraron órdenes con el criterio de búsqueda.'
            });
          }
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al cargar las órdenes.'
          });
        }
      });
  }

  onSearch() {
    this.page.set(0);
    this.loadOrders(this.filter(), 0, this.size(), this.sortBy());
  }

  onPageChange(event: any) {
    this.page.set(event.page);
    this.size.set(event.rows);
    this.loadOrders(this.filter(), event.page, event.rows, this.sortBy());
  }

  openCreateForm() {
    this.router.navigate(['/sales-order/create']);
  }

  openDetail(id: number) {
    this.router.navigate([`/sales-order/view/${id}`]);
  }

}
