import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, Rect, Defs, LinearGradient, Stop} from 'react-native-svg';

const JobDetailsLoader = () => {
  return (
    <View style={styles.container}>
      <Svg width="400" height="580" viewBox="0 0 400 580">
        {/* Circle with custom color */}
        <Circle cx="200" cy="40" r="35" fill="#d9d9d9" />

        {/* Rectangles for skeleton loader */}
        <Rect x="100" y="80" width="200" height="20" fill="#d9d9d9" />
        <Rect x="120" y="110" width="150" height="15" fill="#d9d9d9" />
        <Rect x="10" y="140" width="380" height="15" fill="#d9d9d9" />
        <Rect x="10" y="160" width="380" height="15" fill="#d9d9d9" />
        <Rect x="10" y="180" width="380" height="15" fill="#d9d9d9" />
        <Rect x="10" y="210" width="180" height="40" fill="#d9d9d9" />
        <Rect x="210" y="210" width="180" height="40" fill="#d9d9d9" />
        <Rect x="10" y="260" width="180" height="40" fill="#d9d9d9" />
        <Rect x="210" y="260" width="180" height="40" fill="#d9d9d9" />

        {/* Tabs within the SVG */}
        <Rect x="10" y="320" width="120" height="40" fill="#bfbfbf" />
        <Rect x="140" y="320" width="120" height="40" fill="#e0e0e0" />
        <Rect x="270" y="320" width="120" height="40" fill="#d9d9d9" />
        {/* Job Description Skeleton Loader */}
        {/* Job title */}
        <Rect x="10" y="370" width="380" height="20" fill="#d9d9d9" />

        {/* Company name */}
        <Rect x="10" y="400" width="200" height="15" fill="#d9d9d9" />

        {/* Job description lines */}
        <Rect x="10" y="430" width="380" height="15" fill="#d9d9d9" />
        <Rect x="10" y="450" width="380" height="15" fill="#d9d9d9" />
        <Rect x="10" y="470" width="380" height="15" fill="#d9d9d9" />
        <Rect x="10" y="490" width="380" height="15" fill="#d9d9d9" />
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

export default JobDetailsLoader;
