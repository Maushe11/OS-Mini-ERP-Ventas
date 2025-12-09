import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ButtonDirective
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  private authService = inject(AuthService);

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  closeSidebar() {
    this.close.emit();
  }

  get isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }

}
