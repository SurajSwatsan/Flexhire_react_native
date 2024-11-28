import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import CustomDrawer from '../CustomDrawer';

const CustomHeader = () => {
 
  return (
    <View style={styles.nav}>
      <CustomDrawer />
      <IconButton
        icon="bell"
        onPress={() => navigation.navigate('Notification')}
        iconColor="#333"
        size={30}
      />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#ffffff',
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
