import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import JobViewController from '../../Redux/Action/jobViewController';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserApplies = () => {
  const navigation = useNavigation();
  const [showBookmarkIcon, setShowBookmarkIcon] = useState(false);

  const dispatch = useDispatch();
  const {GetJobApplications} = JobViewController();
  const {JobApplications} = useSelector(state => state.job);
  const isFocus = useIsFocused();
  const [userId, set_userId] = useState('');


  const getSalary = salary => {
    if (salary?.yearly?.min && salary?.yearly?.max) {
      return `${salary.yearly.min} - ${salary.yearly.max} ${salary.yearly.currency}`;
    }
    return 'Salary not disclosed';
  };

  // Fetch applied jobs from the Redux store
  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        set_userId(id);
        dispatch(GetJobApplications(id));
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
  }, [isFocus]);

  const handleJobPress = jobData => {
    // Navigate to the "ApplicationStatus" page when a job is pressed
    navigation.navigate('ApplicationStatus', {ApplicationObject: jobData});
  };
  const getPostedDate = postedDate => {
    const formattedDate = moment(postedDate, moment.ISO_8601);
    const daysDifference = moment().diff(formattedDate, 'days');
    if (daysDifference <= 30) {
      return formattedDate.fromNow();
    } else {
      return formattedDate.format('D MMM YYYY');
    }
  };
  return (
    <View style={styles.container}>
      {/* If there are no applied jobs, display a message */}
      {JobApplications.length === 0 ? (
        <View style={styles.noJobsContainer}>
          <Image
            source={require('../../Assets/ApplyImages/apply.png')}
            style={styles.Image}
          />
          <Text style={styles.noJobs}>
            You haven't applied for any jobs yet!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SearchJob')}>
            <Text style={styles.buttonText}>Start Job Search</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          {JobApplications.map((jobData, index) => (
            <View key={jobData.id || index} style={styles.jobCardContainer}>
              <TouchableOpacity
                style={styles.jobCard}
                onPress={() => handleJobPress(jobData)}>
                <View style={styles.companyInfo}>
                  <Image
                    source={
                      jobData?.job?.company.logo
                        ? {uri: jobData?.job?.company.logo}
                        : require('../../Assets/CompanyLogo/TCS_logo.png')
                    }
                    style={styles.companyImage}
                  />
                  <View>
                    <Text style={styles.jobTitle}>
                      {jobData?.job?.job_title.title}
                    </Text>

                    <Text style={styles.companyName}>
                      {jobData?.job?.company_name}
                    </Text>
                  </View>
                </View>
                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location"
                    size={14}
                    color={colors.primary}
                    style={styles.checkmarkIcon}
                  />
                  {jobData?.job?.job_location.map((location, idx) => (
                    <Text key={idx} style={styles.locationText}>
                      {location.name}
                      {jobData?.job?.job_location?.length - 1 != idx ? ',' : ''}
                    </Text>
                  ))}
                </View>

                <View style={styles.salaryContainer}>
                  <View style={styles.experienceContainer}>
                    <Ionicons
                      name="briefcase"
                      size={14}
                      color={colors.primary}
                    />
                    <Text style={styles.jobDetailsalary}>
                      {' '}
                      {jobData?.job?.experience_level?.minYear} -{' '}
                      {jobData?.job?.experience_level?.maxYear} Years
                    </Text>
                  </View>
                  <Ionicons name="cash" size={14} color="#004466" />
                  <Text style={styles.jobDetailsalary}>
                    {getSalary(jobData?.job?.salary)}
                  </Text>
                </View>
                <View style={styles.jobCardFooter}>
                  <View style={styles.appliedContainer}>
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color="#009900"
                      style={styles.checkmarkIcon}
                    />
                    <Text style={styles.appliedText}>Applied</Text>
                  </View>

                  {/* Conditionally render the posted date */}
                  {jobData?.job?.created_at && (
                    <Text style={styles.jobPostedDate}>
                      {getPostedDate(jobData?.job?.created_at)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Ensure content is top-aligned
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 18,
    width: '100%',
  },

  Image: {
    height: 200,
    width: 200,
  },

  noJobsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  noJobs: {
    fontSize: 16,
    color: colors.blackText,
    textAlign: 'center',
  },

  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  scrollContainer: {
    width: '100%', // Full width for the ScrollView
  },

  contentContainer: {
    paddingBottom: 20, // Adds padding at the bottom for better spacing
  },

  jobCardContainer: {
    marginBottom: 15, // Space between job cards
    width: '100%', // Ensures full width usage for each job card
  },

  jobCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowRadius: 5,
    shadowOpacity: 0.1,
    marginBottom: 10,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
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
    color: 'black',
  },

  companyName: {
    fontSize: 12,
    color: 'black',
  },

  jobLocations: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  jobDetails: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
  },
  jobDetailsalary: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },

  locationText: {
    fontSize: 12,
    color: 'gray',
  },
  salaryContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  location: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  jobLocation: {
    fontSize: 12,
    color: '#808080',
    marginLeft: -12,
  },
  experienceContainer: {
    flexDirection: 'row',
    marginRight: 8,
    gap: 6,
  },
  salaryContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    marginBottom: 10,
  },

  experience: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },

  jobStatus: {
    fontSize: 14,
    color: 'orange',
    marginTop: 5,
  },

  education: {
    fontSize: 14,
    marginTop: 5,
    color: 'gray',
  },

  bookmarkText: {
    color: 'blue',
    marginTop: 10,
  },
  jobCardFooter: {
    borderTopColor: 'lightgrey',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  appliedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(230, 255, 238)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  checkmarkIcon: {
    marginRight: 4,
  },
  appliedText: {
    fontSize: 10,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgb(230, 255, 238)',
  },
  jobPostedDate: {
    fontSize: 12,
    color: '#808080',
    textAlign: 'right',
  },
  locationContainer: {
    flexDirection: 'row',
  },
});

export default UserApplies;
