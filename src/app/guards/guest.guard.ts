import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard {
  constructor(
    public router: Router,
    private as: AuthService
  ) { }

  canActivate(): boolean {
    if (!this.as.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/home']);
      return false
      }
    }
/*   canMatch(currentUser: UserToken): boolean {
    return true;
  }
   */
}

export const guestCA: CanActivateFn = (route, state) => {
  return inject(GuestGuard).canActivate();
};
