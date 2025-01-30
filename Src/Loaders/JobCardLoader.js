import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Svg, {Circle, Rect, Defs, LinearGradient, Stop} from 'react-native-svg';
const {width, height} = Dimensions.get('window');

const JobCardLoader = () => {
  return (
    <View style={styles.container}>
      <Svg width={width} height="200" viewBox={`0 0 ${width} 200`}>
        {/* Rectangles for Job Card skeleton loader */}
        <Rect
          x="10"
          y="10"
          width="390"
          height="180"
          fill="#fff"
          rx="8"
          ry="8"
        />
        <Circle cx="60" cy="60" r="35" fill="#d9d9d9" />

        <Rect x="130" y="30" width="180" height="15" fill="#d9d9d9" />
        <Rect x="130" y="50" width="180" height="15" fill="#d9d9d9" />

        <Rect x="360" y="30" width="15" height="20" fill="#bfbfbf" />

        <Rect x="30" y="105" width="190" height="15" fill="#d9d9d9" />
        <Rect x="30" y="125" width="190" height="15" fill="#bfbfbf" />

        <Rect x="20" y="150" width="360" height="1" fill="#d9d9d9" />

        <Rect x="30" y="160" width="150" height="15" fill="#d9d9d9" />
        <Rect x="320" y="160" width="60" height="15" fill="#bfbfbf" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
});

export default JobCardLoader;
