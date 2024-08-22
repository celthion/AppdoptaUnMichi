import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface solicitud {
  id: number;
  michi: string;
  estado: 'Aprobado' | 'Rechazado' | 'Pendiente';
  fecha: Date;
  comentarios?: string;
}

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class AppSolicitudesComponent {

  listasolicitudes: solicitud[] = [
    {
      id: 1,
      michi: 'Milo',
      estado: 'Rechazado',
      fecha: new Date('2024-08-15'),
      comentarios: 'El michi ya ha sido adoptado'
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
