import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = () => {
  return inject(AuthService).state.pipe(map((user) => !!user));
};
