import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import homeComponent from '../Components/homeComponent';
import detailsComponent from '../Components/detailsComponent';
import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/UserScreens/LoginScreen';
import SignupScreen from '../Screens/UserScreens/SignupScreen';
import ForgotpasswordScreen from '../Screens/UserScreens/ForgotpasswordScreen';
import LogoutComponent from '../Screens/UserScreens/LogoutScreen';
import OtpVerificationScreen from '../Screens/UserScreens/OtpVerificationScreen';
import ResetPasswordScreen from '../Screens/UserScreens/ResetPasswordScreen.js';
import DefaultScreen from '../Screens/DefaultScreen.js';

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
    </Stack.Navigator>
  );
};

export default StackNavigation;
