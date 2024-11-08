
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import CustomHeader from './customHeader';
import GlobalStyle from '../Global_CSS/GlobalStyle';
import {colors} from '../Global_CSS/theamColors';
import {IconButton} from 'react-native-paper';

const JobDetailScreen = ({route, navigation}) => {
  const {company} = route.params;
  const [activeTab, setActiveTab] = useState('About');
  console.log(company);
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
                  {/* <Text style={styles.jobDetails}>
                  Job Title: {job.job_title}
                </Text> */}
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
                  {/* <Text style={styles.jobDetails1}>Location: {job.location}</Text> */}
                  {/* <Text style={styles.jobDetails1}>
                    Required Experience: {job.required_experience}
                  </Text> */}
                  {/* <Text style={styles.jobDetails1}>
                    Applications: {job.applications}
                  </Text>
                  <Text style={styles.jobDetails1}>
                    Openings: {job.openings}
                  </Text>
                  <Text style={styles.jobDetails1}>Salary: {job.salary}</Text> */}
                  {/* <Text style={styles.jobDetails1}>Rating: {job.rating}</Text>
                  <Text style={styles.jobDetails1}>Reviews: {job.reviews}</Text> */}
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
            <Image source={company.logo} style={styles.logo} />
            {/* {renderTabs()} */}
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
              <View style={styles.fildContainer}>
                <IconButton
                  icon="cash"
                  iconColor={colors.primary}
                  size={24}
                  style={styles.iconstyle} // Ensure no padding/margin on the icon
                />
                <View style={styles.fildinerContainer}>
                  <Text style={styles.jobDetails1}>Salary Range</Text>
                  <Text style={styles.jobDetails}>
                    {company.posted_jobs[0]?.salary}
                  </Text>
                </View>
              </View>
              <View style={styles.fildContainer}>
                <IconButton
                  icon="signal-cellular-3"
                  iconColor={colors.primary}
                  size={24}
                  style={styles.iconstyle}
                />
                <View style={styles.fildinerContainer}>
                  <Text style={styles.jobDetails1}>Level</Text>
                  <Text style={styles.jobDetails}>
                    {company.posted_jobs[0]?.required_experience}
                  </Text>
                </View>
              </View>
              <View style={styles.fildContainer}>
                <IconButton
                  icon="account"
                  iconColor={colors.primary}
                  size={24}
                  style={styles.iconstyle}
                />
                <View style={styles.fildinerContainer}>
                  <Text style={styles.jobDetails1}>Openings</Text>
                  <Text style={styles.jobDetails}>
                    {company.posted_jobs[0]?.openings}
                  </Text>
                </View>
              </View>
              <View style={styles.fildContainer}>
                <IconButton
                  icon="account-group"
                  iconColor={colors.primary}
                  size={24}
                  style={styles.iconstyle} // Ensure no padding/margin on the icon
                />
                <View style={styles.fildinerContainer}>
                  <Text style={styles.jobDetails}>Applications</Text>
                  <Text style={styles.jobDetails}>
                    {company.posted_jobs[0]?.applications}
                  </Text>
                </View>
              </View>
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
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>Go Back</Text>
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
  },
  location: {
    fontSize: 12,
    color: '#000',
  },
  mainfildContainer: {
    marginVertical: 18,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 8,
  },
  fildContainer: {
    backgroundColor: colors.cardcolor,
    flexDirection: 'row',
    width: 180,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  fildinerContainer: {
    flexDirection: 'column',
  },
  jobDescription: {
    fontSize: 13,
    color: '#000',
  },
  companyInfoContainer: {
    marginTop: 100,
    backgroundColor: colors.cardcolor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  companyInfo: {
    marginHorizontal: 18,
  },
  jobDetails: {
    fontSize: 13,
    marginBottom: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  jobDetails1: {
    fontSize: 12,
    color: '#000',
  },
  iconstyle: {
    backgroundColor: colors.bacground,
  },
  logo: {
    marginTop: -50,
    borderRadius: 50,
    backgroundColor: '#d5d5d5',
    padding: 10,
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  closeButton: {
    marginTop: 24,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  applyButtonContainer: {
    backgroundColor: colors.cardcolor,
    marginBottom: 12,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    borderTopLeftRadius: 5,
  },
  closeButtonText: {
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
    paddingHorizontal: 20,
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

