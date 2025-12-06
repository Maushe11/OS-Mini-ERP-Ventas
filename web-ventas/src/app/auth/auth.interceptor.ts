import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../core/services/auth-service';
import {API} from '../core/config/api.config';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url === API.USER.LOGIN) {
      return next.handle(req);
    }

    const token = this.authService.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {

          this.messageService.add({
            severity: 'warn',
            summary: 'Sesión expirada',
            detail: 'Por favor inicia sesión nuevamente.'
          });

          this.authService.logout();
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
