import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <nav class="flex align-items-center justify-content-between px-5 py-3 surface-section shadow-2 sticky top-0 z-5">
      <div class="text-2xl font-bold text-primary cursor-pointer" routerLink="/playlists">
        <i class="pi pi-headphones mr-2"></i>MusicApp
      </div>
      <div class="flex align-items-center gap-3">
        @if (user()) {
          <span class="font-medium">Hola, {{ user()?.name }}</span>
          <p-button label="Salir" icon="pi pi-power-off" severity="danger" [text]="true" (onClick)="logout()"></p-button>
        }
      </div>
    </nav>
  `
})
export class NavbarComponent {
  user = this.authService.getUser();

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
