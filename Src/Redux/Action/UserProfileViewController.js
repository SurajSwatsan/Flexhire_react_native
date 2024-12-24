import {Toast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance, {setAuthToken} from '../../Services/baseAPI';
import axios from 'axios';

const UserProfileViewController = () => {
  const navigation = useNavigation();
  const goBackScreen = () => {
    navigation.goBack();
  };

  const GetProfileAnalytic = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await instance.get(
        `http://15.206.149.28/api/job-seeker/profile-analytic/1`,
      );
      // console.log(
      //   '****************************profile-analytic response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'PROFILE_ANALYTIC_SUCCESS', payload: data});

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
        type: 'PROFILE_ANALYTIC_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };
  const GetProfileDetails = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.get(
        `http://15.206.149.28/api/job-seeker-profile/${user_id}/`,
      );
      // console.log(
      //   '****************************PROFILE_PERSONAL_DETAILS response***************************',
      // );
      // console.log(response);

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);

      dispatch({type: 'PROFILE_DETAILS_SUCCESS', payload: data});

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
        type: 'PROFILE_DETAILS_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };
  const updateProfileDetails = requestData => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.put(
        `http://15.206.149.28/api/job-seeker-profile/${requestData.id}/`,
        requestData,
      );
      // console.log(
      //   '****************************PROFILE_PERSONAL_DETAILS UPDATE_RESPONSE***************************',
      // );
      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'UPDATE_PROFILE_DETAILS_SUCCESS', payload: data});

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
        type: 'UPDATE_PROFILE_DETAILS_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetProfileBasicInformation = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await instance.get(`job-seeker-profile/`);
      // console.log(
      //   '****************************PROFILE_PERSONAL_DETAILS response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'PROFILE_BASIC_INFORMATION_SUCCESS', payload: data});

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
        type: 'PROFILE_BASIC_INFORMATION_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const addProfileDetails = requestData => async dispatch => {
    dispatch({type: 'LOADING', payload: true});
// console.log('--------------------------------',requestData);

    try {
      const response = await axios.post(
        `http://15.206.149.28/api/job-seeker-profile/`,
        requestData,
      );
      // console.log(
      //   '****************************PROFILE_PERSONAL_DETAILS response***************************',
      // );
      // console.log(response);
      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'PROFILE_BASIC_INFORMATION_POST_SUCCESS', payload: data});

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
        type: 'PROFILE_BASIC_INFORMATION_POST_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetProfileCareerInformation = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await instance.get(`job-seeker-profile/`);
      // console.log(
      //   '****************************PROFILE_PERSONAL_DETAILS response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'PROFILE_CAREER_INFORMATION_SUCCESS', payload: data});

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
        type: 'PROFILE_CAREER_INFORMATION_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const updateProfileInformation = requestData => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.put(
        `http://15.206.149.28/api/job-seeker-profile/1/`,
        requestData,
      );
      // console.log(
      //   '****************************PROFILE_PERSONAL_DETAILS update response***************************',
      // );
      // console.log(response);
      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({
        type: 'PROFILE_CAREER_INFORMATION_POST_SUCCESS',
        payload: data,
      });

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
        type: 'PROFILE_BASIC_INFORMATION_POST_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const GetProfileLanguage = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await instance.get(`job-seeker-profile/`);
      // console.log(
      //   '****************************PROFILE_PERSONAL_DETAILS RESPONSE***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'PROFILE_LANGUAGE_SUCCESS', payload: data});

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
        type: 'PROFILE_LANGUAGE_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const updateProfileLanguage = requestData => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.put(
        `http://15.206.149.28/api/job-seeker-profile/1/`,
        requestData,
      );
      // console.log(
      //   '****************************PROFILE_PERSONAL_DETAILS UPDATE_RESPONSE***************************',
      // );
      // console.log(response);
      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      // console.log(data);

      dispatch({type: 'PROFILE_LANGUAGE_POST_SUCCESS', payload: data});

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
        type: 'PROFILE_LANGUAGE_POST_FAILURE',
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
    GetProfileAnalytic,
    GetProfileDetails,
    GetProfileBasicInformation,
    addProfileDetails,
    GetProfileCareerInformation,
    updateProfileInformation,
    GetProfileLanguage,
    updateProfileLanguage,
    updateProfileDetails,
  };
};

export default UserProfileViewController;
