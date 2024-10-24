import React, {useEffect} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import CustomDrawer from '../Navigation/CustomDrawer';
import CustomBottomTab from '../Navigation/CustomBottomTab';

const DefaultScreen = () => {
  return (
    <View style={styles.container}>
      <CustomDrawer />
      <CustomBottomTab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full height of the screen
    backgroundColor: '#ffffff', // Set background color to light gray
  },
});

export default DefaultScreen;
