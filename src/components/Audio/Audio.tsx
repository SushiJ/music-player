import { forwardRef } from "react";

type Props = {
  onLoadedData: (e: React.ChangeEvent<HTMLAudioElement>) => void;
  onTimeUpdate: (e: React.ChangeEvent<HTMLAudioElement>) => void;
};

const Audio = forwardRef<HTMLAudioElement, Props>(
  function AudioForwardRef(props, AudioRef) {
    return (
      <div>
        <audio
          ref={AudioRef}
          preload="metadata"
          onLoadedData={props.onLoadedData}
          ontimeupdate={props.onTimeUpdate}
        />
      </div>
    );
  },
);

export default Audio;
