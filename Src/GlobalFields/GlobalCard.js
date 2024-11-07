import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import { colors } from '../Global_CSS/theamColors';

const CompanyCard = ({company, savedJobs, toggleSaveJob, openJobDetail}) => {
    const getChipStyle = (value) => {
        switch (value) {
          case 'Full-time':
            return styles.fullTimeChip;
          case 'Part-time':
            return styles.partTimeChip;
          case 'Contract':
            return styles.contractChip;
          case 'Internship':
            return styles.internshipChip;
          default:
            return styles.defaultChip;
        }
    };

  return (
    <View key={company.id} style={styles.companyContainer}>
      {/* Company Header: Image, Name, Job Title, and Save Icon */}
      {company.posted_jobs.map(job => (
        <View key={job.job_title} style={styles.companyHeader}>
          <View style={styles.companyInfo}>
            <Image
              source={
                companyImages[company.company_name] ||
                require('../Assets/companyImges/facebook.png')
              }
              style={styles.companyImage}
            />
            <View>
            <Text style={styles.jobTitle}>{job.job_title}</Text>
              <Text style={styles.companyName}>{company.company_name}</Text>
            
            </View>
          </View>

          {/* Save Job Button */}
          <IconButton
            style={styles.saveIcon}
            icon={
              savedJobs.some(savedJob => savedJob.job_title === job.job_title)
                ? 'bookmark'
                : 'bookmark-outline'
            }
            iconColor={
              savedJobs.some(savedJob => savedJob.job_title === job.job_title)
                ? '#000'
                : 'gray'
            }
            size={24}
            onPress={() => toggleSaveJob(job)}
          />
        </View>
      ))}

      {/* Job Details: Type, Experience, Salary */}
      {company.posted_jobs.map(job => (
        <TouchableOpacity
          key={job.job_title}
          onPress={() => openJobDetail(job)}>
          <View style={styles.location}>
            <IconButton
              icon="map-marker"
              iconColor={colors.primary}
              size={18}
              style={{padding: 0, marginLeft: -10, height: 20}}
            />
            <Text style={styles.jobLocation}>{company.location}</Text>
          </View>

          <View style={styles.jobDetailsContainer}>
             {/* Display Job Type as Chips */}
             <View style={styles.chipContainer}>
              {Array.isArray(job.employment_types) &&
                job.employment_types.map((type, index) => (
                  <Text
                    key={index}
                    style={[styles.chip, getChipStyle(type)]}>
                    {type}
                  </Text>
                ))}
            </View>

            <Text style={styles.jobDetails}>
             {job.required_experience} | {job.salary}
            </Text>


            <Text style={styles.jobPostedDate}>
              {job.date_posted
                ? moment(job.date_posted).isValid()
                  ? moment(job.date_posted).format('MMMM D, YYYY')
                  : 'Invalid Date'
                : 'January 2024'}
            </Text>
            {/* </View> */}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  companyContainer: {
    paddingLeft: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 8,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 10,
  },
  companyName: {
    fontSize: 12,
    color: 'gray',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  saveicon: {
    alignSelf: 'center',
    height: 20,
    margin: 0,
  },
  jobContainer: {
    color: '#000',
    marginLeft: 0,
    width: '100%',
  },
  jobDetailsContainer:{
       margin:0,
       padding:0
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    margin:5,
    gap:8,
  },
  chip: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    textAlign: 'center',
    color: '#000', // White text for chips

  },
  fullTimeChip: {
    backgroundColor: '#f2f2f2', // Green for Full-time
  },
  partTimeChip: {
    backgroundColor: '#f2f2f2', // Blue for Part-time
  },
  contractChip: {
    backgroundColor: '#f2f2f2', // Orange for Contract
  },
  internshipChip: {
    backgroundColor: '#f2f2f2', // Purple for Internship
  },
  defaultChip: {
    backgroundColor: '#f2f2f2', // Gray for any undefined type
  },
  jobDetails: {
    fontSize: 10,
    color: 'gray',
    
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 32,
  },
  location: {
    flexDirection: 'row',
    gap:5,
    alignItems: 'center',
    marginLeft: 0, // No margin here
    paddingLeft: 0, // No padding here
  },
  jobLocation: {
    fontSize: 12,
    color: '#808080',
    marginLeft: -12,
  },
  jobPostedDate: {
    fontSize: 12,
    color: '#808080',
    textAlign: 'right',
    marginRight: 12,
    marginTop: 5,
  },
});

const companyImages = {
  'Tech Innovations': require('../Assets/companyImges/google_icon.png'),
  'Creative Solutions': require('../Assets/companyImges/facebook.png'),
  'HealthTech Solutions': require('../Assets/companyImges/linkedin_icon.png'),
  'EcoFriendly Products': require('../Assets/companyImges/microsoft.png'),
  'Smart Home Solutions': require('../Assets/companyImges/TCS_logo.png'),
};

export default CompanyCard;