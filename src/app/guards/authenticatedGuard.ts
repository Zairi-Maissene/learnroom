import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../auth/auth.service';

export const authenticatedGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let authenticated = false;
  authService.isAuthenticated$.subscribe((res) => (authenticated = res));
  if (!authenticated) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

export const disconnectedGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let authenticated = true;
  authService.isAuthenticated$.subscribe((res) => (authenticated = res));
  if (authenticated) {
    router.navigate(['/classroom']);
    return false;
  }

  return true;
};
