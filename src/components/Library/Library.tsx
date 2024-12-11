import { useLibraryContext } from "../../hooks/LibraryContext";
import { songList } from "../../utils/data";
import { Card } from "../Card/Card";
import { list, listContainer, listContainerSmall } from "./Library.css";

export function Library() {
  const { toggle } = useLibraryContext();
  return (
    <>
      <aside className={toggle ? listContainer : listContainerSmall}>
        <ul className={list}>
          {songList.map((song) => (
            <Card
              id={song.id}
              key={song.id}
              name={song.name}
              cover={song.cover}
              artist={song.artist}
            />
          ))}
        </ul>
      </aside>
    </>
  );
}
