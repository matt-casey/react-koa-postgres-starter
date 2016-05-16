import { combineReducers } from 'redux';
import { modalReducer as modal } from '../components/base-ui/ReduxModal';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import user from './user';
import storage from './storage';

const rootReducer = combineReducers({
  auth,
  user,
  storage,
  modal,
  routing,
});

export default rootReducer;
