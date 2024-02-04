import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthPersistence} from "@core/services/auth.persistence";

export const authenticatedGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthPersistence);
  authService.isAuthenticated$.subscribe((res) => {
    if (!res && localStorage.getItem('auth') !== "true"){
      router.navigate(['/login']);
      return false;
    }
    return true;
  });


  return true;
};

export const disconnectedGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const authService = inject(AuthPersistence);
  authService.isAuthenticated$.subscribe((res) => {
    if (res){
      router.navigate(['/classroom']);
      return false;
    }
    return true;
  });


  return true;
};
