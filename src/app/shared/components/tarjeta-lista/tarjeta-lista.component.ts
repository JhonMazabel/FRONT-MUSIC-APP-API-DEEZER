import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Playlist } from '../../../core/modelos/musica.modelos';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './tarjeta-lista.component.html',
  styleUrl: './tarjeta-lista.component.scss'
})
export class PlaylistCardComponent {
  @Input({ required: true }) playlist!: Playlist;
  @Output() onDelete = new EventEmitter<string>();
}
