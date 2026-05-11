import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track, Playlist } from '../modelos/musica.modelos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track, Playlist } from '../modelos/musica.modelos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly baseUrl = '/deezer-api/search';
  private readonly STORAGE_KEY = 'music_app_playlists';

  private playlists = signal<Playlist[]>(this.loadPlaylists());

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.playlists()));
    });
  }

  // ... loadPlaylists ...

  createPlaylist(name: string, description: string) {
    const newPlaylist: Playlist = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      tracks: [],
      createdAt: new Date()
    };
    this.playlists.update(p => [...p, newPlaylist]);
    this.showSuccess('Lista creada', `"${name}" se añadió a tu biblioteca`);
  }

  deletePlaylist(id: string) {
    this.playlists.update(p => p.filter(pl => pl.id !== id));
    this.showSuccess('Lista eliminada', 'La lista se quitó de tu biblioteca');
  }

  updatePlaylist(id: string, name: string, description: string) {
    this.playlists.update(playlists => playlists.map(p => 
      p.id === id ? { ...p, name, description } : p
    ));
    this.showSuccess('Lista actualizada', 'Los cambios se guardaron con éxito');
  }

  addTrackToPlaylist(playlistId: string, track: Track) {
    this.playlists.update(playlists => playlists.map(p => 
      p.id === playlistId ? { ...p, tracks: [...p.tracks, track] } : p
    ));
    this.showSuccess('Canción añadida', `"${track.title}" se añadió a la lista`);
  }

  removeTrackFromPlaylist(playlistId: string, trackId: string) {
    this.playlists.update(playlists => playlists.map(p => 
      p.id === playlistId ? { ...p, tracks: p.tracks.filter((t: any) => t.id !== trackId) } : p
    ));
    this.showSuccess('Canción eliminada', 'Se quitó la canción de la lista');
  }

  private showSuccess(summary: string, detail: string) {
    this.messageService.add({ severity: 'success', summary, detail, life: 3000 });
  }

  // ... searchTracks ...
}
