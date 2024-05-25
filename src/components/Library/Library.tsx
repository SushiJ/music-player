// import { ListBulletIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { songList } from "../../utils/data";
import Card from "../Card/Card";
import { listContainer, listContainerActive, ul } from "./Library.css";

export function Library() {
  const [toggleSideDrawer, setToggleSideDrawer] = useState(false);
  return (
    <>
      <button
        style={{
          padding: ".25rem",
          position: "absolute",
          top: "1rem",
          left: toggleSideDrawer ? "15rem" : "1rem",
        }}
        onClick={() => setToggleSideDrawer(!toggleSideDrawer)}
      >
        Toggle
      </button>
      <aside className={toggleSideDrawer ? listContainerActive : listContainer}>
        {/* <button */}
        {/*   style={{ */}
        {/*     position: "absolute", */}
        {/*     right: "-50px", */}
        {/*     zIndex: "1", */}
        {/*     top: "1rem", */}
        {/*     width: "2rem", */}
        {/*     height: "2rem", */}
        {/*     color: "white", */}
        {/*     background: "none", */}
        {/*     border: "none", */}
        {/*   }} */}
        {/* > */}
        {/*   <ListBulletIcon /> */}
        {/* </button> */}
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
    </>
  );
}
