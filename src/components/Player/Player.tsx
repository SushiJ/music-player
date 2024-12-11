import { useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SpeakerSimpleHigh,
  SpeakerSimpleX,
} from "@phosphor-icons/react";

import {
  controls,
  icon,
  imageBox,
  playerCard,
  playerContainer,
  rightSide,
  seek,
  volumeSlider,
} from "./player.css";
import { useAudioContext } from "../../hooks/AudioContext/AudioContext";

import Audio from "../Audio/Audio";

// TODO:
// 1. Clean this up a bit (maybe?)
// 2. need to do style of the input elements and such
// 3. change VolumeIcon on change of volume

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const { song, dispatch, isPlaying } = useAudioContext();

  useEffect(() => {
    if (!audioRef.current) {
      throw new Error("Audio ref 404");
    }
    audioRef.current.src = song.audio;
    audioRef.current.volume = volume;
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

  function handleSongDrag(e: React.ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = e.target.valueAsNumber;
    setCurrentTime(e.target.valueAsNumber);
  }

  function handleTimeUpdate(e: React.ChangeEvent<HTMLAudioElement>) {
    setCurrentTime(e.target.currentTime);
  }

  function handleDataLoaded(e: React.ChangeEvent<HTMLAudioElement>) {
    setDuration(e.target.duration);
  }

  function handleSkip(direction: "SKIP_BACKWARDS" | "SKIP_FORWARDS") {
    if (direction === "SKIP_BACKWARDS") {
      dispatch({ type: "SKIP_BACKWARDS" });
    }
    if (direction === "SKIP_FORWARDS") {
      dispatch({ type: "SKIP_FORWARDS" });
    }
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 200);
    }
  }

  function handleOnEnded() {
    dispatch({ type: "SKIP_FORWARDS" });
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 200);
    }
  }

  //
  function getTime(time: number) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  return (
    <div className={playerContainer}>
      <div
        className={playerCard}
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
            <SkipBack
              className={icon}
              onClick={() => handleSkip("SKIP_BACKWARDS")}
            />
            {!isPlaying ? (
              <Play className={icon} onClick={handlePlay} />
            ) : (
              <Pause className={icon} onClick={handlePause} />
            )}
            <SkipForward
              className={icon}
              onClick={() => handleSkip("SKIP_FORWARDS")}
            />
          </div>
          <div className={seek}>
            <p>{getTime(currentTime)}</p>
            <input
              value={currentTime}
              type="range"
              max={duration.toString()}
              min={0}
              onChange={handleSongDrag}
            />
            <p>{getTime(duration)}</p>
          </div>
          <div className={volumeSlider}>
            {!muted ? (
              <span
                onClick={() => {
                  setMuted(!muted);
                  setVolume(0);
                }}
              >
                <SpeakerSimpleHigh className={icon} />
              </span>
            ) : (
              <span
                onClick={() => {
                  setMuted(!muted);
                  setVolume(1);
                }}
              >
                <SpeakerSimpleX className={icon} />
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
          onEnded={handleOnEnded}
        />
      </div>
    </div>
  );
}
