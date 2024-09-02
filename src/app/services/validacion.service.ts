import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor() { }

  // Método para obtener el mensaje de error según el tipo
  getErrorMessage(control: AbstractControl, controlName: string): string {
    if (control.errors) {
      if (control.errors['pattern']) {
        return 'El formato ingresado no es válido';
      }
      if (control.errors['minlength']) {
        const minLength = control.errors['minlength'].requiredLength;
        return `Debe tener al menos ${minLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        const maxLength = control.errors['maxlength'].requiredLength;
        return `No puede exceder de ${maxLength} caracteres`;
      }
      if (control.errors['required']) {
        return 'Este campo es obligatorio';
      }
      if (control.errors['min']) {
        if (controlName === 'monto' ) {
          return 'Por favor, ingrese un monto superior a 0';
        }
        if (controlName === 'edad' ) {
          return 'Debe ser mayor de edad';
        }
      }
      if (control.errors['max']) {
        if (controlName === 'edad' ) {
          return 'La edad máxima permitida es 99 años';
        }
      }
      if (control.errors['email']) {
        return 'El formato del correo electrónico no es válido';
      }
      if (control.errors['dominioInvalido']) {
        return 'El dominio debe pertenecer a la unal';
      }
      // Puedes agregar más validaciones según tus necesidades
    }
    return '';
  }

  public dominioUnal(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value.trim().toLowerCase();

    if (!value.endsWith('unal.edu.co')){
      return {dominioInvalido: true}
    }
    return null;
  }

}
