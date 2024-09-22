import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

import { SharedModule } from 'src/app/shared/shared.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppDonarComponent } from './donar/donar.component';
import { AppMichiComponent } from './michis/michi.component';
import { AppGraciasComponent } from './gracias/gracias.component';
import { AppFormAdopComponent } from './formAdop/formAdop.component';
import { AppSolicitudesComponent } from './solicitudes/solicitudes.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AppFormNuevoMichiComponent } from './michis/formNuevoMichi/formNuevoMichi.component';
import { AppFormNuevaSolicitudComponent } from './solicitudes/formNuevaSolicitud/formNuevaSolicitud.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    SharedModule
  ],
  declarations: [
    AppDonarComponent,
    AppMichiComponent,
    AppGraciasComponent,
    AppFormAdopComponent,
    AppSolicitudesComponent,
    AppFormNuevoMichiComponent,
    AppFormNuevaSolicitudComponent
  ],
})
export class UicomponentsModule {}
