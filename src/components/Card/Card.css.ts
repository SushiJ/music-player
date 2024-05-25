import { globalStyle, style } from "@vanilla-extract/css";

export const li = style({
  listStyle: "none",
  margin: "2rem 0",
  cursor: "pointer",
});

globalStyle(`${li} > img `, {
  width: "12rem",
  borderRadius: ".25rem",
});

globalStyle(`${li} > p `, {
  color: "white",
  fontSize: "large",
});
