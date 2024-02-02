import { useMemo, useRef, useState } from "react";
import {
  ForwardIcon,
  BackwardIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

import Audio from "../Audio/Audio";
import { songData } from "../../utils/data";
import { controls, icon, playerContainer } from "./player.css";

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const data = useMemo(() => songData(), []);
  const initialSong = data[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(initialSong);

  function handlePlay() {
    if (!audioRef.current) return;
    if (isPlaying) return;
    audioRef.current.play();
    audioRef.current.volume = 0.05;
    setIsPlaying(true);
  }

  function handlePause() {
    if (!audioRef.current) return;
    if (!isPlaying) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }

  function handleSkip(direction: "back" | "forward") {
    if (!audioRef.current) return;
    let currIndx = data.findIndex((song) => song.id === currentSong.id);

    if (direction === "forward") {
      setCurrentSong(data[(currIndx + 1) % data.length]);
    }

    if (direction === "back") {
      if (currIndx % data.length === 0) {
        setCurrentSong(data[data.length - 1]);
      } else {
        setCurrentSong(data[currIndx - 1]);
      }
    }
  }

  return (
    <div className={playerContainer}>
      <Audio
        ref={audioRef}
        src={currentSong.audio}
        songName={currentSong.name}
        artist={currentSong.artist}
      />
      {/*
      <div className={rangeSlider}>
        <input
          type="range"
          min={isPlaying ? audioRef.current?.currentTime : "0.00"}
          max=""
        />
        <p></p>
      </div>
      */}
      <div className={controls}>
        <BackwardIcon className={icon} onClick={() => handleSkip("back")} />
        {!isPlaying ? (
          <PlayIcon className={icon} onClick={handlePlay} />
        ) : (
          <PauseIcon className={icon} onClick={handlePause} />
        )}
        <ForwardIcon className={icon} onClick={() => handleSkip("forward")} />
      </div>
    </div>
  );
}
