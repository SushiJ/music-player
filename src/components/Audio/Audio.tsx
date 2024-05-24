import { forwardRef } from "react";

type Props = {
  onLoadedData: (e: React.ChangeEvent<HTMLAudioElement>) => void;
  onTimeUpdate: (e: React.ChangeEvent<HTMLAudioElement>) => void;
  onSeek: (e: React.ChangeEvent<HTMLAudioElement>) => void;
  onEnded: () => void;
};

const Audio = forwardRef<HTMLAudioElement, Props>(
  function AudioForwardRef(props, AudioRef) {
    return (
      <div>
        <audio
          ref={AudioRef}
          preload="metadata"
          onLoadedData={props.onLoadedData}
          onTimeUpdate={props.onTimeUpdate}
          onSeeking={props.onSeek}
          onEnded={props.onEnded}
        />
      </div>
    );
  },
);

export default Audio;
