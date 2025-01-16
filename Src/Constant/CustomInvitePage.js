import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {companies} from '../Screens/BottomTabScreens/UserInvitesScreen';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from './CustomBackIcon';
import JobViewController from '../Redux/Action/jobViewController';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Toast} from 'react-native-toast-notifications';

const CustomInvitePage = ({route}) => {
  const dispatch = useDispatch();
  const {inviteData} = route.params;
  const {ApplyJob, RejectInvitation} = JobViewController();
  const isFocus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [id, setId] = useState();
  const [applyButtonColor, setApplyButtonColor] = useState(colors.primary);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
        console.log(id); // Log the value once it's retrieved
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
    console.log('##########', JSON.stringify(inviteData, null, 2));
  }, [isFocus]);

  const handleInputChange = text => {
    setCoverLetter(text); // Update the state with the new input value
  };
  const openApplyModal = () => {
    setModalVisible(true);
  };

  const handleApplyPress = () => {
    const data = {
      user_id: id,
      job: inviteData.job.id,
      cover_letter: coverLetter,
      is_invited: true,
    };
    dispatch(ApplyJob(data));
    console.log(data);

    setModalVisible(false);
  };

  const handleRejectPress = () => {
    Alert.alert(
      'Do you want to reject?', // Title of the alert
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('Rejection canceled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(RejectInvitation(inviteData?.id)),
        },
      ],
      {cancelable: false},
    );
  };
  function formatAmount(value) {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(1) + ' Cr';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1) + ' Lac';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + ' K';
    } else {
      return value.toString();
    }
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.headerContainer}>
          <CustomHeader />
          <Text style={styles.companyHeaderName}>
            {inviteData?.job?.company_name}
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.groupsContainer}>
            <Text style={[styles.detailsText, {color: colors.primary}]}>
              {inviteData?.job?.job_title?.title}
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons
              name="location" // Icon for location
              color={colors.primary} // Icon color
              size={14} // Icon size
              style={{padding: 0}} // Adjust the style
            />
            <Text style={styles.detailsText}>
              {inviteData?.job?.job_location?.join(', ')}
              {console.log(inviteData)}
            </Text>
          </View>
          <View style={styles.experienceContainer}>
            <Ionicons name="briefcase" size={14} color={colors.primary} />
            <Text style={styles.detailsText}>
              {`${inviteData?.job?.experience_level?.minYear}-${inviteData?.job?.experience_level?.maxYear} Years`}
            </Text>
          </View>
          <View style={styles.experienceContainer}>
            <Ionicons name="cash" size={14} color={colors.primary} />
            <Text style={styles.detailsText}>
              {formatAmount(inviteData?.job?.salary?.yearly?.min)} -
              {formatAmount(inviteData?.job?.salary?.yearly?.max)}{' '}
              {inviteData?.job?.salary?.yearly?.currency}
            </Text>
          </View>
          <View style={styles.experienceContainer}>
            <Ionicons name="pin" size={14} color={colors.primary} />
            <Text style={styles.detailsText}>
              {inviteData?.job?.work_modes?.join(', ')}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          {/* Job Description - Only show if summary is available */}
          {inviteData?.job?.company?.company_description ? (
            <>
              <Text style={styles.descriptionText}>Job Description</Text>
              <Text style={styles.description}>
                {inviteData?.job?.company?.company_description}
              </Text>
            </>
          ) : null}

          {/* Requirements - Render as Bullet Points, only if there are requirements */}
          {inviteData?.job?.job_description?.requirements &&
          inviteData?.job?.job_description?.requirements.length > 0 ? (
            <>
              <Text style={styles.subdescriptionText}>Requirements</Text>
              <View style={styles.bulletPointContainer}>
                {inviteData?.job?.job_description?.requirements.map(
                  (item, index) => (
                    <Text key={index} style={styles.bulletPointText}>
                      • {item}
                    </Text>
                  ),
                )}
              </View>
            </>
          ) : null}

          {/* Responsibilities - Render as Bullet Points, only if there are responsibilities */}
          {inviteData?.job?.job_description?.responsibilities &&
          inviteData?.job?.job_description?.responsibilities.length > 0 ? (
            <>
              <Text style={styles.subdescriptionText}>
                Role & Responsibilities
              </Text>
              <View style={styles.bulletPointContainer}>
                {inviteData?.job?.job_description?.responsibilities.map(
                  (item, index) => (
                    <Text key={index} style={styles.bulletPointText}>
                      • {item}
                    </Text>
                  ),
                )}
              </View>
            </>
          ) : null}

          {/* Preferred Candidate Profile - Only show if job_info exists */}
          {inviteData?.job_info ? (
            <>
              <Text style={styles.ProfileText}>
                Preferred Candidate Profile
              </Text>
              <Text style={styles.description}>{inviteData?.job_info}</Text>
            </>
          ) : null}
        </View>

        <View style={styles.Industryname}>
          <Text style={styles.industryText}>Industry Type</Text>
          <Text style={styles.detailsText}>
            {inviteData?.job?.industry_type?.industry_name}
          </Text>
        </View>

        <View style={styles.Industryname}>
          <Text style={styles.industryText}> Role</Text>
          <Text style={styles.detailsText}>
            {inviteData?.job?.job_title_category?.title}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.applyButton,
            {
              backgroundColor: inviteData?.job?.is_applied
                ? 'green'
                : applyButtonColor,
            },
          ]} // Dynamically change the background color
          onPress={() => {
            if (inviteData?.job?.is_applied) {
              Toast.show('Already applied for this job!', {
                type: 'warning',
                placement: 'top',
                duration: 4000,
                offset: 100,
                animationType: 'slide-in',
              });
            } else {
              openApplyModal();
            }
          }}>
          <Text style={styles.applybuttonText}>
            {inviteData?.job?.is_applied ? 'Applied' : 'Apply'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notInterestedButton}
          onPress={() => handleRejectPress()}>
          <Text style={styles.notInterestedButtonText}>Not Interested</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Apply for {inviteData?.job?.company_name}
            </Text>

            <TextInput
              style={styles.coverLetterInput}
              placeholder="Write your cover letter here..."
              placeholderTextColor="lightgray"
              multiline={true}
              numberOfLines={4}
              value={coverLetter}
              onChangeText={handleInputChange}
            />

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleApplyPress}>
                <Text style={styles.submitButtonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginHorizontal: 18,
    // marginVertical: 18,
  },
  companyHeaderName: {
    color: colors.blackText,
    fontSize: 16,
    marginLeft: 16,
  },
  headerContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 18,
    marginVertical: 12,
  },
  // companyName: {
  //   fontSize: 16,
  //   color: colors.blackText,
  //   // marginBottom: 4,
  // },
  // jobTitle: {
  //   fontSize: 16,
  //   color: colors.blackText,
  //   marginBottom: 4,
  // },
  locationContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  detailsText: {
    fontSize: 12,
    color: 'gray',
  },
  Industryname: {
    // color:colors.blackText
    marginHorizontal: 18,
    marginTop: 14,
  },
  industryText: {
    color: colors.blackText,
    fontSize: 12,
  },
  experienceContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  descriptionContainer: {
    // marginTop: 8,
    marginHorizontal: 18,
  },
  descriptionText: {
    color: colors.blackText,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subdescriptionText: {
    color: colors.blackText,
    fontSize: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
  bulletPointContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
  bulletPointText: {
    fontSize: 11,
    color: 'gray',
    marginBottom: 4,
  },

  description: {
    fontSize: 12,
    marginTop: 4,
    color: 'gray',
  },
  ProfileText: {
    color: colors.blackText,
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
  },

  buttonsContainer: {
    position: 'absolute', // Fixed position at the bottom
    bottom: 0, // Adjust the distance from the bottom of the screen
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#f1f1f1', // Added background color for the buttons container
    paddingVertical: 12, // Optional: To add some padding around the buttons

    padding: 10,
  },
  notInterestedButton: {
    backgroundColor: '#fff', // Red for Not Interested button
    paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1, // Equal size with the other button
    marginLeft: 10, // Adds space between buttons
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.lightgaryText,
    borderWidth: 1,
  },
  applyButton: {
    borderRadius: 8,
    flex: 1, // Ensures buttons are equal in size
    marginHorizontal: 5, // Adds space between the buttons
    justifyContent: 'center',
    alignItems: 'center',
  },

  applybuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notInterestedButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.primary,
  },
  coverLetterInput: {
    height: 100,
    borderColor: colors.lightgaryText,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'gray',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomInvitePage;
