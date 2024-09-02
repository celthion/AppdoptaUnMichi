import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidacionService } from 'src/app/services/validacion.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent implements OnInit{
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vs: ValidacionService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^(?!\s*$)(?!.*\s{2,})[a-zA-Z\s]+$/)]],
      correo: ['', [Validators.required, Validators.email, this.vs.dominioUnal.bind(this.vs)]],
      contrasena: ['', Validators.required],
    })
  }


/*   submit() {
    // console.log(this.form.value);
    this.router.navigate(['/home']);
  } */

  ngOnInit(): void { }

  irALogin() {
    if (this.registerForm.valid) {
      // Aquí puedes manejar la lógica de envío o redirección
      this.router.navigate([`/authentication/login`]);
    } else {
      console.log("Formulario inválido, por favor revise los campos.");
    }
  }


  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control) {
      return '';
    }
    return this.vs.getErrorMessage(control, controlName);
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
