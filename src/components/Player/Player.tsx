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
import {
  controls,
  icon,
  imageBox,
  playerContainer,
  rightSide,
  slider,
} from "./player.css";
import { useAudio } from "../../hooks/AudioContext/AudioContext";

// style: https://www.behance.net/gallery/122277499/Web-Music-Player-UI?tracking_source=search_projects|web+music+player+ui&l=67
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
      <div className={imageBox}>
        <img
          style={{ width: "20rem", borderRadius: "1rem" }}
          src={song.cover}
        />
      </div>
      <div className={rightSide}>
        <h1>{song.name}</h1>
        <h4>{song.artist}</h4>
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
          <p>{(volume * 100).toFixed(0) + "%"}</p>
        </div>
      </div>
      {/* <input */}
      {/*   value={audioRef.current?.currentTime} */}
      {/*   type="range" */}
      {/*   min={0} */}
      {/*   max={10} */}
      {/*   onChange={() => {}} */}
      {/* /> */}
      <Audio ref={audioRef} />
    </div>
  );
}
