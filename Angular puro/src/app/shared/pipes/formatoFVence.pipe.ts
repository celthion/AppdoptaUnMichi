import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFVence'
})

export class FormatoFVencePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Eliminar cualquier carácter que no sea un número
    value = value.replace(/[^0-9]/g, '');

    // Insertar la barra '/' después de los dos primeros dígitos (MM)
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }

    return value;
  }
}
