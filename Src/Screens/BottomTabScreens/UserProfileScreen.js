import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Index from '../UserProfile';
// import Index from '../Profile Screen';

const UserProfile = () => {
  return (
    <View style={styles.mainContainer}>
      {/* <Index /> */}
      <Index />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
});
