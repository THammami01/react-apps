import * as _ from "./action-types";

export const startLoading = (payload) => {
  return {
    type: _.START_LOADING,
    payload: payload,
  };
};

export const stopLoading = (payload) => {
  return {
    type: _.STOP_LOADING,
    payload: payload,
  };
};

export const setAccessToken = (payload) => {
  return {
    type: _.SET_ACCESS_TOKEN,
    payload: payload,
  };
};

export const removeAccessToken = (payload) => {
  return {
    type: _.REMOVE_ACCESS_TOKEN,
    payload: payload,
  };
};

export const setConnectedUser = (payload) => {
  return {
    type: _.SET_CONNECTED_USER,
    payload: payload,
  };
};

export const removeConnectedUser = (payload) => {
  return {
    type: _.REMOVE_CONNECTED_USER,
    payload: payload,
  };
};

export const setTheme = (payload) => {
  return {
    type: _.SET_THEME,
    payload: payload,
  };
};
