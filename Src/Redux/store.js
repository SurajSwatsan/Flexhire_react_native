import {applyMiddleware, combineReducers, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './Reducer/authReducer';
import jobViewReducer from './Reducer/JobViewReducer';
import ProfileReducer from './Reducer/userProfileReducer';
import MasterReducer from './Reducer/masterReducer';
// import jobViewReducer from './Reducer/jobViewReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobViewReducer,
  profile: ProfileReducer,
  master: MasterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
