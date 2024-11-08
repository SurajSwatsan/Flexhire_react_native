import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import UserProfile from '../Common/UserProfile';
import UserInvites from '../Common/UserInvites';
import UserApplies from '../Common/UserApplies';
import HomeComponent from '../Common/HomeComponent';
import BookmarkScreen from '../Common/bookmark';
import {colors} from '../Global_CSS/theamColors';

const CustomBottomTab = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (selectedTab === 'Home') {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {
              text: 'No',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => BackHandler.exitApp(),
            },
          ]);
          return true; // Prevent default behavior
        } else {
          setSelectedTab('Home'); // Navigate back to Home tab
          return true; // Prevent default back action
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup on unmount
    }, [selectedTab]),
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'Home':
        return <HomeComponent />;
      case 'Applies':
        return <UserApplies />;
      case 'Invites':
        return <UserInvites />;
      case 'Profile':
        return <UserProfile />;
      case 'Bookmark':
        return <BookmarkScreen />;
      default:
        return <HomeComponent />;
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.content}>{renderContent()}</View>
        <View style={styles.tabContainer}>
          {renderTab('Home', 'home', 'Home')}
          {renderTab('Applies', 'send', 'Applies')}
          {renderTab('Invites', 'mail-sharp', 'Invites')}
          {renderTab('Bookmark', 'bookmark', 'Bookmark')}
          {renderTab('Profile', 'person-sharp', 'Profile')}
        </View>
      </View>
    </PaperProvider>
  );

  function renderTab(tabName, iconName, label) {
    return (
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === tabName ? styles.selectedTab : styles.notselectedTab,
        ]}
        onPress={() => setSelectedTab(tabName)}>
        <Ionicons
          name={iconName}
          size={18}
          style={
            selectedTab === tabName ? styles.selectedTabicon : styles.tabicon
          }
        />
        <Text
          style={
            selectedTab === tabName ? styles.selectedTabText : styles.tabText
          }>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    // borderTopWidth: 1,
    // borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    color: '#fff',
  },
  selectedTabText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  selectedTabicon: {
    color: colors.primary,
  },
  tabicon: {
    color: '#fff',
  },
  selectedTab: {
    backgroundColor: '#fff',
  },
  notselectedTab: {
    backgroundColor: colors.primary,
  },
});

export default CustomBottomTab;
