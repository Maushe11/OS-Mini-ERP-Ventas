import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../core/services/auth-service';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return (): boolean | UrlTree => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      return router.parseUrl('/login');
    }

    if (authService.hasRole(expectedRole)) {
      return true;
    }

    return router.parseUrl('/home');
  };
};
