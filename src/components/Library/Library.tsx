import { useLibraryContext } from "../../hooks/LibraryContext";
import { songList } from "../../utils/data";
import { Card, CardSmall } from "../Card/Card";
import { listContainer, smallListContainer } from "./Library.css";

export function Library() {
  const { toggle } = useLibraryContext();
  return (
    <>
      {!toggle ? (
        <aside className={smallListContainer}>
          <ul>
            {songList.map((song) => (
              <CardSmall
                key={song.id}
                name={song.name}
                cover={song.cover}
                artist={song.artist}
              />
            ))}
          </ul>
        </aside>
      ) : null}
      {toggle ? (
        <aside className={listContainer}>
          <ul>
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
      ) : null}
    </>
  );
}
