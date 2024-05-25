import { style } from "@vanilla-extract/css";

export const listContainer = style({
  overflowY: "auto",
  position: "absolute",
  height: "100%",
  left: "-100%",
});

export const listContainerActive = style({
  overflowY: "auto",
  position: "absolute",
  height: "100%",
  left: "0",
});

export const ul = style({
  overflowY: "auto",
});
