import { globalStyle, keyframes, style } from "@vanilla-extract/css";

export const playerContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
  height: "100%",
});

export const cardSmall = style({
  padding: "20px",
  borderRadius: "20px",
});

export const icon = style({
  height: 28,
  width: 28,
  cursor: "pointer",
  margin: "0 0.25rem",
});

export const imageBox = style({
  position: "relative",
});

globalStyle(`${imageBox} > button`, {
  position: "absolute",
  bottom: 0,
  right: 0,
  background: "none",
  border: "none",
  color: "white",
  padding: "0.5rem 0.5rem",
  cursor: "pointer",
  transition: "scale 0.15s ease",
});

globalStyle(`${imageBox} > button:hover`, {
  scale: "1.2",
});

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
    background: "#e5e5e5",
  },
);

globalStyle(
  `${volumeSlider} > input::-webkit-slider-runnable-track, input::-moz-range-track`,
  {
    background: "#e5e5e5",
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
    background: "#e5e5e5",
    marginLeft: "12px",
  },
);

globalStyle(`${seek} > p:first-of-type, p`, {
  marginLeft: "6px",
  marginRight: "6px",
});

const shimmer = keyframes({
  "0%": {
    background: "rgba(255, 255, 255, 0)",
  },
  "50%": {
    background: "rgba(255, 255, 255, 0.3)",
  },
  "100%": {
    background: "rgba(255, 255, 255, 0)",
  },
});

export const skeleton = style({
  height: "25rem",
  width: "25rem",
  animation: `${shimmer} 2.5s infinite`,
  borderRadius: "0.5rem",
  boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
});

export const ImageBoxLarge = style({
  alignSelf: "center",
  position: "relative",
});

globalStyle(`${ImageBoxLarge} > img`, {
  boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
  borderRadius: "0.5rem",
  maxHeight: "400px",
});

globalStyle(`${ImageBoxLarge} > button`, {
  position: "absolute",
  bottom: 0,
  right: 0,
  padding: "0.5rem 0.5rem",
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  transition: "scale 0.15s ease",
});

globalStyle(`${ImageBoxLarge} > button:hover`, {
  scale: ".9",
});
