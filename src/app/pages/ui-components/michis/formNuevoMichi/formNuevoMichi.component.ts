import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MichiService } from 'src/app/services/michi.service';
import { ValidacionService } from 'src/app/services/validacion.service';

import { Michi } from 'src/app/interfaces/michi.interface';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formNuevoMichi',
  templateUrl: './formNuevoMichi.component.html',
  styleUrl: './formNuevoMichi.component.scss'
})

export class AppFormNuevoMichiComponent implements OnInit {
  nuevoMichiForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ms: MichiService,
    private vs: ValidacionService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  )
  {
    this.nuevoMichiForm = this.fb.group({
      id: ['',[Validators.required, Validators.pattern(/^[0-9]*$/)]],
      imgSrc: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern(/^(?!\s*$)(?!.*\s{2,})[a-zA-Z\s]+$/)]],
      edadNumero: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.min(1), Validators.max(38)]],
      edadUnidad: ['', Validators.required],
      sexo: ['', Validators.required],
      esterilizado: ['', Validators.required],
      salud: ['', Validators.required],
      personalidad: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (!this.router.url.includes('michis/edit')) return;

    this.route.params
    .pipe(
      switchMap(({id}) => this.ms.getMichiById(id))
    ).subscribe(michi => {
      if (!michi) {
        this.router.navigate(['/ui-components/michis']);
        return;
      }
      this.nuevoMichiForm.reset(michi);
      return;
    })
  }

  get currentMichi(): Michi {
    const michi = this.nuevoMichiForm.value as Michi;
    return michi;
  }

  registrarMichi() {
    if (this.nuevoMichiForm.invalid) {
      return
    }
    if (this.currentMichi.id){
      this.ms.updateMichi(this.currentMichi).subscribe( michi => {
        this.showSnackBar('Michi actualizado');
      });

      return;
    }

    this.ms.addMichi(this.currentMichi).subscribe( michi => {
      this.showSnackBar('Michi registrado');
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.nuevoMichiForm.get(controlName);
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
