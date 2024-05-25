import { li } from "./Card.css";

type Props = {
  name: string;
  cover: string;
  artist: string;
};

export default function Card(props: Props) {
  return (
    <li className={li}>
      <img src={props.cover} />
      <p>{props.name}</p>
      <p>{props.artist}</p>
    </li>
  );
}
