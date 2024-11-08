import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../Global_CSS/theamColors';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const UserApplies = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.applyContainer}>
      <View style={styles.ImageContainer}>
        <Image
          source={require('../Assets/ApplyImages/apply.png')}
          style={styles.Image}
        />

        <Text style={styles.textContainer}>You havn't applied yet!</Text>
      </View>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          Search for jobs and start applying. You can track your applications
          here!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('searchjob', {query: ''})}>
        <Text style={styles.buttonText}>Start my job search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserApplies;

const styles = StyleSheet.create({
  applyContainer: {
    flex: 1,
    backgroundColor: colors.bacground,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    textAlign: 'center',
    padding: 5,
    // margin: 10,
  },
  Image: {
    height: 200,
    width: 200,
  },

  textContainer: {
    fontSize: 20,
    color: colors.textprimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },
  bottomText: {
    fontSize: 14,
    color: colors.textprimary,
    textAlign: 'center',
    // paddingHorizontal: 10, // Optional: Add padding for text
  },

  buttonContainer: {
    backgroundColor: colors.textsecondary,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
