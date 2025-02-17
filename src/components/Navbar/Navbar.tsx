import { GithubLogo, Waveform } from "@phosphor-icons/react";
import { usePlayerContext } from "../../hooks/PlayerContext";
import { icon } from "./navbar.css";
import { navbar } from "./navbar.css";

export function Navbar() {
  const { fullScreen } = usePlayerContext();

  if (fullScreen) return null;
  return (
    <nav className={navbar}>
      <h1>
        <Waveform size={28} />
      </h1>
      <a href="https://github.com/SushiJ/music-player" target="_blank">
        <GithubLogo className={icon} />
      </a>
    </nav>
  );
}
