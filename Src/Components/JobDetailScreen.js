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
import {BASE_URL} from '../Services/baseAPI';
import moment from 'moment';
import useCustomFormatAmount from '../CustomHooks/CustomFormatAmount';
import JobDetailsLoader from '../Loaders/JobDetailsLoader';

const JobDetailScreen = ({route}) => {
  const {job_id} = route.params;
  const [activeTab, setActiveTab] = useState('About');
  const [user_id, setUserId] = useState();
  const [jobId, setJobId] = useState();
  const dispatch = useDispatch();
  const {GetJobDetails, ApplyJob, SaveJob} = JobViewController();
  const {JobDetails, isLoading} = useSelector(state => state.job);
  const isFocus = useIsFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch({type: 'CLEAR_JOB_LIST', payload: ''});
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data');
        setUserId(id);
        setJobId(job_id);
        dispatch(GetJobDetails(job_id, id));
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };
    dispatch({type: 'CLEAR_JOB_LIST', payload: ''});

    getUserData();
  }, [isFocus]);

  const handleApply = () => {
    const data = {
      user_id: user_id,
      job: JobDetails.id,
      cover_letter: coverLetter,
    };

    dispatch(ApplyJob(data))
      .then(() => {
        JobDetails.is_applied = true;
        setIsModalVisible(false);
      })
      .catch(error => {
        console.error('Error applying for the job:', error);
      });
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

  // Function to create a lookup map from SavedJobs
  const toggleSaveJob = jobId => {
    const requestData = {job: jobId, user_id: user_id};
    dispatch(SaveJob(requestData)); // Pass only the job ID
  };

  const renderTabs = () => {
    switch (activeTab) {
      case 'About':
        return (
          <View>
            <View>
              <View style={{marginBottom: 20}}>
                {JobDetails?.job_description?.summary && (
                  <View style={styles.jobDetailsContainer}>
                    <Text style={styles.jobDescriptionheader}>
                      Job Description:
                    </Text>
                    <Text style={styles.jobDescription}>
                      {JobDetails?.job_description?.summary}
                    </Text>
                  </View>
                )}

                {JobDetails?.job_description?.requirements?.length > 0 && (
                  <View style={styles.jobDetailsContainer}>
                    <Text style={styles.jobDescriptionheader}>
                      Requirements:
                    </Text>
                    {JobDetails?.job_description?.requirements?.map(
                      (item, index) => (
                        <View key={index} style={styles.bulletContainer}>
                          <Text style={styles.bullet}>●</Text>
                          <Text style={styles.jobDescription}>{item}</Text>
                        </View>
                      ),
                    )}
                  </View>
                )}

                {JobDetails?.job_description?.responsibilities?.length > 0 && (
                  <View style={styles.jobDetailsContainer}>
                    <Text style={styles.jobDescriptionheader}>
                      Responsibilities:
                    </Text>
                    {JobDetails?.job_description?.responsibilities?.map(
                      (item, index) => (
                        <View key={index} style={styles.bulletContainer}>
                          <Text style={styles.bullet}>●</Text>
                          <Text style={styles.jobDescription}>{item}</Text>
                        </View>
                      ),
                    )}
                  </View>
                )}
                {JobDetails?.key_skills?.length > 0 && (
                  <View style={styles.jobDetailsContainer}>
                    <Text style={styles.jobDescriptionheader}>Skills:</Text>
                    <View style={styles.chipContainer}>
                      {JobDetails?.key_skills?.map((skill, index) => (
                        <View key={index} style={styles.chip}>
                          <Text style={styles.chipText}>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {JobDetails?.department?.length > 0 && (
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>Department:</Text>
                    <Text style={styles.jobDetails1}>
                      {JobDetails?.department?.join(', ')}
                    </Text>
                  </View>
                )}

                {JobDetails?.employment_types?.length > 0 && (
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>
                      Employment types:
                    </Text>
                    <Text style={styles.jobDetails1}>
                      {JobDetails?.employment_types?.join(', ')}
                    </Text>
                  </View>
                )}

                {JobDetails?.education?.length > 0 && (
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>Education:</Text>
                    <View style={styles.educationItemsContainer}>
                      {JobDetails.education.map((course, index) => (
                        <Text key={index} style={styles.jobDetails1}>
                          {course?.course_name}
                          {course?.specialization
                            ? ` - ${course.specialization},`
                            : ','}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}

                {JobDetails?.work_modes?.length > 0 && (
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>Working Modes:</Text>
                    <Text style={styles.jobDetails1}>
                      {JobDetails?.work_modes?.join(', ')}
                    </Text>
                  </View>
                )}

                {JobDetails?.industry_type?.industry_name && (
                  <View style={styles.jobDepartmentContainer}>
                    <Text style={styles.jobDetailsheader}>Industry Type:</Text>
                    <Text style={styles.jobDetails1}>
                      {JobDetails?.industry_type?.industry_name}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      case 'Company':
        return (
          <View>
            {JobDetails?.company?.company_name && (
              <Text style={styles.jobDescriptionheader}>
                {JobDetails?.company?.company_name}
              </Text>
            )}

            {JobDetails?.company?.company_description && (
              <View style={styles.jobDepartmentContainer}>
                <Text style={styles.jobDetailsheader}>About:</Text>
                <Text style={styles.jobDetails1}>
                  {JobDetails?.company?.company_description}
                </Text>
              </View>
            )}

            {JobDetails?.company?.industry?.industry_name && (
              <View style={styles.jobDepartmentContainer}>
                <Text style={styles.jobDetailsheader}>Industry:</Text>
                <Text style={styles.jobDetails1}>
                  {JobDetails?.company?.industry?.industry_name}
                </Text>
              </View>
            )}

            {JobDetails?.company?.headquarters && (
              <View style={styles.jobDepartmentContainer}>
                <Text style={styles.jobDetailsheader}>Location:</Text>
                <Text style={styles.jobDetails1}>
                  {JobDetails?.company?.headquarters}
                </Text>
              </View>
            )}

            {JobDetails?.company?.website && (
              <View style={styles.jobDepartmentContainer}>
                <Text style={styles.jobDetailsheader}>Website:</Text>
                <Text style={styles.jobDetails1}>
                  {JobDetails?.company?.website}
                </Text>
              </View>
            )}
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
  const onRelatedJobClick = jobId => {
    setJobId(jobId);
    dispatch(GetJobDetails(jobId, user_id));
  };
  if (
    isLoading ||
    jobId !== JobDetails?.id ||
    Object.keys(JobDetails).length === 0
  ) {
    return (
      <>
        <View style={GlobalStyle.headerStyle}>
          <CustomHeader />
          <View style={styles.headerRightContainer}>
            <IconButton
              icon="bookmark-outline"
              iconColor={colors.primary}
              size={32}
            />
            <IconButton
              icon="share-variant-outline"
              iconColor={colors.primary}
              size={32}
              style={styles.icon}
            />
          </View>
        </View>

        <JobDetailsLoader />
      </>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <View style={GlobalStyle.headerStyle}>
          <CustomHeader />
          <View style={styles.headerRightContainer}>
            <IconButton
              icon={JobDetails?.is_saved ? 'bookmark' : 'bookmark-outline'}
              iconColor={colors.primary}
              size={32}
              onPress={() => toggleSaveJob(JobDetails?.id)}
            />

            <IconButton
              icon="share-variant-outline"
              iconColor={colors.primary}
              size={32}
              style={styles.icon}
              onPress={() => setModalVisible(true)}
            />
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
                    <Ionicons
                      name="logo-whatsapp"
                      size={40}
                      color={'#25D366'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleShare('facebook')}>
                    <Ionicons
                      name="logo-facebook"
                      size={40}
                      color={'#1877F2'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleShare('twitter')}>
                    <Ionicons name="logo-twitter" size={40} color={'#1DA1F2'} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleShare('linkedin')}>
                    <Ionicons
                      name="logo-linkedin"
                      size={40}
                      color={'#0077B5'}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleShare('instagram')}>
                    <Ionicons
                      name="logo-instagram"
                      size={40}
                      color={'#E1306C'}
                    />
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
                {JobDetails?.company?.logo ? (
                  <Image
                    source={{uri: BASE_URL + JobDetails?.company?.logo}}
                    style={styles.logo}
                  />
                ) : (
                  <Ionicons name="business" size={36} color="gray" />
                )}
              </View>
              <Text style={styles.jobTitle}>
                {JobDetails?.job_title?.title}
              </Text>

              {(JobDetails?.company_name ||
                JobDetails?.company?.company_name) && (
                <Text style={styles.companyName}>
                  {JobDetails?.company?.company_name
                    ? JobDetails?.company?.company_name
                    : JobDetails?.company_name}
                </Text>
              )}
              <View style={styles.locationContainer}>
                <IconButton
                  icon="map-marker"
                  iconColor={colors.primary}
                  style={{padding: 0}}
                />
                {JobDetails?.job_location?.map((location, idx) => (
                  <Text key={idx} style={styles.locationText}>
                    {location}
                    {JobDetails?.job_location?.length - 1 !== idx ? ', ' : ''}
                  </Text>
                ))}
              </View>

              <View style={styles.mainfildContainer}>
                {[
                  {
                    icon: 'cash',
                    label: 'Salary Range',
                    value: ` ${
                      JobDetails?.salary?.yearly?.currency
                    } ${useCustomFormatAmount(
                      Number(JobDetails?.salary?.yearly?.min),
                    )} - ${useCustomFormatAmount(
                      Number(JobDetails?.salary?.yearly?.max),
                    )} `,
                  },
                  {
                    icon: 'signal-cellular-3',
                    label: 'Experience',
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
            <View style={{flex: 1, minHeight: 50}}>
              {JobDetails?.related_jobs?.length > 0 && (
                <>
                  <Text
                    style={[
                      styles.jobDescriptionheader,
                      {
                        marginHorizontal: 12,
                        marginBottom: 8,
                        color: colors.secondary,
                      },
                    ]}>
                    Related Jobs
                  </Text>
                  {JobDetails?.related_jobs?.map((item, index) => (
                    <View key={item?.id || index} style={{marginBottom: 14}}>
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => onRelatedJobClick(item.id)}>
                        <View style={styles.jobCard}>
                          <View style={styles.cardcompanyInfo}>
                            <View style={styles.companylogo}>
                              {item?.company?.logo ? (
                                <Image
                                  source={{
                                    uri: BASE_URL + item?.company?.logo,
                                  }}
                                  style={styles.companyImage}
                                />
                              ) : (
                                <Ionicons
                                  name="business"
                                  size={36}
                                  color="gray"
                                />
                              )}
                              <View style={styles.textName}>
                                <Text style={styles.jobTitle}>
                                  {item?.job_title?.title}
                                </Text>
                                <Text style={styles.companyName}>
                                  {item?.company?.company_name
                                    ? item?.company?.company_name
                                    : item?.company_name}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={styles.workModeContainer}>
                            {item?.work_modes?.map((mode, idx) => (
                              <View key={idx} style={styles.workModeChip}>
                                <Text style={styles.cardchipText}>{mode}</Text>
                              </View>
                            ))}
                          </View>

                          <View style={styles.cardlocation}>
                            <Ionicons
                              name="location-outline"
                              size={18}
                              color={colors.primary}
                            />

                            <Text style={styles.jobCardLocation}>
                              {item?.job_location.join(', ')}
                            </Text>
                          </View>

                          <View style={styles.line}></View>

                          <View style={styles.jobFooter}>
                            {item?.salary?.yearly && (
                              <View style={styles.experienceContainer}>
                                <Ionicons
                                  name="cash"
                                  size={14}
                                  color="#004466"
                                />
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 4,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 11,
                                      color: colors.primary,
                                    }}>
                                    {item.salary.yearly.currency}
                                  </Text>
                                  <Text
                                    style={{
                                      color: colors.primary,
                                      fontSize: 11,
                                    }}>
                                    {useCustomFormatAmount(
                                      Number(item.salary?.yearly?.min),
                                    )}{' '}
                                    -{' '}
                                    {useCustomFormatAmount(
                                      Number(item?.salary?.yearly?.max),
                                    )}
                                  </Text>
                                </View>
                              </View>
                            )}
                            <Text style={styles.jobPostedDate}>
                              {moment(item?.created_at).fromNow()}{' '}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.applyButtonContainer}>
          <View style={styles.applyButtonContainer}>
            <TouchableOpacity
              style={[
                styles.applyButton,
                {
                  backgroundColor: JobDetails?.is_applied
                    ? '#d4edda'
                    : '#b3d7ff',
                },
              ]}
              onPress={() => {
                setIsModalVisible(true);
              }}
              disabled={JobDetails?.is_applied}>
              <Text
                style={[
                  styles.applyButtonText,
                  {
                    color: JobDetails?.is_applied ? '#28a745' : '#004466',
                  },
                ]}>
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
                placeholderTextColor={colors.primary}
                style={[styles.input, styles.coverLetterInput]}
                placeholder="Cover Letter"
                multiline
                value={coverLetter}
                onChangeText={setCoverLetter}
                color={colors.primary}
              />

              {/* Apply Button in Modal */}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={handleApply}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  headerRightContainer: {
    flexDirection: 'row',
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
    flex: 1,
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
    justifyContent: 'space-between',
  },
  fildContainer: {
    width: '48%',
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
    // borderTopWidth: 1,
  },
  applyButton: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 18,
  },

  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
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

  jobDetailsContainer: {
    marginBottom: 8,
    // alignItems: 'center',
    marginTop: 4,
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
    paddingHorizontal: 12,
    flexDirection: 'row',

    margin: 2,
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
    marginTop: 8,
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows chips to wrap to the next line
    gap: 8,
    marginTop: 8,
    marginHorizontal: 12,
  },
  chip: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 12,
    color: colors.primary,
  },
  jobCard: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 12,
  },
  cardcompanyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companylogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyImage: {
    height: 40,
    width: 40,
    borderRadius: 8,
  },
  textName: {
    marginLeft: 8,
  },
  workModeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  workModeChip: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    marginTop: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  cardchipText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardlocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  jobFooter: {
    // marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experienceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
    gap: 6,
  },
  jobDetailsalary: {
    fontSize: 10,
    color: 'gray',
    fontWeight: 'bold',
  },
  jobCardLocation: {
    fontSize: 12,
    color: colors.blackText,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },

  jobPostedDate: {
    fontSize: 12,
    color: 'gray',
  },
});
export default JobDetailScreen;
