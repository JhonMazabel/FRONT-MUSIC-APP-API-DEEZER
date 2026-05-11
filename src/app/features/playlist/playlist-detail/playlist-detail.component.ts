import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../../core/services/music.service';
import { Track, Playlist } from '../../../core/models/music.models';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule],
  template: `
    <div class="p-5">
      @if (playlist()) {
        <div class="mb-5 flex align-items-end gap-4">
          <div class="surface-300 border-round w-15rem h-15rem flex align-items-center justify-content-center shadow-4">
            <i class="pi pi-music text-8xl text-600"></i>
          </div>
          <div>
            <span class="text-sm font-bold uppercase">Lista de reproducción</span>
            <h1 class="text-7xl m-0 font-bold">{{ playlist()?.name }}</h1>
            <p class="text-xl text-500 mt-2">{{ playlist()?.description }}</p>
          </div>
        </div>

        <div class="surface-card p-4 border-round shadow-2 mb-5">
          <h3>Buscar canciones para agregar</h3>
          <div class="flex gap-2 mb-4">
            <span class="p-input-icon-left flex-grow-1">
              <i class="pi pi-search"></i>
              <input pInputText type="text" [(ngModel)]="searchQuery" (keyup.enter)="search()" placeholder="Artista, canción..." class="w-full" />
            </span>
            <p-button label="Buscar" (onClick)="search()"></p-button>
          </div>

          @if (searchResults().length > 0) {
            <p-table [value]="searchResults()" [rows]="5" [paginator]="true" styleClass="p-datatable-sm">
              <ng-template pTemplate="header">
                <tr>
                  <th></th>
                  <th>Título</th>
                  <th>Artista</th>
                  <th>Acción</th>
                </tr>
              </ng-template>
              <ng-template pTemplate="body" let-track>
                <tr>
                  <td><img [src]="track.albumArt" width="40" class="border-round shadow-1" /></td>
                  <td>{{ track.title }}</td>
                  <td>{{ track.artist }}</td>
                  <td>
                    <p-button icon="pi pi-plus" [rounded]="true" [text]="true" (onClick)="addTrack(track)"></p-button>
                  </td>
                </tr>
              </ng-template>
            </p-table>
          }
        </div>

        <div class="surface-card p-0 border-round shadow-2 overflow-hidden">
          <p-table [value]="playlist()?.tracks || []" styleClass="p-datatable-striped">
            <ng-template pTemplate="header">
              <tr>
                <th style="width: 3rem">#</th>
                <th>Título</th>
                <th>Artista</th>
                <th style="width: 8rem">Duración</th>
                <th style="width: 8rem"></th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-track let-rowIndex="rowIndex">
              <tr class="cursor-pointer hover:surface-100 transition-colors transition-duration-150">
                <td>{{ rowIndex + 1 }}</td>
                <td>
                  <div class="flex align-items-center gap-3">
                    <img [src]="track.albumArt" width="40" class="border-round shadow-1" />
                    <span class="font-bold">{{ track.title }}</span>
                  </div>
                </td>
                <td>{{ track.artist }}</td>
                <td>{{ formatDuration(track.duration) }}</td>
                <td>
                  <div class="flex gap-2">
                    <p-button [icon]="currentTrack()?.id === track.id && isPlaying() ? 'pi pi-pause' : 'pi pi-play'" 
                              [rounded]="true" [text]="true" severity="success" (onClick)="togglePlay(track)"></p-button>
                    <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (onClick)="removeTrack(track.id)"></p-button>
                  </div>
                </td>
              </tr>
            </ng-template>
          </p-table>
          @if (!playlist()?.tracks?.length) {
            <div class="p-5 text-center text-500">
              Esta lista no tiene canciones. Agrega algunas arriba.
            </div>
          }
        </div>
      }
    </div>

    <!-- Mini reproductor flotante -->
    @if (currentTrack()) {
      <div class="fixed bottom-0 left-0 w-full surface-900 text-white p-3 flex align-items-center justify-content-between shadow-8 z-5 animation-duration-300 fadein">
        <div class="flex align-items-center gap-3 w-3">
          <img [src]="currentTrack()?.albumArt" width="56" class="border-round" />
          <div class="overflow-hidden">
            <div class="white-space-nowrap font-bold text-overflow-ellipsis">{{ currentTrack()?.title }}</div>
            <div class="text-400 text-sm">{{ currentTrack()?.artist }}</div>
          </div>
        </div>
        
        <div class="flex flex-column align-items-center gap-2 w-6">
          <div class="flex align-items-center gap-4">
             <p-button icon="pi pi-step-backward" [text]="true" styleClass="text-white"></p-button>
             <p-button [icon]="isPlaying() ? 'pi pi-pause' : 'pi pi-play'" [rounded]="true" severity="secondary" (onClick)="togglePlay(currentTrack()!)"></p-button>
             <p-button icon="pi pi-step-forward" [text]="true" styleClass="text-white"></p-button>
          </div>
          <div class="w-full flex align-items-center gap-2 px-8">
            <span class="text-xs text-400">0:00</span>
            <div class="flex-grow-1 surface-700 border-round h-1rem overflow-hidden">
              <div class="bg-primary h-full" [style.width.%]="isPlaying() ? 40 : 0"></div>
            </div>
            <span class="text-xs text-400">{{ formatDuration(currentTrack()?.duration || 0) }}</span>
          </div>
        </div>

        <div class="flex align-items-center justify-content-end gap-3 w-3">
          <i class="pi pi-volume-up"></i>
          <div class="w-8rem surface-700 border-round h-1rem">
             <div class="bg-white h-full w-6"></div>
          </div>
        </div>
      </div>
    }
  `
})
export class PlaylistDetailComponent {
  playlist = signal<Playlist | undefined>(undefined);
  searchResults = signal<Track[]>([]);
  searchQuery = '';
  
  currentTrack = signal<Track | null>(null);
  isPlaying = signal(false);
  audio = new Audio();

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    effect(() => {
      this.playlist.set(this.musicService.getPlaylists()().find(p => p.id === id));
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
    if (this.currentTrack()?.id === track.id) {
      if (this.isPlaying()) {
        this.audio.pause();
        this.isPlaying.set(false);
      } else {
        this.audio.play();
        this.isPlaying.set(true);
      }
    } else {
      this.currentTrack.set(track);
      this.audio.src = track.previewUrl;
      this.audio.load();
      this.audio.play();
      this.isPlaying.set(true);
    }
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
