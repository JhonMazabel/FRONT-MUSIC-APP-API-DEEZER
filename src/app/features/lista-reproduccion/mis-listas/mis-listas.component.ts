import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../../core/servicios/musica.servicio';

import { PlaylistCardComponent } from '../../../shared/components/tarjeta-lista/tarjeta-lista.component';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, DialogModule, InputTextModule, FormsModule, PlaylistCardComponent],
  templateUrl: './mis-listas.component.html',
  styleUrl: './mis-listas.component.scss'
})
export class PlaylistListComponent {

  playlists = this.musicService.getPlaylists();
  display = false;
  newName = '';
  newDesc = '';
  editingPlaylistId: string | null = null;

  constructor(private musicService: MusicService) {}

  showDialog() {
    this.editingPlaylistId = null;
    this.display = true;
    this.newName = '';
    this.newDesc = '';
  }

  editPlaylist(playlist: any) {
    this.editingPlaylistId = playlist.id;
    this.newName = playlist.name;
    this.newDesc = playlist.description;
    this.display = true;
  }

  savePlaylist() {
    if (this.newName) {
      if (this.editingPlaylistId) {
        this.musicService.updatePlaylist(this.editingPlaylistId, this.newName, this.newDesc);
      } else {
        this.musicService.createPlaylist(this.newName, this.newDesc);
      }
      this.display = false;
    }
  }

  deletePlaylist(id: string) {
    this.musicService.deletePlaylist(id);
  }
}
