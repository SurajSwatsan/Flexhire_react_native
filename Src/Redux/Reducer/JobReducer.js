import {JOB_POST, SELECT_JOB} from '../Action/JobAction';

const initialState = {
  jobsData: [],
  selectedJob: null,
  isLoading: false, // Manage loading state
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOB_POST_REQUEST':
      return {
        ...state,
        isLoading: true, // Start loading
      };
    case JOB_POST:
      return {
        ...state,
        jobsData: action.payload,
        isLoading: false, // End loading
      };
    case SELECT_JOB:
      return {
        ...state,
        selectedJob: action.payload,
      };
    default:
      return state;
  }
};

export default JobReducer;
