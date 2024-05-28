import { style } from "@vanilla-extract/css";

export const container = style({
  height: "100vh",
  width: "100vw",
  backgroundColor: "#010101",
});

export const content = style({
  height: "100%",
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  maxWidth: "768px",
  margin: "0 auto",
  padding: "0 2rem",
});

export const main = style({
  height: "inherit",
  width: "inherit",
  display: "flex",
  overflowY: "auto",
});
