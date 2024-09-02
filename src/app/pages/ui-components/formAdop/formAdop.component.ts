import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidacionService } from 'src/app/services/validacion.service';

@Component({
  selector: 'app-formAdop',
  templateUrl: './formAdop.component.html',
  styleUrl: './formAdop.component.scss',
})
export class AppFormAdopComponent implements OnInit {
  adopcionForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vs: ValidacionService
  ) {
    this.adopcionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^(?!\s*$)(?!.*\s{2,})[a-zA-Z\s]+$/)]],
      correo: ['', [Validators.required, Validators.email, this.vs.dominioUnal.bind(this.vs)]],
      edad: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10)]],
      domicilio: ['', Validators.required],
      vivienda: ['', Validators.required],
      propiedad: ['', Validators.required],
      permiteMascotas: ['', Validators.required],
      personasHogar: ['', Validators.required],
      otrasMascotas: ['', Validators.required],
      espacioDisponible: ['', Validators.required],
    })
  }

  /*   irAgrax(): void {
      this.router.navigate([`/ui-components/grax`, 'adopt']);
    } */

  ngOnInit(): void { }

  irAgrax() {
    if (this.adopcionForm.valid) {
      // Aquí puedes manejar la lógica de envío o redirección
      this.router.navigate([`/ui-components/grax`, 'adopt']);
    } else {
      console.log("Formulario inválido, por favor revise los campos.");
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.adopcionForm.get(controlName);
    if (!control) {
      return '';
    }
    return this.vs.getErrorMessage(control, controlName);
  }
}
