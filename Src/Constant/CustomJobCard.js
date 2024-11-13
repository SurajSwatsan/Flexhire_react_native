import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {colors} from '../Global_CSS/TheamColors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomJobCard = ({
  jobData,
  savedJobs = [],
  toggleSaveJob,
  showBookmarkIcon = true,
  showCheckmarkIcon = false,
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

  const handleApplyJob = async job => {
    try {
      const isJobApplied = appliedJobs.some(
        appliedJob => appliedJob.job_title === job.job_title,
      );

      if (isJobApplied) return;

      const updatedAppliedJobs = [...appliedJobs, jobData];
      setAppliedJobs(updatedAppliedJobs);

      await AsyncStorage.setItem(
        'appliedJobs',
        JSON.stringify(updatedAppliedJobs),
      );
    } catch (error) {
      console.error('Failed to apply for job', error);
    }
  };

  if (!jobData || typeof jobData !== 'object') {
    return <Text style={styles.errorText}>Invalid job data</Text>;
  }

  return (
    <View style={styles.companyContainer}>
      <TouchableOpacity
        style={{marginHorizontal: 8}}
        onPress={() => navigation.navigate('JobDetailScreen', {jobData})}>
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
                  ? '#000'
                  : 'gray'
              }
              size={28}
              onPress={() => handleToggleSaveJob(jobData)}
            />
          )}

          {showCheckmarkIcon && (
            <IconButton
              style={styles.applyButton}
              icon={
                appliedJobs.some(
                  appliedJob => appliedJob.job_title === jobData.job_title,
                )
                  ? 'check-circle'
                  : 'application'
              }
              iconColor={
                appliedJobs.some(
                  appliedJob => appliedJob.job_title === jobData.job_title,
                )
                  ? colors.primary
                  : 'gray'
              }
              size={28}
              onPress={() => handleApplyJob(jobData)}
            />
          )}
        </View>

        <View style={styles.location}>
          <IconButton
            icon="map-marker"
            iconColor={colors.primary}
            size={18}
            style={{padding: 0, marginLeft: -10, height: 20}}
          />
          <Text style={styles.jobLocation}>{jobData.job_location}</Text>
        </View>
        <View style={styles.jobDetailsContainer}>
          <View style={styles.chipContainer}>
            {jobData.work_modes.map((mode, index) => (
              <Text key={index} style={styles.chip}>
                {mode}
              </Text>
            ))}
          </View>
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
            <Text style={styles.jobDetails}>
              {jobData.salary_min} - {jobData.salary_max}
            </Text>
            <Text style={styles.jobPostedDate}>
              {moment(jobData.posted_date).format('MMMM D, YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  companyContainer: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  jobPostedDate: {
    fontSize: 12,
    color: '#808080',
    textAlign: 'right',
    marginRight: 12,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CustomJobCard;
