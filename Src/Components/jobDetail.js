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
  const {jobData} = route.params; // Get company data from params
  const [activeTab, setActiveTab] = useState('About');
  const [isApplied, setIsApplied] = useState(false); // Track if the job has been applied to

  console.log('Company Data:', jobData);

  const renderTabs = () => {
    switch (activeTab) {
      case 'About':
        return (
          <View>
            <View>
              {/* Directly accessing the properties of jobData */}
              <View style={{marginBottom: 20}}>
                <View style={styles.jobDetailsContainer}>
                  <Text style={styles.jobDescriptionheader}>Job Description:</Text>
                  <Text style={styles.jobDescription}>
                    {jobData.job_description}
                  </Text>
                </View>
                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Department:</Text>
                  <Text style={styles.jobDetails1}>{jobData.department}</Text>
                </View>
                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Employment types:</Text>
                  <Text style={styles.jobDetails1}>
                    {jobData.employment_types?.join(', ')}
                  </Text>
                </View>
                <View style={styles.educationContainer}>
                  <Text style={styles.educationHeader}>Education:</Text>
                  {jobData.education?.map((edu, index) => (
                    <View key={index} style={styles.educationTab}>
                      <Text style={styles.educationText}>{edu}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Working Modes:</Text>
                  <Text style={styles.jobDetails1}>
                    {jobData.work_modes?.join(', ')}
                  </Text>
                </View>
                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Role Category:</Text>
                  <Text style={styles.jobDetails1}>{jobData.role_category}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.jobDetails1}>
              Recruiter Name: {jobData.recruiter_name}
            </Text>
            <Text style={styles.jobDetails1}>
              Contact Email: {jobData.company.contact_email}
            </Text>
            <Text style={styles.jobDetails1}>Phone: {jobData.company.phone}</Text>
          </View>
        );
      case 'Company':
        return (
          <View>
            <Text style={styles.jobTitle}>{jobData.company.company_name}</Text>
            <Text style={styles.jobDetails1}>About: {jobData.company.about}</Text>
            <Text style={styles.jobDetails1}>Industry: {jobData.company.industry}</Text>
            <Text style={styles.jobDetails1}>Location: {jobData.company.location}</Text>
            <Text style={styles.jobDetails1}>
              Contact Email: {jobData.company.contact_email}
            </Text>
            <Text style={styles.jobDetails1}>Phone: {jobData.company.phone}</Text>
            <Text style={styles.jobDetails1}>
              Recruiter Name: {jobData.company.recruiter_name}
            </Text>
            <Text style={styles.jobDetails1}>Website: {jobData.company.website}</Text>
          </View>
        );
      case 'Review':
        return (
         <View></View>
        );
      default:
        return null;
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
                  jobData.company.logo
                    ? {uri: jobData.company.logo} // Use URI if the logo is a valid URL or path
                    : require('../Assets/CompanyLogo/TCS_logo.png') // Fallback to a default image
                }
                style={styles.logo}
              />
            </View>
            <Text style={styles.jobTitle}>
              {jobData.job_title}
            </Text>
            <Text style={styles.companyName}>{jobData.company_name}</Text>
            <View style={styles.locationContainer}>
              <IconButton
                icon="map-marker"
                iconColor={colors.primary}
                size={18}
                style={{padding: 0, marginLeft: -10, height: 20}}
              />
              <Text style={styles.location}>
                {jobData.job_location}
              </Text>
            </View>

            <View style={styles.mainfildContainer}>
              {[
                {
                  icon: 'cash',
                  label: 'Salary Range',
                  value: `${jobData.salary_min} - ${jobData.salary_max}`,
                },
                {
                  icon: 'signal-cellular-3',
                  label: 'Level',
                  value: jobData.experience,
                },
                {
                  icon: 'account',
                  label: 'Openings',
                  value: jobData.openings,
                },
                {
                  icon: 'account-group',
                  label: 'Applications',
                  value: jobData.applications,
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
          // onPress={() => addJobIfNotExist(company)} // On apply button press
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
    // alignSelf: 'center',
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
    // alignItems: 'center',
  },
  jobDescriptionheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.blackText,
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
    color: 'black',
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
