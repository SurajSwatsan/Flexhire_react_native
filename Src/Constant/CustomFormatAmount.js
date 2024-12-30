import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import JobCardStyle from '../Global_CSS/JobCardStyle';

const CustomFormatAmount = ({amount}) => {
  function formatAmount(value) {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(1) + ' Cr';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1) + ' Lac';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + ' K';
    } else {
      return value.toString();
    }
  }
  return (
    <View style={styles.container}>
      <Text style={JobCardStyle.jobDetailsalary}>{formatAmount(amount)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomFormatAmount;
