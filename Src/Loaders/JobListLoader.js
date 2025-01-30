import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Svg, {Circle, Rect, Defs, LinearGradient, Stop} from 'react-native-svg';
const {width, height} = Dimensions.get('window');
const JobListLoader = () => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Circle with custom color */}
        {/* Rectangles for Job Card 1 skeleton loader */}
        <Rect
          x="10"
          y="10"
          width="390"
          height="170"
          fill="#fff"
          rx="8"
          ry="8"
        />
        <Circle cx="60" cy="50" r="30" fill="#d9d9d9" />
        <Rect x="110" y="30" width="180" height="15" fill="#d9d9d9" />
        <Rect x="110" y="50" width="180" height="15" fill="#d9d9d9" />
        <Rect x="360" y="30" width="15" height="20" fill="#bfbfbf" />
        <Rect x="30" y="95" width="190" height="15" fill="#d9d9d9" />
        <Rect x="30" y="115" width="190" height="15" fill="#bfbfbf" />
        <Rect x="20" y="140" width="360" height="1" fill="#d9d9d9" />
        <Rect x="30" y="150" width="150" height="15" fill="#d9d9d9" />
        <Rect x="320" y="150" width="60" height="15" fill="#bfbfbf" />
        {/* Rectangles for Job Card 2 skeleton loader */}
        <Rect
          x="10"
          y="200"
          width="390"
          height="170"
          fill="#fff"
          rx="8"
          ry="8"
        />
        <Circle cx="60" cy="240" r="30" fill="#d9d9d9" />
        <Rect x="110" y="220" width="180" height="15" fill="#d9d9d9" />
        <Rect x="110" y="240" width="180" height="15" fill="#d9d9d9" />
        <Rect x="360" y="220" width="15" height="20" fill="#bfbfbf" />
        <Rect x="30" y="285" width="190" height="15" fill="#d9d9d9" />
        <Rect x="30" y="305" width="190" height="15" fill="#bfbfbf" />
        <Rect x="20" y="330" width="360" height="1" fill="#d9d9d9" />
        <Rect x="30" y="340" width="150" height="15" fill="#d9d9d9" />
        <Rect x="320" y="340" width="60" height="15" fill="#bfbfbf" />
        {/* Rectangles for Job Card 3 skeleton loader */}
        <Rect
          x="10"
          y="390"
          width="390"
          height="170"
          fill="#fff"
          rx="8"
          ry="8"
        />
        <Circle cx="60" cy="430" r="30" fill="#d9d9d9" />
        <Rect x="110" y="410" width="180" height="15" fill="#d9d9d9" />
        <Rect x="110" y="430" width="180" height="15" fill="#d9d9d9" />
        <Rect x="360" y="410" width="15" height="20" fill="#bfbfbf" />
        <Rect x="30" y="475" width="190" height="15" fill="#d9d9d9" />
        <Rect x="30" y="495" width="190" height="15" fill="#bfbfbf" />
        <Rect x="20" y="520" width="360" height="1" fill="#d9d9d9" />
        <Rect x="30" y="530" width="150" height="15" fill="#d9d9d9" />
        <Rect x="320" y="530" width="60" height="15" fill="#bfbfbf" />

        {/* Rectangles for Job Card 3 skeleton loader */}
        <Rect
          x="10"
          y="580"
          width="390"
          height="180"
          fill="#fff"
          rx="8"
          ry="8"
        />
        <Circle cx="60" cy="620" r="30" fill="#d9d9d9" />
        <Rect x="110" y="600" width="180" height="15" fill="#d9d9d9" />
        <Rect x="110" y="620" width="180" height="15" fill="#d9d9d9" />
        <Rect x="360" y="600" width="15" height="20" fill="#bfbfbf" />
        <Rect x="30" y="665" width="190" height="15" fill="#d9d9d9" />
        <Rect x="30" y="685" width="190" height="15" fill="#bfbfbf" />
        <Rect x="20" y="710" width="360" height="1" fill="#d9d9d9" />
        <Rect x="30" y="720" width="150" height="15" fill="#d9d9d9" />
        <Rect x="320" y="720" width="60" height="15" fill="#bfbfbf" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});

export default JobListLoader;
