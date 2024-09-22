import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Solicitud } from 'src/app/interfaces/solicitud.interface';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { ValidacionService } from 'src/app/services/validacion.service';

@Component({
  selector: 'app-formAdop',
  templateUrl: './formAdop.component.html',
  styleUrls: ['./formAdop.component.scss'],
})
export class AppFormAdopComponent implements OnInit {
  adopcionForm: FormGroup;
  michiId!: string; // Use definite assignment assertion

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private vs: ValidacionService,
    private ss: SolicitudService
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
    });
  }

  ngOnInit(): void {
    // Get the michiId from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.michiId = id;
    } else {
      console.error('No se proporcionó un ID de michi en la ruta.');
      // Handle the error: you can redirect the user or show a message
      // For example, redirect to a not-found page:
      // this.router.navigate(['/not-found']);
    }
  }

  irAgrax() {
    if (this.adopcionForm.valid) {
      const solicitudData = {
        ...this.adopcionForm.value,
        michiId: this.michiId,
      };

      this.ss.addSolicitud(solicitudData).subscribe(
        solicitud => {
          this.router.navigate([`/ui-components/grax`, 'adopt']);
        },
        error => {
          console.error('Error al enviar la solicitud', error);
        }
      );
    } else {
      console.log('Formulario inválido, por favor revise los campos.');
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
