import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import CustomHeader from '../Constant/CustomBackIcon';
import GlobalStyle from '../Global_CSS/GlobalStyle';
import {colors} from '../Global_CSS/TheamColors';
import {IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobDetailScreen = ({route, navigation}) => {
  const {company} = route.params; // Get company data from params
  const [activeTab, setActiveTab] = useState('About');
  const [isApplied, setIsApplied] = useState(false); // Track if the job has been applied to

  // console.log('Company Data:', company);

  const renderTabs = () => {
    switch (activeTab) {
      case 'About':
        return (
          <View>
            <View>
              {company.posted_jobs.map((job, index) => (
                <View key={index} style={{marginBottom: 20}}>
                  <View style={styles.jobDetailsContainer}>
                    <Text style={styles.jobDescriptionheader}>
                      Job Description:
                    </Text>
                    <Text style={styles.jobDescription}>
                      {job.job_description}
                    </Text>
                  </View>
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>Department:</Text>
                    <Text style={styles.jobDetails1}>{job.department}</Text>
                  </View>
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>
                      Employment types:
                    </Text>
                    <Text style={styles.jobDetails1}>
                      {job.employment_types?.join(', ')}
                    </Text>
                  </View>
                  <View style={styles.educationContainer}>
                    <Text style={styles.educationHeader}>Education:</Text>
                    {job.education?.map((edu, index) => (
                      <View key={index} style={styles.educationTab}>
                        <Text style={styles.educationText}>{edu}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>Working Modes:</Text>
                    <Text style={styles.jobDetails1}>
                      {job.work_modes?.join(', ')}
                    </Text>
                  </View>
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>Role Category:</Text>
                    <Text style={styles.jobDetails1}>{job.role_category}</Text>
                  </View>
                </View>
              ))}
            </View>
            <Text style={styles.jobDetails1}>
              Recruiter Name: {company.recruiter_name}
            </Text>
            <Text style={styles.jobDetails1}>
              Contact Email: {company.contact_email}
            </Text>
            <Text style={styles.jobDetails1}>Phone: {company.phone}</Text>
          </View>
        );
      case 'Company':
        return (
          <View>
            <Text style={styles.jobTitle}>{company.company_name}</Text>
            <Text style={styles.jobDetails1}>About: {company.about}</Text>
            <Text style={styles.jobDetails1}>Industry: {company.industry}</Text>
            <Text style={styles.jobDetails1}>Location: {company.location}</Text>
            <Text style={styles.jobDetails1}>
              Contact Email: {company.contact_email}
            </Text>
            <Text style={styles.jobDetails1}>Phone: {company.phone}</Text>
            <Text style={styles.jobDetails1}>
              Recruiter Name: {company.recruiter_name}
            </Text>
            <Text style={styles.jobDetails1}>Website: {company.website}</Text>
          </View>
        );
      case 'Review':
        return (
          <Text style={styles.jobDescription}>{company.job_description}</Text>
        );
      default:
        return null;
    }
  };

  useEffect(() => {

    const loadAppliedStatus = async () => {
      try {
        // Check if the job has been applied to (using job title as the unique key)
        const jobKey = `isApplied_${company.posted_jobs[0]?.job_title}`;
        const storedStatus = await AsyncStorage.getItem(jobKey);

        if (storedStatus !== null) {
          setIsApplied(JSON.parse(storedStatus)); // Load the stored applied status
        }
      } catch (error) {
        console.error('Error loading applied status', error);
      }
    };

    loadAppliedStatus();
  }, [company]);

  const handleApplyPress = async () => {
    setIsApplied(true); // Change the apply status to 'Applied'

    try {
      // Get the current list of applied jobs from AsyncStorage
      let appliedJobs = await AsyncStorage.getItem('appliedJobs');
      appliedJobs = appliedJobs ? JSON.parse(appliedJobs) : [];
      // console.log('appliedJobs',appliedJobs);

      const job = company.posted_jobs[0]; // Assuming we're dealing with the first job
      const jobId = job.job_id;

      // Check if the current job is already in the applied list
      const isJobAlreadyApplied = appliedJobs.some(
        appliedJob => appliedJob.job_id === jobId,
      );
      appliedJobs.push({
        job_id: jobId,
        company: company.company_name,
        job_title: job.job_title,
        job_description: job.job_description,
        application_date: new Date().toISOString(),
        location: job.location,
        salary_range: job.salary_range,
        // Add any other relevant data about the applied job
      });

      // Save the updated list of applied jobs in AsyncStorage
      await AsyncStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
      // if (!isJobAlreadyApplied) {
      //   // If it's not already applied, add it to the list
      //   appliedJobs.push({
      //     job_id: jobId,
      //     company: company.company_name,
      //     job_title: job.job_title,
      //     job_description: job.job_description,
      //     application_date: new Date().toISOString(),
      //     location: job.location,
      //     salary_range: job.salary_range,
      //     // Add any other relevant data about the applied job
      //   });

      //   // Save the updated list of applied jobs in AsyncStorage
      //   await AsyncStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
      // }
    } catch (error) {
      console.error('Failed to save apply status or applied jobs', error);
    }

    // Navigate to the AppliedJobs screen, passing complete company data and applied jobs
    // navigation.navigate('AppliedJobs',
    //    {
    //     appliedJob: company.posted_jobs[0],  // Pass applied job data
    //   companyData: company, // Pass all company data
    // });
  };
  const addJobIfNotExist = async job => {
    console.log('job ++++++++++++++', job);

    try {
      // Retrieve the current saved jobs list from AsyncStorage
      const savedJobs = await AsyncStorage.getItem('newJobs');
      const jobsArray = savedJobs ? JSON.parse(savedJobs) : [];
      console.log('savedJobs ++++++++++++++', jobsArray);

      // Check if the job already exists in the list using job.id
      const isJobAlreadySaved = jobsArray.some(
        savedJob => savedJob.id === job.id,
      );

      if (!isJobAlreadySaved) {
        // If the job doesn't exist, add it to the array
        jobsArray.push({
          job_id: jobId,
          company: company.company_name,
          job_title: job.job_title,
          job_description: job.job_description,
          application_date: new Date().toISOString(),
          location: job.location,
          salary_range: job.salary_range,
          // Add any other relevant data about the applied job
        });

        // Save the updated list back to AsyncStorage
        await AsyncStorage.setItem('newJobs', JSON.stringify(jobsArray));
        console.log('Job added successfully!');
      } else {
        console.log('Job is already in the saved list.');
      }
    } catch (error) {
      console.error('Error adding job to saved list:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={GlobalStyle.headerStyle}>
        <CustomHeader />
        <Text style={GlobalStyle.headerText}>Job Information</Text>
        <View />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.companyInfoContainer}>
          <View style={styles.companyInfo}>
            <View style={styles.logoContainer}>
              <Image
                source={
                  company.logo
                    ? {uri: company.logo} // Use URI if the logo is a valid URL or path
                    : require('../Assets/CompanyLogo/TCS_logo.png') // Fallback to a default image
                }
                style={styles.logo}
              />
            </View>
            <Text style={styles.jobTitle}>
              {company.posted_jobs[0]?.job_title}
            </Text>
            <Text style={styles.companyName}>{company.company_name}</Text>
            <View style={styles.locationContainer}>
              <IconButton
                icon="map-marker"
                iconColor={colors.primary}
                size={18}
                style={{padding: 0, marginLeft: -10, height: 20}}
              />
              <Text style={styles.location}>
                {company.posted_jobs[0]?.location}
              </Text>
            </View>

            <View style={styles.mainfildContainer}>
              {[
                {
                  icon: 'cash',
                  label: 'Salary Range',
                  value: company.posted_jobs[0]?.salary_range,
                },
                {
                  icon: 'signal-cellular-3',
                  label: 'Level',
                  value: company.posted_jobs[0]?.experience_required,
                },
                {
                  icon: 'account',
                  label: 'Openings',
                  value: company.posted_jobs[0]?.positions_available,
                },
                {
                  icon: 'account-group',
                  label: 'Applications',
                  value: company.posted_jobs[0]?.applications,
                },
              ].map((item, index) => (
                <View key={index} style={styles.fildContainer}>
                  <IconButton
                    icon={item.icon}
                    iconColor={colors.primary}
                    size={24}
                    style={styles.iconstyle}
                  />
                  <View style={styles.fildinerContainer}>
                    <Text style={styles.jobDetails1}>{item.label}</Text>
                    <Text style={styles.jobDetails}>{item.value}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'About' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('About')}>
                <Text style={styles.tabText}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'Company' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('Company')}>
                <Text style={styles.tabText}>Company</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  activeTab === 'Review' && styles.activeTab,
                ]}
                onPress={() => setActiveTab('Review')}>
                <Text style={styles.tabText}>Review</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>{renderTabs()}</View>
          </View>
        </View>
      </ScrollView>

      {/* Apply Button */}
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => addJobIfNotExist(company)} // On apply button press
          // disabled={isApplied} // Disable if already applied
        >
          <Text style={styles.applyButtonText}>
            {isApplied ? 'Applied' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#000',
  },
  companyName: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  location: {
    fontSize: 12,
    color: '#000',
  },
  mainfildContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Adjusts space between items
  },
  fildContainer: {
    width: '48%', // Ensures two items per row, adjustable for spacing
    marginBottom: 10, // Space between rows
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBgcolor,
    borderRadius: 8,
    elevation: 2,
  },
  fildinerContainer: {
    flex: 1,
    marginLeft: 4, // Space between the icon and text
  },
  jobDescription: {
    fontSize: 13,
    color: '#000',
    textAlign: 'justify',
  },
  companyInfoContainer: {
    marginTop: 70,
    backgroundColor: colors.cardBgcolor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  companyInfo: {
    top: -40,
    marginHorizontal: 12,
  },
  jobDetails: {
    fontSize: 12,
    marginBottom: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  jobDetails1: {
    fontSize: 12,
    color: '#000',
    alignItems: 'center',
  },
  iconstyle: {
    backgroundColor: colors.background,
  },
  logoContainer: {
    borderWidth: 0.5,
    borderColor: colors.lightgaryText,
    backgroundColor: colors.cardBgcolor,
    borderRadius: 100, // Ensures circular shape
    // top: -60,
    width: 80,
    height: 80,
    overflow: 'hidden', // Ensures the image does not exceed the container bounds
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain', // Adjusts the image to cover the container uniformly
  },
  applyButton: {
    // marginTop: 24,
    margin: 16,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  appliedButton: {
    backgroundColor: 'green', // Disabled color to indicate the button is applied
  },

  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  activeTab: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 4,
  },
  tabText: {
    color: '#333',
  },
  contentContainer: {
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
  },
  jobDetailsContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  jobDescriptionheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'gray',
  },
  jobDepartmentContainer: {
    marginBottom: 4,
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailsheader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'gray',
  },
  educationContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  educationHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'gray',
  },
  educationText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
  },
});
export default JobDetailScreen;
