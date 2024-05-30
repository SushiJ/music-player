import { useAudioContext } from "../../hooks/AudioContext/AudioContext";
import { useLibraryContext } from "../../hooks/LibraryContext";
import { activeSongLarge, activeSongSmall, li, smallSize } from "./Card.css";

type Props = {
  name: string;
  cover: string;
  artist: string;
  id: number;
};

export function Card(props: Props) {
  const { toggle } = useLibraryContext();
  const { song, dispatch } = useAudioContext();

  function handleClick(id: number) {
    dispatch({ type: "PLAY_BY_ID", payload: { id } });
    // TODO: make it play when we click to change the song
    dispatch({ type: "PAUSE" });
    setTimeout(() => dispatch({ type: "PLAY" }), 800);
  }

  if (song.id === props.id) {
    return (
      <li
        className={toggle ? activeSongLarge : activeSongSmall}
        onClick={() => handleClick(props.id)}
      >
        <img src={props.cover} />
        <p>{props.name}</p>
        <p>{props.artist}</p>
      </li>
    );
  }

  return (
    <li
      className={toggle ? li : smallSize}
      onClick={() => handleClick(props.id)}
    >
      <img src={props.cover} />
      <p>{props.name}</p>
      <p>{props.artist}</p>
    </li>
  );
}
