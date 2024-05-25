import { globalStyle, style } from "@vanilla-extract/css";

export const navbar = style({
  display: "flex",
  flexDirection: "row-reverse",
  top: "0",
  position: "absolute",
  paddingTop: "1rem",
});

globalStyle(`${navbar} > span`, {
  height: 40,
  width: 40,
  cursor: "pointer",
  padding: 1,
  margin: 1,
  color: "white",
});
