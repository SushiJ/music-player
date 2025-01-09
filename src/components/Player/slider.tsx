import { SpeakerSimpleHigh, SpeakerSimpleX } from "@phosphor-icons/react";

import { icon, seek, volumeSlider } from "./player.css";
import { usePlayerContext } from "../../hooks/PlayerContext";

import { Text } from "./text";

function getTime(time: number) {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

export function TrackSlider(props: {
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

export function VolumeSlider() {
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
