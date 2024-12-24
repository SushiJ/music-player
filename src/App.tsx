import { container, content, main } from "./App.css";

import { Navbar } from "./components/Navbar/Navbar";
import { Player } from "./components/Player/Player";

function App() {
  return (
    <div className={container}>
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
