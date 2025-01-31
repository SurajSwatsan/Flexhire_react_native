import {Toast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import instance, {setAuthToken} from '../../Services/baseAPI';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const AuthViewController = () => {
  const navigation = useNavigation();
  const goBackScreen = () => {
    navigation.goBack();
  };
  const subscribeToUserTopic = user_id => {
    // Topic name: user_{user_id}
    const topic = `user_${user_id}`;
    messaging()
      .subscribeToTopic(topic)
      .then(() => {
        console.log(`Successfully subscribed to topic ${topic}`);
      })
      .catch(error => {
        console.error('Error subscribing to topic', error);
      });
  };

  const checkLoginStatus = () => async dispatch => {
    // console.log('checkLoginStatus called');

    try {
      AsyncStorage.getItem('token').then(token => {
        // console.log('result', token);
        if (token) {
          // console.log('checkLoginStatus', token);
          if (token) {
            setAuthToken(token);
            dispatch({type: 'LOGIN_SUCCESS', payload: {token}}); // Optionally, dispatch user data as well
          }
        } else {
          // props.navigation.navigate('Login');
        }
      }); // Retrieve the token from storage, e.g., AsyncStorage
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const register = requestData => async dispatch => {
    dispatch({type: 'LOADING', payload: true});
    try {
      const response = await axios.post(
        'http://15.206.149.28/api/register/user/',
        requestData,
      );

      // Parse the response
      const {token, user} = response.data;

      // Dispatch success actions
      dispatch({type: 'REGISTER_SUCCESS', payload: {token, user}});
      dispatch({type: 'LOADING', payload: false});

      // Show success toast
      Toast.show('You have Successfully Registered', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        offset: 100,
        animationType: 'slide-in',
      });

      // Navigation to another screen if needed
      navigation.navigate('LoginScreen');
    } catch (error) {
      dispatch({type: 'LOADING', payload: false});

      // Default error message
      let errorMessage = 'Something went wrong, please try again!';

      // Parse Axios error response
      if (error.response?.data) {
        const errorData = error.response.data;

        // Check for email-specific error
        if (errorData.email) {
          errorMessage = errorData.email[0];
        }
        // Check for mobile-specific error
        else if (errorData.mobile_number) {
          errorMessage = errorData.mobile_number[0];
        }
        // General message from API
        else if (errorData.message) {
          errorMessage = errorData.message;
        }
      }

      // Show error toast
      Toast.show(errorMessage, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        offset: 100,
        animationType: 'slide-in',
      });

      // Dispatch failure action
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: {error: errorMessage},
      });
    }
  };

  const login = requestData => async dispatch => {
    dispatch({type: 'LOADING', payload: true});

    try {
      const response = await axios.post(
        'http://15.206.149.28/api/user/login/',
        requestData,
      );

      // console.log(
      //   '****************************login response***************************',
      // );

      const jsonString = JSON.stringify(response.data);
      const data = JSON.parse(jsonString);

      // console.log(response);
      const {access, user_id} = data;
      // console.log('login data ', token, user);

      setAuthToken(access); // Set token in axios headers or AsyncStorage
      await AsyncStorage.setItem('user_data', JSON.stringify(user_id));
      subscribeToUserTopic(user_id);
      dispatch({type: 'LOGIN_SUCCESS', payload: {access, user_id}});

      dispatch({type: 'LOADING', payload: false});
      Toast.show('You are successfully logged in', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        offset: 100,
        animationType: 'slide-in',
      });
      navigation.navigate('DefaultScreen');
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
        type: 'LOGIN_FAILURE',
        payload: {
          error: error.response?.data?.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error?.response?.data,
        },
      });
    }
  };

  const logout = () => dispatch => {
    // console.log('logout called');
    setAuthToken(null);
    dispatch({type: 'LOGOUT'});
    navigation.navigate('LoginScreen');
  };

  return {
    goBackScreen,
    checkLoginStatus,
    register,
    login,
    logout,
  };
};

export default AuthViewController;
