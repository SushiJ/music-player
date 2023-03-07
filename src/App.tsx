import { useAtom } from "jotai";
import { useRef } from "react";
import { container } from "./App.css";
import { Library } from "./components/Library/Library";
import { Navbar } from "./components/Navbar/Navbar";
import { Player } from "./components/Player/Player";
import { Song } from "./components/Song/Song";
import { dataAtom } from "./store";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [useSongData, _setSongData] = useAtom(dataAtom);

  return (
    <div className={container}>
      <Navbar />
      <Song />
      <Library />
      <Player />
      <audio ref={audioRef} />
    </div>
  );
}
export default App;
