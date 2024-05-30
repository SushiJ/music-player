import { globalStyle, style } from "@vanilla-extract/css";

export const activeSongLarge = style({
  listStyle: "none",
  margin: "2rem 0",
  cursor: "pointer",
  padding: "1rem 0",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  background: "rgba( 186, 8, 8, 0.1 )",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "10px",
});

globalStyle(`${activeSongLarge} > img `, {
  width: "8rem",
  borderRadius: ".25rem",
  WebkitTransition: "all 700ms",
  transition: "all 700ms",
});

globalStyle(`${activeSongLarge} > p `, {
  opacity: 1,
  WebkitTransition: "all 700ms",
  transition: "all 700ms",
});

export const activeSongSmall = style({
  listStyle: "none",
  margin: "2rem 0",
  cursor: "pointer",
  padding: "1rem",
  // maxWidth: "150px",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  fontSize: "1px",
  background: "rgba( 186, 8, 8, 0.1 )",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "10px",
  color: "black",
});

globalStyle(`${activeSongSmall} > img `, {
  width: "6rem",
  borderRadius: ".25rem",
  WebkitTransition: "all 700ms",
  transition: "all 700ms",
});

globalStyle(`${activeSongSmall} > p `, {
  opacity: 0,
  fontSize: "1px",
  WebkitTransition: "all 700ms",
  transition: "all 700ms",
});

export const smallSize = style({
  listStyle: "none",
  margin: "2rem 0",
  padding: "1rem",
  cursor: "pointer",
  maxWidth: "100px",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
});

globalStyle(`${smallSize} > img `, {
  width: "6rem",
  borderRadius: ".25rem",
  WebkitTransition: "all 700ms",
  transition: "all 700ms",
});

globalStyle(`${smallSize} > p `, {
  opacity: 0,
  fontSize: "1px",
  WebkitTransition: "all 700ms",
  transition: "all 700ms",
});

export const li = style({
  listStyle: "none",
  margin: "2rem 0",
  padding: "1rem",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
});

globalStyle(`${li} > img `, {
  width: "8rem",
  borderRadius: ".25rem",
  WebkitTransition: "all 700ms",
  transition: "all 700ms",
});

globalStyle(`${li} > p `, {
  opacity: 1,
  // fontSize: "large",
  WebkitTransition: "all 700ms",
  transition: "all 700ms",
});
