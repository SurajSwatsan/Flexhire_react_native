import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import UserProfile from '../Common/UserProfile';
import UserInvites from '../Common/UserInvites';
import UserApplies from '../Common/UserApplies';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeComponent from '../Common/HomeComponent';
import BookmarkScreen from '../Common/bookmark';

const CustomBottomTab = () => {
  const [selectedTab, setSelectedTab] = useState('Home');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Home':
        return <HomeComponent />;
      case 'Applies':
        return <UserApplies />;
      case 'Invites': // Change this from 'Settings' to 'Invites'
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
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Home' ? styles.selectedTab : styles.notselectedTab,
          ]}
          onPress={() => setSelectedTab('Home')}>
          <Ionicons
            name="home"
            size={24}
            style={
              selectedTab === 'Home' ? styles.selectedTabicon : styles.tabicon
            }
          />
          <Text
            style={
              selectedTab === 'Home' ? styles.selectedTabText : styles.tabText
            }>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Applies'
              ? styles.selectedTab
              : styles.notselectedTab,
          ]}
          onPress={() => setSelectedTab('Applies')}>
          <Ionicons
            name="send"
            size={24}
            style={
              selectedTab === 'Applies'
                ? styles.selectedTabicon
                : styles.tabicon
            }
          />
          <Text
            style={
              selectedTab === 'Applies'
                ? styles.selectedTabText
                : styles.tabText
            }>
            Applies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Invites'
              ? styles.selectedTab
              : styles.notselectedTab,
          ]}
          onPress={() => setSelectedTab('Invites')}>
          <Ionicons
            name="mail-sharp"
            size={24}
            style={
              selectedTab === 'Invites'
                ? styles.selectedTabicon
                : styles.tabicon
            }
          />
          <Text
            style={
              selectedTab === 'Invites'
                ? styles.selectedTabText
                : styles.tabText
            }>
            Invites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Bookmark'
              ? styles.selectedTab
              : styles.notselectedTab,
          ]}
          onPress={() => setSelectedTab('Bookmark')}>
          <Ionicons
            name="bookmark"
            size={24}
            style={
              selectedTab === 'Bookmark'
                ? styles.selectedTabicon
                : styles.tabicon
            }
          />
          <Text
            style={
              selectedTab === 'Bookmark'
                ? styles.selectedTabText
                : styles.tabText
            }>
            Bookmark
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'Profile'
              ? styles.selectedTab
              : styles.notselectedTab,
          ]}
          onPress={() => setSelectedTab('Profile')}>
          <Ionicons
            name="person-sharp"
            size={24}
            style={
              selectedTab === 'Profile'
                ? styles.selectedTabicon
                : styles.tabicon
            }
          />
          <Text
            style={
              selectedTab === 'Profile'
                ? styles.selectedTabText
                : styles.tabText
            }>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    borderColor: '#4f84c4',
    // borderColor: '#00334d',
    backgroundColor: '#4f84c4',
    // backgroundColor: '#00334d',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f84c4',
    // backgroundColor: '#00334d',
    // height: 50,
  },
  tabText: {
    fontSize: 12,
    color: '#fff',
  },
  selectedTabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4f84c4',
    // color: '#00334d',
  },
  selectedTabicon: {
    color: '#4f84c4',
    // color: '#00334d',
  },
  tabicon: {
    color: '#fff',
  },
  selectedTab: {
    backgroundColor: '#fff',
  },
  notselectedTab: {
    backgroundColor: '#4f84c4',
    // backgroundColor: '#00334d',
  },
});

export default CustomBottomTab;
