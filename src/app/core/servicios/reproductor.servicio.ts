import { Injectable, signal, effect } from '@angular/core';
import { Track } from '../models/musica.modelos';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio = new Audio();
  
  currentTrack = signal<Track | null>(null);
  isPlaying = signal(false);
  currentTime = signal(0);
  duration = signal(0);
  volume = signal(0.5);

  constructor() {
    this.audio.volume = this.volume();

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime.set(this.audio.currentTime);
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration.set(this.audio.duration);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying.set(false);
      this.currentTime.set(0);
    });
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

  setVolume(value: number) {
    this.volume.set(value);
    this.audio.volume = value;
  }

  seek(seconds: number) {
    this.audio.currentTime = seconds;
  }
}
