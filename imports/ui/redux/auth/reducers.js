/* eslint-disable import/prefer-default-export */
import { RECEIVE_LOGIN, RECEIVE_LOGOUT } from './actions';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LOGIN:
      return Object.assign({}, state, action.data);
    case RECEIVE_LOGOUT:
      return Object.assign({}, state, { isLogging: false, data: {} });
    default:
      return state;
  }
};
