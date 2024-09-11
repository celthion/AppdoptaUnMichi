import { Routes, CanMatchFn } from '@angular/router';

// ui
import { AppDonarComponent } from './donar/donar.component';
import { AppMichiComponent } from './michis/michi.component';
import { AppGraciasComponent } from './gracias/gracias.component';
import { AppFormAdopComponent } from './formAdop/formAdop.component';
import { AppSolicitudesComponent } from './solicitudes/solicitudes.component';
import { AppFormNuevoMichiComponent } from './michis/formNuevoMichi/formNuevoMichi.component';
import { AppFormNuevaSolicitudComponent } from './solicitudes/formNuevaSolicitud/formNuevaSolicitud.component';

import { authCA } from 'src/app/guards/auth.guard';
import { adminCA } from 'src/app/guards/admin.guard';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'donar', component: AppDonarComponent },
      { path: 'michis', component: AppMichiComponent },
      { path: 'grax/:tipo', component: AppGraciasComponent },
      { path: 'michis/adopcion/:id', component: AppFormAdopComponent, canActivate: [authCA] },
      { path: 'michis/agregar', component: AppFormNuevoMichiComponent, canActivate: [authCA, adminCA] },
      { path: 'michis/edit/:id', component: AppFormNuevoMichiComponent, canActivate: [authCA, adminCA] },
      { path: 'solicitudes', component: AppSolicitudesComponent, canActivate: [authCA] },
      { path: 'solicitudes/agregar', component: AppFormNuevaSolicitudComponent, canActivate: [authCA, adminCA] },
      { path: 'solicitudes/edit/:id', component: AppFormNuevaSolicitudComponent, canActivate: [authCA, adminCA] },
    ],
  },
];
