import * as _ from "../actions/action-types";

const initialState = {
  accessToken: "",
  connectedUser: null,
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
        connectedUser: {
          userId: payload.userId,
        },
      };

    case _.REMOVE_CONNECTED_USER:
      return { ...state, connectedUser: null };

    default:
      return state;
  }
};

export default globalReducer;
