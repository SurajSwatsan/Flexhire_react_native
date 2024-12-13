import {applyMiddleware, combineReducers, createStore} from 'redux';
import JobReducer from './Reducer/JobReducer';
import {thunk} from 'redux-thunk';
import bookmarkReducer from './Reducer/BookmarkReducer';
import authReducer from './Reducer/authReducer';
import jobViewReducer from './Reducer/JobViewReducer';
import ProfileReducer from './Reducer/userProfileReducer';
import MasterReducer from './Reducer/masterReducer';
// import jobViewReducer from './Reducer/jobViewReducer';
 
const rootReducer = combineReducers({
  auth: authReducer,
  Jobs: JobReducer, // state.Jobs.jobsData
  bookmark: bookmarkReducer,
  job: jobViewReducer,
  profile: ProfileReducer,
  master: MasterReducer,
});
 
const store = createStore(rootReducer, applyMiddleware(thunk));
 
export default store;
 