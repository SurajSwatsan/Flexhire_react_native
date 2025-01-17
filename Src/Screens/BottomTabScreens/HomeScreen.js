import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../Global_CSS/TheamColors';
import CustomCompanyCard from '../../Constant/CustomCompanyCard';
import {CircularProgress} from 'react-native-circular-progress'; // Import the CircularProgress component
import moment from 'moment';
import JobViewController from '../../Redux/Action/jobViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BASE_URL} from '../../Services/baseAPI';
import JobCardStyle from '../../Global_CSS/JobCardStyle';
import CustomFormatAmount from '../../Constant/CustomFormatAmount';
import {Toast} from 'react-native-toast-notifications';
import UserProfileViewController from '../../Redux/Action/UserProfileViewController';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const {GetHomePageData, SaveJob} = JobViewController();
  const {HomeData} = useSelector(state => state.job);
  const {GetProfileDetails} = UserProfileViewController();
  const {profileDetails} = useSelector(state => state.profile);
  const [id, setId] = useState();
  const isFocus = useIsFocused();
  const [selectedChip, setSelectedChip] = useState(null);

  const chipLabels = ['All', 'New', 'Popular', 'Trending', 'Recommended'];

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user_id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(user_id);
        if (!HomeData) {
          dispatch(GetHomePageData(user_id));
        }
        if (!profileDetails) {
          dispatch(GetProfileDetails(user_id));
        }

        // dispatch(GetSavedJobs(id));

      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
  }, [isFocus]);
  // console.log('HomeData', JSON.stringify(HomeData, null, 2));
  // console.log('profile data', profileDetails);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (navigation.isFocused()) {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {text: 'No', onPress: () => null, style: 'cancel'},
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        } else {
          return false;
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup listener on unmount
    }, [navigation]),
  );

  const handleSearch = () => {
    if (!searchQuery || searchQuery.trim() === '') {
      Toast.show('Please enter a search query.', {
        type: 'warning',
        placement: 'top',
        duration: 4000,
        offset: 100,
        animationType: 'slide-in',
      });
      return;
    }
    navigation.navigate('JobsScreen', {searchQuery});
    setSearchQuery('');
  };

  const toggleSaveJob = jobId => {
    const requestData = {job: jobId, user_id: id};
    dispatch(SaveJob(requestData)); // Pass only the job ID
  };

  const handleCardPress = jobdata => {
    // Navigate to the JobDetailScreen and pass the jobdata (or job ID)
    navigation.navigate('JobDetailScreen', {job_id: jobdata.id});
  };

  const renderCard = jobdata => {
    return (
      <TouchableOpacity
        key={jobdata.id}
        onPress={() => handleCardPress(jobdata)}>
        <View style={JobCardStyle.jobCard}>
          <View style={JobCardStyle.companyInfo}>
            <View style={JobCardStyle.companylogo}>
              {jobdata?.company?.logo ? (
                <Image
                  source={{uri: BASE_URL + jobdata?.company?.logo}}
                  style={JobCardStyle.companyImage}
                />
              ) : (
                <Ionicons
                  name="business"
                  size={36}
                  color="gray"
                  style={JobCardStyle.companyImage}
                />
              )}
              <View style={JobCardStyle.textName}>
                {jobdata?.job_title?.title && (
                  <Text style={JobCardStyle.jobTitle}>
                    {jobdata?.job_title?.title}
                  </Text>
                )}
                {(jobdata?.company_name || jobdata?.company?.company_name) && (
                  <Text style={JobCardStyle.companyName}>
                    {jobdata?.company?.company_name
                      ? jobdata?.company?.company_name
                      : jobdata?.company_name}
                  </Text>
                )}
              </View>
            </View>
            <View>
              <IconButton
                icon={jobdata?.is_saved ? 'bookmark' : 'bookmark-outline'}
                iconColor={colors.primary}
                size={24}
                style={JobCardStyle.saveicon}
                onPress={() => toggleSaveJob(jobdata?.id)}
              />
            </View>
          </View>
          <View style={JobCardStyle.workModeContainer}>
            {jobdata.work_modes &&
              jobdata.work_modes.map((mode, idx) => (
                <View key={idx} style={JobCardStyle.workModeChip}>
                  <Text style={JobCardStyle.chipText}>{mode}</Text>
                </View>
              ))}
          </View>

          <View style={JobCardStyle.location}>
            {jobdata && jobdata.job_location && (
              <>
                <IconButton
                  icon="map-marker"
                  iconColor={colors.primary}
                  size={18}
                  style={{padding: 0, marginLeft: -10, height: 20}}
                />
                <Text style={JobCardStyle.jobCardLocation}>
                  {jobdata.job_location.join(', ')}
                </Text>
              </>
            )}
          </View>

          <View style={JobCardStyle.line}></View>

          <View style={JobCardStyle.jobFooter}>
            {jobdata?.salary && jobdata.salary.yearly && (
              <View style={JobCardStyle.experienceContainer}>
                <Ionicons name="cash" size={14} color="#004466" />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CustomFormatAmount amount={jobdata.salary?.yearly?.min} />
                  <Text style={{color: colors.primary}}> - </Text>
                  <CustomFormatAmount amount={jobdata.salary?.yearly?.max} />

                  {jobdata.salary.yearly.currency && (
                    <Text
                      style={{fontSize: 10, fontWeight: 'bold', color: 'gray'}}>
                      {jobdata.salary.yearly.currency}
                    </Text>
                  )}
                </View>
              </View>
            )}
            {jobdata?.created_at && (
              <Text style={JobCardStyle.jobPostedDate}>
                {moment(jobdata?.created_at).fromNow()}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.bodycontainer}>
      {/* <Spinner
        visible={isLoading}
        textContent={'Believe in the journey – we’re here for you!'}
        textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(0, 0, 0, 0.5)"
        animation="fade"
        size="large"
        customIndicator={
          <Image
            source={require('../../Assets/CompanyLogo/Swatsan.png')}
            style={GlobalStyle.loaderimage}
            resizeMode="center"
          />
        }></Spinner> */}
      {HomeData && (
        <>
          <View style={styles.container}>
            <View style={styles.searchbarContainer}>
              <TextInput
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
                placeholderTextColor="#000"
              />
              <IconButton
                style={styles.searchIcon}
                icon="magnify"
                iconColor="#004466"
                size={26}
                onPress={handleSearch}
              />
            </View>
          </View>

          <ScrollView style={{flex: 1, marginVertical: 12}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('userProfileScreen')}
              style={styles.profileContainer}>
              <View style={styles.dataContainer}>
                <View style={{alignItems: 'center'}}>
                  <View style={styles.profileImageWrapper}>
                    <CircularProgress
                      size={85}
                      width={4}
                      fill={HomeData?.profile_data?.filled_percentage || 0}
                      rotation={220}
                      tintColor="#509570" // Color of the progress
                      backgroundColor="lightgray"
                      lineCap="round"
                      arcSweepAngle={360}
                    />

                    <Image
                      source={require('../../Assets/Images/Userimage.png')}
                      style={styles.profileImage}
                    />
                  </View>
                  {HomeData?.profile_data?.filled_percentage && (
                    <Text style={[styles.profileName, {marginTop: -20}]}>
                      {HomeData?.profile_data?.filled_percentage}%
                    </Text>
                  )}
                </View>
                <View style={styles.profile}>
                  {(profileDetails?.first_name ||
                    profileDetails?.last_name) && (
                    <Text style={styles.profileName}>
                      {`${profileDetails?.first_name} ${profileDetails?.last_name}`.trim()}
                    </Text>
                  )}

                  {HomeData?.profile_data?.updated_at && (
                    <Text style={styles.profileDate}>
                      Updated{' '}
                      {moment(HomeData?.profile_data?.updated_at).fromNow()}
                    </Text>
                  )}

                  {HomeData?.profile_data?.total_missing_field_count && (
                    <Text style={styles.profileDetail}>
                      {HomeData?.profile_data?.total_missing_field_count}{' '}
                      Missing details
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.JobsContainer}>
              {HomeData?.suggested_jobs?.length > 0 && (
                <View style={{marginVertical: 8, marginLeft: 18}}>
                  <View style={styles.displayContainer}>
                    <Text style={styles.contHead}>Suggested Jobs</Text>
                    <TouchableOpacity>
                      <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.contentContainer}>
                    {HomeData.suggested_jobs.map(item => (
                      <View
                        key={item.id || item.job_title}
                        style={{marginRight: 12}}>
                        {renderCard(item)}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}

              {HomeData?.recent_jobs?.length > 0 && (
                <View style={{marginLeft: 18}}>
                  <View style={styles.displayContainer}>
                    <Text style={styles.contHead}>Recent Jobs</Text>
                    <TouchableOpacity>
                      <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>

                  {/* <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.chipContainer}>
                    {chipLabels.map((label, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.chip,
                          selectedChip === label && styles.selectedChip, // Apply selected chip style
                        ]}
                        onPress={() => setSelectedChip(label)} // Update selected chip on press
                      >
                        <Text
                          style={[
                            styles.chipText,
                            selectedChip === label && styles.selectedChipText, // Apply text color change if selected
                          ]}>
                          {label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView> */}

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.contentContainer}>
                    {HomeData.recent_jobs.map(item => (
                      <View
                        key={item.id || item.job_title}
                        style={{marginRight: 12}}>
                        {renderCard(item)}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}

              {HomeData?.profile_based_jobs?.length > 0 && (
                <View style={{marginVertical: 8, marginLeft: 18}}>
                  <View style={styles.displayContainer}>
                    <Text style={styles.contHead}>Profile-Based Jobs</Text>
                    <TouchableOpacity>
                      <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.contentContainer}>
                    {HomeData.profile_based_jobs.map(item => (
                      <View
                        key={item.id || item.job_title}
                        style={{marginRight: 12}}>
                        {renderCard(item)}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}

              {HomeData?.jobs_based_on_applied?.length > 0 && (
                <View style={{marginVertical: 8, marginLeft: 18}}>
                  <View style={styles.displayContainer}>
                    <Text style={styles.contHead}>
                      Jobs Based on Your Applications
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.seeAll}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.contentContainer}>
                    {HomeData.jobs_based_on_applied.map(item => (
                      <View
                        key={item.id || item.job_title}
                        style={{marginRight: 12}}>
                        {renderCard(item)}
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}

              <View style={{marginLeft: 18}}>
                {HomeData?.top_companies?.length > 0 && (
                  <>
                    <View style={styles.displayContainer}>
                      <Text style={styles.contHead}>Top Companies</Text>
                      <TouchableOpacity>
                        <Text style={styles.seeAll}>See All</Text>
                      </TouchableOpacity>
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.scrollContainer}
                      contentContainerStyle={styles.contentContainer}>
                      {HomeData.top_companies.map(item => (
                        <View
                          key={item.id || item.company_name}
                          style={{marginRight: 12}}>
                          <CustomCompanyCard companyData={item} />
                        </View>
                      ))}
                    </ScrollView>
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bodycontainer: {
    backgroundColor: colors.background,
    flex: 1,
    width: '100%',
  },
  container: {
    backgroundColor: colors.primary,
    height: 90,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchbarContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBgcolor,
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
  },
  searchbar: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginRight: 10,
    backgroundColor: '#fff',
  },
  profileContainer: {
    marginHorizontal: 18,
    marginVertical: 12,
    backgroundColor: '#e3f0e9',
    // alignItems:'center',
    borderRadius: 8,
  },
  dataContainer: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  profileImageWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  profileImage: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },

  profile: {
    flexDirection: 'column',
  },
  profileDate: {
    color: 'gray',
    fontSize: 12,
  },
  profileName: {
    color: '#478564',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileDetail: {
    color: colors.primary,
    fontSize: 12,
    marginTop: 8,
  },
  JobsContainer: {
    // marginTop: 12,
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  seeAll: {
    fontSize: 14,
    color: colors.blackText,
    marginRight: 8,
    textDecorationLine: 'underline',
  },
  noCompanyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  chipContainer: {
    paddingVertical: 6,
  },
  chip: {
    backgroundColor: colors.whiteText, // Default blue background for each chip
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: colors.primary, // Darker blue for selected chip
    color: colors.whiteText,
  },
  chipText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedChipText: {
    color: colors.whiteText,
  },
});

export default HomeScreen;
