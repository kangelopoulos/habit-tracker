import * as types from '../constants/actionTypes';

export const setUsernameActionCreator = usernameInput => ({
  type: types.SET_USERNAME,
  payload: usernameInput
});

export const setPasswordActionCreator = passwordInput => ({
  type: types.SET_PASSWORD,
  payload: passwordInput
});

export const loginAttemptActionCreator = authenticated => ({
  type: types.LOGIN_ATTEMPT,
  payload: authenticated
});

