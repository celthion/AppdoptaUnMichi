import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Solicitud } from '../interfaces/solicitud.interface';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl: string = '';

  constructor(
    private http: HttpClient
  ) { }

  // Obtener todas las solicitudes
  getSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl);
  }

  // Obtener una solicitud por su ID
  getSolicitudById(id: number): Observable<Solicitud|undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Solicitud>(url);
  }

  searchSolicitudes(nombre: string): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}?nombre=${nombre}`);
  }

  // Crear una nueva solicitud
  addSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(this.apiUrl, solicitud);
  }

  // Actualizar una solicitud existente
  updateSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    const url = `${this.apiUrl}/${solicitud.id}`;
    return this.http.put<Solicitud>(url, solicitud);
  }

  // Eliminar una solicitud por su ID
  deleteSolicitud(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
