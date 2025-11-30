import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container" style="max-width: 400px; margin-top: 50px;">
      <h2>Login</h2>

      <form (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input
            type="text"
            class="form-control"
            [value]="username()"
            (input)="username.set($any($event.target).value)"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            type="password"
            class="form-control"
            [value]="password()"
            (input)="password.set($any($event.target).value)"
            required
          />
        </div>

        <button class="btn btn-primary w-100" [disabled]="loading()">
          {{ loading() ? 'Ingresando...' : 'Ingresar' }}
        </button>

        <div *ngIf="error()" class="alert alert-danger mt-3">
          {{ error() }}
        </div>

      </form>
    </div>
  `,
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('admin');
  password = signal('admin');
  loading = signal(false);
  error = signal<string | null>(null);

  onSubmit(): void {
    if (!this.username() || !this.password()) return;

    this.loading.set(true);
    this.error.set(null);

    const success = this.authService.login(this.username(), this.password());

    if (success) {
      this.loading.set(false);
      this.router.navigate(['/home']);
    } else {
      this.loading.set(false);
      this.error.set('Usuario o contraseña incorrectos');
    }
  }
}
