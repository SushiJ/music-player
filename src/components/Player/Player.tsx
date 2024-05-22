import { useEffect, useRef, useState } from "react";
import {
  ForwardIcon,
  BackwardIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";

import Audio from "../Audio/Audio";
import { controls, icon, playerContainer, slider } from "./player.css";
import { useAudio } from "../../hooks/AudioContext/AudioContext";

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState<boolean>(false);

  const { song, dispatch, isPlaying } = useAudio();

  useEffect(() => {
    if (!audioRef.current) {
      throw new Error("Audio ref 404");
    }
    audioRef.current.src = song.audio;
    audioRef.current.volume = 1;
    console.log("USE_EFFECT_RAN");
  }, [song.audio]);

  function handlePlay() {
    dispatch({ type: "PLAY" });
    audioRef.current?.play();
  }
  function handlePause() {
    audioRef.current?.pause();
    dispatch({ type: "PAUSE" });
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMuted(false);
    setVolume(e.target.valueAsNumber);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

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
          <PlayIcon className={icon} onClick={handlePlay} />
        ) : (
          <PauseIcon className={icon} onClick={handlePause} />
        )}
        <ForwardIcon
          className={icon}
          onClick={() => dispatch({ type: "SKIP_FORWARDS" })}
        />
      </div>
      <Audio ref={audioRef} />
      {/* <input */}
      {/*   value={audioRef.current?.currentTime} */}
      {/*   type="range" */}
      {/*   min={0} */}
      {/*   max={10} */}
      {/*   onChange={() => {}} */}
      {/* /> */}
      <div className={slider}>
        {!muted ? (
          <span
            onClick={() => {
              setMuted(!muted);
              setVolume(0);
            }}
          >
            <SpeakerWaveIcon className={icon} />
          </span>
        ) : (
          <span
            onClick={() => {
              setMuted(!muted);
              setVolume(1);
            }}
          >
            <SpeakerXMarkIcon className={icon} />
          </span>
        )}
        <input
          onChange={changeVolume}
          value={volume}
          max="1"
          min="0"
          step="0.01"
          type="range"
        />
      </div>
      {(volume * 100).toFixed(0) + "%"}
    </div>
  );
}
