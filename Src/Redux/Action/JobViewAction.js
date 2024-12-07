import instance from '../../Services/baseAPI'; // Your API service instance

// Action Types
export const FETCH_JOB_DATA_REQUEST = 'FETCH_JOB_DATA_REQUEST';
export const FETCH_JOB_DATA_SUCCESS = 'FETCH_JOB_DATA_SUCCESS';
export const FETCH_JOB_DATA_FAILURE = 'FETCH_JOB_DATA_FAILURE';

// Action Creator for fetching job data
export const fetchJobData = () => async (dispatch) => {
  dispatch({ type: FETCH_JOB_DATA_REQUEST });

  try {
    const response = await instance.get('/jobs/'); 
    console.log('API Response:', response.data);
    dispatch({
      type: FETCH_JOB_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_JOB_DATA_FAILURE,
      payload: error.response?.data?.message || 'Error fetching job data',
    });
  }
};
