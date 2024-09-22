export interface Solicitud {
  id: number;
  michi: string;
  estado: 'Aprobado' | 'Rechazado' | 'Pendiente';
  fecha: Date;
  comentarios?: string;

  // Nuevos campos basados en la tabla proporcionada
  nombre_solicitante: string;
  correo_solicitante: string;
  edad_solicitante: number;
  telefono_solicitante: string;
  domicilio_solicitante: string;
  tipo_vivienda: string;
  propia_rentada: string;
  permiten_mascotas: string;
  numero_personas: string;
  otras_mascotas: string;
  espacio: string;
  id_solicitante: string;
  solicitud_nombre:string;
}

