import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ValidacionService } from 'src/app/services/validacion.service';

import { Solicitud } from 'src/app/interfaces/solicitud.interface';

@Component({
  selector: 'app-formNuevaSolicitud',
  templateUrl: './formNuevaSolicitud.component.html',
  styleUrl: './formNuevaSolicitud.component.scss'
})

export class AppFormNuevaSolicitudComponent implements OnInit {
  nuevaSolicitudForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ss: SolicitudService,
    private vs: ValidacionService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  )
  {
    this.nuevaSolicitudForm = this.fb.group({
      id: ['',[Validators.required]],
      michi: ['', [Validators.required, Validators.pattern(/^(?!\s*$)(?!.*\s{2,})[a-zA-Z\s]+$/)]],
      estado: ['', Validators.required],
      fecha: ['', [Validators.required, ]],
      comentarios: ['', [Validators.required, ]]
    })
  }

  ngOnInit(): void {
    if (!this.router.url.includes('solicitudes/edit')) return;

    this.route.params
    .pipe(
      switchMap(({id}) => this.ss.getSolicitudById(id))
    ).subscribe(solicitud => {
      if (!solicitud) {
        this.router.navigate(['/ui-components/solicitudes']);
        return;
      }
      this.nuevaSolicitudForm.reset(solicitud);
      return;
    })
  }

  get currentSolicitud(): Solicitud {
    const solicitud = this.nuevaSolicitudForm.value as Solicitud;
    return solicitud;
  }

  registrarSolicitud() {
    if (this.nuevaSolicitudForm.invalid) {
      return
    }
    if (this.currentSolicitud.id){
      this.ss.updateSolicitud(this.currentSolicitud).subscribe( solicitud => {
        this.showSnackBar('Solicitud actualizada');
      });

      return;
    }

    this.ss.addSolicitud(this.currentSolicitud).subscribe( solicitud => {
      this.showSnackBar('Solicitud registrada');
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.nuevaSolicitudForm.get(controlName);
    if (!control) {
      return '';
    }
    return this.vs.getErrorMessage(control, controlName);
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
