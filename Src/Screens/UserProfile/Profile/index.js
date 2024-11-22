import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Personaldetails from './PersonalInformation';
import {colors} from '../../../Global_CSS/TheamColors';
import BasicDetails from './BasicInformation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PersonalInformation from './PersonalInformation';
import profileStyle from '../ProfileStyle';
import Keyskills from './Keyskills';
import {max} from 'moment';
import BasicInformation from './BasicInformation';
import Languages from './Languages';

const Index = () => {
  const route = useRoute();
  const {selectedImage} = route.params || {};
  const [activeTab, setActiveTab] = useState('Personal');

  const renderTabs = () => {
    switch (activeTab) {
      case 'Personal':
        return (
          <View style={styles.personalContainer}>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>CONTACT DETAIL</Text>
                <TouchableOpacity>
                  <View style={styles.contactTextCon}>
                    <Ionicons
                      name="mail-outline"
                      size={24}
                      style={styles.iconstyle}
                    />
                    <View>
                      <Text style={{color: '#000'}}>Email</Text>
                      <Text style={{color: '#000'}}>vinodgavade@.com</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.contactTextCon}>
                    <Ionicons
                      name="phone-portrait-sharp"
                      size={24}
                      style={styles.iconstyle}
                    />
                    <View>
                      <Text style={{color: '#000'}}>Phone Number</Text>
                      <Text style={{color: '#000'}}>9876543210</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <BasicInformation />
              <PersonalInformation />
              <Keyskills />
              <Languages />
            </ScrollView>
          </View>
        );
      case 'Education':
        return <View></View>;
      case 'Professional':
        return <View></View>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headContainer}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{uri: selectedImage}} style={styles.image} />
          ) : (
            <Image
              source={require('../../../Assets/Images/def_prof_image.png')}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.nameTextContainer}>
          <Text style={styles.nameText}>Vinod Gavade</Text>
          <Text style={styles.profhedline}>
            Experienced Mobile Developer | Proficient in React Native, Redux,
            and APIs
          </Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        {/* <ScrollView style={styles.ScrollViewContainer}> */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Personal' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('Personal')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Personal' && styles.activeTabText,
              ]}>
              Personal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Education' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('Education')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Education' && styles.activeTabText,
              ]}>
              Education
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Professional' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('Professional')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Professional' && styles.activeTabText,
              ]}>
              Professional
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>{renderTabs()}</View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.primary,
    flex: 1,
    marginBottom: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 24,
    backgroundColor: colors.primary,
  },
  imageContainer: {
    width: 84,
    height: 84,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.whiteText,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.whiteText,
  },
  profhedline: {
    fontSize: 12,
    color: '#f2f2f2',
  },
  nameTextContainer: {
    flex: 1,
    marginHorizontal: 18,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.cardBgcolor,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 12,
  },
  scrollContainer: {
    // marginBottom: 56,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 24,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  activeTab: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 4,
  },
  tabText: {
    color: colors.blackText,
  },
  activeTabText: {
    color: colors.secodary,
  },
  personalContainer: {
    padding: 12,
  },

  contactText: {
    color: colors.secodary,
    fontWeight: '600',
  },
  contactContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    marginBottom: 8,
  },
  contactTextCon: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 18,
    gap: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  iconstyle: {
    color: colors.primary,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
});

export default Index;
