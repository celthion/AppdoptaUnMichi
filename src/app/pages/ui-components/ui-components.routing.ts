import { Routes, CanMatchFn } from '@angular/router';

// ui
import { AppDonarComponent } from './donar/donar.component';
import { AppMichiComponent } from './michis/michi.component';
import { AppGraciasComponent } from './gracias/gracias.component';
import { AppFormAdopComponent } from './formAdop/formAdop.component';
import { AppSolicitudesComponent } from './solicitudes/solicitudes.component';
import { AppFormNuevoMichiComponent } from './michis/formNuevoMichi/formNuevoMichi.component';
import { AppFormNuevaSolicitudComponent } from './solicitudes/formNuevaSolicitud/formNuevaSolicitud.component';

import { authGuard } from 'src/app/guards/auth.guard';
import { adminGuard } from 'src/app/guards/admin.guard';


export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'donar', component: AppDonarComponent },
      { path: 'michis', component: AppMichiComponent },
      { path: 'grax/:tipo', component: AppGraciasComponent },
      { path: 'michis/adopcion/:id', component: AppFormAdopComponent, canActivate: [authGuard] },
      { path: 'michis/agregar', component: AppFormNuevoMichiComponent, canActivate: [authGuard, adminGuard] },
      { path: 'michis/edit/:id', component: AppFormNuevoMichiComponent, canActivate: [authGuard, adminGuard] },
      { path: 'solicitudes', component: AppSolicitudesComponent, canActivate: [authGuard] },
      { path: 'solicitudes/agregar', component: AppFormNuevaSolicitudComponent, canActivate: [authGuard, adminGuard] },
      { path: 'solicitudes/edit/:id', component: AppFormNuevaSolicitudComponent, canActivate: [authGuard, adminGuard] },
    ],
  },
];