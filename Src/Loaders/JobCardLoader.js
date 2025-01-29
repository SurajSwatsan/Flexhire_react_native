import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, Rect, Defs, LinearGradient, Stop} from 'react-native-svg';

const JobCardLoader = () => {
  return (
    <View style={styles.container}>
      <Svg width="400" height="220" viewBox="0 0 400 220">
        {/* Circle with custom color */}

        {/* Rectangles for Job Card skeleton loader */}
        <Rect x="10" y="10" width="380" height="180" fill="#e0e0e0" />
        <Circle cx="60" cy="60" r="35" fill="#bfbfbf" />

        <Rect x="130" y="30" width="180" height="15" fill="#d9d9d9" />
        <Rect x="130" y="50" width="180" height="15" fill="#d9d9d9" />

        <Rect x="350" y="30" width="20" height="25" fill="#d9d9d9" />

        <Rect x="30" y="105" width="190" height="15" fill="#d9d9d9" />
        <Rect x="30" y="125" width="190" height="15" fill="#d9d9d9" />

        <Rect x="20" y="150" width="360" height="2" fill="#d9d9d9" />

        <Rect x="30" y="160" width="150" height="15" fill="#d9d9d9" />
        <Rect x="320" y="160" width="60" height="15" fill="#d9d9d9" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JobCardLoader;
