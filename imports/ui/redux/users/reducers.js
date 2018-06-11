/* eslint-disable import/prefer-default-export */
import { RECEIVE_PUBLIC_USER_DATA } from './actions';

export const userPublicProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PUBLIC_USER_DATA:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
