const initialState = {
  JobApplications: [],
  JobDetails: null, // Add this state to store job details
  ApplyJob: null,
  SavedJobs: null,
  JobInvitation: null,
  SavedJobData: null,
  RejectInvitation: null,
  CompanyData: [],
  JobList: [],
  SearchJobList: [],
  FilterJobList: [],
  AggregatedData: [],
  CompanyDetails: null, // Add this state to store job details

  error: null,
  isLoading: false, // Track loading for any API request
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    // Loading state
    case 'LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    // Job Applications Success
    case 'JOB_APPLICATION_SUCCESS':
      return {
        ...state,
        JobApplications: action.payload,
        error: null,
      };

    // Job Applications Failure
    case 'JOB_APPLICATION_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    // Job Details Success
    case 'JOB_DETAILS_SUCCESS':
      return {
        ...state,
        JobDetails: action.payload, // Store job details in the state
        error: null,
      };

    // Job Details Failure
    case 'JOB_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload.error, // Store the error message for job details
      };

    case 'JOB_APPLIED_SUCCESSFULLY':
      return {
        ...state,
        error: null,
      };

    case 'JOB_APPLIED_FAILURE':
      return {
        ...state,
        error: action.payload.error, // Store the error message for job details
      };

    case 'JOB_SAVED_SUCCESS':
      return {
        ...state,
        SavedJobs: action.payload, // Store job details in the state
        error: null,
      };

    case 'JOB_SAVED_FAILURE':
      return {
        ...state,
        error: action.payload.error, // Store the error message for job details
      };

    case 'JOB_SAVED_SUCCESSFULLY':
      return {
        ...state,
        SavedJobData: action.payload, // Store job details in the state
        error: null,
      };

    case 'JOB_SAVED_UNSUCCESSFULLY':
      return {
        ...state,
        error: action.payload.error, // Store the error message for job details
      };

    case 'JOB_INVITATION_SUCCESS':
      return {
        ...state,
        JobInvitation: action.payload, // Store job details in the state
        error: null,
      };

    // Job Details Failure
    case 'JOB_INVITATION_FAILURE':
      return {
        ...state,
        error: action.payload.error, // Store the error message for job details
      };

    case 'READ_INVITATION_SUCCESSFULLY':
      return {
        ...state,
        error: null,
      };

    // Job Details Failure
    case 'READ_INVITATION_FAILURE':
      return {
        ...state,
        error: action.payload.error, // Store the error message for job details
      };

    case 'JOB_Invitation_REJECT_SUCCESSFULLY':
      return {
        ...state,
        error: null,
      };

    // Job Details Failure
    case 'JOB_INVITATION_REJECT_FAILURE':
      return {
        ...state,
        error: action.payload.error, // Store the error message for job details
      };

    case 'JOB_HOMEDATA_SUCCESS':
      return {
        ...state,
        CompanyData: action.payload,
        error: null,
      };

    // Job Details Failure
    case 'JOB_HOMEDATA_FAILURE':
      return {
        ...state,
        error: action.payload.error, // Store the error message for job details
      };

    //Job List
    case 'JOB_LIST_SUCCESS':
      return {
        ...state,
        JobList: action.payload,
        error: null,
      };

    case 'JOB_LIST_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    // Search Job List
    case 'SEARCH_JOB_SUCCESS':
      return {
        ...state,
        SearchJobList: action.payload,
        error: null,
      };

    case 'SEARCH_JOB_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    // Filter Job List
    case 'FILTER_JOB_SUCCESS':
      return {
        ...state,
        FilterJobList: action.payload,
        error: null,
      };

    case 'FILTER_JOB_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    // Filter Job List
    case 'AGGREGATED_DATA_SUCCESS':
      return {
        ...state,
        AggregatedData: action.payload,
        error: null,
      };

    case 'AGGREGATED_DATA_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    // Filter Job List
    case 'COMPANY_DETAILS_SUCCESS':
      return {
        ...state,
        CompanyDetails: action.payload,
        error: null,
      };

    case 'COMPANY_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default jobReducer;
