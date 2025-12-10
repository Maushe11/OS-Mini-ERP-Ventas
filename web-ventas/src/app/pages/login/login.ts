import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth-service';
import {MessageService} from 'primeng/api';
import {ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Password} from 'primeng/password';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Message} from 'primeng/message';
import {Divider} from 'primeng/divider';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ButtonDirective, InputText, FloatLabel, InputGroup, InputGroupAddon, ReactiveFormsModule, Password, Message, ButtonIcon, ButtonLabel, Divider],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  // ADMIN: admin admin123
  // USER: juan juan123
  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!(c && c.invalid && c.touched);
  }

  onSubmit(): void {

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading.set(true);
    this.error.set(null);

    const data = this.form.value;

    this.authService.login(data)
      .subscribe({
        next: (result) => {
          this.loading.set(false);

          this.router.navigate(['/home']);

          this.messageService.add({
            severity: 'success',
            summary: 'Bienvenido',
            detail: 'Has iniciado sesión correctamente.'
          });
        },
        error: (err) => {
          this.loading.set(false);

          if (err.status === 0) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error de conexión',
              detail: 'No se pudo conectar con el servidor.'
            });
            return;
          }

          if (err.status === 401) {
            this.messageService.add({
              severity: 'error',
              summary: 'Credenciales inválidas',
              detail: err.error.message
            });
            return;
          }

          if (err.status === 400) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.message
            });
            return;
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error inesperado',
            detail: 'Ocurrió un error inesperado.'
          });
        }
      });
  }

}
