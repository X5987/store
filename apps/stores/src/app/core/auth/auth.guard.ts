import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!localStorage.getItem('username') && !localStorage.getItem('password')) {
    console.info('connexion inconnu');
    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }
  }
  console.info('connexion reconnu');
  return true;
};
