import {JOB_POST, SELECT_JOB} from '../Action/JobAction';

// import { FETCH_JOBS_FAILURE, FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, LOADING, REMOVE_SAVED_JOB, SAVE_JOB } from "../Action/JobAction";

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

// import {
//   FETCH_JOBS_REQUEST,
//   FETCH_JOBS_SUCCESS,
//   FETCH_JOBS_FAILURE,
//   SAVE_JOB,
//   REMOVE_SAVED_JOB,
//   LOADING,
// } from '../Actions/jobActions';

// const initialState = {
//   jobs: [],
//   savedJobs: [],
//   loading: false,
//   error: null,
// };

// const jobReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_JOBS_REQUEST:
//       return { ...state, loading: true, error: null };

//     case FETCH_JOBS_SUCCESS:
//       return { ...state, jobs: action.payload, loading: false };

//     case FETCH_JOBS_FAILURE:
//       return { ...state, error: action.payload, loading: false };

//     case SAVE_JOB:
//       return { ...state, savedJobs: [...state.savedJobs, action.payload] };

//     case REMOVE_SAVED_JOB:
//       return {
//         ...state,
//         savedJobs: state.savedJobs.filter((job) => job.id !== action.payload.id),
//       };

//     case LOADING:
//       return { ...state, loading: action.payload };

//     default:
//       return state;
//   }
// };

// export default jobReducer;
