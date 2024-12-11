import { globalStyle, style } from "@vanilla-extract/css";

export const listContainer = style({
  overflowY: "auto",
  zIndex: "1",
});

export const listContainerSmall = style({
  overflowY: "auto",
  zIndex: "1",
});

export const list = style({
  "@media": {
    "screen and (max-width: 1024px)": {
      position: "sticky",
      bottom: "0",
      display: "flex",
      overflowX: "auto",
    },
  },
});

globalStyle(`${list} > li `, {
  "@media": {
    "screen and (max-width: 1024px)": {
      marginLeft: "0.5rem",
      marginRight: "0.5rem",
    },
  },
});
