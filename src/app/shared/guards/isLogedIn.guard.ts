import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const isLoggedInGuard: CanActivateFn = () => {
  return inject(AuthService).state.pipe(map(Boolean));
};

export const isLoggedInAndRedirectGuard: (path: string) => CanActivateFn = (path: string) => () => {
  const router = inject(Router);
  return inject(AuthService).state.pipe(
    map(Boolean),
    map((isLoggedIn) => (isLoggedIn ? router.createUrlTree([path]) : true))
  );
};
