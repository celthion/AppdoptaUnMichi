import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gracias',
  templateUrl: './gracias.component.html',
  styleUrl: './gracias.component.scss'
})
export class AppGraciasComponent {
  ren1: string = '';
  ren2: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tipo = params.get('tipo');
      if (tipo === 'don') {
        this.ren1 = '¡Muchas gracias por tu generosa donación!';
        this.ren2 = 'Tu apoyo es fundamental para continuar brindando cuidados a los michis mientras buscan un hogar.';
      } else if (tipo === 'adopt') {
        this.ren1 = '¡Gracias por tu interés en adoptar! Tu solicitud ha sido recibida y será evaluada por nuestro equipo de cuidadores.';
        this.ren2 = 'Te informaremos lo más pronto posible una vez que hayamos revisado todos los detalles. Agradecemos tu paciencia y compromiso con nuestros michis.';
      } else {
        this.ren1 = '¡Muchas gracias por tu apoyo! Tu generosidad y compromiso son muy apreciados.';
        this.ren2 = 'Gracias por contribuir a nuestra causa y por ser parte de nuestra comunidad.';
      }
    });
  }



}
