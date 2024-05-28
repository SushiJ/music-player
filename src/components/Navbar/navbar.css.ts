import { style } from "@vanilla-extract/css";

export const navbar = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "1rem 0rem",
});

export const icon = style({
  height: 28,
  width: 28,
  cursor: "pointer",
  margin: "0 0.25rem",
  color: "white",
});
