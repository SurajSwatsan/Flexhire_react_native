import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {jobPost} from '../../Redux/Action/JobAction';
import CustomJobCard from '../../Constant/CustomJobCard';
import {colors} from '../../Global_CSS/TheamColors';
import CustomCompanyCard from '../../Constant/CustomCompanyCard';
import {CircularProgress} from 'react-native-circular-progress'; // Import the CircularProgress component
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const [selectedChip, setSelectedChip] = useState(null);

  const chipLabels = ['All', 'New', 'Popular', 'Trending', 'Recommended'];

  // Load jobs data into the Redux store when the component mounts
  useEffect(() => {
    dispatch(jobPost());
  }, [dispatch]);

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

  // Access jobs data from the Redux store
  const jobs = useSelector(state => state.Jobs.jobsData);

  if (!jobs || jobs.length === 0) {
    return <Text style={styles.noCompanyText}>No jobs to display.</Text>;
  }

  const lastUpdatedDate = '2024-11-24';
  const daysSinceUpdate = moment().diff(moment(lastUpdatedDate), 'days');

  const profileCompletion = 75;

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

      <ScrollView style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('userProfileScreen')}
          style={styles.profileContainer}>
          <View style={styles.dataContainer}>
            <View style={styles.profileImageWrapper}>
              <CircularProgress
                size={85}
                width={4}
                fill={profileCompletion}
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
              
              Updated {daysSinceUpdate}{daysSinceUpdate === 1 ? 'd' : 'd'} ago
              </Text>
              <Text style={styles.profileDetail}>Missing details</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.JobsContainer}>
          <View style={{marginLeft: 18}}>
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
          </View>
          <View style={{marginVertical: 12, marginLeft: 18}}>
            <View style={styles.displayContainer}>
              <Text style={styles.contHead}>Recent Jobs</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>

            {/* Random chips for future use need to place other data */}
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
              {jobs.map((jobdata, index) => (
                <View key={jobdata.id || index} style={{marginRight: 12}}>
                  <CustomJobCard jobData={jobdata} />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{marginVertical: 12, marginLeft: 18}}>
            <View style={styles.displayContainer}>
              <Text style={styles.contHead}>Top Companies</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.contentContainer}>
              {jobs.map((jobdata, index) => (
                <View key={jobdata.id || index} style={{marginRight: 12}}>
                  <CustomCompanyCard jobData={jobdata} />
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
    marginTop:8
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
  },
  noCompanyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  chipContainer: {
    paddingVertical: 4,
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
