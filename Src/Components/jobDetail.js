import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Linking,
} from 'react-native';
import CustomHeader from '../Constant/CustomBackIcon';
import GlobalStyle from '../Global_CSS/GlobalStyle';
import {colors} from '../Global_CSS/TheamColors';
import {IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewPage from '../Constant/CustomReviewPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import JobViewController from '../Redux/Action/jobViewController';
import {useIsFocused} from '@react-navigation/native';

const JobDetailScreen = ({route, navigation}) => {
  const {job_id} = route.params; // Get company data from params
  const [activeTab, setActiveTab] = useState('About');
  const [id, setId] = useState();
  const [applyButtonColor, setApplyButtonColor] = useState(colors.primary);

  const [isApplied, setIsApplied] = useState(false);
  const dispatch = useDispatch();
  const {GetJobDetails, ApplyJob} = JobViewController();
  const {JobDetails} = useSelector(state => state.job);
  const isFocus = useIsFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
        dispatch(GetJobDetails(job_id, id));

        console.log(id); // Log the value once it's retrieved
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
  }, [isFocus]);

  // const relatedJobs = jobData.related_jobs;
  useEffect(() => {
    // console.log('******************************************', JobDetails);
  }, [JobDetails]);

  const handleApply = () => {
    const data = {
      user_id: id,
      job: JobDetails.id,
      cover_letter: coverLetter,
    };
    console.log(data);
    dispatch(ApplyJob(data));
    setIsModalVisible(false);
  };

  const handleShare = platform => {
    setModalVisible(false);

    if (platform === 'whatsapp') {
      Linking.openURL('whatsapp://send?text=Check%20this%20out!');
    } else if (platform === 'facebook') {
      Linking.openURL('https://www.facebook.com/sharer/sharer.php?u=yourURL');
    } else if (platform === 'twitter') {
      Linking.openURL(
        'https://twitter.com/intent/tweet?text=Check%20this%20out!',
      );
    } else if (platform === 'linkedin') {
      Linking.openURL(`https://www.linkedin.com/sharing/share-offsite/?url`);
    } else if (platform === 'instagram') {
      Linking.openURL('https://www.instagram.com/?url=<YOUR_URL>');
    }
  };

  const renderTabs = () => {
    switch (activeTab) {
      case 'About':
        return (
          <View>
            <View>
              <View style={{marginBottom: 20}}>
                <View style={styles.jobDetailsContainer}>
                  <Text style={styles.jobDescriptionheader}>
                    Job Description:
                  </Text>
                  <Text style={styles.jobDescription}>
                    {JobDetails?.job_description?.summary}
                  </Text>
                </View>

                <View style={styles.jobDetailsContainer}>
                  <Text style={styles.jobDescriptionheader}>Requirements:</Text>
                  {JobDetails?.job_description?.requirements?.map(
                    (item, index) => (
                      <View key={index} style={styles.bulletContainer}>
                        <Text style={styles.bullet}>●</Text>
                        <Text style={styles.jobDescription}>{item}</Text>
                      </View>
                    ),
                  )}
                </View>

                <View style={styles.jobDetailsContainer}>
                  <Text style={styles.jobDescriptionheader}>Responsibilities:</Text>
                  {JobDetails?.job_description?.responsibilities?.map(
                    (item, index) => (
                      <View key={index} style={styles.bulletContainer}>
                        <Text style={styles.bullet}>●</Text>
                        <Text style={styles.jobDescription}>{item}</Text>
                      </View>
                    ),
                  )}
                </View>

                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Department:</Text>
                  <Text style={styles.jobDetails1}>
                    {' '}
                    {JobDetails?.department?.[0]?.name}
                  </Text>
                </View>
                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Employment types:</Text>
                  <Text style={styles.jobDetails1}>
                    {JobDetails?.employment_types?.join(', ')}
                  </Text>
                </View>

                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Education:</Text>
                  <View style={styles.educationItemsContainer}>
                    <Text style={styles.jobDetails1}>
                      {JobDetails?.education?.course?.name}
                    </Text>
                  </View>
                </View>

                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Working Modes:</Text>
                  <Text style={styles.jobDetails1}>
                    {JobDetails?.work_modes?.join(', ')}
                  </Text>
                </View>

                <View style={styles.jobDepartmentContainer}>
                  <Text style={styles.jobDetailsheader}>Industry Type:</Text>
                  <Text style={styles.jobDetails1}>
                    {JobDetails?.industry_type?.industry_name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      case 'Company':
        return (
          <View>
            <Text style={styles.jobDescriptionheader}>
              {JobDetails?.company?.company_name}
            </Text>

            <View style={styles.jobDepartmentContainer}>
              <Text style={styles.jobDetailsheader}>About:</Text>
              <Text style={styles.jobDetails1}>
                {JobDetails?.company?.about}
              </Text>
            </View>

            <View style={styles.jobDepartmentContainer}>
              <Text style={styles.jobDetailsheader}>Industry:</Text>
              <Text style={styles.jobDetails1}>
                {JobDetails?.company?.industry?.industry_name}
              </Text>
            </View>

            <View style={styles.jobDepartmentContainer}>
              <Text style={styles.jobDetailsheader}>Location:</Text>
              <Text style={styles.jobDetails1}>
                {JobDetails?.company?.headquarters}
              </Text>
            </View>

            <View style={styles.jobDepartmentContainer}>
              <Text style={styles.jobDetailsheader}>Contact Email:</Text>
              <Text style={styles.jobDetails1}>
                {JobDetails?.company?.contact_email}
              </Text>
            </View>

            <View style={styles.jobDepartmentContainer}>
              <Text style={styles.jobDetailsheader}>Phone:</Text>
              <Text style={styles.jobDetails1}>
                {JobDetails?.company?.phone}
              </Text>
            </View>

            <View style={styles.jobDepartmentContainer}>
              <Text style={styles.jobDetailsheader}> Website:</Text>
              <Text style={styles.jobDetails1}>
                {JobDetails?.company?.website}
              </Text>
            </View>
          </View>
        );
      case 'Review':
        return (
          <View>
            <ReviewPage JobDetails={JobDetails.reviews} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={GlobalStyle.headerStyle}>
        <CustomHeader />
        <View style={styles.headerRightContainer}>
          <TouchableOpacity>
            <Ionicons
              name="bookmark-outline"
              size={24}
              color={colors.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons
              name="share-social-outline"
              size={24}
              color={colors.primary}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {/* Modal for sharing social media icons */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.SharemodalBackground}>
            <View style={styles.SharemodalContent}>
              <Text style={styles.SharemodalTitle}>Share this on:</Text>

              {/* Social Media Icons */}
              <View style={styles.socialIconsContainer}>
                <TouchableOpacity onPress={() => handleShare('whatsapp')}>
                  <Ionicons name="logo-whatsapp" size={40} color={'#25D366'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleShare('facebook')}>
                  <Ionicons name="logo-facebook" size={40} color={'#1877F2'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleShare('twitter')}>
                  <Ionicons name="logo-twitter" size={40} color={'#1DA1F2'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleShare('linkedin')}>
                  <Ionicons name="logo-linkedin" size={40} color={'#0077B5'} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleShare('instagram')}>
                  <Ionicons name="logo-instagram" size={40} color={'#E1306C'} />
                </TouchableOpacity>
              </View>

              {/* Close Button */}
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.SharecloseButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.companyInfoContainer}>
          <View style={styles.companyInfo}>
            <View style={styles.logoContainer}>
              <Image
                source={
                  JobDetails?.company?.logo
                    ? {uri: JobDetails?.company?.logo} // Use URI if the logo is a valid URL or path
                    : require('../Assets/CompanyLogo/Swatsan.png') // Fallback to a default image
                }
                style={styles.logo}
              />
            </View>
            <Text style={styles.jobTitle}>{JobDetails?.job_title?.title}</Text>
            <Text style={styles.companyName}>{JobDetails?.company_name}</Text>
            <View style={styles.locationContainer}>
              <IconButton
                icon="map-marker"
                iconColor={colors.primary}
                size={18}
                style={{padding: 0, marginLeft: -10, height: 20}}
              />
              {JobDetails?.job_location?.map((location, idx) => (
                <Text key={idx} style={styles.locationText}>
                  {location.name}
                  {JobDetails?.job_location?.length - 1 != idx ? ',' : ''}
                </Text>
              ))}
            </View>

            <View style={styles.mainfildContainer}>
              {[
                {
                  icon: 'cash',
                  label: 'Salary Range',
                  value: `${JobDetails?.salary?.yearly?.min} - ${JobDetails?.salary?.yearly?.max} ${JobDetails?.salary?.yearly?.currency}`,
                },
                {
                  icon: 'signal-cellular-3',
                  label: 'Level',
                  value: `${JobDetails?.experience_level?.minYear} - ${JobDetails?.experience_level?.maxYear} Years`,
                },
                {
                  icon: 'account',
                  label: 'Openings',
                  value: JobDetails?.openings,
                },
                {
                  icon: 'account-group',
                  label: 'Applications',
                  value: JobDetails?.applicant_count,
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

          {/* {relatedJobs && Object.keys(relatedJobs).length > 0 && (
            <View style={styles.relatedjobcontainer}>
              <View style={styles.displayContainer}>
                <Text style={styles.contHead}>Related Jobs</Text>
                <Text style={styles.seeAll}>See All</Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer1}>
                {Object.entries(relatedJobs).map(([key, jobdata], index) => (
                  <View key={jobdata.id || index} style={{marginRight: 12}}>
                    <TouchableOpacity
                      onPress={() => {
                        // Navigate to JobDetailScreen for the related job
                        navigation.navigate('JobDetailScreen', {
                          jobData: jobdata,
                        });
                      }}>
                      <CustomJobCard jobData={jobdata} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )} */}
        </View>
      </ScrollView>

      <View style={styles.applyButtonContainer}>
        <View style={styles.applyButtonContainer}>
          <TouchableOpacity
            style={[
              styles.applyButton,
              {
                backgroundColor: JobDetails?.is_applied
                  ? 'green'
                  : applyButtonColor, // Dynamically set background color
              },
            ]}
            onPress={() => {
              console.log('JobDetails?.is_applied', JobDetails?.is_applied); // Debugging: Check if value is correct

              if (JobDetails?.is_applied) {
                Toast.show('Already applied for this job!', {
                  type: 'warning',
                  placement: 'top',
                  duration: 4000,
                  offset: 100,
                  animationType: 'slide-in',
                });
              } else {
                setIsModalVisible(true); // Open modal when not applied
              }
            }}
            disabled={JobDetails?.is_applied} // Disable button if already applied
          >
            <Text style={styles.applyButtonText}>
              {JobDetails?.is_applied ? 'Applied' : 'Apply Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Apply for the Job</Text>

            <Text style={styles.jobTitleModal}>
              {JobDetails?.job_title?.title}
            </Text>

            {/* Cover Letter Input */}
            <TextInput
              style={[styles.input, styles.coverLetterInput]}
              placeholder="Cover Letter"
              multiline
              value={coverLetter}
              onChangeText={setCoverLetter}
            />

            {/* Apply Button in Modal */}
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>

            {/* Close Modal Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon: {
    // justifyContent: 'flex-end',
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 18,
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
    marginBottom: 16,
  },
  locationText: {
    fontSize: 12,
    color: 'gray',
  },
  location: {
    fontSize: 12,
    color: '#000',
  },
  mainfildContainer: {
    marginHorizontal: 12,
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
    fontSize: 12,
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
    // marginHorizontal: 12,
  },
  jobDetails: {
    fontSize: 12,
    marginBottom: 5,
    color: '#000',
    fontWeight: 'bold',
  },
  jobDetails1: {
    fontSize: 14,
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
    width: 56,
    height: 56,
    resizeMode: 'contain', // Adjusts the image to cover the container uniformly
  },
  applyButtonContainer: {
    backgroundColor: colors.cardBgcolor,
    borderTopColor: colors.lightgaryText,
    borderTopWidth: 1,
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
  // displayContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 12,
  // },

  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    width: '100%',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    color: colors.blackText,
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
    marginHorizontal: 12,
    marginTop: 20,
  },
  contentContainer1: {
    alignItems: 'center', // Center the cards horizontally
    marginHorizontal: 8,
    marginVertical: 8,
    paddingVertical: 6,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
  },
  jobDetailsContainer: {
    marginBottom: 8,
    // alignItems: 'center',
    marginTop:4
  },
  jobDescriptionheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.blackText,
  },
  jobDepartmentContainer: {
    marginBottom: 8,
    gap: 2,
  
  },
  bulletContainer: {
    flexDirection: 'row', 

    margin:2
  },
  bullet: {
    fontSize: 12, 
    color: '#333', 
    marginRight: 10, 
  },
  jobDetailsheader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#808080',
    marginTop:8
  },
  educationItemsContainer: {
    flexWrap: 'wrap', 
  },
  contHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackText,
    marginTop: 8,
  },
  seeAll: {
    fontSize: 14,
    color: colors.blackText,
    marginRight: 8,
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  scrollContainer: {
    // paddingVertical: 8,
    // marginBottom: 12,
    marginHorizontal: 12,
  },
  relatedjobcontainer: {
    // marginTop:16,
    // marginBottom: 24,
    backgroundColor: colors.background,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  jobTitleModal: {
    fontSize: 16,
    color: colors.blackText,
  },
  coverLetterInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  closeButton: {
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  SharemodalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  SharemodalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  SharemodalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  SharecloseButton: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
});
export default JobDetailScreen;
