import * as types from '../constants/actionTypes';

const initialState = {
  showPopUp: false,
  id: '',
  type: '', 
}

const popUpReducer = (state = initialState, action) => {
  console.log('here');
  switch(action.type){
    case types.SHOW_POPUP:
      return{
        ...state,
        showPopUp: true,
        id: action.payload.id,
        type: action.payload.type,
      }
    case types.CLOSE_POPUP:
      return{
        ...state,
        showPopUp: false,
        id: '',
        type: ''
      }
    case types.ADD_HABIT:
      return{
        ...state,
        showPopUp: false,
        id: '',
        type: ''
      }
    default:
      return {
        ...state
      }
  }
}

export default popUpReducer;