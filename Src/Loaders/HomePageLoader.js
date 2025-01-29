import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, Rect, Defs, LinearGradient, Stop} from 'react-native-svg';

const HomePageLoader = () => {
  return (
    <View style={styles.container}>
      <Svg width="400" height="580" viewBox="0 0 400 580">
        {/* Circle with custom color */}

        {/* Rectangles for skeleton loader */}
        <Rect x="10" y="10" width="380" height="150" fill="#e0e0e0" />
        <Circle cx="80" cy="80" r="50" fill="#bfbfbf" />

        <Rect x="40" y="135" width="80" height="15" fill="#d9d9d9" />
        <Rect x="140" y="50" width="200" height="15" fill="#d9d9d9" />
        <Rect x="140" y="70" width="200" height="15" fill="#d9d9d9" />
        <Rect x="140" y="90" width="200" height="15" fill="#d9d9d9" />

        {/* Heading of Job Card  */}
        <Rect x="10" y="180" width="170" height="15" fill="#e0e0e0" />
        <Rect x="320" y="180" width="70" height="15" fill="#e0e0e0" />
        {/* Job Card for skeleton loader */}

        <Rect x="10" y="210" width="270" height="160" fill="#e0e0e0" />
        <Rect x="300" y="210" width="90" height="160" fill="#e0e0e0" />
        <Circle cx="350" cy="260" r="35" fill="#bfbfbf" />
        <Circle cx="60" cy="260" r="35" fill="#bfbfbf" />

        <Rect x="110" y="240" width="120" height="15" fill="#d9d9d9" />
        <Rect x="110" y="260" width="120" height="15" fill="#d9d9d9" />
        <Rect x="30" y="300" width="180" height="15" fill="#d9d9d9" />
        <Rect x="320" y="300" width="70" height="15" fill="#d9d9d9" />
        <Rect x="30" y="320" width="180" height="15" fill="#d9d9d9" />
        <Rect x="320" y="320" width="70" height="15" fill="#d9d9d9" />
        <Rect x="30" y="340" width="180" height="15" fill="#d9d9d9" />
        <Rect x="320" y="340" width="70" height="15" fill="#d9d9d9" />

        {/* Heading of Job Card  */}
        <Rect x="10" y="390" width="170" height="15" fill="#e0e0e0" />
        <Rect x="320" y="390" width="70" height="15" fill="#e0e0e0" />
        {/* Job Card for skeleton loader */}

        <Rect x="10" y="420" width="270" height="160" fill="#e0e0e0" />
        <Rect x="300" y="420" width="90" height="160" fill="#e0e0e0" />
        <Circle cx="350" cy="470" r="35" fill="#bfbfbf" />
        <Circle cx="60" cy="470" r="35" fill="#bfbfbf" />

        <Rect x="110" y="470" width="120" height="15" fill="#d9d9d9" />
        <Rect x="110" y="450" width="120" height="15" fill="#d9d9d9" />
        <Rect x="30" y="510" width="180" height="15" fill="#d9d9d9" />
        <Rect x="320" y="510" width="70" height="15" fill="#d9d9d9" />
        <Rect x="30" y="530" width="180" height="15" fill="#d9d9d9" />
        <Rect x="320" y="530" width="70" height="15" fill="#d9d9d9" />
        <Rect x="30" y="550" width="180" height="15" fill="#d9d9d9" />
        <Rect x="320" y="550" width="70" height="15" fill="#d9d9d9" />
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

export default HomePageLoader;
