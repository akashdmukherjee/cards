/* eslint-disable import/prefer-default-export */
import { RECEIVE_TAGS_GET } from './actions';

export const tagsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TAGS_GET:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
