import { useAudioContext } from "../../hooks/AudioContext/AudioContext";
import { useLibraryContext } from "../../hooks/LibraryContext";
import {
  activeSongLarge,
  activeSongSmall,
  SongLarge,
  SongSmall,
} from "./Card.css";

type Props = {
  name: string;
  cover: string;
  artist: string;
  id: number;
};

export function Card(props: Props) {
  const { toggle } = useLibraryContext();
  const { song, dispatch, isPlaying } = useAudioContext();

  function handleClick(id: number) {
    // TODO: make it play when we click to change the song need to think about this
    dispatch({ type: "PLAY_BY_ID", payload: { id } });
  }

  if (song.id === props.id) {
    return (
      <li
        className={toggle ? activeSongLarge : activeSongSmall}
        style={{
          background: `radial-gradient(circle, ${song.color[0]} 0%, ${song.color[1]} 100%)`,
        }}
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
      className={toggle ? SongLarge : SongSmall}
      onClick={() => handleClick(props.id)}
    >
      <img src={props.cover} />
      <p>{props.name}</p>
      <p>{props.artist}</p>
    </li>
  );
}
