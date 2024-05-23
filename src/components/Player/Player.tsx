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

// TODO: Clean this up a bit and make the currentTime & remainingTime reactive,
// Also need to do style of the input elements and such

// style: https://www.behance.net/gallery/122277499/Web-Music-Player-UI?tracking_source=search_projects|web+music+player+ui&l=67
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
    console.log("USE_EFFECT_RAN");
  }, [song.audio]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  function handlePlay() {
    dispatch({ type: "PLAY" });
    audioRef.current?.play();
  }

  function handlePause() {
    audioRef.current?.pause();
    dispatch({ type: "PAUSE" });
  }

  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    setMuted(false);
    setVolume(e.target.valueAsNumber);
  }

  const handleSongDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = e.target.valueAsNumber;
    setCurrentTime(e.target.valueAsNumber);
  };

  const timeUpdateHandler = (e: React.ChangeEvent<HTMLAudioElement>) => {
    setDuration(e.target.duration);
  };

  function getTime(time: number) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  function getDifference(duration: number, currentTime: number) {
    const difference = duration - currentTime;
    return getTime(difference);
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
        <p>{getTime(currentTime)}</p>
        <input
          value={currentTime}
          type="range"
          max={duration}
          min={0}
          onChange={handleSongDrag}
        />
        <p>{"-" + getDifference(duration, currentTime)}</p>
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
      <Audio
        ref={audioRef}
        onLoadedData={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
      />
    </div>
  );
}
