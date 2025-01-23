import { createContext, useContext, useReducer } from "react";
import React from "react";
import {
    type AppAction,
    initialState,
    playerReducer,
} from "../feature/playerReducer";

type PlayerContext = {
    volume: number;
    muted: boolean;
    duration: number;
    currentTime: number;
    fullScreen: boolean;
    dispatch: React.Dispatch<AppAction>;
};

const PlayerContext = createContext<PlayerContext>(initialState);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(playerReducer, initialState);

    return (
        <PlayerContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => useContext(PlayerContext);
