import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import {ButtonDirective} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    ButtonDirective,
    Toolbar
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private auth = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  @Output() toggle = new EventEmitter<void>();

  username: string | null = null;

  constructor() {
    this.loadUserFromToken();
  }

  loadUserFromToken() {
    const token = this.auth.getToken();
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    this.username = payload?.username || payload?.sub || 'Usuario';
  }

  toggleSidebar() {
    this.toggle.emit();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);

    this.messageService.add({
      severity: 'info',
      summary: 'Sesión cerrada',
      detail: 'Has cerrado sesión correctamente.'
    });
  }
}
