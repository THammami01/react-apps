import * as _ from "../actions/action-types";

const initialState = {
  accessToken: "",
  connectedUser: null,
  theme: "light",
};

const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case _.SET_ACCESS_TOKEN:
      return { ...state, accessToken: payload };

    case _.REMOVE_ACCESS_TOKEN:
      return { ...state, accessToken: "" };

    case _.SET_CONNECTED_USER:
      return {
        ...state,
        connectedUser: payload,
      };

    case _.REMOVE_CONNECTED_USER:
      return { ...state, connectedUser: null };

    case _.SET_THEME:
      return { ...state, theme: payload };

    default:
      return state;
  }
};

export default globalReducer;
