import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileImage from './Profile/ProfileImage';
import TopSection from './Profile/TopSection';
import {colors} from '../../Global_CSS/TheamColors';
const screenWidth = Dimensions.get('window').width;
const Index = () => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => {}}>
        <TopSection onPress={() => {}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: screenWidth,
    backgroundColor: colors.background,
  },
});

export default Index;
