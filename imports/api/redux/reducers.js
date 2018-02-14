import { combineReducers } from 'redux';

import { RECEIVE_LOGIN, RECEIVE_LOGOUT } from './actions';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LOGIN:
      return Object.assign({}, state, action.data);
    case RECEIVE_LOGOUT:
      return Object.assign({}, state, { isLogging: false, data: {} });
    default:
      return state;
  }
};

const mainReducer = combineReducers({
  loginReducer,
});

export default mainReducer;
