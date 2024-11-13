import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchJobScreen from '../Components/searchResults.js';
import UserApplies from '../Screens/BottomTabScreens/UserAppliesScreen.js';
import ApplyJobScreen from '../Components/ApplyJobScreen.js';
import SavedJobScreen from '../Screens/BottomTabScreens/SavedJobList.js';
import DetailsComponent from '../Trialpages/detailsComponent.js';
import LoginScreen from '../Screens/UserScreens/LoginScreen.js';
import SplashScreen from '../Screens/SplashScreen.js';
import SignupScreen from '../Screens/UserScreens/SignupScreen.js';
import ForgotpasswordScreen from '../Screens/UserScreens/ForgotpasswordScreen.js';
import LogoutComponent from '../Screens/UserScreens/LogoutScreen.js';
import OtpVerificationScreen from '../Screens/UserScreens/OtpVerificationScreen.js';
import ResetPasswordScreen from '../Screens/UserScreens/ResetPasswordScreen.js.js';
import DefaultScreen from '../Screens/DefaultScreen.js';
import HomeComponent from '../Screens/BottomTabScreens/HomeScreen.js';
import JobDetailScreen from '../Components/JobDetail.js';

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
        component={HomeComponent}
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
        component={DetailsComponent}
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
        component={SavedJobScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name='UserApplies'
        component={UserApplies}
      />

      <Stack.Screen
      name='ApplyJobScreen'
      component={ApplyJobScreen}
      />

      <Stack.Screen
      name='AppliedJobs'
      component={ApplyJobScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
