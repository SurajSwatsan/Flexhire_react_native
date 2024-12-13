const initialState = {
  profileDetails: null,
  ProfileAnalytic: null,
  Personaldetails: [],
  error: null,
  isLoding: false,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LODING':
      return {
        ...state,
        isLoding: action.payload,
      };
    case 'PROFILE_DETAILS_SUCCESS':
      return {
        ...state,
        profileDetails: action.payload,
        error: null,
      };
    case 'PROFILE_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'UPDATE_PROFILE_DETAILS_SUCCESS':
      return {
        ...state,
        profileDetails: action.payload,
        error: null,
      };
    case 'UPDATE_PROFILE_DETAILS_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'PROFILE_ANALYTIC_SUCCESS':
      return {
        ...state,
        ProfileAnalytic: action.payload,
        error: null,
      };
    case 'PROFILE_ANALYTIC_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'PROFILE_BASIC_INFORMATION_SUCCESS':
      return {
        ...state,
        Personaldetails: action.payload,
        error: null,
      };
    case 'PROFILE_BASIC_INFORMATION_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'PROFILE_BASIC_INFORMATION_POST_SUCCESS':
      return {
        ...state,
        Personaldetails: action.payload,
        error: null,
      };
    case 'PROFILE_BASIC_INFORMATION_POST_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'PROFILE_CAREER_INFORMATION_SUCCESS':
      return {
        ...state,
        Personaldetails: action.payload,
        error: null,
      };
    case 'PROFILE_CAREER_INFORMATION_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'PROFILE_CAREER_INFORMATION_POST_SUCCESS':
      return {
        ...state,
        Personaldetails: action.payload,
        error: null,
      };
    case 'PROFILE_BASIC_INFORMATION_POST_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'PROFILE_LANGUAGE_SUCCESS':
      return {
        ...state,
        Personaldetails: action.payload,
        error: null,
      };
    case 'PROFILE_LANGUAGE_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    case 'PROFILE_LANGUAGE_POST_SUCCESS':
      return {
        ...state,
        Personaldetails: action.payload,
        error: null,
      };
    case 'PROFILE_LANGUAGE_POST_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default ProfileReducer;
