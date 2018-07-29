/* eslint-disable import/prefer-default-export */
import { RECEIVE_NOTIFICATIONS_GET } from './actions';

export const notificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_NOTIFICATIONS_GET:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
