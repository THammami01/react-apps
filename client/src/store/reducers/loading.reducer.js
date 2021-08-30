import * as _ from "../actions/action-types";

const loadingReducer = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case _.START_LOADING:
      return true;

    case _.STOP_LOADING:
      return false;

    default:
      return state;
  }
};

export default loadingReducer;
