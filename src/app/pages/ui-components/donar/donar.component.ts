import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidacionService } from 'src/app/services/validacion.service';

@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html'
})
export class AppDonarComponent implements OnInit {
  donacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vs: ValidacionService
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
      // Aquí puedes manejar la lógica de envío o redirección
      this.router.navigate([`/ui-components/grax`, 'don']);
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
