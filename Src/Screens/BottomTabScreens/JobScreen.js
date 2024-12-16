import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import JobViewController from '../../Redux/Action/jobViewController';
import {colors} from '../../Global_CSS/TheamColors';
import {IconButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const JobScreen = () => {
  const [id, setId] = useState(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Spinner for pagination
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {GetJobList} = JobViewController();
  const {JobList} = useSelector(state => state.job); // Fetch JobList from Redux state

  // Fetch user data and dispatch job list action
  const handleSearch = () => {
    navigation.navigate('searchjob', {query});
  };
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_data');
        setId(userId);
        if (userId) {
          dispatch(GetJobList(userId));
        }
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Bookmark handling
  const handleBookmark = jobId => {
    Alert.alert('Bookmark Clicked', `You bookmarked job ID: ${jobId}`);
    // Add bookmark logic here (e.g., dispatch an action or call an API)
  };

  // Fetch next page of jobs for pagination
  const loadMoreJobs = () => {
    if (JobList?.next && !isLoading) {
      setIsLoading(true);
      // Dispatch action to load more jobs using the next page URL
      dispatch(GetJobList(null, JobList.next)).finally(() => {
        setIsLoading(false);
      });
    }
  };

  // Show a loading spinner while data is being fetched
  if (!JobList || !JobList.results) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  const handlejobdetails = jobdata => {
    navigation.navigate('JobDetailScreen', {
      job_id: jobdata.id,
    });
  };
  // Render individual job items
  const renderJobCard = ({item: jobdata}) => {
    return (
      <TouchableOpacity
        key={jobdata.id}
        onPress={() => handlejobdetails(jobdata)}>
        <View key={jobdata.id} style={styles.jobCard}>
          {/* Job Card Header (Title and Company Name) */}
          <View style={styles.companyInfo}>
            <View style={styles.companylogo}>
              <Image
                source={
                  jobdata.company.logo
                    ? {uri: jobdata?.company?.logo}
                    : require('../../Assets/CompanyLogo/TCS_logo.png')
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
                icon="bookmark-outline"
                iconColor={colors.primary}
                size={24}
                style={styles.saveicon}
                onPress={() => handleBookmark(jobdata.id)}
              />
            </View>
          </View>

          {/* Work Modes */}
          <View style={styles.workModeContainer}>
            {jobdata.work_modes &&
              jobdata.work_modes.map((mode, idx) => (
                <View key={idx} style={styles.workModeChip}>
                  <Text style={styles.chipText}>{mode}</Text>
                </View>
              ))}
          </View>

          {/* Job Locations */}
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
                {locIndex < jobdata.job_location.length - 1 && ', '}
              </Text>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.line} />

          {/* Footer (Salary and Post Date) */}
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
        <View style={styles.filterIconContainer}>
          <Ionicons name="filter-outline" size={32} color={colors.primary} />
        </View>
      </View>
      <View style={styles.companyContainer}>
        <FlatList
          data={JobList.results}
          keyExtractor={item => item.id}
          renderItem={renderJobCard}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMoreJobs} // Trigger loadMoreJobs when reaching the bottom
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text>Loading more jobs...</Text>
              </View>
            )
          }
        />
      </View>
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
    flexDirection: 'row',

    backgroundColor: colors.primary,
    height: 70,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchbarContainer: {
    flex: 1,
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
  filterIconContainer: {
    backgroundColor: '#fff',
    padding: 8,
    height: 48,
    borderRadius: 8,
  },
  companyContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    paddingBottom: 16,
  },
  jobCard: {
    backgroundColor: colors.whiteText,
    borderRadius: 10,
    marginRight: 12,
    padding: 12,
    width: '100%',
    marginBottom: 20,
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
  companyName: {
    fontSize: 12,
    color: 'gray',
  },
  companyImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
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
  chipText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveicon: {
    alignSelf: 'center',
    right: -14,
    top: -6,
  },

  salaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
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
    height: 1,
    backgroundColor: '#f1f1f1',
  },
});

export default JobScreen;
