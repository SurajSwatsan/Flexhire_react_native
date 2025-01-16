import React, {useState, useCallback, useEffect} from 'react';
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
import UserProfile from '../Screens/BottomTabScreens/UserProfileScreen';
import UserInvites from '../Screens/BottomTabScreens/UserInvitesScreen';
import UserApplies from '../Screens/BottomTabScreens/UserAppliesScreen';
import HomeComponent from '../Screens/BottomTabScreens/HomeScreen';
import {colors} from '../Global_CSS/TheamColors';
import JobScreen from '../Screens/BottomTabScreens/JobScreen';
import {useDispatch} from 'react-redux';

const CustomBottomTab = () => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (selectedTab !== 'Jobs') {
      dispatch({type: 'CLEAR_JOB_LIST', payload: ''});
    }
  }, [selectedTab]);

  const renderTabBtn = (tabName, iconName, label) => {
    return (
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === tabName ? styles.selectedTab : styles.notselectedTab,
        ]}
        onPress={() => {
          console.log('selectedTab', selectedTab, tabName);
          setSelectedTab(tabName);
        }}>
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
  };
  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          {selectedTab === 'Home' && <HomeComponent />}
          {selectedTab === 'Applies' && <UserApplies />}
          {selectedTab === 'Invites' && <UserInvites />}
          {selectedTab === 'Profile' && <UserProfile />}
          {selectedTab === 'Jobs' && <JobScreen />}
        </View>
        <View style={styles.tabContainer}>
          {renderTabBtn('Home', 'home', 'Home')}
          {renderTabBtn('Applies', 'send', 'Applies')}
          {renderTabBtn('Jobs', 'briefcase', 'Jobs')}
          {renderTabBtn('Invites', 'mail-sharp', 'Invites')}
          {renderTabBtn('Profile', 'person-sharp', 'Profile')}
        </View>
      </View>
    </PaperProvider>
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
