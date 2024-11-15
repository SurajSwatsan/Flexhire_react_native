import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileImage from './Profile/ProfileImage';
import {colors} from '../../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image URI
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('userProfileScreen', {selectedImage})
          }>
          <View style={styles.headContainer}>
            <View style={styles.imageContainer}>
              {/* Display Profile Image */}
              <ProfileImage
                onImageSelect={setSelectedImage} // Pass function to update selected image
                selectedImage={selectedImage} // Pass current selected image
              />
            </View>
            <Text style={styles.nameText}>Vinod Gavade</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bodyContainer}>
          <Text style={styles.headingText}>Explore Profile</Text>
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.navigate('userProfileScreen', {selectedImage})
            }>
            <View style={styles.innerContainer}>
              <Ionicons
                name="person-sharp"
                size={18}
                style={styles.iconstyle}
              />
              <Text style={styles.text}>Profile</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              style={styles.iconstyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <View style={styles.innerContainer}>
              <Ionicons
                name="checkmark-circle-sharp"
                size={18}
                style={styles.iconstyle}
              />
              <Text style={styles.text}>Applied Jobs</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              style={styles.iconstyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <View style={styles.innerContainer}>
              <Ionicons
                name="arrow-down-circle-sharp"
                size={18}
                style={styles.iconstyle}
              />
              <Text style={styles.text}>Saved Jobs</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              style={styles.iconstyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <View style={styles.innerContainer}>
              <Ionicons
                name="people-circle-sharp"
                size={18}
                style={styles.iconstyle}
              />
              <Text style={styles.text}>My Interviews</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              style={styles.iconstyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <View style={styles.innerContainer}>
              <Ionicons
                name="chatbox-ellipses-sharp"
                size={18}
                style={styles.iconstyle}
              />
              <Text style={styles.text}>My Chats</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              style={styles.iconstyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <View style={styles.innerContainer}>
              <Ionicons name="wifi-sharp" size={18} style={styles.iconstyle} />
              <Text style={styles.text}>Personalize Jobfeed</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              style={styles.iconstyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.container}>
            <View style={styles.innerContainer}>
              <Ionicons
                name="file-tray-stacked-sharp"
                size={18}
                style={styles.iconstyle}
              />
              <Text style={styles.text}>Learning Center</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              style={styles.iconstyle}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  headContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 24,
  },
  nameText: {
    marginTop: 12,
    marginBottom: 18,

    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: colors.whiteText,
  },
  headingText: {
    marginVertical: 20,
    fontSize: 18,
    color: colors.blackText,
    fontWeight: 'bold',
    marginLeft: 18,
  },
  bodyContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.cardBgcolor,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  container: {
    justifyContent: 'space-between',
    marginVertical: 12,
    marginHorizontal: 24,
    flexDirection: 'row',
    backgroundColor: colors.cardBgcolor,
    borderRadius: 8,
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
  },
  iconstyle: {
    color: colors.primary,
  },
});

export default Index;
