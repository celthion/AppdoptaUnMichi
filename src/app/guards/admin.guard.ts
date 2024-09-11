import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(
    public router: Router,
    private as: AuthService
  ) { }

  canActivate(): boolean {
    if (this.as.isAdminUser()) {
      return true
    } else {
      this.router.navigate(['/home']);
      return false
    }
  }
}

export const adminCA: CanActivateFn = (route, state) => {
  return inject(AdminGuard).canActivate();
};
