import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'shared-toolbar',
  templateUrl: './shared-toolbar.component.html'
})

export class SharedToolbarComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }

  @Input() buttonText: string = 'Agregar'; // Texto del botón
  @Input() searchPlaceholder: string = 'Buscar'; // Placeholder del cuadro de búsqueda

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();

  searchTerm: string = ''; // Término de búsqueda

  buscar() {
    this.onSearch.emit(this.searchTerm); // Emitir el término de búsqueda
  }

  agregar() {
    this.onAdd.emit(); // Emitir el evento de agregar
  }


  ngOnInit() { }
}
