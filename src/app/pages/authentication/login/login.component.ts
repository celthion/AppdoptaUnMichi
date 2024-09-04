import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ValidacionService } from 'src/app/services/validacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private as: AuthService,
    private vs: ValidacionService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email, this.vs.dominioUnal.bind(this.vs)]],
      contrasena: ['', Validators.required],
    })
  }

  ngOnInit(): void { }

  irAHome() {
    if (this.as.login(this.loginForm)) {
      // Aquí puedes manejar la lógica de envío o redirección
      this.router.navigate([`/home`]);
    } else {
      console.log("Formulario inválido, por favor revise los campos.");
    }
  }


  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
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
