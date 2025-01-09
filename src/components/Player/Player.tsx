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
  rightSide,
  seek,
  volumeSlider,
} from "./player.css";

import {
  Container,
  FullscreenContainer,
  InteractiveInfoContainer,
} from "../Layout/container";
import { TrackSlider, VolumeSlider } from "./slider";
import { Text } from "./text";

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
        <Container>
          <Card color={song.color}>
            <CardImage cover_url={song.cover} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MetaData artist={song.artist} name={song.name} />
              <InteractionButtons
                isPlaying={isPlaying}
                handlePlay={handlePlay}
                handleSkip={handleSkip}
                handlePause={handlePause}
              />
              <TrackSlider
                handleDrag={handleSongDrag}
                currentTime={currentTime}
                duration={duration}
              />
              <VolumeSlider />
            </div>
          </Card>
        </Container>
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

function MetaData(props: { name: string; artist: string }) {
  return (
    <div>
      <h2>{props.name}</h2>
      <h4>{props.artist}</h4>
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

function CardImage(props: { cover_url: string }) {
  return (
    <div className={imageBox}>
      <img
        style={{ width: "20rem", borderRadius: "0.5rem" }}
        src={props.cover_url}
      />
    </div>
  );
}

function Card(props: { children: React.ReactNode; color: Array<string> }) {
  return (
    <div
      className={playerCard}
      style={{
        background: `linear-gradient(145deg, ${props.color[0]}, ${props.color[1]})`,
      }}
    >
      {props.children}
    </div>
  );
}
