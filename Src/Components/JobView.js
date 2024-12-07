import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobData } from '../Redux/Action/JobViewAction'; // Import the action directly

const JobViewPage = () => {
  const dispatch = useDispatch();
  const { jobData, loading, error } = useSelector((state) => state.job); // Access job data from Redux
console.log('job data ',  jobData);

  useEffect(() => {
    dispatch(fetchJobData()); // Dispatch the action to fetch job data when the component mounts
  }, [dispatch]); // Only depend on dispatch as fetchJobData is a function and does not need to be in the dependency list

  // Render each job item
  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.job_title.title}</Text>
      <Text style={styles.jobCompany}>{item.company_name}</Text>
      <Button title="View Details" onPress={() => {/* navigate to job details page */}} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Job Data</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={jobData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderJobItem}
        />
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
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default JobViewPage;
