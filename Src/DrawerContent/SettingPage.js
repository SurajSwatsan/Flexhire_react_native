import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Global_CSS/TheamColors';

const SettingPage = () => {
  return (
    <View style={styles.bodyContainer}>
     
      <TouchableOpacity style={styles.container}>
        <View style={styles.innerContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={18}
            style={styles.iconnamestyle}
          />
          <View style={styles.TextContainer}>
            <Text style={styles.text}>Communication & privacy</Text>
            <Text style={styles.textContent}>
              Control the visibility of your profile to recruiter & companies
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            style={styles.iconstyle}
          />
        </View>
      </TouchableOpacity>

     
      <TouchableOpacity style={styles.container}>
        <View style={styles.innerContainer}>
          <Ionicons
            name="person-outline"
            size={18}
            style={styles.iconnamestyle}
          />
          <View style={styles.TextContainer}>
            <Text style={styles.text}>Account</Text>
            <Text style={styles.textContent}>
              Change your primary email, mobile number or password
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            style={styles.iconstyle}
          />
        </View>
      </TouchableOpacity>

     
      <TouchableOpacity style={styles.container}>
        <View style={styles.innerContainer}>
          <Ionicons
            name="briefcase-outline"
            size={18}
            style={styles.iconnamestyle}
          />
          <View style={styles.TextContainer}>
            <Text style={styles.text}>Career preferences</Text>
            <Text style={styles.textContent}>
              Flexhire shows job recommendations based on your career
              preferences
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            style={styles.iconstyle}
          />
        </View>
      </TouchableOpacity>

    
      <TouchableOpacity style={styles.container}>
        <View style={styles.innerContainer}>
          <Ionicons
            name="close-circle-outline"
            size={18}
            style={styles.iconnamestyle}
          />
          <View style={styles.TextContainer}>
            <Text style={styles.text}>Blocked companies</Text>
            <Text style={styles.textContent}>
              Choose the companies you do not want to show your profile on
              Flexhire
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            style={styles.iconstyle}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.cardBgcolor,
    // paddingTop: 16, // Adds some space on top
  },
  container: {
    marginHorizontal: 8,
    marginTop: 12,
    backgroundColor: colors.cardBgcolor,
    borderRadius: 8,
    overflow: 'hidden',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures elements are spaced out evenly
    alignItems: 'center', // Vertically centers the elements
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  TextContainer: {
    flexDirection: 'column',
    justifyContent: 'center', // Vertically center the text
    marginLeft: 12, // Adds space between the icon and text
    flex: 1, // Ensures text takes up available space
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500', // Make the title text bold
  },
  textContent: {
    fontSize: 11,
    color: 'gray',
    marginTop: 4, // Adds space between the title and content text
  },
  iconnamestyle: {
    backgroundColor: '#f1f1f1',
    padding: 6,
    borderRadius: 16,
    color: colors.blackText,
  },
  iconstyle: {
    color: colors.primary,
  },
});

export default SettingPage;
