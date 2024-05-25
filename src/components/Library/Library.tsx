import { songList } from "../../utils/data";
import Card from "../Card/Card";
import { listContainer, ul } from "./Library.css";

export function Library() {
  return (
    <aside className={listContainer}>
      <ul className={ul}>
        {songList.map((song) => (
          <Card
            key={song.id}
            name={song.name}
            cover={song.cover}
            artist={song.artist}
          />
        ))}
      </ul>
    </aside>
  );
}
