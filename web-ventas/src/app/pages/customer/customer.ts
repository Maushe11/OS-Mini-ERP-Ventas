import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {CustomerService} from '../../core/services/customer.service';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {Paginator} from 'primeng/paginator';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Divider} from 'primeng/divider';
import {InputGroup} from 'primeng/inputgroup';
import {Panel} from 'primeng/panel';

@Component({
  standalone: true,
  selector: 'app-customer',
  imports: [
    Toast,
    FormsModule,
    TableModule,
    Paginator,
    InputText,
    Divider,
    InputGroup,
    Button,
    Panel
  ],
  providers: [CustomerService, MessageService],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer implements OnInit {

  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);

  customers = signal<any[]>([]);
  totalRecords = signal(0);

  filter = signal('');
  page = signal(0);
  size = signal(10);
  sortBy = signal('name');
  loading = signal(false);

  constructor() {
    // Auto-refresh cuando cambia page/filter/sort/size
    effect(() => {
      this.loadCustomers(
        this.filter(),
        this.page(),
        this.size(),
        this.sortBy()
      );
    });
  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  loadCustomers(filter: string, page: number, size: number, sortBy: string) {
    this.loading.set(true);

    this.customerService
      .search(filter, page, size, sortBy)
      .subscribe({
        next: (data) => {
          this.customers.set(data.content);
          this.totalRecords.set(data.totalElements);
          this.loading.set(false);

          if (data.content.length === 0) {
            this.messageService.add({
              severity: 'info',
              summary: 'Sin resultados',
              detail: 'No se encontraron clientes.'
            });
          }
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un problema al cargar los clientes.'
          });
        }
      });
  }

  onSearch() {
    this.page.set(0);
  }

  onPageChange(event: any) {
    this.page.set(event.page);
    this.size.set(event.rows);
  }

  onSort(event: any) {
    this.sortBy.set(event.field);
  }

}
