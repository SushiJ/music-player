import { Fragment, useEffect, useRef } from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  SpeakerSimpleHigh,
  SpeakerSimpleX,
} from "@phosphor-icons/react";

import { useAudioContext } from "../../hooks/AudioContext/AudioContext";
import { usePlayerContext } from "../../hooks/PlayerContext";
import Audio from "../Audio/Audio";

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

function getTime(time: number) {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

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

  return (
    <Fragment>
      {fullScreen ? (
        <FullscreenContainer>
          <ImageBox cover_url={song.cover} />
          <InteractiveInfoContainer>
            <MetaData name={song.name} artist={song.artist} />
            <TrackSlider
              handleDrag={handleSongDrag}
              currentTime={currentTime}
              duration={duration}
            />
            <InteractionButtons
              handlePause={handlePause}
              handleSkip={handleSkip}
              handlePlay={handlePause}
              isPlaying={isPlaying}
            />
            <VolumeSlider />
          </InteractiveInfoContainer>
        </FullscreenContainer>
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

function ImageBox(props: { cover_url: string }) {
  return (
    <div style={{ alignSelf: "center" }}>
      <img
        style={{
          borderRadius: "0.5rem",
        }}
        src={props.cover_url}
      />
    </div>
  );
}

function FullscreenContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
}

function Text(props: { str: string }) {
  return <p>{props.str}</p>;
}

function MetaData(props: { name: string; artist: string }) {
  return (
    <div>
      <Text str={props.name} />
      <Text str={props.artist} />
    </div>
  );
}

function TrackSlider(props: {
  currentTime: number;
  duration: number;
  handleDrag: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={seek}>
      <p>{getTime(props.currentTime)}</p>
      <input
        value={props.currentTime}
        type="range"
        max={props.duration.toString()}
        min={0}
        onChange={props.handleDrag}
        style={{ width: "100%" }}
      />
      <p>{getTime(props.duration)}</p>
    </div>
  );
}

function InteractiveInfoContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
}

function InteractionButtons(props: {
  handleSkip: (direction: "SKIP_BACKWARDS" | "SKIP_FORWARDS") => void;
  handlePlay: () => void;
  handlePause: () => void;
  isPlaying: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SkipBack
        className={icon}
        onClick={() => props.handleSkip("SKIP_BACKWARDS")}
      />
      {!props.isPlaying ? (
        <Play className={icon} onClick={props.handlePlay} />
      ) : (
        <Pause className={icon} onClick={props.handlePause} />
      )}
      <SkipForward
        className={icon}
        onClick={() => props.handleSkip("SKIP_FORWARDS")}
      />
    </div>
  );
}

function VolumeSlider() {
  const { volume, muted, dispatch: playerDispatch } = usePlayerContext();

  function handleChangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    playerDispatch({ type: "TOGGLE_MUTE" });
    playerDispatch({ type: "UPDATE_VOLUME", payload: e.target.valueAsNumber });
  }

  return (
    <div className={volumeSlider}>
      {!muted ? (
        <span
          onClick={() => {
            playerDispatch({ type: "SET_MUTE" });
          }}
        >
          <SpeakerSimpleHigh
            className={icon}
            style={{ height: "16px", width: "16px" }}
          />
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
      <Text str={(volume * 100).toFixed(0) + "%"} />
    </div>
  );
}
