import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoNumTarj'
})

export class FormatoNumTarjPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Eliminar todos los caracteres que no sean números
    value = value.replace(/[^0-9]/g, '');

    // Formatear agregando espacios cada 4 dígitos
    let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();

    return formattedValue;
  }
}
