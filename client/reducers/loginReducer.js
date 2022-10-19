import * as types from '../constants/actionTypes';

const initialState = {
  username: '',
  password: '',
  loggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch(action.type){
    case types.SET_USERNAME:
      console.log('loginRecuer SET_USERNAME', action.payload);
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
          loggedIn: true
        }
      } else {
        return {
          ...state,
          username: '',
          password: ''
        }
      }
      
    default: {
      return state;
    }
  }
};

export default loginReducer;