/* eslint-disable import/prefer-default-export */
import { RECEIVE_CMS_LIST_GET } from './actions';

export const cmsListReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CMS_LIST_GET:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};
