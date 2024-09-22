import { Routes } from '@angular/router';
import { AppHomeComponent } from './home/home.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppHomeComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
