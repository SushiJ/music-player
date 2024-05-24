import { globalStyle, style } from "@vanilla-extract/css";

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

export const volumeSlider = style({
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  fontStyle: "italic",
  width: "100%",
});

globalStyle(`${volumeSlider} > input`, {
  width: "100%",
  WebkitAppearance: "none",
  background: "transparent",
  cursor: "pointer",
});

globalStyle(
  `${volumeSlider} > input::-webkit-slider-runnable-track, input::-moz-range-track`,
  {
    background: "#043a5f",
  },
);

export const seek = style({
  display: "flex",
  width: "100%",
  alignItems: "center",
  padding: "1rem 0",
});

globalStyle(`${seek} > input`, {
  width: "100%",
  WebkitAppearance: "none",
  background: "transparent",
  cursor: "pointer",
});

globalStyle(
  `${seek} > input::-webkit-slider-runnable-track, input::-moz-range-track`,
  {
    background: "#043a5f",
    marginLeft: "12px",
  },
);

globalStyle(`${seek} > p:first-of-type, p`, {
  marginLeft: "6px",
  marginRight: "6px",
});
