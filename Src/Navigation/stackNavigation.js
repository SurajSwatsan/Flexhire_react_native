import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchJobScreen from '../Components/searchResults.js';
import UserApplies from '../Screens/BottomTabScreens/UserAppliesScreen.js';

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
import JobDetailScreen from '../Components/JobDetail.js';
import HomeScreen from '../Screens/BottomTabScreens/HomeScreen.js';
import Index from '../Screens/UserProfile/Profile/index.js';
import CompanyOverviewScreen from '../Components/CompanyOverview.js';
import BasicInformation from '../Screens/UserProfile/Profile/BasicInformation.js';
import CustomInviteScreen from '../Constant/CustomInviteCard.js';
import CustomNotificationScreen from '../Constant/CustomNotification.js';
import ApplicationStatusScreen from '../Constant/ApplicationStatusScreen.js';
import JobScreen from '../Screens/BottomTabScreens/JobScreen.js';
import DispalyPreferenceScreen from '../Constant/DisplayPreferenceScreen.js';
import MyInterviewPage from '../Screens/UserProfile/Profile/MyInterviewPage.js';
import CustomBottomTab from './CustomBottomTab.js';
import AnalyticsPage from '../Screens/UserProfile/Profile/AnalyticPage.js';
import JobViewPage from '../Components/JobView.js';
// import JobView from '../Components/jobView.js';

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
        component={HomeScreen}
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
        // options={{headerShown: false}}
      />

      <Stack.Screen
       name="UserApplies" 
       component={UserApplies} 
       />

      <Stack.Screen 
      name='JobsScreen' 
      component={JobScreen}
      />

      <Stack.Screen
      name="DisplayPreference"
      component={DispalyPreferenceScreen}
      />

      <Stack.Screen
        name="userProfileScreen"
        component={Index}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CompanyOverview"
        component={CompanyOverviewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BasicInfo"
        component={BasicInformation}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Invite"
        component={CustomInviteScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Notification"
        component={CustomNotificationScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ApplicationStatus"
        component={ApplicationStatusScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen
      name='InterviewPage'
      component={MyInterviewPage}
      options={{headerShown:false}}
      />

      <Stack.Screen
      name='AnalyticPage'
      component={AnalyticsPage}
      options={{headerShown:false}}
      />

      <Stack.Screen
      name = "JobView"
      component={JobViewPage}
      />

{/* <Stack.Screen
        name="CustomBottomTab"
        component={CustomBottomTab}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
    
  );
};

export default StackNavigation;
