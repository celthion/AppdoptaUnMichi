import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map((isLoggedIn: boolean) => !isLoggedIn),
    tap((isGuest: boolean) => {
      if (!isGuest) {
        router.navigate(['/home']);
      }
    })
  );
};
