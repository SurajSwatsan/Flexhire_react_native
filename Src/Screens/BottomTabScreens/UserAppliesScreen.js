import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../Global_CSS/TheamColors';
import CustomJobCard from '../../Constant/CustomJobCard'; // Ensure correct import path
import { useNavigation } from '@react-navigation/native';

const UserApplies = () => {
  const navigation =useNavigation();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showBookmarkIcon, setShowBookmarkIcon] = useState(false);
  // Fetch applied jobs from AsyncStorage on component mount
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const appliedJobsData = await AsyncStorage.getItem('appliedJobs');
        if (appliedJobsData) {
          setAppliedJobs(JSON.parse(appliedJobsData));
        }
      } catch (error) {
        console.log('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const toggleBookmarkVisibility = () => {
    setShowBookmarkIcon(prevState => !prevState);
  };

  

  const handleJobPress = (jobData) => {
    // Navigate to the "ApplicationStatus" page when a job is pressed
    navigation.navigate('ApplicationStatus', { jobData });
  };

  return (
    <View style={styles.container}>
      {/* If there are no applied jobs, display a message */}
      
      {appliedJobs.length === 0 ? (
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
        // Display applied jobs in a vertical list with margin between them
        <ScrollView
          showsVerticalScrollIndicator={false} // To hide the scroll bar
          showBookmarkIcon={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          {appliedJobs.map((jobdata, index) => (
            <View key={jobdata.id || index} style={styles.jobCardContainer}>
              <TouchableOpacity
               
                onPress={() => handleJobPress(jobdata)}
                >
                <CustomJobCard
                  jobData={jobdata}
                  showBookmarkIcon={showBookmarkIcon}
                  isApplied={true}
                  showLocation = {true}
                  showSalary={true}
                  showWorkModes = {false}
                  // showRating = {true}
                  showPostedDate = {true}
                  navigateToApplicationStatus = {true}

                  
                />
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
  
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  Image: {
    height: 200,
    width: 200,
  },
  noJobsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
  },
  noJobs: {
    fontSize: 16,
    color: colors.blackText,
    textAlign: 'center',
    // marginBottom: 20,
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
 
});

export default UserApplies;
