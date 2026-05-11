import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Track, Playlist } from '../models/music.models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private readonly baseUrl = 'https://api.deezer.com/search';

  private playlists = signal<Playlist[]>([
    {
      id: '1',
      name: 'Mis Favoritas',
      description: 'Las mejores canciones para programar',
      tracks: [],
      createdAt: new Date()
    }
  ]);

  constructor(private http: HttpClient) {}

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

  addTrackToPlaylist(playlistId: string, track: Track) {
    this.playlists.update(playlists => playlists.map(p => 
      p.id === playlistId ? { ...p, tracks: [...p.tracks, track] } : p
    ));
  }

  removeTrackFromPlaylist(playlistId: string, trackId: string) {
    this.playlists.update(playlists => playlists.map(p => 
      p.id === playlistId ? { ...p, tracks: p.tracks.filter(t => t.id !== trackId) } : p
    ));
  }

  searchTracks(query: string): Observable<Track[]> {
    return this.http.get<any>(`https://api.allorigins.win/get?url=${encodeURIComponent(`${this.baseUrl}?q=${query}`)}`).pipe(
      map(res => JSON.parse(res.contents).data.map((item: any) => ({
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
