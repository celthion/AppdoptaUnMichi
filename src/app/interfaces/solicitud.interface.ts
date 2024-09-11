export interface Solicitud {
  id: number;
  michi: string;
  estado: 'Aprobado' | 'Rechazado' | 'Pendiente';
  fecha: Date;
  comentarios?: string;
}
