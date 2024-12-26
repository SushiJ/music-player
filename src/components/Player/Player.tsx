import { Fragment, useEffect, useRef } from "react";
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

import Audio from "../Audio/Audio";

import { useAudioContext } from "../../hooks/AudioContext/AudioContext";
import { usePlayerContext } from "../../hooks/PlayerContext";

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    volume,
    duration,
    currentTime,
    fullScreen,
    muted,
    dispatch: playerDispatch,
  } = usePlayerContext();

  const { song, dispatch: audioDispatch, isPlaying } = useAudioContext();

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
    audioDispatch({ type: "PLAY" });
    audioRef.current.play();
  }

  function handlePause() {
    if (!audioRef.current) return;
    audioDispatch({ type: "PAUSE" });
    audioRef.current.pause();
  }

  function handleChangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    playerDispatch({ type: "TOGGLE_MUTE" });
    playerDispatch({ type: "UPDATE_VOLUME", payload: e.target.valueAsNumber });
  }

  function handleSongDrag(e: React.ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = e.target.valueAsNumber;
    playerDispatch({
      type: "UPDATE_CURRENT_TIME",
      payload: e.target.valueAsNumber,
    });
  }

  function handleTimeUpdate(e: React.ChangeEvent<HTMLAudioElement>) {
    playerDispatch({
      type: "UPDATE_CURRENT_TIME",
      payload: e.target.currentTime,
    });
  }

  function handleDataLoaded(e: React.ChangeEvent<HTMLAudioElement>) {
    playerDispatch({ type: "UPDATE_DURATION", payload: e.target.duration });
  }

  function handleSkip(direction: "SKIP_BACKWARDS" | "SKIP_FORWARDS") {
    if (direction === "SKIP_BACKWARDS") {
      audioDispatch({ type: "SKIP_BACKWARDS" });
    }
    if (direction === "SKIP_FORWARDS") {
      audioDispatch({ type: "SKIP_FORWARDS" });
    }
    if (isPlaying) {
      setTimeout(() => audioRef.current?.play(), 200);
    }
  }

  function handleOnEnded() {
    audioDispatch({ type: "SKIP_FORWARDS" });
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
    <Fragment>
      {fullScreen ? (
        <div style={{ width: "100%", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              bottom: "30%",
              display: "flex",
            }}
          >
            <img
              style={{
                width: "10rem",
                borderRadius: "0.5rem",
              }}
              src={song.cover}
            />
            <div
              style={{
                marginTop: "auto",
              }}
            >
              <p>{song.name}</p>
              <p>{song.artist}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              bottom: "6rem",
              left: "0",
            }}
          >
            <div
              style={{ display: "flex", width: "100%", marginBottom: "2rem" }}
            >
              <p>{getTime(currentTime)}</p>
              <input
                value={currentTime}
                type="range"
                max={duration.toString()}
                min={0}
                onChange={handleSongDrag}
                style={{ width: "100%" }}
              />
              <p>{getTime(duration)}</p>
            </div>
            <div className="">
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
          </div>
        </div>
      ) : (
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
                      playerDispatch({ type: "SET_MUTE" });
                    }}
                  >
                    <SpeakerSimpleHigh className={icon} />
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      playerDispatch({ type: "SET_UNMUTE" });
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
          </div>
        </div>
      )}
      <Audio
        ref={audioRef}
        onLoadedData={handleDataLoaded}
        onTimeUpdate={handleTimeUpdate}
        onSeek={handleTimeUpdate}
        onEnded={handleOnEnded}
      />
    </Fragment>
  );
}
