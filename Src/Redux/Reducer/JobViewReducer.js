// import {
//   FETCH_JOB_DATA_REQUEST,
//   FETCH_JOB_DATA_SUCCESS,
//   FETCH_JOB_DATA_FAILURE,
// } from '../Action/jobActions';

import { FETCH_JOB_DATA_FAILURE, FETCH_JOB_DATA_REQUEST, FETCH_JOB_DATA_SUCCESS } from "../Action/JobViewAction";

const initialState = {
  jobData: [],  // Holds the job data
  loading: false,  // To handle loading state
  error: null,  // To hold any error message
};

const jobViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_JOB_DATA_SUCCESS:
      return { ...state, loading: false, jobData: action.payload };
    case FETCH_JOB_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default jobViewReducer;
