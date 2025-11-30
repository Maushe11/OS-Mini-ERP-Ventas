import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
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

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      const fakeJwt = 'fake-jwt-token.admin.admin';
      this._token.set(fakeJwt);
      this.saveTokenToStorage(fakeJwt);
      return true;
    }
    return false;
  }

  logout(): void {
    this._token.set(null);
    this.saveTokenToStorage(null);
  }

  getToken(): string | null {
    return this._token();
  }
}
