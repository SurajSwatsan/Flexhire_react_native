import {applyMiddleware, combineReducers, createStore} from 'redux';
import JobReducer from './Reducer/JobReducer';
import {thunk} from 'redux-thunk';
import bookmarkReducer from './Reducer/BookmarkReducer';
import authReducer from './Reducer/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  Jobs: JobReducer, // state.Jobs.jobsData
  bookmark: bookmarkReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
