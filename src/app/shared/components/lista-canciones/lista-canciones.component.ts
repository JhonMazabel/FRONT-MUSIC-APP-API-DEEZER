import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Track } from '../../../core/modelos/musica.modelos';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './lista-canciones.component.html',
  styleUrl: './lista-canciones.component.scss'
})
export class TrackListComponent {
  @Input() tracks: Track[] = [];
  @Input() currentTrackId?: string;
  @Input() isPlaying = false;
  
  @Output() onTogglePlay = new EventEmitter<Track>();
  @Output() onRemove = new EventEmitter<string>();

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
