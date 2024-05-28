import { GithubLogo, TextOutdent, Waveform } from "@phosphor-icons/react";
import { TextIndent } from "@phosphor-icons/react/dist/ssr";
import { useLibraryContext } from "../../hooks/LibraryContext";
import { icon } from "./navbar.css";
import { navbar } from "./navbar.css";

export function Navbar() {
  const { toggle, setToggle } = useLibraryContext();

  return (
    <nav className={navbar}>
      {toggle ? (
        <TextOutdent className={icon} onClick={() => setToggle(!toggle)} />
      ) : (
        <TextIndent className={icon} onClick={() => setToggle(!toggle)} />
      )}
      <h1>
        <Waveform size={28} />
      </h1>
      <a href="https://github.com/SushiJ/music-player">
        <GithubLogo className={icon} />
      </a>
    </nav>
  );
}
