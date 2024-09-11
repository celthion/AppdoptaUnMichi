export interface Michi {
  id: number;
  imgSrc: string;
  nombre: string;
  edadNumero: number;
  edadUnidad: 'mes/es' | 'año/s';
  sexo: 'Macho' | 'Hembra';
  esterilizado: 'Si' | 'No';
  salud: string;
  personalidad: string
}
