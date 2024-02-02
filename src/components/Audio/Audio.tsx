import { forwardRef } from "react";

type Props = {
  src: string;
  songName: string;
  artist: string;
};

const Audio = forwardRef<HTMLAudioElement, Props>(
  function AudioForwardRef(props, AudioRef) {
    return (
      <div>
        <div>{props.songName}</div>
        <div>{props.artist}</div>
        <audio src={props.src} ref={AudioRef} />
      </div>
    );
  },
);

export default Audio;
