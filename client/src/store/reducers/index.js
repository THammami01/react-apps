import { combineReducers } from "redux";
import loadingReducer from "./loading.reducer";
import globalReducer from "./global.reducer";

export default combineReducers({
  loading: loadingReducer,
  global: globalReducer,
});
