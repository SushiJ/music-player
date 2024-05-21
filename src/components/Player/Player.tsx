import { useEffect, useRef } from "react";
import {
  ForwardIcon,
  BackwardIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

import Audio from "../Audio/Audio";
import { controls, icon, playerContainer } from "./player.css";
import { useAudio } from "../../hooks/AudioContext/AudioContext";

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { song, dispatch, isPlaying } = useAudio();

  useEffect(() => {
    if (!audioRef.current) {
      throw new Error("Audio ref 404");
    }
    audioRef.current.src = song.audio;
    audioRef.current.volume = 1;
    console.log("USE_EFFECT_RAN");
  }, [song.audio]);

  return (
    <div className={playerContainer}>
      <pre>{JSON.stringify(song.id, null, 2)}</pre>
      <pre>{JSON.stringify(isPlaying, null, 2)}</pre>
      <img style={{ width: "10rem" }} src={song.cover} />
      <div>{song.name}</div>
      <div>{song.artist}</div>
      <div className={controls}>
        <BackwardIcon
          className={icon}
          onClick={() => dispatch({ type: "SKIP_BACKWARDS" })}
        />
        {!isPlaying ? (
          <PlayIcon
            className={icon}
            onClick={() => {
              dispatch({ type: "PLAY" });
              audioRef.current?.play();
            }}
          />
        ) : (
          <PauseIcon
            className={icon}
            onClick={() => {
              dispatch({ type: "PAUSE" });
              audioRef.current?.pause();
            }}
          />
        )}
        <ForwardIcon
          className={icon}
          onClick={() => dispatch({ type: "SKIP_FORWARDS" })}
        />
      </div>
      <Audio ref={audioRef} />
    </div>
  );
}
