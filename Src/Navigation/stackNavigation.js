import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import homeComponent from '../Components/homeComponent.js';
import detailsComponent from '../Components/detailsComponent.js';
import SplashScreen from '../Screens/SplashScreen.js';
import LoginScreen from '../Screens/UserScreens/LoginScreen.js';
import SignupScreen from '../Screens/UserScreens/SignupScreen.js';
import ForgotpasswordScreen from '../Screens/UserScreens/ForgotpasswordScreen.js';
import LogoutComponent from '../Screens/UserScreens/LogoutScreen.js';
import OtpVerificationScreen from '../Screens/UserScreens/OtpVerificationScreen.js';
import ResetPasswordScreen from '../Screens/UserScreens/ResetPasswordScreen.js.js';
import DefaultScreen from '../Screens/DefaultScreen.js';
import SearchResults from '../Components/searchResults.js';
import SearchJobScreen from '../Components/searchResults.js';
import JobDetailsScreen from '../Components/jobDetail.js';
import JobDetailScreen from '../Components/jobDetail.js';
import BookmarkScreen from '../Common/bookmark.js';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={homeComponent}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotpasswordScreen"
        component={ForgotpasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogoutComponent"
        component={LogoutComponent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpVerificationScreen"
        component={OtpVerificationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Details"
        component={detailsComponent}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="searchjob"
        component={SearchJobScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="bookmark"
        component={BookmarkScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
