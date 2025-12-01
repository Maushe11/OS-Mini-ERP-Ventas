import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth-service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // ADMIN: admin admin 123
  // USER: juan juan123

  username = signal('admin');
  password = signal('admin123');
  loading = signal(false);
  error = signal<string | null>(null);

  onSubmit(): void {
    if (!this.username() || !this.password()) return;

    this.loading.set(true);
    this.error.set(null);

    this.authService.login(this.username(), this.password())
      .subscribe({
        next: (result) => {
          this.loading.set(false);

          if (result !== null) {
            // Login correcto
            this.router.navigate(['/home']);
          } else {
            // Login incorrecto
            this.error.set('Usuario o contraseña incorrectos');
          }
        },
        error: () => {
          this.loading.set(false);
          this.error.set('Error inesperado en el servidor');
        }
      });
  }
}
