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

  constructor(private router: Router) { }

  login( form: FormGroup ):boolean {
    // http.post('login',{ email, password });
    if (form.valid){
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true'); // Guardar el estado en el almacenamiento local
      this.router.navigate(['/home']); // Redirigir al usuario a la página principal
      return true
    }
    return false
  }


  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.router.navigate(['/home']); // Redirigir al usuario a la página de inicio de sesión
  }

    // Método para verificar si el usuario está autenticado
    isLoggedIn(): boolean {
      return this.isAuthenticated || localStorage.getItem('isAuthenticated') === 'true';
    }

}
