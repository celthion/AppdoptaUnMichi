import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { SharedToolbarComponent } from './toolbar/shared-toolbar.component';
import { SharedButtonsComponent } from './admin-buttons/shared-admin-buttons.component';

import { FormatoFVencePipe } from './pipes/formatoFVence.pipe';
import { FormatoNumTarjPipe } from './pipes/formatoNumTarj.pipe';
import { ConfirmDialogComponent } from './confim-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    SharedToolbarComponent,
    SharedButtonsComponent,
    ConfirmDialogComponent,

    //Pipes
    FormatoFVencePipe,
    FormatoNumTarjPipe
  ],
  exports: [
    SharedToolbarComponent,
    SharedButtonsComponent,
    ConfirmDialogComponent,

    //Pipes
    FormatoFVencePipe,
    FormatoNumTarjPipe
  ],
  providers: [],
})
export class SharedModule { }
