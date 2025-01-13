import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {colors} from '../../../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Education from './Education/Education';
import HigherEducation from './Education/HigherEducation';
import Employment from './Professional/Employment';
import Itskills from './Professional/Itskills';
import Projects from './Professional/Projects';
import Accomplishments from './Professional/Accomplishments';
import CareerInformation from './Personal/CareerInformation';
import Keyskills from './Education/Keyskills';
import BasicInformation from './Personal/BasicInformation';
import Languages from './Personal/Languages';
import {useDispatch, useSelector} from 'react-redux';
import UserProfileViewController from '../../../Redux/Action/UserProfileViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Availability from './Personal/Availability';
import {ProfileContext} from '../ProfileContext';
import ProfileHeadline from './ProfileHeadline';
import Spinner from 'react-native-loading-spinner-overlay';
import GlobalStyle from '../../../Global_CSS/GlobalStyle';
const Index = () => {
  const {isUpdatedProfile, toggleIsUpdatedProfile} = useContext(ProfileContext);
  const [loading, setLoading] = useState(true); // Loader state
  const route = useRoute();
  const {selectedImage} = route.params || {};
  const [activeTab, setActiveTab] = useState('Personal');
  const dispatch = useDispatch();
  const {GetProfileDetails} = UserProfileViewController();
  const {profileDetails, isLoading} = useSelector(state => state.profile);
  const [id, setId] = useState();
  const isFocus = useIsFocused();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('user_data');
        if (storedId) {
          setId(storedId);
          await dispatch(GetProfileDetails(storedId));
        }
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
        setLoading(false); // Stop loader in case of error
      }
    };

    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus, isUpdatedProfile]); // Dependency array includes isFocused

  const renderTabs = () => {
    const profileData = profileDetails?.job_seeker_profile;

    if (!profileDetails) return null;
    switch (activeTab) {
      case 'Personal':
        return (
          <View style={styles.personalContainer}>
            <ScrollView style={styles.scrollContainer}>
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>CONTACT DETAIL</Text>
                <TouchableOpacity style={styles.contactTextCon}>
                  <Ionicons
                    name="mail-outline"
                    size={24}
                    style={styles.iconstyle}
                  />
                  <View>
                    <Text style={{color: '#000'}}>Email</Text>
                    <Text style={{color: '#000'}}>{profileDetails?.email}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.contactTextCon}>
                  <Ionicons
                    name="phone-portrait-sharp"
                    size={24}
                    style={styles.iconstyle}
                  />
                  <View>
                    <Text style={{color: '#000'}}>Phone Number</Text>
                    <Text style={{color: '#000'}}>
                      {profileDetails?.mobile_number}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <BasicInformation
                profileDetails={profileDetails.job_seeker_profile}
              />
              <CareerInformation
                profileDetails={profileDetails.job_seeker_profile}
              />
              <Availability
                profileDetails={profileDetails.job_seeker_profile}
              />

              <Languages profileDetails={profileDetails.job_seeker_profile} />
              <View style={{height: 100}} />
            </ScrollView>
          </View>
        );
      case 'Education':
        return (
          <View>
            <FlatList
              data={[1]} // Dummy data to ensure FlatList renders
              renderItem={() => (
                <>
                  <Education
                    profileDetails={profileDetails.job_seeker_profile}
                  />
                  <HigherEducation
                    profileDetails={profileDetails.job_seeker_profile}
                  />
                  <Keyskills
                    profileDetails={profileDetails.job_seeker_profile}
                  />
                </>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
      case 'Professional':
        return (
          <View>
            <ScrollView style={styles.scrollContainer}>
              <Projects profileDetails={profileDetails.job_seeker_profile} />
              <Employment profileDetails={profileDetails.job_seeker_profile} />
              <Itskills profileDetails={profileDetails.job_seeker_profile} />
              <Accomplishments
                profileDetails={profileDetails.job_seeker_profile}
              />
            </ScrollView>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? ( // Show loader if loading is true
        <Spinner
          visible={isLoading}
          textContent={'Believe in the journey – we’re here for you!'}
          textStyle={styles.spinnerTextStyle}
          overlayColor="rgba(0, 0, 0, 0.5)"
          animation="fade"
          size="large"
          customIndicator={
            <Image
              source={require('../../../Assets/CompanyLogo/Swatsan.png')}
              style={GlobalStyle.loaderimage}
              resizeMode="center"
            />
          }
        />
      ) : (
        profileDetails && (
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
                <Text style={styles.nameText}>
                  {profileDetails?.first_name && profileDetails?.last_name
                    ? `${profileDetails?.first_name} ${profileDetails?.last_name}`
                    : 'User Name'}
                </Text>
                <ProfileHeadline
                  profileDetails={profileDetails.job_seeker_profile}
                />
              </View>
            </View>
            <View style={styles.bodyContainer}>
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
            </View>
          </View>
        )
      )}
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
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
    marginBottom: 4,
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
    justifyContent: 'space-around',

    marginTop: 24,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  tabButton: {
    // backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  activeTab: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 4,
  },
  tabText: {
    color: colors.blackText,
  },
  activeTabText: {
    color: colors.secondary,
  },

  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
  },
  contactText: {
    color: colors.secondary,
    fontWeight: '600',
  },
  contactContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgray',
    marginBottom: 8,
    padding: 12,
  },
  contactTextCon: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 18,
    gap: 18,
  },
  iconstyle: {
    color: colors.primary,
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
});

export default Index;
