import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {colors} from '../Global_CSS/TheamColors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomJobCard = ({
  jobData,
  savedJobs = [],
  toggleSaveJob,
  showBookmarkIcon = true,
  isApplied = false,
  showLocation = true,
  showWorkModes = true,
  showRating = false,
  showPostedDate = true,
  showSalary=false,
  navigateToApplicationStatus,
}) => {
  const navigation = useNavigation();
  const [localSavedJobs, setLocalSavedJobs] = useState(savedJobs);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    loadSavedJobs();
    loadAppliedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      const storedJobs = await AsyncStorage.getItem('savedJobs');
      if (storedJobs) setLocalSavedJobs(JSON.parse(storedJobs));
    } catch (error) {
      console.error('Failed to load saved jobs', error);
    }
  };

  const loadAppliedJobs = async () => {
    try {
      const storedAppliedJobs = await AsyncStorage.getItem('appliedJobs');
      if (storedAppliedJobs) setAppliedJobs(JSON.parse(storedAppliedJobs));
    } catch (error) {
      console.error('Failed to load applied jobs', error);
    }
  };

  const handleToggleSaveJob = async job => {
    try {
      const isJobSaved = localSavedJobs.some(
        savedJob => savedJob.job_title === job.job_title,
      );

      const updatedJobs = isJobSaved
        ? localSavedJobs.filter(
            savedJob => savedJob.job_title !== job.job_title,
          )
        : [...localSavedJobs, jobData];

      setLocalSavedJobs(updatedJobs);
      await AsyncStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
      if (!isJobSaved && toggleSaveJob) toggleSaveJob(jobData);
    } catch (error) {
      console.error('Failed to save or remove job', error);
    }
  };

  // const getPostedDate = postedDate => {
  //   const daysDifference = moment().diff(moment(postedDate), 'days');

  //   if (daysDifference <= 30) {
  //     return moment(postedDate).fromNow(); // e.g., "3 days ago"
  //   } else {
  //     return moment(postedDate).format('D MMM YYYY'); // e.g., "1 Jan 2024"
  //   }
  // };

  const getPostedDate = postedDate => {
    const formattedDate = moment(postedDate, moment.ISO_8601); // Force Moment to interpret as ISO format
  
    const daysDifference = moment().diff(formattedDate, 'days');
  
    if (daysDifference <= 30) {
      return formattedDate.fromNow(); // e.g., "3 days ago"
    } else {
      return formattedDate.format('D MMM YYYY'); // e.g., "1 Jan 2024"
    }
  };

  if (!jobData || typeof jobData !== 'object') {
    return <Text style={styles.errorText}>Invalid job data</Text>;
  }

  const handleCardPress = () => {
    if (navigateToApplicationStatus) {
      // Navigate to "ApplicationStatus" if the prop is passed
      navigation.navigate('ApplicationStatus', { jobData });
    } else {
      // Navigate to "JobDetailScreen" by default
      navigation.navigate('JobDetailScreen', { jobData });
    }
  };

  return (
    <View style={styles.companyContainer}>
      <TouchableOpacity
        style={{marginHorizontal: 8}}
        // onPress={() => navigation.navigate('JobDetailScreen', {jobData})}
        onPress={handleCardPress}
        >
        <View style={styles.companyHeader}>
          <View style={styles.companyInfo}>
            <Image
              source={
                jobData.company.logo
                  ? {uri: jobData.company.logo}
                  : require('../Assets/CompanyLogo/TCS_logo.png')
              }
              style={styles.companyImage}
            />
            <View>
              <Text style={styles.jobTitle}>{jobData.job_title}</Text>
              <Text style={styles.companyName}>
                {jobData.company.company_name}
              </Text>
            </View>
          </View>

          {showBookmarkIcon && (
            <IconButton
              style={styles.saveIcon}
              icon={
                localSavedJobs.some(
                  savedJob => savedJob.job_title === jobData.job_title,
                )
                  ? 'bookmark'
                  : 'bookmark-outline'
              }
              iconColor={
                localSavedJobs.some(
                  savedJob => savedJob.job_title === jobData.job_title,
                )
                  ? colors.primary
                  : 'gray'
              }
              size={28}
              onPress={() => handleToggleSaveJob(jobData)}
            />
          )}
        </View>

        
        {showLocation && (
          <View style={styles.location}>
            <IconButton
              icon="map-marker"
              iconColor={colors.primary}
              size={18}
              style={{padding: 0, marginLeft: -10, height: 20}}
            />
            <Text style={styles.jobLocation}>{jobData.job_location}</Text>
          </View>
        )}

        {showSalary && jobData.salary_min && jobData.salary_max && (
        <View style={styles.salaryContainer}>
         
          <View style={styles.experienceContainer}>
            <Ionicons name="briefcase" size={14} color={colors.primary} />
            <Text style={styles.jobDetailsalary}> {jobData.experience}</Text>
          </View>
          <Ionicons
            name="cash"
            size={14}
            color="#004466"
          />
          <Text style={styles.jobDetailsalary}>
            {jobData.salary_min} - {jobData.salary_max}
          </Text>
          
        </View>
      )}

        {/* Conditionally render rating */}
        {showRating && jobData.company.rating && (
          <View style={styles.ratingContainer}>
            <Ionicons
              name="star"
              size={16}
              color="#ffd700"
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>{jobData.company.rating}</Text>
          </View>
        )}
        <View style={styles.jobDetailsContainer}>
          {/* Conditionally render the work modes */}
          {showWorkModes &&
            jobData.work_modes &&
            jobData.work_modes.length > 0 && (
              <View style={styles.chipContainer}>
                {jobData.work_modes.map((mode, index) => (
                  <Text key={index} style={styles.chip}>
                    {mode}
                  </Text>
                ))}
              </View>
            )}

          <View style={{height: 0.5, backgroundColor: 'lightgray'}} />

          {/* <Text style={styles.education}>
            Education: {jobData.education.join(', ')}
          </Text> */}
          {/* <Text style={styles.department}>
            Department: {jobData.department}
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 8,
            }}>
            {/* Conditionally render salary or "Applied" status */}
            {isApplied ? (
              <View style={styles.appliedContainer}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color="#009900"
                  style={styles.checkmarkIcon}
                />
                <Text style={styles.appliedText}>Applied</Text>
              </View>
            ) : (
              <Text style={styles.jobDetails}>
                {jobData.salary_min} - {jobData.salary_max}
              </Text>
            )}
            {/* Conditionally render the posted date */}
            {showPostedDate && jobData.posted_date && (
              <Text style={styles.jobPostedDate}>
                {getPostedDate(jobData.posted_date)}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  companyContainer: {
    width: '100%',
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 12,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:8
  },
  companyImage: {
    width: 42,
    height: 42,
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
  saveIcon: {
    alignSelf: 'center',
    right: -14,
    top: -6,
    // height: 20,
  },
  jobDetailsContainer: {
    margin: 0,
    padding: 0,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    margin: 5,
    gap: 8,
  },

  chip: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    color: '#000',
    marginRight: 4,
    marginBottom: 4,
  },
  fullTimeChip: {
    backgroundColor: '#f2f2f2',
  },
  partTimeChip: {
    backgroundColor: '#f2f2f2',
  },
  contractChip: {
    backgroundColor: '#f2f2f2',
  },
  internshipChip: {
    backgroundColor: '#f2f2f2',
  },
  defaultChip: {
    backgroundColor: '#f2f2f2',
  },
  jobDetails: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },
  jobDetailsalary:{
    fontSize: 10,
    color: 'gray',
    fontWeight: 'bold',
  },
  experienceContainer:{
    flexDirection: 'row',
    marginRight:8,
    gap:6
   
  },
  salaryContainer:{
    flexDirection:'row',
    gap:6,
    alignItems: 'center',
    marginBottom:10
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
    // marginLeft: 8,
  },
  ratingIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#000',
  },
  jobPostedDate: {
    fontSize: 12,
    color: '#808080',
    textAlign: 'right',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
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
    marginRight: 0,
  },
  appliedText: {
    fontSize: 10,
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 4,
    textAlign: 'center',
    backgroundColor: 'rgb(230, 255, 238)',
  },
});

export default CustomJobCard;
