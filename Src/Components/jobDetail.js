import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CustomHeader from './customHeader';
import GlobalStyle from '../Global_CSS/GlobalStyle';

const JobDetailScreen = ({route, navigation}) => {
  const {job} = route.params;

  return (
    <View style={styles.container}>
      <View style={GlobalStyle.headerStyle}>
      <CustomHeader/>
      <Text style={GlobalStyle.headerText}>Job Information</Text>
      <View>
        
      </View>
      </View>
      {/* <CustomHeader/> */}
      <Image
       source={require('../Assets/Logo/TCS_logo.png')}
       style={styles.logo}
      />
      <Text style={styles.jobTitle}>{job.job_title}</Text>
      <Text style={styles.jobDescription}>{job.job_description}</Text>
      <Text style={styles.jobDetails}>
        Experience Required: {job.experience_required}
      </Text>
      <Text style={styles.jobDetails}>Salary Range: {job.salary_range}</Text>
      <Text style={styles.jobDetails}>
        Required Skills: {job.required_skills.join(', ')}
      </Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffff',
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000'
  },
  jobDescription: {
    fontSize: 16,
    marginBottom: 10,
    color:'#000'
  },
  jobDetails: {
    fontSize: 14,
    marginBottom: 5,
    color:'#000'
  },
  logo: {
    padding: 10,
    width: 100,
    height: 100,
    alignSelf:'center',
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#004466',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default JobDetailScreen;
