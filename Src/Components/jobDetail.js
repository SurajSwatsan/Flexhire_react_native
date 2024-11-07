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
  console.log(company)

  // const renderTabs = () => {
  //   switch (activeTab) {
  //     case 'About':
  //       return <Text style={styles.jobDescription}>{job.job_description}</Text>;
  //       case 'Company':
  //         return (
  //           <View>
  //             <Text style={styles.jobDescription}>{job.company_name}</Text>
  //             <Text style={styles.jobDescription}>{job.about}</Text>
  //             <Text style={styles.jobDetails}>Industry: {job.industry}</Text>
  //             <Text style={styles.jobDetails}>Location: {job.location}</Text>
  //             <Text style={styles.jobDetails}>Contact: {job.contact_email}</Text>
  //             <Text style={styles.jobDetails}>Phone: {job.phone}</Text>
  //           </View>
  //         );
  //         case 'Review':
  //           return (
  //             <View>
  //               <Text style={styles.jobDescription}>Rating: {job.rating} ({job.reviews} reviews)</Text>
  //             </View>
  //           );
  //     default:
  //       return null;
  //   }
  // };

  return (
    // <View style={styles.container}>
    //   <View style={GlobalStyle.headerStyle}>
    //     <CustomHeader />
    //     <Text style={GlobalStyle.headerText}>Job Information</Text>
    //     <View />
    //   </View>
    //   <ScrollView style={styles.scrollView}>
    //     <View style={styles.companyInfoContainer}>
    //       <View style={styles.companyInfo}>
    //         <Image
    //           source={require('../Assets/Logo/TCS_logo.png')}
    //           style={styles.logo}
    //         />
    //         <Text style={styles.jobTitle}>{job.job_title}</Text>
    //         <Text style={styles.jobTitle}>{job.company_name}</Text>
    //         <View style={styles.mainfildContainer}>
    //           <View style={styles.fildContainer}>
    //             <IconButton
    //               icon="cash"
    //               iconColor={colors.primary}
    //               size={24}
    //               style={styles.iconstyle} // Ensure no padding/margin on the icon
    //             />
    //             <View style={styles.fildinerContainer}>
    //               <Text style={styles.jobDetails1}>Salary Range</Text>
    //               <Text style={styles.jobDetails}>{job.salary_range}</Text>
    //             </View>
    //           </View>
    //           <View style={styles.fildContainer}>
    //             <IconButton
    //               icon="signal-cellular-3"
    //               iconColor={colors.primary}
    //               size={24}
    //               style={styles.iconstyle}
    //             />
    //             <View style={styles.fildinerContainer}>
    //               <Text style={styles.jobDetails1}>Level</Text>
    //               <Text style={styles.jobDetails}>
    //                 {job.experience_required}
    //               </Text>
    //             </View>
    //           </View>
    //           <View style={styles.fildContainer}>
    //             <IconButton
    //               icon="briefcase-variant"
    //               iconColor={colors.primary}
    //               size={24}
    //               style={styles.iconstyle}
    //             />
    //             <View style={styles.fildinerContainer}>
    //               <Text style={styles.jobDetails1}>Job Type</Text>
    //               <Text style={styles.jobDetails}>{job.job_type}</Text>
    //             </View>
    //           </View>
    //           {/* <View style={styles.fildContainer}>
    //         <IconButton
    //           icon="cash"
    //           iconColor="#808080"
    //           size={24}
    //           style={{padding: 0, marginLeft: -10}} // Ensure no padding/margin on the icon
    //         />
    //         <View style={styles.fildinerContainer}>
    //           <Text style={styles.jobDetails}>Salary Range</Text>
    //           <Text style={styles.jobDetails}>{job.salary_range}</Text>
    //         </View>
    //       </View> */}
    //         </View>

    //         {/* <Text style={styles.jobDescription}>{job.job_description}</Text>
    //         <Text style={styles.jobDetails}>
    //           Required Skills: {job.required_skills.join(', ')}
    //         </Text> */}
    //       </View>
    //       <View style={styles.tabContainer}>
    //         <TouchableOpacity
    //           style={[
    //             styles.tabButton,
    //             activeTab === 'About' && styles.activeTab,
    //           ]}
    //           onPress={() => setActiveTab('About')}>
    //           <Text style={styles.tabText}>About</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={[
    //             styles.tabButton,
    //             activeTab === 'Company' && styles.activeTab,
    //           ]}
    //           onPress={() => setActiveTab('Company')}>
    //           <Text style={styles.tabText}>Company</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           style={[
    //             styles.tabButton,
    //             activeTab === 'Review' && styles.activeTab,
    //           ]}
    //           onPress={() => setActiveTab('Review')}>
    //           <Text style={styles.tabText}>Review</Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View style={styles.contentContainer}>{renderTabs()}</View>
    //     </View>
    //   </ScrollView>
    //   <View style={styles.applyButtonContainer}>
    //     <TouchableOpacity
    //       style={styles.closeButton}
    //       onPress={() => navigation.goBack()}>
    //       <Text style={styles.closeButtonText}>Go Back</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <View></View>
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
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#000',
  },
  mainfildContainer: {
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
    // borderColor: '#f2f2f2',
    // borderWidth: 0.5,
    alignItems: 'center',
    elevation: 2,
  },
  fildinerContainer: {
    flexDirection: 'column',
  },
  jobDescription: {
    fontSize: 16,
    marginBottom: 10,
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
    marginBottom: 5,
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
    borderBottomWidth: 10,
    borderRadius: 4,
  },
  tabText: {
    color: '#333',
  },
  contentContainer: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#333',
  },
});

export default JobDetailScreen;
