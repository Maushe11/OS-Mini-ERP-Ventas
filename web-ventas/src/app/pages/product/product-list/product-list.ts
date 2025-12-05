import {Component, effect, inject, signal} from '@angular/core';
import {Paginator} from 'primeng/paginator';
import {InputGroup} from 'primeng/inputgroup';
import {Panel} from 'primeng/panel';
import {Divider} from 'primeng/divider';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ProductService} from '../../../core/services/product.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {Tag} from 'primeng/tag';
import {DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CustomerService} from '../../../core/services/customer.service';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [
    Paginator,
    InputGroup,
    Panel,
    Divider,
    Button,
    TableModule,
    Tag,
    FormsModule,
    DecimalPipe
  ],
  providers: [CustomerService],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {

  private productService = inject(ProductService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  products = signal<any[]>([]);
  totalRecords = signal(0);

  filter = signal('');
  page = signal(0);
  size = signal(10);
  sortBy = signal('name');
  loading = signal(false);

  constructor() {
    effect(() => {
      this.loadProducts(
        this.filter(),
        this.page(),
        this.size(),
        this.sortBy()
      );
    });
  }

  loadProducts(filter: string, page: number, size: number, sortBy: string) {
    this.loading.set(true);

    this.productService.search(filter, page, size, sortBy)
      .subscribe({
        next: (resp) => {
          this.products.set(resp.content);
          this.totalRecords.set(resp.totalElements);
          this.loading.set(false);

          if (resp.content.length === 0) {
            this.messageService.add({
              severity: 'info',
              summary: 'Sin resultados',
              detail: 'No se encontraron productos.'
            });
          }
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error cargando productos'
          });
        }
      });
  }

  onSearch() {
    this.page.set(0);
  }

  onPageChange(e: any) {
    this.page.set(e.page);
    this.size.set(e.rows);
  }

  onSort(e: any) {
    this.sortBy.set(e.field);
  }

  openCreateForm() {
    this.router.navigate(['/product/create']);
  }

  openEditForm(id: number) {
    this.router.navigate([`/product/edit/${id}`]);
  }

}
