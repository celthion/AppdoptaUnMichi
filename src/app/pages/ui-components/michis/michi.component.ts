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
    {
      id: 1,
      imgSrc: '/assets/images/michis/michi-luna.jpg',
      nombre: 'Luna',
      edadNumero: 3,
      edadUnidad: 'mes/es',
      sexo: 'Hembra',
      esterilizado: 'No',
      salud: 'Sana',
      personalidad: 'Es una gata gris independiente y curiosa. Ama explorar y disfrutar de mimos ocasionales'
    },
    {
      id: 2,
      imgSrc: '/assets/images/michis/michi-simba.jpg',
      nombre: 'Simba',
      edadNumero: 5,
      edadUnidad: 'año/s',
      sexo: 'Macho',
      esterilizado: 'No',
      salud: 'Diabetico',
      personalidad: 'Es un atigrado jugueton y vocal. Aventurero y lleno de vida tras ser rescatado'
    },
    {
      id: 3,
      imgSrc: '/assets/images/michis/michi-oliver.jpg',
      nombre: 'Oliver',
      edadNumero: 8,
      edadUnidad: 'año/s',
      sexo: 'Macho',
      esterilizado: 'Si',
      salud: 'Alergia controlada por dieta',
      personalidad: 'Es un British Shorthair calmado gentil. Prefiere la tranquilidad y es un compañero excelente'
    },
    {
      id: 4,
      imgSrc: '/assets/images/michis/michi-milo.jpeg',
      nombre: 'Milo',
      edadNumero: 3,
      edadUnidad: 'año/s',
      sexo: 'Macho',
      esterilizado: 'Si',
      salud: 'Alergia a cosas baratas',
      personalidad: 'No es fanático de la actividad física. Le encanta pasar largas horas acurrucado en su lugar favorito. Re piola el wacho'
    },
    {
      id:5,
      imgSrc: '/assets/images/michis/michi-raven.jpeg',
      nombre: 'Raven',
      edadNumero: 1,
      edadUnidad: 'año/s',
      sexo: 'Hembra',
      esterilizado: 'Si',
      salud: 'Ligeramente obesa',
      personalidad: 'Siempre está en movimiento, explorando cada rincón. Es muy comunicativo con su maullido, incluso a veces demasiado'
    },
    {
      id: 6,
      imgSrc: '/assets/images/michis/michi-rutilio.jpeg',
      nombre: 'Rutilio',
      edadNumero: 6,
      edadUnidad: 'año/s',
      sexo: 'Macho',
      esterilizado: 'Si',
      salud: 'Sana',
      personalidad: 'Un gato cariñoso y maullador, siempre busca la compañía de su humano. Le gusta vigilar las inmediaciones del hogar'
    }
]
}
