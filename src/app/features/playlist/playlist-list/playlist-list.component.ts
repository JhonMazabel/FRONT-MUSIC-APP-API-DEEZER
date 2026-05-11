import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../../core/services/music.service';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, DialogModule, InputTextModule, FormsModule],
  template: `
    <div class="p-5">
      <div class="flex justify-content-between align-items-center mb-4">
        <h1 class="m-0">Mis Listas de Reproducción</h1>
        <p-button label="Nueva Lista" icon="pi pi-plus" (onClick)="showDialog()"></p-button>
      </div>

      <div class="grid">
        @for (playlist of playlists(); track playlist.id) {
          <div class="col-12 md:col-6 lg:col-3">
            <p-card [header]="playlist.name" [subheader]="playlist.tracks.length + ' canciones'" styleClass="h-full hover:shadow-5 transition-all transition-duration-300">
              <p>{{ playlist.description }}</p>
              <ng-template pTemplate="footer">
                <div class="flex gap-2">
                  <p-button label="Ver Detalles" icon="pi pi-eye" [routerLink]="['/playlists', playlist.id]" severity="secondary"></p-button>
                  <p-button icon="pi pi-trash" severity="danger" (onClick)="deletePlaylist(playlist.id)"></p-button>
                </div>
              </ng-template>
            </p-card>
          </div>
        } @empty {
          <div class="col-12 text-center py-8">
            <i class="pi pi-folder-open text-6xl text-400 mb-3"></i>
            <p class="text-xl text-500">No tienes listas de reproducción aún.</p>
          </div>
        }
      </div>

      <p-dialog header="Crear Nueva Lista" [(visible)]="display" [modal]="true" [style]="{width: '450px'}" [draggable]="false" [resizable]="false">
        <div class="flex flex-column gap-3 pt-3">
          <div class="flex flex-column gap-2">
            <label for="name">Nombre</label>
            <input pInputText id="name" [(ngModel)]="newName" />
          </div>
          <div class="flex flex-column gap-2">
            <label for="desc">Descripción</label>
            <input pInputText id="desc" [(ngModel)]="newDesc" />
          </div>
        </div>
        <ng-template pTemplate="footer">
          <p-button label="Cancelar" icon="pi pi-times" (onClick)="display=false" severity="secondary" [text]="true"></p-button>
          <p-button label="Guardar" icon="pi pi-check" (onClick)="savePlaylist()" [disabled]="!newName"></p-button>
        </ng-template>
      </p-dialog>
    </div>
  `
})
export class PlaylistListComponent {
  playlists = this.musicService.getPlaylists();
  display = false;
  newName = '';
  newDesc = '';

  constructor(private musicService: MusicService) {}

  showDialog() {
    this.display = true;
    this.newName = '';
    this.newDesc = '';
  }

  savePlaylist() {
    if (this.newName) {
      this.musicService.createPlaylist(this.newName, this.newDesc);
      this.display = false;
    }
  }

  deletePlaylist(id: string) {
    this.musicService.deletePlaylist(id);
  }
}
