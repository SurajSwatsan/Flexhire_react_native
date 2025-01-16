import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthViewController from '../Redux/Action/AuthViewController';
import JobViewController from '../Redux/Action/jobViewController';
import UserProfileViewController from '../Redux/Action/UserProfileViewController';
import {useDispatch} from 'react-redux';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {checkLoginStatus} = AuthViewController();
  const {GetHomePageData} = JobViewController();
  const {GetProfileDetails} = UserProfileViewController();
  const dispatch = useDispatch();
  const [id, setId] = useState();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage
        if (token) {
          const _user_id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
          setId(_user_id);
          dispatch(GetHomePageData(_user_id));
          dispatch(GetProfileDetails(_user_id));
          navigation.replace('DefaultScreen');
        } else {
          navigation.replace('LoginScreen');
        }
      } catch (error) {
        console.error('Error during initialization:', error);
        navigation.replace('LoginScreen'); // Fallback to login on error
      }
    };

    const timeout = setTimeout(initializeApp, 3000); // Delay for 3 seconds to show splash
    return () => clearTimeout(timeout); // Clear timeout on unmount
  }, [checkLoginStatus, navigation]);

  return (
    <View style={styles.container}>
      <View></View>
      {/* <Image
        style={styles.imagestyle}
        source={require('../Assets/CompanyLogo/flexhire-logo.png')}
      /> */}
      <Text style={styles.companyname}>FlexHire</Text>

      <View style={styles.textContainer}>
        <Text style={styles.textcintainer1}>Powered by</Text>
        <Image
          style={styles.swatsanlogo}
          source={require('../Assets/CompanyLogo/swatsan_logo.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textcintainer1: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#808080',
    textAlign: 'center',
  },
  companyname: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#004466',
  },
  textContainer: {
    marginBottom: 36,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  swatsanlogo: {
    height: 36,
    width: 200,
    maxWidth: 200,
  },
  imagestyle: {
    justifyContent: 'center',
    height: 130,
    width: 240,
  },
});

export default SplashScreen;
