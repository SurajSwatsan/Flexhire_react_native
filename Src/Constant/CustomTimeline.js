import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Timeline from 'react-native-timeline-flatlist';
import {colors} from '../Global_CSS/TheamColors'; // Assuming you have a colors file

const applicationStatus = [
  'Applied',
  'Application Viewed',
  'Accepted',
  'Rejected',
  'Interview Scheduled',
  'Hired',
];

const res = [
  {
    date: '2024-11-01',
    status: 'Applied',
    message: 'Application submitted',
  },
  {
    date: '2024-11-03',
    status: 'Application Viewed',
    message: 'Application viewed successfully',
  },
  {
    date: '2024-11-05',
    status: 'Accepted',
    message: 'Application Accepted',
  },
  {
    date: '2024-11-05',
    status: 'Rejected',
    message: 'Application Rejected',
  },
];

const CustomTimelineScreen = () => {
  const [timelineData, setTimelineData] = useState([]);

  // Function to get date and message by status
  const getDateByStatus = status => {
    const item = res.find(entry => entry.status === status);
    return item ? item.date : '';
  };

  // Function to get message by status
  const getMessageByStatus = status => {
    const item = res.find(entry => entry.status === status);
    return item ? item.message : '';
  };

  // Function to map status to an icon
  const getStatusIcon = status => {
    switch (status) {
      case 'Applied':
        return 'document-text'; // Icon for Applied
      case 'Application Viewed':
        return 'eye'; // Icon for viewed
      case 'Accepted':
        return 'checkmark-circle'; // Icon for accepted
      case 'Rejected':
        return 'close-circle'; // Icon for rejected
      case 'Interview Scheduled':
        return 'calendar'; // Icon for interview scheduled
      case 'Hired':
        return 'person'; // Icon for hired
      default:
        return 'help-circle'; // Default icon for undefined status
    }
  };

  // Prepare the timeline data when component mounts
  useEffect(() => {
    const data = applicationStatus.map(status => ({
      time: getDateByStatus(status), // Get date by status
      title: status, // Title is the status
      description: getMessageByStatus(status), // Get message by status
      icon: getStatusIcon(status), // Get the icon based on status
    }));
    setTimelineData(data); // Set the timeline data in the state
  }, []); // Empty dependency array means this runs only once on mount

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={{flex: 1, paddingVertical: 12}}>
          <Timeline
            data={timelineData} // Pass the formatted timeline data
            // circleSize={20} // Size of the circle (dot) in the timeline (kept for structure)
            // circleColor="#004466" // Color of the circle (dot)
            lineColor="#acd2be" // Color of the connecting line
            // innerCircle="icon" // You can keep a dot but customize its look if you like
            titleStyle={styles.cardTitle} // Style for the title
            descriptionStyle={styles.cardDescription} // Style for the description
            renderTime={() => null} // Disable time display
            renderDetail={item => (
              <View style={styles.detailContainer}>
                <View style={styles.iconWrapper}>
                  <Ionicons
                    name={item.icon} // Dynamically set the icon based on status
                    size={20}
                    color={colors.primary} // Set the icon color
                  />
                </View>
                <View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDate}>{item.time}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
              </View>
            )}
            eventContainerStyle={{marginTop: -10}} // Adjust vertical spacing if needed
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f0e9',
    marginVertical: 14,
    borderRadius: 8,
    paddingVertical: 18,
    justifyContent: 'center',
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
  cardDescription: {
    fontSize: 12,
    color: colors.primary,
  },
  detailContainer: {
    flexDirection: 'row', // Layout items horizontally
    alignItems: 'center', // Align vertically
    paddingLeft: 10,
  },
  iconWrapper: {
    marginRight: 10, // Add space between the icon and the text
  },
});

export default CustomTimelineScreen;
