import * as types from '../constants/actionTypes';

export const setUsernameActionCreator = usernameInput => ({
  type: types.SET_USERNAME,
  payload: usernameInput
});

export const setPasswordActionCreator = passwordInput => ({
  type: types.SET_PASSWORD,
  payload: passwordInput
});

export const loginAttemptActionCreator = data => ({
  type: types.LOGIN_ATTEMPT,
  payload: data
});

export const loadHabitsActionCreator = habits =>({
  type: types.LOAD_HABITS,
  payload: habits
});

export const popupActionCreator = type =>({
  type: types.SHOW_POPUP,
  payload: type,
});

export const closePopupActionCreator = (type) => ({
  type: types.CLOSE_POPUP,
  payload: 1,
});

export const newHabitActionCreator = name => ({
  type: types.SET_NEW_HABIT,
  payload: name,
});

export const isGoodActionCreator = str => ({
  type: types.SET_ISGOOD,
  payload: str
});

export const addHabitActionCreator = (newHabit) => ({
  type: types.ADD_HABIT,
  payload: newHabit,
});

export const clickHabitActionCreator = (habit) => ({
  type: types.CLICK_HABIT,
  payload: habit,
});