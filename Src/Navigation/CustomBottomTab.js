import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  Dialog,
  Portal,
  Button,
  Provider as PaperProvider,
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfile from '../Common/UserProfile';
import UserInvites from '../Common/UserInvites';
import UserApplies from '../Common/UserApplies';
import HomeComponent from '../Common/HomeComponent';
import BookmarkScreen from '../Common/bookmark';
import {colors} from '../Global_CSS/theamColors';

const CustomBottomTab = () => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [exitDialogVisible, setExitDialogVisible] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      if (selectedTab === 'Home') {
        // Show dialog when on Home tab
        setExitDialogVisible(true);
      } else {
        // Navigate back to Home if on another tab
        setSelectedTab('Home');
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, [selectedTab]);

  const hideDialog = () => setExitDialogVisible(false);

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

        {/* Exit Confirmation Dialog */}
        <Portal>
          <Dialog
            visible={exitDialogVisible}
            onDismiss={hideDialog}
            style={styles.dialogContainer}>
            <Dialog.Title style={styles.dialogTitle}>Exit App</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogContent}>
                Do you really want to exit the app?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={hideDialog}
                style={styles.dialogButton}
                labelStyle={styles.dialogButtonLabel}>
                Cancel
              </Button>
              <Button
                onPress={() => BackHandler.exitApp()}
                style={styles.dialogButton}
                labelStyle={styles.dialogButtonLabel}>
                Yes
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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

  // Dialog styles
  dialogContainer: {
    backgroundColor: colors.primary, // background color of the dialog
    borderRadius: 8, // rounded corners
    paddingHorizontal: 10,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cardcolor, // color for the title text
  },
  dialogContent: {
    fontSize: 16,
    color: colors.cardcolor, // text color
    marginVertical: 10,
  },
  dialogButton: {
    marginRight: 10, // spacing between buttons
  },
  dialogButtonLabel: {
    color: colors.cardcolor, // button label color
  },
});

export default CustomBottomTab;
