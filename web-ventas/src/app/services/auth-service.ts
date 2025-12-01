import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../core/config/api.config';
import {catchError, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  private http = inject(HttpClient);

  private _token = signal<string | null>(this.loadTokenFromStorage());

  isAuthenticated = computed(() => !!this._token());

  private loadTokenFromStorage(): string | null {
    return localStorage.getItem('token');
  }

  private saveTokenToStorage(token: string | null) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  login(username: string, password: string) {
    const body = {username, password};

    return this.http.post<{ token: string }>(API.USER.LOGIN, body)
      .pipe(
        tap((response) => {
          this._token.set(response.token);
          this.saveTokenToStorage(response.token);
        }),
        catchError(() => {
          return of(null);
        })
      );
  }

  logout(): void {
    this._token.set(null);
    this.saveTokenToStorage(null);
  }

  getToken(): string | null {
    return this._token();
  }
}
