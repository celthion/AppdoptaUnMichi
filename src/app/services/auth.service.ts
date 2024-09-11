import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, tap, of, map, catchError } from 'rxjs';

import { Usuario } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private isAdmin = false;

  constructor(private router: Router) { }

  login( form: FormGroup ):boolean {
    // http.post('login',{ email, password });
    if (form.valid){
      this.isAuthenticated = true;
      // Suponiendo que la información de administrador se determina a partir del formulario
      this.isAdmin = form.value.correo === 'ay@unal.edu.co'; // Ejemplo simple de verificación de administrador

      localStorage.setItem('isAuthenticated', 'true'); // Guardar el estado en el almacenamiento local
      localStorage.setItem('isAdmin', this.isAdmin.toString()); // Guardar el estado de administrador en el almacenamiento local

      this.router.navigate(['/home']); // Redirigir al usuario a la página principal
      return true
    }
    return false
  }


  logout(): void {
    this.isAuthenticated = false;
    this.isAdmin = false; // Restablecer el estado de administrador
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/home']); // Redirigir al usuario a la página de inicio de sesión
  }

    // Método para verificar si el usuario está autenticado
    isLoggedIn(): boolean {
      return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
    }

    isAdminUser(): boolean {
      return this.isAdmin || localStorage.getItem('isAdmin') === 'true';
    }

}
