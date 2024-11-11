import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import CustomHeader from '../Components/customHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompanyCard from '../GlobalFields/GlobalCard';
import {colors} from '../Global_CSS/theamColors';

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

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView>
          {savedJobs.length > 0 ? (
            savedJobs.map((job, index) => (
              <CompanyCard
                key={index}
                company={{
                  posted_jobs: [job],
                  company_name: job.company_name,
                  logo: job.logo,
                  location: job.location,
                }}
                savedJobs={savedJobs}
                toggleSaveJob={removeJobFromSaved}
              />
            ))
          ) : (
            <Text style={styles.noJobsText}>No saved jobs</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bacground,
    width: '100%',
  },
  innerContainer: {
    margin: 12,
  },
  noJobsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookmarkScreen;
