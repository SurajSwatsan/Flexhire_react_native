import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfile from '../Common/UserProfile';
import UserInvites from '../Common/UserInvites';
import UserApplies from '../Common/UserApplies';
import HomeComponent from '../Common/HomeComponent';
import BookmarkScreen from '../Common/bookmark';
import {colors} from '../Global_CSS/theamColors';

const CustomBottomTab = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  useEffect(() => {
    const handleBackPress = () => {
      if (selectedTab === 'Home') {
        // If on the Home tab, show exit alert
        Alert.alert('Exit App', 'Do you want to exit?', [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
      } else {
        // If on any other tab, navigate back to Home tab
        setSelectedTab('Home');
      }
      return true;
    };

    // Add back button listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove listener on component unmount
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [selectedTab]);

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
    <View style={styles.container}>
      {/* Render the selected screen */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Bottom Tab Navigation */}
      <View style={styles.tabContainer}>
        {renderTab('Home', 'home', 'Home')}
        {renderTab('Applies', 'send', 'Applies')}
        {renderTab('Invites', 'mail-sharp', 'Invites')}
        {renderTab('Bookmark', 'bookmark', 'Bookmark')}
        {renderTab('Profile', 'person-sharp', 'Profile')}
      </View>
    </View>
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
          size={24}
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
    borderTopWidth: 1,
    borderColor: colors.primary,
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
    fontSize: 14,
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
