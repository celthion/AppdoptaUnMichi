import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donar',
  templateUrl: './donar.component.html'
})
export class AppDonarComponent {

  constructor(private router: Router) {}

  irAgrax(): void {
    this.router.navigate([`/ui-components/grax`, 'don']);
  }
}
