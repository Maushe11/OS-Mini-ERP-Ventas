import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AuthService} from '../../../services/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private authService = inject(AuthService);
  private router = inject(Router);

  @Output() toggle = new EventEmitter<void>();

  toggleSidebar() {
    this.toggle.emit();
  }

  logout() {
    console.log('Cerrar sesión...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
