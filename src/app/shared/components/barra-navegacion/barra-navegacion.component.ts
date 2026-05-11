import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/servicios/autenticacion.servicio';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.scss'
})
export class NavbarComponent {
  user = this.authService.getUser();

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
