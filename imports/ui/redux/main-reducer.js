import { combineReducers } from 'redux';
import { loginReducer } from './auth/reducers';
import { entityReducer } from './entity/reducers';
import { cmsListReducer, cmsReducer } from './cms/reducers';
import { tagsReducer } from './tags/reducers';
import { userPublicProfileReducer } from './users/reducers';
import { notificationsReducer } from './notifications/reducers';

const mainReducer = combineReducers({
  loginReducer,
  entityReducer,
  cmsListReducer,
  cmsReducer,
  tagsReducer,
  userPublicProfileReducer,
  notificationsReducer,
});

export default mainReducer;
