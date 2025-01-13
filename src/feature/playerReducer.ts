type AppState = {
  volume: number;
  muted: boolean;
  duration: number;
  currentTime: number;
  fullScreen: boolean;
};

export type AppAction =
  | { type: "UPDATE_VOLUME"; payload: number }
  | { type: "UPDATE_DURATION"; payload: number }
  | { type: "TOGGLE_FULLSCREN" }
  | { type: "UPDATE_CURRENT_TIME"; payload: number }
  | { type: "TOGGLE_MUTE" }
  | { type: "SET_MUTE" }
  | { type: "SET_UNMUTE" };

export const initialState = {
  volume: 1,
  muted: false,
  duration: 0,
  currentTime: 0,
  fullScreen: false,
  dispatch: () => { },
};

export function playerReducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case "UPDATE_VOLUME": {
      return {
        ...state,
        volume: action.payload,
      };
    }

    case "TOGGLE_MUTE": {
      return {
        ...state,
        muted: !state.muted,
      };
    }

    case "UPDATE_DURATION": {
      return {
        ...state,
        duration: action.payload,
      };
    }

    case "TOGGLE_FULLSCREN": {
      return {
        ...state,
        fullScreen: !state.fullScreen,
      };
    }

    case "UPDATE_CURRENT_TIME": {
      return {
        ...state,
        currentTime: action.payload,
      };
    }

    case "SET_MUTE": {
      return {
        ...state,
        muted: true,
        volume: 0,
      };
    }

    case "SET_UNMUTE": {
      return {
        ...state,
        muted: false,
        volume: 1,
      };
    }

    case "TOGGLE_FULLSCREN": {
      return {
        ...state,
        fullScreen: !state.fullScreen,
      };
    }

    default:
      return state;
  }
}
