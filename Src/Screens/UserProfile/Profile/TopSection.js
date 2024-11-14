import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ProfileImage from './ProfileImage';

const TopSection = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <ProfileImage />
        </View>
        <Text style={styles.nameText}>Vinod Gavade</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    marginBottom: 20, // Space between image and text
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default TopSection;
