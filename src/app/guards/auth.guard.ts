import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('user');
  console.log(token);
  if (!token) {
    router.navigate(['/auth/login'], { queryParams: { retUrl: route.url } });
    return false;
  }

  return true;
};
