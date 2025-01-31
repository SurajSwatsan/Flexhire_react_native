import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {TextInput} from 'react-native-paper';
import {IconButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileStyle from '../ProfileStyle';
import ModalFooter from '../../../Constant/ProfileModalFooter';
import UserProfileViewController from '../../../Redux/Action/UserProfileViewController';
import {ProfileContext} from '../ProfileContext';
import {colors} from '../../../Global_CSS/TheamColors';
const {width} = Dimensions.get('window'); // Get the screen width

const ProfileHeadline = profileDetails => {
  const {isUpdatedProfile, toggleIsUpdatedProfile} = useContext(ProfileContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [headlineData, setHeadlineData] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const [id, setId] = useState();
  let formikRef = null;

  const dispatch = useDispatch();

  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
    // console.log('================================');
    setHeadlineData(
      profileDetails?.profileDetails?.job_seeker_profile?.profile_headline,
    );
    // dispatch(GetProfileAnalytic('e')); // Dispatch the action when the component mounts
  }, [profileDetails]);
  // console.log('headlineData', JSON.stringify(headlineData, null, 2));

  const openModal = item => {
    setSelectedItem({profile_headline: item}); // Set as an object

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const validationSchema = () => {
    return Yup.object().shape({
      profile_headline: Yup.string().required('ProfileHeadline is required'),
    });
  };

  const handleFormSubmit = values => {
    // Prepare the updated profile headline data
    const updatedData = {
      id: profileDetails?.profileDetails?.id
        ? profileDetails?.profileDetails?.id
        : '',
      user_id: id,
      profile_headline: values.profile_headline.trim(),
    };

    if (profileDetails?.profileDetails?.job_seeker_profile?.id) {
      dispatch(updateProfileDetails(updatedData));
    } else {
      dispatch(addProfileDetails(updatedData));
    }

    toggleIsUpdatedProfile();
    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => openModal(headlineData)}>
        <View style={styles.editContainer}>
          <Text style={styles.nameText}>
            {profileDetails?.profileDetails?.first_name &&
            profileDetails?.profileDetails?.last_name
              ? `${profileDetails?.profileDetails?.first_name} ${profileDetails?.profileDetails?.last_name}`
              : 'User Name'}
          </Text>

          <IconButton
            icon={headlineData ? 'pencil-outline' : 'plus-circle-outline'}
            size={16}
            onPress={() => openModal(headlineData)}
            iconColor={'#f2f2f2'}
          />
        </View>
        <View>
          <Text style={styles.profhedline}>
            {headlineData ? headlineData : 'Add your Profile Headline'}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalContainer}>
          <FlatList
            data={[{key: 'form'}]}
            renderItem={() => (
              <Formik
                initialValues={{
                  profile_headline: selectedItem?.profile_headline || '',
                  first_name: profileDetails?.profileDetails?.first_name || '',
                  last_name: profileDetails?.profileDetails?.last_name || '',
                  email: profileDetails?.profileDetails?.email || '',
                  mobile_number:
                    profileDetails?.profileDetails?.mobile_number || '',
                }}
                innerRef={ref => (formikRef = ref)}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}>
                {({handleSubmit, values, setFieldValue, errors, touched}) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>
                      PROFILE HEADLINE
                    </Text>
                    <Text style={profileStyle.formSubHeading}>
                      This information is important for employers to know you
                      better
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}>
                      <TextInput
                        mode="outlined"
                        outlineColor="lightgrey"
                        label="First Name"
                        textColor="black"
                        value={values.first_name}
                        activeOutlineColor="lightgrey"
                        style={[styles.inputBox, {width: '48%'}]}
                      />
                      <TextInput
                        mode="outlined"
                        outlineColor="lightgrey"
                        label="Last Name"
                        textColor="black"
                        value={values.last_name}
                        style={[styles.inputBox, {width: '48%'}]}
                      />
                    </View>

                    <TextInput
                      mode="outlined"
                      outlineColor="lightgrey"
                      label="Email Address"
                      textColor="black"
                      value={values.email}
                      activeOutlineColor="lightgrey"
                      style={styles.inputBox}
                    />
                    <TextInput
                      mode="outlined"
                      outlineColor="lightgrey"
                      label="Mobile Number"
                      textColor="black"
                      value={values.mobile_number}
                      activeOutlineColor="lightgrey"
                      keyboardType="numeric"
                      style={styles.inputBox}
                    />
                    <TextInput
                      mode="outlined"
                      outlineColor="lightgrey"
                      label="Profile Headline"
                      textColor="black"
                      activeOutlineColor="lightgrey"
                      value={values.profile_headline} // Bind to Formik's state
                      onChangeText={text =>
                        setFieldValue('profile_headline', text)
                      } // Update Formik state
                      error={
                        touched.profile_headline && errors.profile_headline
                      }
                      style={styles.inputBox}
                      multiline={true}
                      numberOfLines={6}
                    />
                  </View>
                )}
              </Formik>
            )}
            keyExtractor={item => item.key}
          />
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={closeModal}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profhedline: {
    fontSize: 12,
    color: '#f2f2f2',
    width: width * 0.55,
  },
  inputBox: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.whiteText,
    marginBottom: 4,
  },
});

export default ProfileHeadline;
