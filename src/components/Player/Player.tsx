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

// TODO:
// 1. Clean this up a bit (maybe?)
// 2. need to do style of the input elements and such

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { song, dispatch, isPlaying } = useAudio();

  useEffect(() => {
    if (!audioRef.current) {
      throw new Error("Audio ref 404");
    }
    audioRef.current.src = song.audio;
    audioRef.current.volume = 1;
  }, [song.audio]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  // Handlers
  function handlePlay() {
    if (!audioRef.current) return;
    dispatch({ type: "PLAY" });
    audioRef.current.play();
  }

  function handlePause() {
    if (!audioRef.current) return;
    dispatch({ type: "PAUSE" });
    audioRef.current.pause();
  }

  function handleChangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    setMuted(false);
    setVolume(e.target.valueAsNumber);
  }

  const handleSongDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = e.target.valueAsNumber;
    setCurrentTime(e.target.valueAsNumber);
  };

  const handleTimeUpdate = (e: React.ChangeEvent<HTMLAudioElement>) => {
    setCurrentTime(e.target.currentTime);
  };

  function handleDataLoaded(e: React.ChangeEvent<HTMLAudioElement>) {
    setDuration(e.target.duration);
  }

  //
  function getTime(time: number) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  function handleSkip(direction: "SKIP_BACKWARDS" | "SKIP_FORWARDS") {
    if (direction === "SKIP_BACKWARDS") {
      dispatch({ type: "SKIP_BACKWARDS" });
    }
    if (direction === "SKIP_FORWARDS") {
      dispatch({ type: "SKIP_FORWARDS" });
    }
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 400);
    }
  }

  return (
    <div
      className={playerContainer}
      style={{
        background: `linear-gradient(145deg, ${song.color[0]}, ${song.color[1]})`,
      }}
    >
      <div className={imageBox}>
        <img
          style={{ width: "20rem", borderRadius: "0.5rem" }}
          src={song.cover}
        />
      </div>
      <div className={rightSide}>
        <h1>{song.name}</h1>
        <h4>{song.artist}</h4>
        <div className={controls}>
          <BackwardIcon
            className={icon}
            onClick={() => handleSkip("SKIP_BACKWARDS")}
          />
          {!isPlaying ? (
            <PlayIcon className={icon} onClick={handlePlay} />
          ) : (
            <PauseIcon className={icon} onClick={handlePause} />
          )}
          <ForwardIcon
            className={icon}
            onClick={() => handleSkip("SKIP_FORWARDS")}
          />
        </div>
        <p>{getTime(currentTime)}</p>
        <input
          value={currentTime}
          type="range"
          max={duration.toString()}
          min={0}
          onChange={handleSongDrag}
        />
        <p>{getTime(duration)}</p>
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
            onChange={handleChangeVolume}
            value={volume}
            max="1"
            min="0"
            step="0.01"
            type="range"
          />
          <p>{(volume * 100).toFixed(0) + "%"}</p>
        </div>
      </div>
      <Audio
        ref={audioRef}
        onLoadedData={handleDataLoaded}
        onTimeUpdate={handleTimeUpdate}
        onSeek={handleTimeUpdate}
        onEnded={() => dispatch({ type: "SKIP_FORWARDS" })}
      />
    </div>
  );
}
