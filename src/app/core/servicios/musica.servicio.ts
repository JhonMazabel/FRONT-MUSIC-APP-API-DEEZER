import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track, Playlist } from '../modelos/musica.modelos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly baseUrl = '/deezer-api/search';
  private readonly STORAGE_KEY = 'music_app_playlists';

  private playlists = signal<Playlist[]>(this.loadPlaylists());

  constructor(private http: HttpClient) {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.playlists()));
    });
  }

  private loadPlaylists(): Playlist[] {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: 'Mis Favoritas',
        description: 'Las mejores canciones para programar',
        tracks: [],
        createdAt: new Date()
      }
    ];
  }

  getPlaylists() {
    return this.playlists.asReadonly();
  }

  createPlaylist(name: string, description: string) {
    const newPlaylist: Playlist = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      tracks: [],
      createdAt: new Date()
    };
    this.playlists.update(p => [...p, newPlaylist]);
  }

  deletePlaylist(id: string) {
    this.playlists.update(p => p.filter(pl => pl.id !== id));
  }

  updatePlaylist(id: string, name: string, description: string) {
    this.playlists.update(playlists => playlists.map(p => 
      p.id === id ? { ...p, name, description } : p
    ));
  }

  addTrackToPlaylist(playlistId: string, track: Track) {
    this.playlists.update(playlists => playlists.map(p => 
      p.id === playlistId ? { ...p, tracks: [...p.tracks, track] } : p
    ));
  }

  removeTrackFromPlaylist(playlistId: string, trackId: string) {
    this.playlists.update(playlists => playlists.map(p => 
      p.id === playlistId ? { ...p, tracks: p.tracks.filter((t: any) => t.id !== trackId) } : p
    ));
  }

  searchTracks(query: string): Observable<Track[]> {
    return this.http.get<any>(`${this.baseUrl}?q=${query}`).pipe(
      map(res => res.data.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        artist: item.artist.name,
        duration: item.duration,
        albumArt: item.album.cover_medium,
        previewUrl: item.preview
      })))
    );
  }
}
