const initialState = {
  JobApplications: [],
  JobDetails: {}, // Add this state to store job details
  ApplyJob: null,
  SavedJobs: null,
  JobInvitation: null,
  SavedJobData: null,
  RejectInvitation: null,
  HomeData: [],
  CompanyDetails: null, // Add this state to store job details
  CompanyJobs: null, // Add this state to store
  error: null,

  JobListPagination: {},

  JobList: [],
  FilterJobList: [],
  FilterMasterData: [],
  SearchJobList: [],

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
      console.log(
        'state.FilterJobList',
        state.FilterJobList.map(job => ({
          id: job.id,
          is_saved: job.is_saved,
        })),
      );

      return {
        ...state,
        // SavedJobData: action.payload, // Store job details in the state
        error: null,
        HomeData: {
          ...state.HomeData,
          suggested_jobs: state.HomeData.suggested_jobs.map(job =>
            job.id === action.payload ? {...job, is_saved: !job.is_saved} : job,
          ),
          recent_jobs: state.HomeData.recent_jobs.map(job =>
            job.id === action.payload ? {...job, is_saved: !job.is_saved} : job,
          ),
          profile_based_jobs: state.HomeData.profile_based_jobs.map(job =>
            job.id === action.payload ? {...job, is_saved: !job.is_saved} : job,
          ),
          jobs_based_on_applied: state.HomeData.jobs_based_on_applied.map(job =>
            job.id === action.payload ? {...job, is_saved: !job.is_saved} : job,
          ),
        },
        JobDetails: {
          ...state.JobDetails,
          is_saved:
            state.JobDetails.id === action.payload
              ? !state.JobDetails.is_saved
              : state.JobDetails.is_saved,
        },
        JobList: state.JobList.map(job =>
          job.id === action.payload ? {...job, is_saved: !job.is_saved} : job,
        ),
        FilterJobList: state.FilterJobList.map(job =>
          job.id === action.payload ? {...job, is_saved: !job.is_saved} : job,
        ),
        SearchJobList: state.SearchJobList.map(job =>
          job.id === action.payload ? {...job, is_saved: !job.is_saved} : job,
        ),
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
        HomeData: action.payload,
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
        JobListPagination: {
          count: action.payload.count,
          total_pages: action.payload.total_pages,
          current_page: action.payload.current_page,
          items_per_page: action.payload.items_per_page,
          previous: action.payload.previous,
          next_page_number: action.payload.next_page_number,
          previous_page_number: action.payload.previous_page_number,
        },
        JobList: [
          ...state.JobList,
          ...action.payload.results.filter(
            newJob =>
              !state.JobList.some(existingJob => existingJob.id === newJob.id),
          ),
        ],
        FilterJobList: [],
        SearchJobList: [],
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
        JobListPagination: {
          count: action.payload?.count || 0,
          total_pages: action.payload?.total_pages || 0,
          current_page: action.payload?.current_page || 0,
          items_per_page: action.payload?.items_per_page || 0,
          previous: action.payload?.previous || null,
          next_page_number: action.payload?.next_page_number || null,
          previous_page_number: action.payload?.previous_page_number || null,
        },
        SearchJobList:
          parseInt(action.payload?.current_page) > 1
            ? [
                ...(state?.SearchJobList || []),
                ...(action?.payload?.results?.filter(
                  newJob =>
                    !(state?.SearchJobList || []).some(
                      existingJob => existingJob.id === newJob.id,
                    ),
                ) || []),
              ]
            : action?.payload?.results || [],

        FilterJobList: [],

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
        JobListPagination: {
          count: action.payload?.count || 0,
          total_pages: action.payload?.total_pages || 0,
          current_page: action.payload?.current_page || 0,
          items_per_page: action.payload?.items_per_page || 0,
          previous: action.payload?.previous || null,
          next_page_number: action.payload?.next_page_number || null,
          previous_page_number: action.payload?.previous_page_number || null,
        },
        FilterJobList:
          parseInt(action.payload?.current_page) > 1
            ? [
                ...(state?.FilterJobList || []),
                ...(action?.payload?.results?.filter(
                  newJob =>
                    !(state?.FilterJobList || []).some(
                      existingJob => existingJob.id === newJob.id,
                    ),
                ) || []),
              ]
            : action?.payload?.results || [],
        SearchJobList: [],
        error: null,
      };

    case 'FILTER_JOB_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'CLEAR_JOB_LIST':
      return {
        ...state,
        SearchJobList: [],
        FilterJobList: [],
      };
    // Filter Job List
    case 'FILTER_MASTER_DATA_SUCCESS':
      return {
        ...state,
        FilterMasterData: action.payload,
        error: null,
      };

    case 'FILTER_MASTER_DATA_FAILURE':
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

    case 'COMPANY_JOBS_SUCCESS':
      return {
        ...state,
        CompanyJobs: action.payload,
        error: null,
      };

    case 'COMPANY_JOBS_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default jobReducer;
