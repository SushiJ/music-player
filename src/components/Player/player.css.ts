import { style } from "@vanilla-extract/css";

export const icon = style({
  height: 40,
  width: 40,
  cursor: "pointer",
  padding: 1,
  margin: 1,
});
export const playerContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
})

export const rangeSlider = style({
  display: "flex",
  padding: "1rem 0"
})
export const controls = style({
  paddingTop: "0.5rem"
})
