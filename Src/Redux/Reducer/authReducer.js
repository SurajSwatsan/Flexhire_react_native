const initialState = {
  token: null,
  user: null,
  IsUserActivated: false,
  error: null,
  isLoding: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LODING':
      return {
        ...state,
        isLoding: action.payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };
    // case 'REGISTER_SUCCESS':
    //   return {
    //     ...state,
    //     token: action.payload.token,
    //     user: action.payload.user,
    //     error: null,
    //   };
    // case 'REGISTER_FAILURE':
    //   return {
    //     ...state,
    //     error: action.payload.error,
    //   };
    // case 'OTP_VERIFICATION_SUCCESS':
    //   return {
    //     ...state,
    //     token: action.payload.token,
    //     user: action.payload.user,
    //     IsUserActivated: true,
    //     error: null,
    //   };
    // case 'OTP_VERIFICATION_FAILURE':
    //   return {
    //     ...state,
    //     error: action.payload.error,
    //   };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
        error: null,
        IsUserActivated: false,
      };
    // case 'RESET_PASSWORD_SUCCESS':
    //   return {
    //     ...state,
    //   };
    // case 'RESET_PASSWORD_FAILURE':
    //   return {
    //     ...state,
    //   };
    // case 'RESET_PASSWORD_CONFIRM_SUCCESS':
    //   return {
    //     ...state,
    //   };
    // case 'RESET_PASSWORD_CONFIRM_FAILURE':
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};

export default authReducer;
