import { container } from "./App.css";
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
