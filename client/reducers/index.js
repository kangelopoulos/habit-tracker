import { combineReducers } from "redux";
import userReducer from './userReducer';
import habitsReducer from './habitsReducer';
import popUpReducer from './popUpReducer';

const reducers = combineReducers({
  user: userReducer,
  habits: habitsReducer,
  popUp: popUpReducer,
});

export default reducers;