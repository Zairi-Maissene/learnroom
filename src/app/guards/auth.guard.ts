import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  if (!localStorage.getItem('user')) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
