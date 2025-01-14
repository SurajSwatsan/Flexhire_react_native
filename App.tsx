import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/stackNavigation';
import {PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import {colors} from './src/Global_CSS/TheamColors';
import {ToastProvider} from 'react-native-toast-notifications';
import {ProfileProvider} from './src/Screens/UserProfile/ProfileContext';
// import messaging from '@react-native-firebase/messaging';
// import JobView from './src/Components/jobView';

const App = () => {
  // useEffect(() => {
  //   // Request notification permissions
  //   messaging()
  //     .requestPermission()
  //     .then(() => console.log('Notification permission granted'))
  //     .catch(error => console.log('Notification permission error:', error)); // Get the FCM token
  //   messaging()
  //     .getToken()
  //     .then(token => console.log('FCM Token:', token))
  //     .catch(error => console.log('Error fetching FCM token:', error)); // Foreground notification listener
  //   messaging().onMessage(async remoteMessage => {
  //     console.log(
  //       'Notification received in foreground:',
  //       remoteMessage.notification,
  //     );
  //   }); // Background notification listener
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   }); // Notification caused app to open from terminated state
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from terminated state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });
  // }, []);

  return (
    <Provider store={store}>
      <ToastProvider>
        <PaperProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.primary}
            translucent={false}
          />
          <ProfileProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </ProfileProvider>
        </PaperProvider>
      </ToastProvider>
    </Provider>
  );
};

export default App;
