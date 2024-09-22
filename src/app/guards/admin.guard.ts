import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdminUser().pipe(
    tap((isAdmin: boolean) => {
      if (!isAdmin) {
        router.navigate(['/home']);
      }
    })
  );
};
