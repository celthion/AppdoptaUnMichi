import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Michi } from '../interfaces/michi.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MichiService {
  private apiUrl: string = '/api/michis';

  constructor(
    private http: HttpClient
  ) { }

  // Método para obtener todos los michis
  getMichis(): Observable<Michi[]>{
    return this.http.get<Michi[]>(`${this.apiUrl}`);
  }

  // Método para obtener un michi por su ID
  getMichiById(id: number): Observable<Michi|undefined> {
    return this.http.get<Michi>(`${this.apiUrl}?id=${id}`);
  }

  // Método para buscar michis por nombre
  searchMichis(nombre: string): Observable<Michi[]> {
    return this.http.get<Michi[]>(`${this.apiUrl}?nombre=${nombre}`);
  }

  // Método para agregar un nuevo michi
  addMichi(michi: Michi): Observable<Michi> {
    return this.http.post<Michi>(`${this.apiUrl}`, michi);
  }

  // Método para actualizar un michi existente
  updateMichi(michi: Michi): Observable<Michi> {
    return this.http.put<Michi>(`${this.apiUrl}?id=${michi.id}`, michi);
  }

  // Método para eliminar un michi por su ID
  deleteMichi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }

}
