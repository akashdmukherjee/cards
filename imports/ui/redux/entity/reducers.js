/* eslint-disable import/prefer-default-export */
import { RECEIVE_ENTITY_EDIT, RECEIVE_ENTITY_GET } from './actions';

export const entityReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ENTITY_EDIT:
      return Object.assign({}, state, action.data);
    case RECEIVE_ENTITY_GET:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
