import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import JobViewController from '../../Redux/Action/jobViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../Services/baseAPI';
import JobCardStyle from '../../Global_CSS/JobCardStyle';

const SavedJobScreen = () => {
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const {GetSavedJobs, SaveJob} = JobViewController();
  const {SavedJobs} = useSelector(state => state.job);
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const [bookmarked, setBookmarked] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
        dispatch(GetSavedJobs(id));
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
  }, [isFocus]);

  const isBookmarked = job_id => {
    return SavedJobs.some(savedJob => savedJob.job.id === job_id);
  };

  const toggleBookmark = job_id => {
    const data = {
      job: job_id,
      user_id: id,
    };
    dispatch(SaveJob(data));
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardContainer}>
        {SavedJobs && SavedJobs.length > 0 ? (
          SavedJobs?.map(savedJob => (
            <TouchableOpacity
              key={savedJob.job.id}
              onPress={() =>
                navigation.navigate('JobDetailScreen', {
                  job_id: savedJob.job.id,
                })
              }
              style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.jobTitleContainer}>
                  <Text style={styles.cardTitle}>
                    {savedJob?.job?.job_title?.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleBookmark(savedJob.job.id)}
                    style={styles.bookmarkIconContainer}>
                    <Ionicons
                      name={
                        isBookmarked(savedJob?.job?.id)
                          ? 'bookmark'
                          : 'bookmark-outline'
                      }
                      size={22}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.detailsContainer}>
                  <View style={styles.detailsRow}>
                    <Ionicons
                      name="location"
                      size={14}
                      color={colors.primary}
                    />
                    <Text style={styles.detailsText}>
                      {savedJob?.job?.job_location
                        ?.map(location => location.name)
                        .join(', ')}
                    </Text>
                  </View>
                  <View style={styles.containerData}>
                    <View style={styles.detailsRow}>
                      <Ionicons
                        name="briefcase"
                        size={14}
                        color={colors.primary}
                      />
                      <Text style={styles.detailsText}>
                        {`${savedJob?.job?.experience_level?.minYear} - ${savedJob?.job.experience_level?.maxYear} years`}
                      </Text>
                    </View>
                    <View style={styles.detailsalary}>
                      <Ionicons name="cash" size={14} color={colors.primary} />
                      <Text style={styles.detailsText}>
                        {savedJob?.job?.salary?.yearly?.min} -{' '}
                        {savedJob?.job?.salary?.yearly?.max} INR
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.innerCard}>
                  <View style={styles.iconMain}>
                    <Image
                      source={
                        savedJob?.job?.company?.logo
                          ? {uri: BASE_URL + savedJob?.job?.company.logo}
                          : require('../../Assets/CompanyLogo/Swatsan.png')
                      }
                      style={styles.logo}
                    />

                    <View style={styles.companyMaincontainer}>
                      <View style={styles.companyDetail}>
                        <Text style={styles.companyText}>
                          {savedJob?.job.company?.company_name}
                        </Text>
                        <View style={styles.icon}>
                          <Ionicons
                            name="star"
                            size={14}
                            color="#ffd700"
                            style={styles.ratingIcon}
                          />
                          <Text style={styles.companyReview}>
                            {savedJob?.rating}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.companyDate}>
                      {moment(savedJob?.job?.created_at).format('MMM D')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={[JobCardStyle.noJobsContainer]}>
            <Image
              style={JobCardStyle.jobimage}
              source={require('../../Assets/invitesImages/Jobsearch.png')}
            />
            <Text style={[JobCardStyle.noJobsText]}>No Saved jobs.....</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    padding: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 12,
    // marginHorizontal: 12,
  },

  cardContent: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
  },
  jobTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures title and bookmark are on opposite sides
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.blackText,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
  },

  detailsText: {
    fontSize: 12,
    color: colors.blackText,
    marginLeft: 6,
  },
  detailscompanytext: {
    fontSize: 10,
    color: colors.blackText,
  },
  containerData: {
    flexDirection: 'row',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsalary: {
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center',
  },
  innerCard: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 8,
    gap: 8,
    // alignItems: 'center',
    marginTop: 6,
  },
  iconContainer: {
    backgroundColor: '#fafafa', // Set the background color for the icon
    borderRadius: 4, // Make the background circular (adjust size as needed)
    padding: 8, // Add some padding around the icon
    // marginRight: 10,             // Add some space between icon and text
    borderWidth: 1, // Add border to the background
    borderColor: '#ddd', // Set the color of the border
    justifyContent: 'center', // Center the icon inside the background
    alignItems: 'center', // Center the icon horizontally
    // marginTop:8
  },
  iconMain: {
    flexDirection: 'row',
  },
  companyDetail: {
    flexDirection: 'column',
  },
  companyMaincontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  logo: {
    width: 38,
    height: 38,
    resizeMode: 'contain', // Adjusts the image to cover the container uniformly
    marginRight: 8,
  },
  techContainer: {
    //  alignItems:'center'
    justifyContent: 'center',
  },
  companyMainContainer: {
    flexDirection: 'row',
    // alignItems:'center',
  },
  companyText: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 2,
  },
  companyReview: {
    fontSize: 10,
    color: 'gray',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    marginRight: 4,
  },
  companyDate: {
    fontSize: 10,
    alignItems: 'center',
    color: 'gray',

    // textAlign:'right',
  },
});

export default SavedJobScreen;
