import { songList } from "../utils/data";
import { AppAction, AppState } from "../utils/types";

export const initialState = {
  song: songList[0],
  isPlaying: false,
  dispatch: () => {},
};

export function audioReducer(state: AppState, action: AppAction) {
  const currentSong = state.song;
  let currIndx = songList.findIndex((song) => song.id === currentSong.id);

  switch (action.type) {
    case "SKIP_FORWARDS": {
      return {
        ...state,
        song:
          songList.length === currIndx + 1
            ? songList[(currIndx + 1) % songList.length]
            : songList[currIndx + 1],
      };
    }
    case "SKIP_BACKWARDS": {
      return {
        ...state,
        song:
          currIndx % songList.length === 0
            ? songList[songList.length - 1]
            : songList[currIndx - 1],
      };
    }
    case "PLAY": {
      if (state.isPlaying) return state;
      return {
        ...state,
        isPlaying: true,
      };
    }
    case "PAUSE": {
      if (!state.isPlaying) return state;
      return {
        ...state,
        isPlaying: false,
      };
    }
    case "PLAY_BY_ID": {
      return {
        ...state,
        song: songList[action.payload.id],
      };
    }
    default:
      return state;
  }
}
