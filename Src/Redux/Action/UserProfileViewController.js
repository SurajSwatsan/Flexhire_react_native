import {Toast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance, {setAuthToken} from '../../Services/baseAPI';

const UserProfileViewController = () => {
  const navigation = useNavigation();
  const goBackScreen = () => {
    navigation.goBack();
  };

  const GetProfileAnalytic = user_id => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await instance.get(`job/`);
      console.log(
        '****************************profile-analytic response***************************',
      );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);
      console.log(data);

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

  return {
    goBackScreen,
    GetProfileAnalytic,
  };
};

export default UserProfileViewController;
