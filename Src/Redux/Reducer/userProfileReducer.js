const initialState = {
    ProfileAnalytic:null,
    error: null,
    isLoding: false,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LODING':
        return {
          ...state,
          isLoding: action.payload,
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
     
      default:
        return state;
    }
  };
  
  export default profileReducer;
  