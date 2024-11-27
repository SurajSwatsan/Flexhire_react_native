import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomHeader from '../../Constant/CustomBackIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompanyCard from '../../Constant/CustomJobCard';
import {colors} from '../../Global_CSS/TheamColors';

const SavedJobScreen = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    padding: 12,
  },
 
});

export default SavedJobScreen;
