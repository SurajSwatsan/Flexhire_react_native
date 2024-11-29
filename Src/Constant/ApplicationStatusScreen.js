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
import Timeline from 'react-native-timeline-flatlist';
import CustomHeader from './CustomBackIcon';
import CustomJobCard from './CustomJobCard';

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
  const relatedJobs = jobData.related_jobs;

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
      <View style={styles.hederText}>
        <CustomHeader />
        <Text style={styles.companyHeader}>{jobData.company.company_name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} marginVertical={18}>
        <View style={styles.jobContainer}>
          {/* Job Image */}
          <Image
            source={
              jobData.company?.logo
                ? {uri: jobData.company?.logo}
                : require('../Assets/CompanyLogo/TCS_logo.png')
            }
            style={styles.image}
          />

          <View>
            <Text style={styles.jobTitle}>{jobData.job_title}</Text>

            <Text style={styles.companyName}>
              {jobData.company?.company_name}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                size={16}
                color="#ffd700"
                style={styles.ratingIcon}
              />
              <Text style={styles.ratingText}>{jobData.company.rating}</Text>
            </View>
          </View>
        </View>

        {/* Button to view job description */}
        <TouchableOpacity onPress={handleViewDescriptionPress}>
          <Text style={styles.viewDescription}>View Description</Text>
        </TouchableOpacity>

        <View style={styles.applicationContainer}>
          {/* <Text>hello</Text> */}
          <Ionicons
            name="analytics-sharp"
            size={34}
            color="#ffd700"
            style={styles.analyticon}
          />

          <View style={styles.applicationText}>
            <Text style={styles.subText}>12326 Applicants on this job</Text>
            <Text style={styles.subText}>
              0 Applications viewed by recruiter
            </Text>
          </View>
        </View>

        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Your Application Status</Text>

          <ScrollView horizontal={true} style={styles.timelineWrapper}>
            <View style={{flex: 1, paddingVertical: 12}}>
              <Timeline
                data={applicationTimeline.map(item => ({
                  time: item.date, // Add time (date) for the timeline
                  title: item.stage, // Stage as title
                  description: item.status, // Status as description
                }))}
                circleSize={15} // Size of the circle (dot) in the timeline
                circleColor="#004466" // Color of the circle (dot)
                lineColor="#acd2be" // Color of the connecting line
                innerCircle={'dot'} // Use a simple dot in the inner circle
                titleStyle={styles.cardTitle} // Title style for the awards
                descriptionStyle={styles.cardDate} // Date style for the award description (optional)
                renderTime={rowData => (
                  <Text style={styles.cardDate}>{rowData.time}</Text>
                )}
                renderDetail={rowData => (
                  <View style={styles.detailContainer}>
                    <Text style={styles.cardTitle}>{rowData.title}</Text>
                    <Text style={styles.cardDate}>{rowData.description}</Text>
                  </View>
                )}
                options={{
                  style: {
                    marginLeft: 0, 
                    padding: 0, 
                  },
                }}
                eventContainerStyle={styles.eventContainer}
              />
            </View>
          </ScrollView>
          {relatedJobs && Object.keys(relatedJobs).length > 0 && (
            <View style={styles.relatedjobcontainer}>
              <View style={styles.displayContainer}>
                <Text style={styles.contHead}>Similar Jobs</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView>
                {Object.entries(relatedJobs).map(([key, jobdata], index) => (
                  <View key={jobdata.id || index} style={{marginBottom: 14}}>
                    <TouchableOpacity
                      onPress={() => {
                        // Navigate to JobDetailScreen for the related job
                        navigation.navigate('JobDetailScreen', {
                          jobData: jobdata,
                        });
                      }}>
                      <CustomJobCard jobData={jobdata} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
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
  hederText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyHeader: {
    color: colors.blackText,
    fontSize: 16,
    marginLeft: 18,
  },
  jobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 8,
    backgroundColor:'#fafafa',
    padding:8,
    borderRadius:8
  },

  image: {
    height: 56,
    width: 56,
    marginBottom: 12,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    // marginTop: 18,
  },
  jobTitle: {
    fontSize: 16,
    color: colors.blackText,
    // marginBottom: 4,
  },
  companyName: {
    fontSize: 12,
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
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
    color: colors.secondary,
    fontSize: 14,
    // fontWeight: 'bold',
    marginBottom: 14,
  },
  timelineWrapper: {
    marginTop: 18,
    backgroundColor: '#e3f0e9',
    padding: 10,
    borderRadius: 8,
  },
  
  detailContainer: {
    flexDirection: 'column',
    // paddingLeft: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cardDate: {
    fontSize: 12,
    color: colors.primary,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  applicationContainer: {
    backgroundColor: '#e6eeff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  applicationText: {
    marginLeft: 18,
  },

  subText: {
    color: colors.blackText,
    fontSize: 12,
  },

  timelineContainer: {
    marginTop: 10,
  },

  relatedjobcontainer: {
    // marginTop:16,
    marginBottom: 12,
    backgroundColor: colors.background,
    marginTop: 12,
  },
  contHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackText,
    marginTop: 8,
  },
  seeAll: {
    fontSize: 12,
    color: colors.blackText,
    marginRight: 8,
    textDecorationLine: 'underline',
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 10,
  },
});

export default ApplicationStatusScreen;
