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

const HomeScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const {GetHomeData} = JobViewController();
  const {CompanyData} = useSelector(state => state.job);
  const isFocus = useIsFocused();

  const [id, setId] = useState();

  const [selectedChip, setSelectedChip] = useState(null);

  const chipLabels = ['All', 'New', 'Popular', 'Trending', 'Recommended'];
  const [isSaved, setIsSaved] = useState(false);

  const toggleSaveStatus = () => {
    setIsSaved(prevState => !prevState);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
        dispatch(GetHomeData(id));

        console.log(id); // Log the value once it's retrieved
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
  }, [isFocus]);

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
    navigation.navigate('searchjob', {query});
  };

  const lastUpdatedDate = '2024-11-24';
  const daysSinceUpdate = moment().diff(moment(lastUpdatedDate), 'days');

  const handleCardPress = (jobdata) => {
    // Navigate to the JobDetailScreen and pass the jobdata (or job ID)
    navigation.navigate('JobDetailScreen', {job_id: jobdata.id});
  };

  const renderCard = jobdata => {
    if (!jobdata?.id) {
      console.warn('Missing job data id');
      return null;
    }
    return (
      <TouchableOpacity key={jobdata.id} onPress={()=>handleCardPress(jobdata)}>
        <View style={styles.jobCard}>
          <View style={styles.companyInfo}>
            <View style={styles.companylogo}>
              <Image
                source={
                  jobdata.company.logo
                    ? {uri: jobdata?.company?.logo}
                    : require('../../Assets/CompanyLogo/Swatsan.png')
                }
                style={styles.companyImage}
              />
              <View style={styles.textName}>
                <Text style={styles.jobTitle}>{jobdata?.job_title?.title}</Text>
                <Text style={styles.companyName}>{jobdata?.company_name}</Text>
              </View>
            </View>
            <View>
              <IconButton
                icon={isSaved ? 'bookmark' : 'bookmark-outline'}
                iconColor={colors.primary}
                size={24}
                style={styles.saveicon}
                onPress={toggleSaveStatus}
              />
            </View>
          </View>
          <View style={styles.workModeContainer}>
            {jobdata.work_modes &&
              jobdata.work_modes.map((mode, idx) => (
                <View key={idx} style={styles.workModeChip}>
                  <Text style={styles.chipText}>{mode}</Text>
                </View>
              ))}
          </View>

          <View style={styles.location}>
            <IconButton
              icon="map-marker"
              iconColor={colors.primary}
              size={18}
              style={{padding: 0, marginLeft: -10, height: 20}}
            />

            {jobdata.job_location.map((location, locIndex) => (
              <Text key={locIndex} style={styles.jobCardLocation}>
                {location.name}
                {locIndex < jobdata.job_location.length - 1 && ',  '}
              </Text>
            ))}
          </View>

          <View style={styles.line}></View>

          <View style={styles.jobFooter}>
            {jobdata?.salary && jobdata.salary.yearly && (
              <View style={styles.experienceContainer}>
                <Ionicons name="cash" size={14} color="#004466" />
                <Text style={styles.jobDetailsalary}>
                  ₹{jobdata.salary.yearly.min.toLocaleString()} - ₹
                  {jobdata.salary.yearly.max.toLocaleString()} INR
                </Text>
              </View>
            )}
            <Text style={styles.jobPostedDate}>
              {moment(jobdata.reviews[0]?.review_date).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.bodycontainer}>
      <View style={styles.container}>
        <View style={styles.searchbarContainer}>
          <TextInput
            placeholder="Search"
            onChangeText={setQuery}
            value={query}
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
            <View style={styles.profileImageWrapper}>
              <CircularProgress
                size={85}
                width={4}
                fill={CompanyData?.profile_filled_percentage || 0}
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

            <View style={styles.profile}>
              <Text style={styles.profileName}>Xyz's Profile</Text>
              <Text style={styles.profileDate}>
                Updated {daysSinceUpdate}
                {daysSinceUpdate === 1 ? 'd' : 'd'} ago
              </Text>
              <Text style={styles.profileDetail}>Missing details</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.JobsContainer}>
          <View style={{marginVertical: 12, marginLeft: 18}}>
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
              {/* {(CompanyData?.suggested_jobs &&
              Array.isArray(CompanyData.suggested_jobs)
                ? CompanyData.suggested_jobs
                : []
              ).map(item => (
                <>{renderCard(item)}</>
              ))} */}
              {(CompanyData?.suggested_jobs &&
              Array.isArray(CompanyData.suggested_jobs)
                ? CompanyData.suggested_jobs
                : []
              ).map(item => (
                <View key={item.id || item.job_title} style={{marginRight: 12}}>
                  {renderCard(item)}
                </View>
              ))}
            </ScrollView>
          </View>

          {/* <View style={{marginLeft: 18}}>
            <View style={styles.displayContainer}>
              <Text style={styles.contHead}>Suggested Jobs</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.contentContainer}>
              {jobs.map((jobdata, index) => (
                <View key={jobdata.id || index} style={{marginRight: 12}}>
                  <CustomJobCard jobData={jobdata} />
                </View>
              ))}
            </ScrollView>
          </View> */}
          <View style={{marginLeft: 18}}>
            <View style={styles.displayContainer}>
              <Text style={styles.contHead}>Recent Jobs</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
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
            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.contentContainer}>
              {/* {(CompanyData?.recent_jobs &&
              Array.isArray(CompanyData.recent_jobs)
                ? CompanyData.recent_jobs
                : []
              ).map(item => (
                // <>{renderCard(item)}</>
                <View key={item.id} style={{marginRight: 12}}>
                  <CustomJobCard jobData={item} />
                </View>
              ))} */}
              {(CompanyData?.recent_jobs &&
              Array.isArray(CompanyData.recent_jobs)
                ? CompanyData.recent_jobs
                : []
              ).map(item => (
                <View key={item.id || item.job_title} style={{marginRight: 12}}>
                  {renderCard(item)}
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{marginLeft: 18}}>
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
              {/* {CompanyData?.top_companies?.map(item => (
                // <View key={item.id} style={{marginRight: 12}}>
                //   <CustomCompanyCard companyData={item} />
                // </View>
                <View
                  key={item.id || item.company_name}
                  style={{marginRight: 12}}>
                  <CustomCompanyCard companyData={item} />
                </View>
              ))} */}
              {(CompanyData?.top_companies || []).map(item => (
                <View
                  key={item.id || item.company_name}
                  style={{marginRight: 12}}>
                  <CustomCompanyCard companyData={item} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#478564',
    fontSize: 12,
  },
  profileName: {
    color: '#478564',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileDetail: {
    color: 'blue',
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
  jobCard: {
    backgroundColor: colors.whiteText,
    borderRadius: 10,
    marginRight: 12,
    padding: 12,
    width: '100%',
    marginBottom: 20,
  },
  jobCardHeader: {
    marginBottom: 8,
  },
  companylogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 8,
    justifyContent: 'space-between',
  },
  textName: {
    flexDirection: 'column,',
  },
  companyImage: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 10,
  },
  companyName: {
    fontSize: 12,
    color: 'gray',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  jobDescription: {
    fontSize: 12,
    color: '#777',
    marginTop: 8,
    marginBottom: 8,
  },
  workModeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  workModeChip: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',

    marginRight: 4,
    marginBottom: 4,
  },
  saveicon: {
    alignSelf: 'center',
    right: -14,
    top: -6,
  },
  chipText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  salaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  location: {
    flexDirection: 'row',
    // gap: 0,
    alignItems: 'center',
  },
  jobLocation: {
    fontSize: 12,
    color: '#808080',
    // marginLeft: -12,
  },
  experienceContainer: {
    flexDirection: 'row',
    marginRight: 8,
    gap: 6,
  },
  jobFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobDetailsalary: {
    fontSize: 10,
    color: 'gray',
    fontWeight: 'bold',
  },
  jobCardLocation: {
    fontSize: 11,
    color: '#555',
    marginLeft: -4,
  },
  jobPostedDate: {
    fontSize: 12,
    color: '#808080',
    // textAlign: 'right',
  },
  line: {
    backgroundColor: '#f2f2f2',
    height:1,
  },
});

export default HomeScreen;
