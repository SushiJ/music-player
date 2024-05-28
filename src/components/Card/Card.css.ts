import { globalStyle, style } from "@vanilla-extract/css";

export const li = style({
  listStyle: "none",
  margin: "2rem 0",
  cursor: "pointer",
  padding: "0 1rem 0 0",
});

globalStyle(`${li} > img `, {
  width: "8rem",
  borderRadius: ".25rem",
});

export const smallSize = style({
  listStyle: "none",
  margin: "2rem 0",
  cursor: "pointer",
  transition: "width 2s,  height 2s, rotate 2s",
});

globalStyle(`${smallSize} > img `, {
  width: "4rem",
  borderRadius: ".25rem",
});
