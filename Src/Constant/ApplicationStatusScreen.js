import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const applicationTimeline = [
  {stage: 'Applied', date: '2024-11-01', status: 'Application submitted'},
  {
    stage: 'Interview Scheduled',
    date: '2024-11-05',
    status: 'Interview scheduled for next week',
  },
  {stage: 'Interviewed', date: '2024-11-10', status: 'Interview completed'},
  {stage: 'Offer Received', date: '2024-11-15', status: 'Offer letter sent'},
];

const ApplicationStatusScreen = ({route}) => {
  const navigation = useNavigation(); // Get the navigation prop
  const {jobData} = route.params;

  if (!jobData) {
    return (
      <View style={styles.container}>
        <Text>No job data available!</Text>
      </View>
    );
  }

  // Function to navigate to the JobDescription screen
  const handleViewDescriptionPress = () => {
    // Navigate to the JobDescription screen with jobData passed as a parameter
    navigation.navigate('JobDetailScreen', {jobData});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Job Image */}
        <Image
          source={
            jobData.company?.logo
              ? {uri: jobData.company?.logo}
              : require('../Assets/CompanyLogo/TCS_logo.png')
          }
          style={styles.image}
        />

        <Text style={styles.jobTitle}>{jobData.job_title}</Text>

        <Text style={styles.companyName}>{jobData.company?.company_name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons
            name="star"
            size={16}
            color="#ffd700"
            style={styles.ratingIcon}
          />
          <Text style={styles.ratingText}>{jobData.company.rating}</Text>
        </View>

        {/* Button to view job description */}
        <TouchableOpacity onPress={handleViewDescriptionPress}>
          <Text style={styles.viewDescription}>View Description</Text>
        </TouchableOpacity>

        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Application Status Timeline</Text>

          {/* Loop through timeline stages */}
          {applicationTimeline.map((stage, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineStage}>{stage.stage}</Text>
                <Text style={styles.timelineDate}>{stage.date}</Text>
                <Text style={styles.timelineStatus}>{stage.status}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 18,
    marginHorizontal: 18,
    backgroundColor: colors.background,
  },

  image: {
    height: 72,
    width: 72,
    marginBottom: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 16,
    color: colors.blackText,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 12,
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  ratingIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: 'gray',
  },
  viewDescription: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timelineContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackText,
    marginBottom: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginRight: 15,
  },
  timelineContent: {
    flex: 1,
  },
  timelineStage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  timelineDate: {
    fontSize: 12,
    color: 'gray',
  },
  timelineStatus: {
    fontSize: 12,
    color: colors.blackText,
  },
});

export default ApplicationStatusScreen;
