import {CustomerService} from '../../../core/services/customer.service';

import {Component, effect, inject, signal} from '@angular/core';

import {ConfirmationService, MessageService} from 'primeng/api';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {Paginator} from 'primeng/paginator';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Divider} from 'primeng/divider';
import {InputGroup} from 'primeng/inputgroup';
import {Panel} from 'primeng/panel';
import {Router} from '@angular/router';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-customer-list',
  imports: [
    FormsModule,
    TableModule,
    Paginator,
    InputText,
    Divider,
    InputGroup,
    Button,
    Panel,
    ConfirmDialog
  ],
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})
export class CustomerList {

  private customerService = inject(CustomerService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

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

  openCreateForm() {
    this.router.navigate(['/customer/create']);
  }

  openEditForm(id: number) {
    this.router.navigate([`/customer/edit/${id}`]);
  }

  deleteCustomer(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este cliente?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.customerService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminado',
              detail: 'La orden fue eliminada correctamente.'
            });

            this.loadCustomers(this.filter(), this.page(), this.size(), this.sortBy());
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error?.message || 'Ocurrió un error inesperado.',
            });
          }
        });
      }
    });
  }

}
