import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated;
};
