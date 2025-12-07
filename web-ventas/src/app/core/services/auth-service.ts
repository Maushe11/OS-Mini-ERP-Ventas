import {Injectable, signal, computed, effect, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../config/api.config';
import {catchError, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Injectable({providedIn: 'root'})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private messageService = inject(MessageService);

  private _token = signal<string | null>(this.loadTokenFromStorage());
  private _remainingTime = signal<number>(0);

  readonly isAuthenticated = computed(() => !!this._token());
  readonly remainingTime = computed(() => this._remainingTime()); // para UI (opcional)

  private countdownInterval: any;

  constructor() {
    // Si había token guardado, iniciar vigilancia
    const token = this._token();
    if (token) {
      this.startWatcher(token);
    }

    // Effect reactivo: cuando remainingTime llegue a 0 → logout automático
    effect(() => {
      if (this._remainingTime() === 0 && this._token() !== null) {
        this.handleTokenExpired();
      }
    });
  }

  // -------------------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------------------
  login(body: any) {
    return this.http.post<{ token: string }>(API.USER.LOGIN, body)
      .pipe(
        tap(res => {
          this._token.set(res.token);
          this.saveTokenToStorage(res.token);
          this.startWatcher(res.token);
        })
      );
  }

  // LOGOUT
  logout() {
    this._token.set(null);
    this._remainingTime.set(0);
    localStorage.removeItem('token');

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  getToken() {
    return this._token();
  }

  // -------------------------------------------------------------------
  // DECODIFICAR JWT
  // -------------------------------------------------------------------
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  // -------------------------------------------------------------------
  // WATCHER DE EXPIRACIÓN
  // -------------------------------------------------------------------
  private startWatcher(token: string) {
    const decoded = this.decodeToken(token);
    if (!decoded?.exp) return;

    const expirationMs = decoded.exp * 1000;
    const now = Date.now();
    const secondsLeft = Math.floor((expirationMs - now) / 1000);

    // Token ya expiró
    if (secondsLeft <= 0) {
      this._remainingTime.set(0);
      return;
    }

    this._remainingTime.set(secondsLeft);

    if (this.countdownInterval) clearInterval(this.countdownInterval);

    // ⏱ Countdown real cada segundo
    this.countdownInterval = setInterval(() => {
      const updated = this._remainingTime() - 1;
      this._remainingTime.set(updated > 0 ? updated : 0);
    }, 1000);
  }

  // -------------------------------------------------------------------
  // ACCIÓN CUANDO EXPIRE
  // -------------------------------------------------------------------
  private handleTokenExpired() {
    this.logout();

    this.messageService.add({
      severity: 'warn',
      summary: 'Sesión expirada',
      detail: 'Por favor inicia sesión nuevamente.'
    });

    this.router.navigate(['/login']);
  }

  // -------------------------------------------------------------------
  // STORAGE
  // -------------------------------------------------------------------
  private loadTokenFromStorage() {
    return localStorage.getItem('token');
  }

  private saveTokenToStorage(token: string | null) {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }

  // -------------------------------------------------------------------
  // GUARD
  // -------------------------------------------------------------------
  getRole(): string | null {
    const token = this._token();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.role || null;
  }

  hasRole(expectedRole: string): boolean {
    return this.getRole() === expectedRole;
  }
}
