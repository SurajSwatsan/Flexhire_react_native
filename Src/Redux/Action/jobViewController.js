// import { useNavigation } from '@react-navigation/native';
// import { Toast } from 'react-native-toast-notifications';
// import { fetchJobData } from './JobViewAction';
// // import { fetchJobData } from '../Redux/Action/jobActions'; // Action to fetch job data

// const JobViewController = () => {
//   const navigation = useNavigation();

//   // Function to fetch job data
//   const fetchJobDataFromAPI = () => async (dispatch) => {
//     try {
//       dispatch(fetchJobData()); // Dispatch action to fetch job data
//     } catch (error) {
//       Toast.show('Error fetching jobs', {
//         type: 'danger',
//         placement: 'top',
//         duration: 4000,
//         offset: 100,
//         animationType: 'slide-in',
//       });
//     }
//   };

//   return {
//     fetchJobDataFromAPI,
//   };
// };

// export default JobViewController;
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-notifications';
import { fetchJobData } from './JobViewAction';
// import { fetchJobData } from '../Redux/Action/jobViewController'; // Assuming fetchJobData is your action

const JobView = () => {
  // const dispatch = useDispatch();
  // const { jobData, loading, error } = useSelector((state) => state.job);
  // console.log(jobData);

  // // Dispatch the action only once when the component mounts
  // useEffect(() => {
  //   if (!jobData.length) {  // Prevent multiple API calls
  //     dispatch(fetchJobData());
  //   }
  // }, [dispatch, jobData.length]); // Depend on jobData.length, so it doesn't call again after data is fetched

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>{item.company}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Listings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={jobData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderJobItem}
        />
      )}

      {error && (
        <Toast show={true} message={error} type="danger" placement="top" duration={4000} offset={100} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  jobItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 16,
    color: '#777',
  },
});

export default JobView;

