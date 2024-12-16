import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import moment from 'moment';
import CustomTimelineScreen from './CustomTimeline';

const ApplicationStatusScreen = ({route}) => {
  const navigation = useNavigation(); // Get the navigation prop
  const {ApplicationObject} = route.params;

  // Function to navigate to the JobDescription screen
  const handleViewDescriptionPress = () => {
    navigation.navigate('JobDetailScreen', {job_id: ApplicationObject.job.id});
  };

  return (
    <View style={styles.container}>
      <View style={styles.hederText}>
        <CustomHeader />
        <Text style={styles.companyHeader}>
          {ApplicationObject?.job?.company_name}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} marginVertical={18}>
        <View style={styles.jobContainer}>
          <Image
            source={
              ApplicationObject?.job?.company?.logo
                ? {uri: ApplicationObject?.job?.company?.logo}
                : require('../Assets/CompanyLogo/Swatsan.png')
            }
            style={styles.image}
          />

          <View>
            <Text style={styles.jobTitle}>
              {ApplicationObject?.job?.job_title?.title}
            </Text>

            <Text style={styles.companyName}>
              {ApplicationObject?.job?.company_name}
            </Text>
            {/* <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                size={16}
                color="#ffd700"
                style={styles.ratingIcon}
              />
              <Text style={styles.ratingText}>
                {ApplicationObject?.job?.rating}
              </Text>
            </View> */}
          </View>
        </View>

        <TouchableOpacity onPress={handleViewDescriptionPress}>
          <Text style={styles.viewDescription}>View Description</Text>
        </TouchableOpacity>

        <View style={styles.applicationContainer}>
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

          <CustomTimelineScreen res={ApplicationObject?.state_of_status} />

          {ApplicationObject?.job?.related_jobs?.length > 0 && (
            <View style={styles.relatedjobcontainer}>
              <View style={styles.displayContainer}>
                <Text style={styles.contHead}>Similar Jobs</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>

              {/* <ScrollView>
                {ApplicationObject?.job?.related_jobs.map(({item, index}) => (
                  <View key={item?.id || index} style={{marginBottom: 14}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('JobDetailScreen', {
                          jobData: item,
                        });
                      }}>
                      <CustomJobCard jobData={item} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView> */}
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
    backgroundColor: '#fafafa',
    padding: 8,
    borderRadius: 8,
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
    padding: 12,
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
    marginRight: 5,
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
  eventContainer: {
    // marginTop: 16,
    // backgroundColor: '#fafafa',
    // borderRadius:8,
    // marginBottom: 8,
    flexDirection: 'row', // Ensure elements in each event are aligned horizontally
    justifyContent: 'flex-start', // Align all items to the left
    alignItems: 'center', // Keep the items aligned vertically
  },
});

export default ApplicationStatusScreen;
