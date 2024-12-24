import {Toast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';

const JobViewController = () => {
  const navigation = useNavigation();
  const [_userId, set_userId] = useState();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        set_userId(id);
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
  }, []);
  const goBackScreen = () => {
    navigation.goBack();
  };

  const GetJobApplications = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/job-application/${user_id}/`,
      );
      // console.log(
      //   '****************************job-application response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'JOB_APPLICATION_SUCCESS', payload: data});

      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_APPLICATION_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetJobDetails = (job_id, user_id) => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/job/${job_id}/`,
        {
          params: {
            user_id: user_id,
          },
        },
      );
      // console.log(
      //   '****************************job-details response*************************** ',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'JOB_DETAILS_SUCCESS', payload: data});
      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong, Please try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_DETAILS_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const ApplyJob = requestData => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.post(
        `http://15.206.149.28/api/job-application/`,
        requestData,
      );
      // console.log(
      //   '****************************job-application response***************************',
      // );
      // console.log(response);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);

      dispatch({type: 'JOB_APPLIED_SUCCESSFULLY', payload: data});

      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_APPLIED_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetSavedJobs = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/job-saved/${user_id}/`,
      );
      // console.log(
      //   '****************************job-saved response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'JOB_SAVED_SUCCESS', payload: data});
      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong, Please try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_SAVED_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const SaveJob = requestData => async dispatch => {
    dispatch({type: 'LOADING', payload: true});
    // console.log('requestData', requestData);

    try {
      const response = await axios.post(
        `http://15.206.149.28/api/job-saved/`,
        requestData,
      );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);

      dispatch({type: 'JOB_SAVED_SUCCESSFULLY', payload: data});

      dispatch({type: 'LOADING', payload: false});
      dispatch(GetSavedJobs(_userId));
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_SAVED_UNSUCCESSFULLY',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetInvitation = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/job-invitations/${user_id}/`,
      );
      // console.log(
      //   '****************************job-Invitation ///response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'JOB_INVITATION_SUCCESS', payload: data});
      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong, Please try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_INVITATION_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const ReadInvitation = invitation_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.put(
        `http://15.206.149.28/api/read-job-invitation/${invitation_id}/`,
      );
      // console.log(
      //   '****************************job-Invitation response***************************',
      // );
      // console.log(response);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);

      dispatch({type: 'READ_INVITATION_SUCCESSFULLY', payload: data});
      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong, Please try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'READ_INVITATION_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const RejectInvitation = invitation_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.put(
        `http://15.206.149.28/api/'reject-job-invitation/${invitation_id}/`,
      );
      // console.log(
      //   '****************************job-application response***************************',
      // );
      // console.log(response);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);

      dispatch({type: 'JOB_Invitation_REJECT_SUCCESSFULLY', payload: data});

      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_INVITATION_REJECT_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetHomeData = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/jobs/homepage/${user_id}`,
      );
      // console.log(
      //   '****************************job-GetHomeData response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'JOB_HOMEDATA_SUCCESS', payload: data});

      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      // console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_HOMEDATA_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetJobList = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(`http://15.206.149.28/api/jobs/`);
      // console.log(
      //   '****************************job-GetJobList response***************************',
      // );
      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'JOB_LIST_SUCCESS', payload: data});

      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'JOB_LIST_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetSearchJobs = queryParams => async dispatch => {
    dispatch({type: 'LOADING', payload: true});
    const queryString = new URLSearchParams(queryParams).toString();
    try {
      const response = await axios.get(
        `http://15.206.149.28/api/search/?${queryString}`,
      );
      // console.log(
      //   '****************************job-GetSearchJobList response***************************',
      // );
      // console.log('response', response);
      // console.log('queryParams', queryParams);
      // console.log(`http://15.206.149.28/api/search/?${queryString}`);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'SEARCH_JOB_SUCCESS', payload: data});

      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'SEARCH_JOB_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetFilterdJobs = queryParams => async dispatch => {
    dispatch({type: 'LOADING', payload: true});
    const queryString = new URLSearchParams(queryParams).toString();
    try {
      const response = await axios.get(
        `http://15.206.149.28/api/filter/?${queryString}`,
      );
      console.log(
        '****************************job-GetFilterdJobs response***************************',
      );
      // console.log('queryParams', queryParams);
      console.log(`http://15.206.149.28/api/filter/?${queryString}`);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      console.log(data);

      dispatch({type: 'FILTER_JOB_SUCCESS', payload: data});

      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'FILTER_JOB_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetAggregatedData = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/aggregated-data/`,
      );
      // console.log(
      //   '****************************job-GetAggregatedData response***************************',
      // );
      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'AGGREGATED_DATA_SUCCESS', payload: data});

      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong,Please Try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'AGGREGATED_DATA_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetCompanyDetails = (company_id, user_id) => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/companies/${company_id}/`,
        {
          params: {
            user_id: user_id,
          },
        },
      );
      // console.log(
      //   '****************************GetCompanyDetails response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'COMPANY_DETAILS_SUCCESS', payload: data});
      dispatch({type: 'LOADING', payload: false});
    } catch (error) {
      console.log('error', error.response);

      dispatch({type: 'LOADING', payload: false});
      Toast.show(
        error.response?.data?.non_field_errors[0]
          ? error.response.data.non_field_errors[0]
          : 'Something went wrong, Please try again!',
        {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 100,
          animationType: 'slide-in',
        },
      );
      dispatch({
        type: 'COMPANY_DETAILS_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  return {
    goBackScreen,
    GetJobApplications,
    GetJobDetails,
    ApplyJob,
    GetSavedJobs,
    SaveJob,
    GetInvitation,
    ReadInvitation,
    RejectInvitation,
    GetHomeData,
    GetJobList,
    GetSearchJobs,
    GetFilterdJobs,
    GetAggregatedData,
    GetCompanyDetails,
  };
};

export default JobViewController;
