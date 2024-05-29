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
  const { song } = useAudioContext();

  if (song.id === props.id) {
    return (
      <li className={toggle ? activeSongLarge : activeSongSmall}>
        <img src={props.cover} />
        <p>{props.name}</p>
        <p>{props.artist}</p>
      </li>
    );
  }

  return (
    <li className={toggle ? li : smallSize}>
      <img src={props.cover} />
      <p>{props.name}</p>
      <p>{props.artist}</p>
    </li>
  );
}
