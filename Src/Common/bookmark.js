import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../Components/customHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IconButton} from 'react-native-paper';

const BookmarkScreen = ({route, navigation}) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [unsavedJobs, setUnsavedJobs] = useState([]); // Unsaved jobs

  // Load saved jobs from AsyncStorage when the screen is mounted
  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        const savedJobsData = await AsyncStorage.getItem('savedJobs');
        if (savedJobsData) {
          setSavedJobs(JSON.parse(savedJobsData));
        }
      } catch (error) {
        console.error('Failed to load saved jobs from AsyncStorage', error);
      }
    };
    loadSavedJobs();
  }, []);

  // Remove job from saved jobs and move it to unsaved jobs
  const removeJobFromSaved = async jobToRemove => {
    const updatedSavedJobs = savedJobs.filter(
      job => job.job_title !== jobToRemove.job_title,
    );
    setSavedJobs(updatedSavedJobs);

    // Move job to unsavedJobs state
    setUnsavedJobs(prevUnsavedJobs => [...prevUnsavedJobs, jobToRemove]);

    try {
      await AsyncStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
    } catch (error) {
      console.error('Failed to remove job from AsyncStorage', error);
    }
  };

  if (!savedJobs || savedJobs.length === 0) {
    return (
      <View style={styles.container}>
        <CustomHeader />
        <Text style={styles.noJobsText}>No saved jobs</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomHeader />
        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 18}}>
          Saved Jobs
        </Text>
      </View>

      <ScrollView>
        {savedJobs.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Saved Jobs</Text>
            {savedJobs.map((job, index) => (
              <View key={index} style={styles.jobContainer}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{job.job_title}</Text>
                  <IconButton
                    icon="close"
                    size={24}
                    onPress={() => removeJobFromSaved(job)} // Remove job from saved
                    iconColor="black"
                  />
                </View>
                <Text style={styles.jobDetails}>{job.company_name}</Text>
                <Text style={styles.jobDetails}>
                  {job.experience_required} | {job.salary_range}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('JobDetailScreen', {job})}>
                  <Text style={styles.viewDetails}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {unsavedJobs.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Unsaved Jobs</Text>
            {unsavedJobs.map((job, index) => (
              <View key={index} style={styles.jobContainer}>
                <Text style={styles.jobTitle}>{job.job_title}</Text>
                <Text style={styles.jobDetails}>{job.company_name}</Text>
                <Text style={styles.jobDetails}>
                  {job.experience_required} | {job.salary_range}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  jobContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  jobDetails: {
    fontSize: 14,
    color: '#666',
  },
  viewDetails: {
    color: '#004466',
    marginTop: 10,
    fontWeight: 'bold',
  },
  noJobsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default BookmarkScreen;
