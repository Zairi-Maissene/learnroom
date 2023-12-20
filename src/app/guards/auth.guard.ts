import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('user');
  console.log(authService.isAuthenticated$);
  if (!token) {
    router.navigate(['login'], { queryParams: { retUrl: route.url } });
    return false;
  }

  return true;
};
