import { createContext, useContext, useReducer } from "react";
import { audioReducer, initialState } from "../../feature/reducer";
import React from "react";
import type { AppAction, Song } from "../../utils/types";

type AudioContext = {
  song: Array<Song>[0];
  isPlaying: boolean;
  dispatch: React.Dispatch<AppAction>;
};

const AudioContext = createContext<AudioContext>(initialState);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(audioReducer, initialState);
  return (
    <AudioContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
