import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

import { Solicitud } from 'src/app/interfaces/solicitud.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confim-dialog/confirm-dialog.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class AppSolicitudesComponent implements OnInit{

  constructor(
    private router: Router,
    public as: AuthService,
    private ss: SolicitudService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.cargarSolicitudes(); // Cargar solicitudes al iniciar el componente
  }

  cargarSolicitudes(): void {
    this.ss.getSolicitudes().subscribe(Solicitudes => {
      this.listasolicitudes = Solicitudes;
    });
  }

  buscarSolicitud(nombre: string): void {
    this.ss.searchSolicitudes(nombre).subscribe(Solicitudes => {
      this.listasolicitudes = Solicitudes;
    });
  }

  agregarSolicitud(): void {
    this.router.navigate([`/ui-components/solicitudes/agregar`]);
  }

  editarSolicitud(Solicitud: any): void {
    this.router.navigate([`/ui-components/solicitudes/edit`, Solicitud.id]);
  }

  borrarSolicitud(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Estás seguro de que quieres eliminar esta solicitud?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ss.deleteSolicitud(id).subscribe(() => {
          this.cargarSolicitudes();
        });
      }
    });
  }


  listasolicitudes: Solicitud[] = [
    {
      id: 1,
      michi: 'Milo',
      estado: 'Rechazado',
      fecha: new Date('2024-08-15'),
      comentarios: 'El Solicitud ya ha sido adoptado'
    },
    {
      id: 2,
      michi: 'Simba',
      estado: 'Pendiente',
      fecha: new Date('2024-08-18'),
      comentarios: 'Familia con niños pequeños, revisión en curso.'
    },
    {
      id: 3,
      michi: 'Luna',
      estado: 'Aprobado',
      fecha: new Date('2024-08-20'),
      comentarios: 'El hogar cuenta con jardín y otras mascotas amigables.'
    }
  ]
}
