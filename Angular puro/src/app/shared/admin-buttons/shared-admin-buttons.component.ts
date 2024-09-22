import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shared-admin-buttons',
  templateUrl: './shared-admin-buttons.component.html'
})

export class SharedButtonsComponent implements OnInit {
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  constructor(
    public authService: AuthService
  ) { }

  onEdit() {
    this.editClicked.emit(); // Emitir evento al hacer clic en "Editar"
  }

  onDelete() {
    this.deleteClicked.emit(); // Emitir evento al hacer clic en "Eliminar"
  }

  ngOnInit() { }
}
