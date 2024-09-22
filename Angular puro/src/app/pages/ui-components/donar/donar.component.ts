import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidacionService } from 'src/app/services/validacion.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html'
})
export class AppDonarComponent implements OnInit {
  donacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vs: ValidacionService,
    private http: HttpClient  // Agregamos HttpClient aquí
  ) {
    this.donacionForm = this.fb.group({
      numTarj: ['', [Validators.required, Validators.pattern(/^(?:\d{4} ?){1,4}$/), Validators.minLength(16)]],
      titular: ['', [Validators.required, Validators.pattern(/^(?!\s*$)(?!.*\s{2,})[a-zA-Z\s]+$/)]],
      fVence: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      codSeg: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(3)]],
      monto: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[1-9][0-9]*$/)]]
    });
  }

  /*   irAgrax(): void {
      this.router.navigate([`/ui-components/grax`, 'don']);
    } */

  ngOnInit(): void { }

  irAgrax() {
    if (this.donacionForm.valid) {
       // Obtener los valores del formulario
      const titular = this.donacionForm.get('titular')?.value;
      const monto = this.donacionForm.get('monto')?.value;
          // Crear el objeto con los datos a enviar
      const donacionData = {
      titular: titular,
      monto: monto
      };
      // Enviar la solicitud POST al backend
    this.http.post('/api/donaciones', donacionData)
    .subscribe(
      (response) => {
        // Manejar la respuesta del backend si es necesario
        console.log('Donación enviada con éxito:', response);

        // Redirigir al usuario después de la confirmación
        this.router.navigate(['/ui-components/grax', 'don']);
      },
      (error) => {
        // Manejar errores en la solicitud
        console.error('Error al enviar la donación:', error);
        // Puedes mostrar un mensaje al usuario si lo deseas
        alert('Ocurrió un error al procesar la donación. Por favor, inténtalo de nuevo.');
      }
    );
    } else {
  console.log("Formulario inválido, por favor revise los campos.");
    }
  }
  getErrorMessage(controlName: string): string {
    const control = this.donacionForm.get(controlName);
    if (!control) {
      return '';
    }
    return this.vs.getErrorMessage(control, controlName);
  }
}
