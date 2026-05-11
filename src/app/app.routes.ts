import { Routes } from '@angular/router';
import { authGuard } from './core/guardianes/autenticacion.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'playlists', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent) 
  },
  {
    path: 'playlists',
    canActivate: [authGuard],
    loadComponent: () => import('./features/lista-reproduccion/mis-listas/mis-listas.component').then(c => c.PlaylistListComponent)
  },
  {
    path: 'playlists/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/lista-reproduccion/detalle-lista/detalle-lista.component').then(c => c.PlaylistDetailComponent)
  }
];
