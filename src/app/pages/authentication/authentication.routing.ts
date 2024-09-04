import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { guestCA } from 'src/app/guards/guest.guard';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
        canActivate: [guestCA],
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
        canActivate: [guestCA],
      },
    ],
  },
];
