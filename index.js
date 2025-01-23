import {
  Alert,
  AppRegistry,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a notification channel (for Android 8.0 and higher)
async function createNotificationChannel() {
  const channelId = 'default'; // Channel ID for notifications

  // Check if the channel already exists
  const channel = await notifee.getChannel(channelId);
  if (!channel) {
    await notifee.createChannel({
      id: channelId,
      name: 'Default Channel',
      importance: AndroidImportance.HIGH, // Set the importance level
    });
  }
}

// Request Notification Permissions for iOS
async function requestPermissions() {
  if (Platform.OS === 'ios') {
    const settings = await notifee.requestPermission();
    console.log('Permission settings:', settings); // Log permission result for iOS
  }
}

const requestAndroidNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'This app would like to send you notifications.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        Alert.alert(
          'Permission Denied',
          'Notification permissions are required for this app to function properly. Please enable them in the settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings(); // Open the app's settings page
              },
            },
          ],
        );
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

// Store notifications in AsyncStorage (useful for background/terminated state)
async function storeNotification(notification) {
  try {
    let notifications =
      JSON.parse(await AsyncStorage.getItem('pendingNotifications')) || [];
    notifications.push(notification);
    await AsyncStorage.setItem(
      'pendingNotifications',
      JSON.stringify(notifications),
    );
  } catch (error) {
    console.error('Error storing notification:', error);
  }
}

// Show all pending notifications stored in AsyncStorage
async function showAllPendingNotifications() {
  try {
    let notifications =
      JSON.parse(await AsyncStorage.getItem('pendingNotifications')) || [];
    for (const notif of notifications) {
      await notifee.displayNotification(notif);
    }
    // Clear stored notifications after displaying
    await AsyncStorage.removeItem('pendingNotifications');
  } catch (error) {
    console.error('Error displaying notifications:', error);
  }
}

// Handle background and FCM notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Received background message:', remoteMessage);
  const {title, body} = remoteMessage.data || {};
  const notification = {
    id: remoteMessage.messageId || 'default_id',
    title: title || 'Default Title',
    body: body || 'Default Body',
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      smallIcon: '@drawable/ic_notification', // Set your custom icon
      largeIcon: 'https://example.com/icon.png', // Optionally use an image URL
      color: '#5c9443', // Set custom color
    },
    ios: {
      sound: 'default',
    },
  };

  if (title && body) {
    // Optionally store the notification if needed
    // await storeNotification(notification);

    // Display notification with Notifee
    await notifee.displayNotification({
      id: remoteMessage.messageId,
      title: title,
      body: body,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        smallIcon: '@drawable/ic_notification',
        largeIcon: 'https://example.com/icon.png',
        color: '#5c9443',
      },
      ios: {
        sound: 'default',
      },
    });
  }
});

// Handle foreground notifications
messaging().onMessage(async remoteMessage => {
  console.log('Foreground notification received:', remoteMessage);
  const {title, body} = remoteMessage.data || {};
  const notification = {
    id: remoteMessage.messageId || 'default_id',
    title: title || 'Default Title',
    body: body || 'Default Body',
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
    },
    ios: {
      sound: 'default',
    },
  };

  if (title && body) {
    // Display notification with Notifee
    await notifee.displayNotification({
      id: remoteMessage.messageId,
      title: title,
      body: body,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        smallIcon: '@drawable/ic_notification',
        largeIcon: 'https://example.com/icon.png',
        color: '#5c9443',
      },
      ios: {
        sound: 'default',
      },
    });
  }

  // After a delay (useful for processing multiple notifications)
  setTimeout(() => {
    showAllPendingNotifications();
  }, 10000); // Show notifications after 10 seconds (for demo purposes)
});

// Listen for background notification events (e.g., when a notification is pressed)
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Background event:', type, detail);

  if (type === EventType.PRESS) {
    // Handle the notification press event
    console.log('Notification pressed:', detail.notification);
  }
});

// Initialize permissions and set up the app
async function initializeApp() {
  await createNotificationChannel(); // Create the notification channel
  await requestPermissions(); // Request permissions for iOS notifications
  // Any additional initialization steps
  requestAndroidNotificationPermission();
}

// Initialize the app when ready
initializeApp();

AppRegistry.registerComponent(appName, () => App);
