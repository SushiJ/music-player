import { Fragment, useEffect, useRef, useState } from "react";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  CornersOut,
} from "@phosphor-icons/react";

import { useAudioContext } from "../../hooks/AudioContext/AudioContext";
import { usePlayerContext } from "../../hooks/PlayerContext";
import Audio from "../Audio/Audio";

import {
  icon,
  imageBox,
  cardSmall,
  skeleton,
  ImageBoxLarge,
} from "./player.css";

import {
  Container,
  FullscreenContainer,
  InteractiveInfoContainer as FullscreenContainerBody,
} from "../Layout/container";

import { TrackSlider, VolumeSlider } from "./slider";
import { CornersIn } from "@phosphor-icons/react/dist/ssr";

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    volume,
    duration,
    currentTime,
    fullScreen,
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
          <FullscreenContainerBody>
            <SongDetails name={song.name} artist={song.artist} />
            <InteractionButtons
              handlePause={handlePause}
              handleSkip={handleSkip}
              handlePlay={handlePause}
              isPlaying={isPlaying}
            />
            <TrackSlider
              handleDrag={handleSongDrag}
              currentTime={currentTime}
              duration={duration}
              color={song.color}
            />
            <VolumeSlider color={song.color} />
          </FullscreenContainerBody>
        </FullscreenContainer>
      ) : (
        <Container>
          <Card color={song.color}>
            <CardImage cover_url={song.cover} />
            <CardBody>
              <SongDetails artist={song.artist} name={song.name} />
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
                color={song.color}
              />
              <VolumeSlider color={song.color} />
            </CardBody>
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
  const { dispatch, fullScreen } = usePlayerContext();

  return (
    <div className={ImageBoxLarge}>
      <img src={props.cover_url} />
      <button onClick={() => dispatch({ type: "TOGGLE_FULLSCREN" })}>
        {fullScreen && <CornersIn size={24} />}
      </button>
    </div>
  );
}

function SongDetails(props: { name: string; artist: string }) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
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

function Card(props: { children: React.ReactNode; color: Array<string> }) {
  return (
    <div
      className={cardSmall}
      style={{
        background: `linear-gradient(145deg, ${props.color[0]}, ${props.color[1]})`,
      }}
    >
      {props.children}
    </div>
  );
}

function CardImage(props: { cover_url: string }) {
  const [isLoading, setIsLoading] = useState(true);

  const { dispatch, fullScreen } = usePlayerContext();

  function handleImageLoad() {
    setIsLoading(false);
  }

  return (
    <div className={imageBox}>
      {isLoading && <div className={skeleton} />}
      <img
        onLoad={handleImageLoad}
        src={props.cover_url}
        style={{ display: isLoading ? "none" : "block" }}
      />
      <button onClick={() => dispatch({ type: "TOGGLE_FULLSCREN" })}>
        {!fullScreen && <CornersOut size={24} />}
      </button>
    </div>
  );
}

function CardBody(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
}
