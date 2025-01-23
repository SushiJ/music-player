import { container, content, main } from "./App.css";

import { Navbar } from "./components/Navbar/Navbar";
import { Player } from "./components/Player/Player";
import { useAudioContext } from "./hooks/AudioContext/AudioContext";
import { usePlayerContext } from "./hooks/PlayerContext";

function App() {
  const { fullScreen } = usePlayerContext();
  const { song } = useAudioContext();

  return (
    <div
      className={container}
      style={{
        background: fullScreen
          ? `linear-gradient(145deg, ${song.color[0]}, ${song.color[1]})`
          : "#010101",
      }}
    >
      <div className={content}>
        <Navbar />
        <section className={main}>
          <Player />
        </section>
      </div>
    </div>
  );
}

export default App;
