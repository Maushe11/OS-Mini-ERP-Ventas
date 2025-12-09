import {Component, inject} from '@angular/core';
import {BreadcrumbService} from '../../services/breadcrumb.service';
import {Breadcrumb} from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    Breadcrumb
  ],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class BreadcrumbComponent {

  private breadcrumbService = inject(BreadcrumbService);

  home = {icon: 'pi pi-home', routerLink: '/home'};

  get items() {
    return this.breadcrumbService.getItems();
  }
}
