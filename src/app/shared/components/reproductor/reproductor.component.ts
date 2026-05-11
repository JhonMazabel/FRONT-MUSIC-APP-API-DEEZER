import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PlayerService } from '../../../core/servicios/reproductor.servicio';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './reproductor.component.html',
  styleUrl: './reproductor.component.scss'
})
export class PlayerComponent {
  currentTrack = this.playerService.currentTrack;
  isPlaying = this.playerService.isPlaying;
  currentTime = this.playerService.currentTime;
  duration = this.playerService.duration;
  volume = this.playerService.volume;

  constructor(private playerService: PlayerService) {}

  togglePlay() {
    if (this.currentTrack()) {
      this.playerService.togglePlay(this.currentTrack()!);
    }
  }

  onSeek(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    this.playerService.seek(percentage * this.duration());
  }

  onVolumeChange(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const volume = Math.max(0, Math.min(1, x / rect.width));
    this.playerService.setVolume(volume);
  }

  formatTime(seconds: number): string {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
