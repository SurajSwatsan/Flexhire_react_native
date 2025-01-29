import {Toast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import instance from '../../Services/baseAPI';

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
      const response = await instance.get(`/job-application/${user_id}/`);
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
      const response = await instance.get(`/job/${job_id}/`, {
        params: {
          user_id: user_id,
        },
      });
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
      const response = await instance.post(`/job-application/`, requestData);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);

      dispatch({type: 'JOB_APPLIED_SUCCESSFULLY', payload: data});

      dispatch({type: 'LOADING', payload: false});
      Toast.show('Application submitted successfully!', {
        type: 'success',
        placement: 'top',
        duration: 3000,
        offset: 50,
        animationType: 'slide-in',
      });
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
      const response = await instance.get(`/job-saved/${user_id}/`);
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

    try {
      const response = await axios.post(
        `http://15.206.149.28/api/job-saved/`,
        requestData,
      );
      // console.log(response);
      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);

      dispatch({type: 'JOB_SAVED_SUCCESSFULLY', payload: requestData.job});
      console.log('requestData.job', requestData);

      // // dispatch(GetJobList(requestData.user_id, pageNo));
      // // dispatch(GetFilterdJobs(requestData.user_id, pageNo));
      // dispatch(GetJobDetails(requestData.job, requestData.user_id));
      // dispatch(GetHomePageData(requestData.user_id));
      dispatch(GetSavedJobs(requestData.user_id));

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
      const response = await instance.get(`/job-invitations/${user_id}/`);
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
      const response = await axios.patch(
        `http://15.206.149.28/api/reject-job-invitation/${invitation_id}/`,
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

  const GetHomePageData = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await instance.get(`/android-home-page-data/${user_id}`);
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

  const GetJobList = (user_id, page) => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await instance.get(
        `/job?user_id=${user_id}&page=${page}`,
      );
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

  const GetSearchJobs = (queryParams, page) => async dispatch => {
    dispatch({type: 'LOADING', payload: true});
    const queryString = new URLSearchParams(queryParams).toString();
    try {
      const response = await axios.get(
        `http://15.206.149.28/api/search-jobs/?${queryString}`,
      );
      console.log(
        '****************************job-GetSearchJobList response***************************',
      );
      // console.log('response', response);
      // console.log('queryParams', queryParams);
      // console.log(`http://15.206.149.28/api/search/?${queryString}`);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      console.log(data);

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
    // const queryString = new URLSearchParams(queryParams).toString();

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/filter-jobs/?${queryParams}`,
      );
      console.log(
        '****************************job-GetFilterdJobs response***************************',
      );
      // console.log('queryParams', queryParams);
      console.log(`http://15.206.149.28/api/filter-jobs/?${queryParams}`);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

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

  const GetFiltermasterData = user_id => async dispatch => {
    try {
      const response = await axios.get(
        `http://15.206.149.28/api/filter-master-data/`,
      );
      // console.log(
      //   '****************************job-GetFiltermasterData response***************************',
      // );
      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'FILTER_MASTER_DATA_SUCCESS', payload: data});

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
        type: 'FILTER_MASTER_DATA_FAILURE',
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
      const response = await instance.get(`/company/${company_id}/`, {
        params: {
          user_id: user_id,
        },
      });
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
  const GetCompanyJobs = (company_id, user_id) => async dispatch => {
    // dispatch({type: 'LOADING', payload: true});

    try {
      const response = await instance.get(
        `/jobs-by-department/${company_id}/`,
        {
          params: {
            user_id: user_id,
          },
        },
      );
      // console.log(
      //   '****************************GetCompanyJobs response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'COMPANY_JOBS_SUCCESS', payload: data});
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
        type: 'COMPANY_JOBS_FAILURE',
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
    GetHomePageData,
    GetJobList,
    GetSearchJobs,
    GetFilterdJobs,
    GetFiltermasterData,
    GetCompanyDetails,
    GetCompanyJobs,
  };
};

export default JobViewController;
