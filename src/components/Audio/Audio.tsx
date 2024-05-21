import { forwardRef } from "react";

const Audio = forwardRef<HTMLAudioElement>(
  function AudioForwardRef(_, AudioRef) {
    return (
      <div>
        <audio ref={AudioRef} preload="metadata" />
      </div>
    );
  },
);

export default Audio;
