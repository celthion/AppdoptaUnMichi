import { Routes } from '@angular/router';

// ui
import { AppDonarComponent } from './donar/donar.component';
import { AppMichisComponent } from './michis/michis.component';
import { AppGraciasComponent } from './gracias/gracias.component';
import { AppFormAdopComponent } from './formAdop/formAdop.component';
import { AppSolicitudesComponent } from './solicitudes/solicitudes.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'donar',
        component: AppDonarComponent,
      },
      {
        path: 'michis',
        component: AppMichisComponent,
      },
      {
        path: 'grax/:tipo',
        component: AppGraciasComponent,
      },
      {
        path: 'michis/adopcion/:id',
        component: AppFormAdopComponent,
      },
      {
        path: 'solicitudes',
        component: AppSolicitudesComponent,
      },
    ],
  },
];
