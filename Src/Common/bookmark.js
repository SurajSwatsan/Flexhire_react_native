import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomHeader from '../Components/customHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompanyCard from '../ReusableComponents/ReusableJobCard';
import {colors} from '../Global_CSS/theamColors';

const BookmarkScreen = ({navigation}) => {
  const [savedJobs, setSavedJobs] = useState([]);

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

  const removeJobFromSaved = async jobToRemove => {
    const updatedSavedJobs = savedJobs.filter(
      job => job.job_title !== jobToRemove.job_title,
    );
    setSavedJobs(updatedSavedJobs);

    try {
      await AsyncStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
    } catch (error) {
      console.error('Failed to remove job from AsyncStorage', error);
    }
  };
console.log(savedJobs);

  return (
    <View style={styles.container}>
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
              toggleSaveJob={() => removeJobFromSaved(job)}
            />
          ))
        ) : (
          <Text style={styles.noJobsText}>No saved jobs</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bacground,
    width: '100%',
    padding: 12,
  },
  noJobsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookmarkScreen;
