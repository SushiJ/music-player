import { useRef } from "react";
import { container, content, main } from "./App.css";

import { Library } from "./components/Library/Library";
import { Navbar } from "./components/Navbar/Navbar";
import { Player } from "./components/Player/Player";

function App() {
  return (
    <div className={container}>
      <div className={content}>
        <Navbar />
        <section className={main}>
          <Library />
          <Player />
        </section>
      </div>
    </div>
  );
}

export default App;
