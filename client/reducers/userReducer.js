import * as types from '../constants/actionTypes';

const initialState = {
  username: '',
  password: '',
  loggedIn: false,
  user_id: '',
  firstName: '',
  habits: []
};

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case types.SET_USERNAME:
      console.log('loginReducer SET_USERNAME', action.payload);
      return {
        ...state,
        username: action.payload
      }
    case types.SET_PASSWORD:
      console.log('loginReducer SET_PASSWORD', action.payload);
      return {
        ...state,
        password: action.payload
      }
    case types.LOGIN_ATTEMPT:
      console.log(`loginReducer LOGIN_ATTEMPT`, action.payload);
      if(action.payload) {
        return {
          ...state,
          loggedIn: true,
          firstName: action.payload.firstName,
          habits: action.payload.habits,
          user_id: action.payload._id,
        }
      } else {
        return {
          ...state,
          username: '',
          password: ''
        }
      }
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, action.payload]
      }
    default: {
      return state;
    }
  }
};

export default userReducer;