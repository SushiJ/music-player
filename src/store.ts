import { atom } from "jotai";
import { songData } from "./utils/data";

export const dataAtom = atom(songData);
export const songInfoAtom = atom({
  currentTime: 0,
  duration: 0,
  animationPercentage: 0,
  volume: 0,
});
export const currentSongAtom = atom(songData()[0]);
export const libraryAtom = atom(false);
export const isPlayingAtom = atom(false);
