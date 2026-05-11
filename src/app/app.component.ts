import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/barra-navegacion/barra-navegacion.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/servicios/autenticacion.servicio';

import { PlayerComponent } from './shared/components/reproductor/reproductor.component';

import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, PlayerComponent, ToastModule],
  template: `
    <div class="min-h-screen flex flex-column">
      <p-toast></p-toast>
      @if (authService.getUser()()) {
        <app-navbar></app-navbar>
      }
      <main class="flex-grow-1">
        <router-outlet></router-outlet>
      </main>
      <app-player></app-player>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}
