import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../../core/servicios/musica.servicio';
import { Track, Playlist } from '../../../core/modelos/musica.modelos';

import { TrackListComponent } from '../../../shared/components/lista-canciones/lista-canciones.component';

import { PlayerService } from '../../../core/servicios/reproductor.servicio';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule, TrackListComponent],
  templateUrl: './detalle-lista.component.html',
  styleUrl: './detalle-lista.component.scss'
})
export class PlaylistDetailComponent {
  playlist = signal<Playlist | undefined>(undefined);
  searchResults = signal<Track[]>([]);
  searchQuery = '';
  
  currentTrack = this.playerService.currentTrack;
  isPlaying = this.playerService.isPlaying;

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private playerService: PlayerService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    effect(() => {
      this.playlist.set(this.musicService.getPlaylists()().find((p: any) => p.id === id));
    }, { allowSignalWrites: true });
  }

  search() {
    if (this.searchQuery) {
      this.musicService.searchTracks(this.searchQuery).subscribe(tracks => {
        this.searchResults.set(tracks);
      });
    }
  }

  addTrack(track: Track) {
    if (this.playlist()) {
      this.musicService.addTrackToPlaylist(this.playlist()!.id, track);
    }
  }

  removeTrack(trackId: string) {
    if (this.playlist()) {
      this.musicService.removeTrackFromPlaylist(this.playlist()!.id, trackId);
    }
  }

  togglePlay(track: Track) {
    this.playerService.togglePlay(track);
  }
}
