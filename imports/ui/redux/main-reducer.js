import { combineReducers } from 'redux';
import { loginReducer } from './auth/reducers';
import { entityReducer } from './entity/reducers';

const mainReducer = combineReducers({
  loginReducer,
  entityReducer,
});

export default mainReducer;
