import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components
import { AppDonarComponent } from './donar/donar.component';
import { AppMichisComponent } from './michis/michis.component';
import { AppGraciasComponent } from './gracias/gracias.component';
import { AppFormAdopComponent } from './formAdop/formAdop.component';
import { AppSolicitudesComponent } from './solicitudes/solicitudes.component';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
  ],
  declarations: [
    AppDonarComponent,
    AppMichisComponent,
    AppGraciasComponent,
    AppFormAdopComponent,
    AppSolicitudesComponent,
  ],
})
export class UicomponentsModule {}
