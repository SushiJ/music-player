export type Song = {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: Array<string>;
  id: number;
  active: boolean;
};

export type AppState = {
  song: Song;
  isPlaying: boolean;
};

export type AppAction =
  | { type: "SKIP_FORWARDS" }
  | { type: "SKIP_BACKWARDS" }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "PLAY_BY_ID"; payload: { id: number } };
