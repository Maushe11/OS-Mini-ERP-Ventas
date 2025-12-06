import {Component, effect, inject, signal} from '@angular/core';
import {MessageService, PrimeTemplate} from 'primeng/api';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';
import {Button} from 'primeng/button';
import {Divider} from 'primeng/divider';
import {FormsModule} from '@angular/forms';
import {InputGroup} from 'primeng/inputgroup';
import {InputText} from 'primeng/inputtext';
import {Paginator} from 'primeng/paginator';
import {Panel} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [
    Button,
    Divider,
    FormsModule,
    InputGroup,
    InputText,
    Paginator,
    Panel,
    PrimeTemplate,
    TableModule,
    Tag,
    DatePipe
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {

  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  users = signal<any[]>([]);
  totalRecords = signal(0);

  filter = signal('');
  page = signal(0);
  size = signal(10);
  sortBy = signal('username');
  loading = signal(false);

  constructor() {
    effect(() => {
      this.loadUsers(
        this.filter(),
        this.page(),
        this.size(),
        this.sortBy()
      );
    });
  }

  loadUsers(filter: string, page: number, size: number, sortBy: string) {
    this.loading.set(true);

    this.userService
      .search(filter, page, size, sortBy)
      .subscribe({
        next: (data) => {
          this.users.set(data.content);
          this.totalRecords.set(data.totalElements);
          this.loading.set(false);

          if (data.content.length === 0) {
            this.messageService.add({
              severity: 'info',
              summary: 'Sin resultados',
              detail: 'No se encontraron usuarios.'
            });
          }
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un problema al cargar los usuarios.'
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
    this.router.navigate(['/user/create']);
  }

  openEditForm(id: number) {
    this.router.navigate([`/user/edit/${id}`]);
  }
}
