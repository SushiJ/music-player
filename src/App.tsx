import { container } from "./App.css";
import { Library } from "./components/Library/Library";
// import { Navbar } from "./components/Navbar/Navbar";
import { Player } from "./components/Player/Player";
function App() {
  return (
    <div className={container}>
      {/* <Navbar /> */}
      {/* <Library /> */}
      <Player />
    </div>
  );
}

export default App;
