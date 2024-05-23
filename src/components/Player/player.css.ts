import { style } from "@vanilla-extract/css";

export const icon = style({
  height: 40,
  width: 40,
  cursor: "pointer",
  padding: 1,
  margin: 1,
});

export const playerContainer = style({
  padding: "20px",
  borderRadius: "20px",
});

export const controls = style({
  display: "flex",
});

export const rightSide = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "white",
});

export const imageBox = style({});

export const rangeSlider = style({
  display: "flex",
  padding: "1rem 0",
});

export const slider = style({
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  fontStyle: "italic",
  // "input[type='range']": {
  //   appearance: "none",
  //   WebkitAppearance: "none",
  //   width: "100%",
  //   cursor: "pointer",
  //   backgroundColor: "#ccc",
  // },
});
