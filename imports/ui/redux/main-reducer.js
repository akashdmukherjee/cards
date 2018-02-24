import { combineReducers } from 'redux';
import { loginReducer } from './auth/reducers';
import { entityReducer } from './entity/reducers';
import { cmsListReducer, cmsReducer } from './cms/reducers';

const mainReducer = combineReducers({
  loginReducer,
  entityReducer,
  cmsListReducer,
  cmsReducer,
});

export default mainReducer;
