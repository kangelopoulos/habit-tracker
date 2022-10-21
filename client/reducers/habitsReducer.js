import { bindActionCreators } from 'redux';
import * as types from '../constants/actionTypes';

const initialState = {
  habitName: '',
  isGood: '',
  completedHabits: {},
}

const habitsReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch(action.type){
    case types.SET_NEW_HABIT:
      return {
        ...state,
        habitName: action.payload,
      }
    case types.SET_ISGOOD:
      let bool = false;
      if(action.payload === 'good'){
        bool = true;
      }
      return { 
        ...state,
        isGood: bool,
      }
    case types.ADD_HABIT: 
      return {
        ...state,
        habitName: '',
        isGood: '',
      }
    case types.CLICK_HABIT: 
      const object = { ...state.completedHabits };
      if(object[action.payload.name]) {
        delete object[action.payload.name];
      }
      else object[action.payload.name] = { id: action.payload.id, weight: action.payload.weight }
      return {
        ...state, 
        completedHabits: { ...object },
      }
    case types.LOAD_HABITS:
      return { 
        ...state,
        completedHabits: action.payload,
      }
    default:
      return {
        ...state
      }
  }
}

export default habitsReducer;
