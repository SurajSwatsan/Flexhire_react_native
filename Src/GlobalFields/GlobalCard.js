import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import moment from 'moment';
import {colors} from '../Global_CSS/theamColors';
import {useNavigation} from '@react-navigation/native';

const CompanyCard = ({company, savedJobs = [], toggleSaveJob}) => {
  const navigation = useNavigation();
  console.log(company);

  if (!company || !Array.isArray(company.posted_jobs)) {
    return <Text style={styles.errorText}>Invalid company data</Text>;
  }

  const getChipStyle = value => {
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
      <TouchableOpacity
        onPress={() => navigation.navigate('JobDetailScreen', {company})}>
        {company.posted_jobs.map((job, jobIndex) => (
          <View key={jobIndex} style={styles.companyHeader}>
            <View style={styles.companyInfo}>
              <Image
                source={
                  company.logo
                  ? {uri: company.logo} // Use URI if the logo is a valid URL or path
                  : require('../Assets/Logo/TCS_logo.png') // Fallback to a default image
                }
                style={styles.companyImage}
              />
              <View>
                <Text style={styles.jobTitle}>{job.job_title}</Text>
                <Text style={styles.companyName}>{company.company_name}</Text>
              </View>
            </View>

            <IconButton
              style={styles.saveIcon}
              icon={
                Array.isArray(savedJobs) &&
                savedJobs.some(savedJob => savedJob.job_title === job.job_title)
                  ? 'bookmark'
                  : 'bookmark-outline'
              }
              iconColor={
                Array.isArray(savedJobs) &&
                savedJobs.some(savedJob => savedJob.job_title === job.job_title)
                  ? '#000'
                  : 'gray'
              }
              size={24}
              onPress={() => toggleSaveJob(job)}
            />
          </View>
        ))}

        {company.posted_jobs.map((job, jobIndex) => (
          <View key={`details-${jobIndex}`}>
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
              <View style={styles.chipContainer}>
                {Array.isArray(job.job_type) &&
                  job.job_type.map((type, typeIndex) => (
                    <Text
                      key={typeIndex}
                      style={[styles.chip, getChipStyle(type)]}>
                      {type}
                    </Text>
                  ))}
              </View>

              <View
                style={{height: 0.5, backgroundColor: 'lightgray', margin: 5}}
              />

              <Text style={styles.jobDetails}>{job.salary_range}</Text>

              <Text style={styles.jobPostedDate}>
                {job.posted_date
                  ? moment(job.posted_date).isValid()
                    ? moment(job.posted_date).format('MMMM D, YYYY')
                    : 'Invalid Date'
                  : 'Date Unavailable'}
              </Text>
            </View>
          </View>
        ))}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  companyContainer: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 5,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  saveIcon: {
    alignSelf: 'center',
    height: 20,
  },
  jobDetailsContainer: {
    margin: 0,
    padding: 0,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    margin: 5,
    gap: 8,
  },
  chip: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    textAlign: 'center',
    color: '#000',
  },
  fullTimeChip: {
    backgroundColor: '#f2f2f2',
  },
  partTimeChip: {
    backgroundColor: '#f2f2f2',
  },
  contractChip: {
    backgroundColor: '#f2f2f2',
  },
  internshipChip: {
    backgroundColor: '#f2f2f2',
  },
  defaultChip: {
    backgroundColor: '#f2f2f2',
  },
  jobDetails: {
    fontSize: 12,
    color: 'gray',
    fontWeight: 'bold',
  },
  location: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
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
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CompanyCard;
