import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'playlists', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent) 
  },
  {
    path: 'playlists',
    canActivate: [authGuard],
    loadComponent: () => import('./features/playlist/playlist-list/playlist-list.component').then(c => c.PlaylistListComponent)
  },
  {
    path: 'playlists/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/playlist/playlist-detail/playlist-detail.component').then(c => c.PlaylistDetailComponent)
  }
];
