export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  albumArt: string;
  previewUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
