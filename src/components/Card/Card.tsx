import { li, smallSize } from "./Card.css";

type Props = {
  name: string;
  cover: string;
  artist: string;
};

export function Card(props: Props) {
  return (
    <li className={li}>
      <img src={props.cover} />
      <p>{props.name}</p>
      <p>{props.artist}</p>
    </li>
  );
}

export function CardSmall(props: Props) {
  return (
    <li className={smallSize}>
      <img src={props.cover} />
      {/* <p>{props.name}</p> */}
      {/* <p>{props.artist}</p> */}
    </li>
  );
}
