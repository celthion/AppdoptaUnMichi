import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface michis {
  id: number;
  imgSrc: string;
  nombre: string;
  edad: number;
  salud: string;
  personalidad: string
}

@Component({
  selector: 'app-michis',
  templateUrl: './michis.component.html',
  styleUrls: ['./michis.component.scss'],
})
export class AppMichisComponent {

  constructor(private router: Router) {}

  irAdopcion(michiId: number): void {
    this.router.navigate([`/ui-components/michis/adopcion`, michiId]);
  }

  michislista: michis[] = [
    {
      id: 1,
      imgSrc: '/assets/images/michis/michi-luna.jpg',
      nombre: 'Luna',
      edad: 3,
      salud: 'Sana',
      personalidad: 'Es una gata gris independiente y curiosa. Ama explorar y disfrutar de mimos ocasionales'
    },
    {
      id: 2,
      imgSrc: '/assets/images/michis/michi-simba.jpg',
      nombre: 'Simba',
      edad: 5,
      salud: 'Diabetico',
      personalidad: 'Es un atigrado jugueton y vocal. Aventurero y lleno de vida tras ser rescatado'
    },
    {
      id: 3,
      imgSrc: '/assets/images/michis/michi-oliver.jpg',
      nombre: 'Oliver',
      edad: 8,
      salud: 'Alergia controlada por dieta',
      personalidad: 'Es un British Shorthair calmado gentil. Prefiere la tranquilidad y es un compañero excelente'
    },
    {
      id: 4,
      imgSrc: '/assets/images/michis/michi-milo.jpeg',
      nombre: 'Milo',
      edad: 3,
      salud: 'Alergia a cosas baratas',
      personalidad: 'No es fanático de la actividad física. Le encanta pasar largas horas acurrucado en su lugar favorito. Re piola el wacho'
    },
    {
      id:5,
      imgSrc: '/assets/images/michis/michi-raven.jpeg',
      nombre: 'Raven',
      edad: 1,
      salud: 'Ligeramente obesa',
      personalidad: 'Siempre está en movimiento, explorando cada rincón. Es muy comunicativo con su maullido, incluso a veces demasiado'
    },
    {
      id: 6,
      imgSrc: '/assets/images/michis/michi-rutilio.jpeg',
      nombre: 'Rutilio',
      edad: 6,
      salud: 'Sana',
      personalidad: 'Un gato cariñoso y maullador, siempre busca la compañía de su humano. Le gusta vigilar las inmediaciones del hogar'
    }
]
}
