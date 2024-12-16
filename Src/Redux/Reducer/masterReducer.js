const initialState = {
  countries: [],
  states: [],
  cities: [],
  industries: [],
  departments: [],
  categories: [],
  roles: [],
  language: [],
  boards: [],
  mediums: [],
  universities: [],
  courses: [],
  specializations: [],
  keyskills: [],

  error: null,
  isLoding: false,
};

const MasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LODING':
      return {
        ...state,
        isLoding: action.payload,
      };
    case 'COUNTRY_SUCCESS':
      return {
        ...state,
        countries: action.payload,
        error: null,
      };
    case 'COUNTRY_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'STATES_SUCCESS':
      return {
        ...state,
        states: action.payload,
        error: null,
      };
    case 'STATES_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'CITY_SUCCESS':
      return {
        ...state,
        cities: action.payload,
        error: null,
      };
    case 'CITY_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'INDUSTRY_SUCCESS':
      return {
        ...state,
        industries: action.payload,
        error: null,
      };
    case 'INDUSTRY_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'DEPARTMENT_SUCCESS':
      return {
        ...state,
        departments: action.payload,
        error: null,
      };
    case 'DEPARTMENT_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'CATEGORY_SUCCESS':
      return {
        ...state,
        categories: action.payload,
        error: null,
      };
    case 'CATEGORY_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'ROLE_SUCCESS':
      return {
        ...state,
        roles: action.payload,
        error: null,
      };
    case 'ROLE_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'LANGUAGE_SUCCESS':
      return {
        ...state,
        languages: action.payload,
        error: null,
      };
    case 'LANGUAGE_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'BOARD_SUCCESS':
      return {
        ...state,
        boards: action.payload,
        error: null,
      };
    case 'BOARD_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'MEDIUM_SUCCESS':
      return {
        ...state,
        mediums: action.payload,
        error: null,
      };
    case 'MEDIUM_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'UNIVERSITY_SUCCESS':
      return {
        ...state,
        universities: action.payload,
        error: null,
      };
    case 'UNIVERSITY_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'COURSE_SUCCESS':
      return {
        ...state,
        courses: action.payload,
        error: null,
      };
    case 'COURSE_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'SPECIALIZATION_SUCCESS':
      return {
        ...state,
        specializations: action.payload,
        error: null,
      };
    case 'SPECIALIZATION_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'KEYSKILL_SUCCESS':
      return {
        ...state,
        keyskills: action.payload,
        error: null,
      };
    case 'KEYSKILL_FAILURE':
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default MasterReducer;
