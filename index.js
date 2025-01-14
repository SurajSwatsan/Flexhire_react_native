import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Request Notification Permissions for iOS
async function requestPermissions() {
  if (Platform.OS === 'ios') {
    const settings = await notifee.requestPermission();
    // console.log('Permission settings:', settings); // Debugging purpose
  }
}

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
      });  }
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
    await storeNotification(notification);
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
    // Example: navigate to a specific screen
    console.log('Notification pressed:', detail.notification);
  }
});

// Initialize permissions and set up the app
async function initializeApp() {
  await requestPermissions(); // Request permissions for iOS notifications
  // Any additional initialization steps
}

// Initialize the app when ready
initializeApp();

AppRegistry.registerComponent(appName, () => App);
