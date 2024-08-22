import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formAdop',
  templateUrl: './formAdop.component.html'
})
export class AppFormAdopComponent {
  constructor(private router: Router) {}

  irAgrax(): void {
    this.router.navigate([`/ui-components/grax`, 'adopt']);
  }

}
