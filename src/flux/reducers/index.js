import { combineReducers } from "redux";
import navigationReducer from './navigationReducer';
import appReducer from './appReducer';

export default combineReducers({
  navigation: navigationReducer,
  appState: appReducer
});
