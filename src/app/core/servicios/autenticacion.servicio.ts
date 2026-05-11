import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modelos/musica.modelos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = signal<User | null>(null);

  constructor(private router: Router) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user.set(JSON.parse(savedUser));
    }
  }

  getUser() {
    return this.user.asReadonly();
  }

  login(email: string) {
    const user: User = { id: '1', email, name: email.split('@')[0] };
    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/playlists']);
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return !!this.user();
  }
}
