import { SpeakerSimpleHigh, SpeakerSimpleX } from "@phosphor-icons/react";

import { icon, seek, volumeSlider } from "./player.css";
import { usePlayerContext } from "../../hooks/PlayerContext";

import { Text } from "./text";

function getTime(time: number) {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
}

export function TrackSlider(props: {
  color: Array<string>;
  currentTime: number;
  duration: number;
  handleDrag: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const percentage = ((props.currentTime - 0) / (props.duration - 0)) * 100;

  return (
    <div className={seek}>
      <p>{getTime(props.currentTime)}</p>
      <input
        value={props.currentTime}
        type="range"
        max={props.duration.toString()}
        min={0}
        onChange={props.handleDrag}
        style={{
          width: "100%",
          background: `linear-gradient(to right, white 0%, ${props.color[0]} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          height: "2px",
        }}
      />
      <p>{getTime(props.duration)}</p>
    </div>
  );
}

export function VolumeSlider(props: { color: Array<string> }) {
  const { volume, muted, dispatch: playerDispatch } = usePlayerContext();

  function handleChangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
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
        style={{
          width: "100%",
          background: `linear-gradient(to right, #fff 0%, ${props.color[0]} ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
          height: "2px",
        }}
      />
      <Text str={(volume * 100).toFixed(0) + "%"} />
    </div>
  );
}
