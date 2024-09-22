import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { MichiService } from 'src/app/services/michi.service';

import { Michi } from 'src/app/interfaces/michi.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/confim-dialog/confirm-dialog.component';

@Component({
  selector: 'app-michis',
  templateUrl: './michi.component.html',
  styleUrls: ['./michi.component.scss'],
})
export class AppMichiComponent implements OnInit {

  constructor(
    private router: Router,
    public as: AuthService,
    private ms: MichiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarMichis();
  }

  cargarMichis(): void {
    this.ms.getMichis().subscribe(michis => {
      this.michislista = michis;
    });
  }

  buscarMichi(nombre: string): void {
    this.ms.searchMichis(nombre).subscribe(michis => {
      this.michislista = michis;
    });
  }

  agregarMichi(): void {
    this.router.navigate([`/ui-components/michis/agregar`]);
  }

  editarMichi(michi: any): void {
    this.router.navigate([`/ui-components/michis/edit`, michi.id]);
  }

  borrarMichi(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Estás seguro de que quieres eliminar este michi?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ms.deleteMichi(id).subscribe(() => {
          this.cargarMichis();
        });
      }
    });
  }

  irAdopcion(michiId: number): void {
    this.router.navigate([`/ui-components/michis/adopcion`, michiId]);
  }

  michislista: Michi[] = [

  ]
}
