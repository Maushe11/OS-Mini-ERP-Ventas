import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2>Home</h2>
      <p>Estás logueado como <strong>admin</strong></p>

      <div class="mt-3">
        <button class="btn btn-secondary" (click)="logout()">
          Cerrar sesión
        </button>
      </div>
    </div>
  `,
})
export class HomeComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  token = computed(() => this.authService.getToken());

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
