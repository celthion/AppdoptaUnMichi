import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


import { Observable, tap, of, map, catchError,switchMap  } from 'rxjs';

import { Usuario } from '../interfaces/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private isAdmin = false;

  constructor(private router: Router, private http: HttpClient) { this.getUserInfo().subscribe(); }

  
  getUserInfo(): Observable<any> {
    return this.http.get<any>('/api/protected', { withCredentials: true }).pipe(
      tap(response => {
        if (response.isAuthenticated) {
          this.isAuthenticated = true;
          this.isAdmin = response.isAdmin;
        } else {
          this.isAuthenticated = false;
          this.isAdmin = false;
        }
      }),
      catchError(error => {
        console.error('Failed to get user info', error);
        this.isAuthenticated = false;
        this.isAdmin = false;
        return of(null);
      })
    );
  }
  
  
  login(form: FormGroup): Observable<boolean> {
    const correo = form.value.correo;
    const password = form.value.contrasena;
  
    return this.http.post<any>('/api/login', { correo, password }, { withCredentials: true }).pipe(
      switchMap(response => {
        if (response.success) {
          return this.getUserInfo().pipe(
            map(() => {
              this.router.navigate(['/home']);
              return true;
            })
          );
        } else {
          this.isAuthenticated = false;
          this.isAdmin = false;
          return of(false);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        this.isAuthenticated = false;
        this.isAdmin = false;
        return of(false);
      })
    );
  }


  logout(): void {
    this.http.post('/api/logout', {}, { withCredentials: true }).subscribe(
      () => {
        this.isAuthenticated = false;
        this.isAdmin = false;

        this.router.navigate(['/home']);
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
  isLoggedIn(): Observable<boolean> {
    if (this.isAuthenticated ) {
      return of(true);
    } else {
      return this.getUserInfo().pipe(
        map(response => response ? response.isAuthenticated : false)
      );
    }
  }
  
  isAdminUser(): Observable<boolean> {
    if (this.isAdmin ) {
      return of(true);
    } else {
      return this.getUserInfo().pipe(
        map(response => response ? response.isAdmin : false)
      );
    }
  }

  register(form: FormGroup): Observable<boolean> {
    const nombre = form.value.nombre;
    const correo = form.value.correo;
    const contrasena = form.value.contrasena;

    return this.http.post<any>('/api/register', { nombre, correo, contrasena }).pipe(
      map(response => {
        if (response.success) {
          // Optionally, you might log the user in automatically here
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Registration failed', error);
        return of(false);
      })
    );
  }

}
