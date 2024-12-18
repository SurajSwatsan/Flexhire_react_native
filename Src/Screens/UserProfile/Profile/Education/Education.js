import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import profileStyle from '../../ProfileStyle';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {colors} from '../../../../Global_CSS/TheamColors';
import MasterViewController from '../../../../Redux/Action/MasterViewController';
import {useDispatch, useSelector} from 'react-redux';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EducationClass = [
  {id: 1, value: '10th', label: 'Class 10th'},
  {id: 2, value: '12th', label: 'Class 12th'},
];

const startYear = 1980;
const currentYear = new Date().getFullYear();

const PassoutYear = Array.from(
  {length: currentYear - startYear + 1},
  (_, index) => ({
    id: index + 1,
    value: (startYear + index).toString(),
  }),
);

const validationSchema = Yup.object().shape({
  course_name: Yup.string().required('Education Level is required'),
  // board: Yup.string().required('Board is required'),
  // passout_year: Yup.string().required('Passout Year is required'),
  // school_medium: Yup.string().required('School Medium is required'),
  marks: Yup.string()
    .required('Marks is required')
    .matches(/^\d+(\.\d{1,2})?$/)
    .test(
      'is-valid-range',
      '% marks of 100 maximum',
      value =>
        value !== undefined &&
        value !== null &&
        parseFloat(value) >= 0 &&
        parseFloat(value) <= 100,
    ),
});

const Education = profileDetails => {
  const [modalVisible, setModalVisible] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [boardMasters, setBoardMasters] = useState([]);
  const [mediumMasters, setMediumMasters] = useState([]);
  let formikRef = null;
  const dispatch = useDispatch();
  const [id, setId] = useState();

  const {GetBoard, GetMedium} = MasterViewController();
  const {boards, mediums} = useSelector(state => state.master);
  // console.log('0-0--0-0-000', boards);

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
    setEducationData(profileDetails?.profileDetails?.secondary_edu);
  }, [profileDetails]);

  useEffect(() => {
    const get_Board = () => {
      dispatch(GetBoard());
    };
    const get_medium = () => {
      dispatch(GetMedium());
    };

    get_Board();
    get_medium();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const Board_data = boards?.map(bo => ({
      id: bo.id,
      value: bo.name,
    }));

    const Medium_data = mediums?.map(md => ({
      id: md.id,
      value: md.name,
    }));

    setBoardMasters(Board_data);
    setMediumMasters(Medium_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediums, boards]);

  const handleFormSubmit = values => {
    // Format the new entry according to your structure
    const formattedEntry = {
      id: profileDetails?.profileDetails?.id,
      secondary_edu: [
        {
          course_name: values?.course_name,
          board:
            boardMasters?.find(eb => eb.value === values.board)?.value || '',
          passout_year:
            PassoutYear?.find(py => py.value === values.passout_year)?.value ||
            '',
          school_medium:
            mediumMasters?.find(sm => sm.value === values.school_medium)
              ?.value || '',
          marks: values?.marks,
        },
      ],
    };

    // Clone the current `secondary_edu` data
    const existingSecondaryEdu =
      profileDetails?.profileDetails?.secondary_edu || [];

    // Find the index of the entry to update (if it exists)
    const existingIndex = existingSecondaryEdu.findIndex(
      item => item.course_name === values.course_name,
    );

    if (existingIndex !== -1) {
      // Update the existing entry
      existingSecondaryEdu[existingIndex] = {
        ...existingSecondaryEdu[existingIndex],
        ...formattedEntry.secondary_edu[0], // Merge updated values
      };
    } else {
      // Add a new entry
      existingSecondaryEdu.push(formattedEntry.secondary_edu[0]);
    }

    // Prepare the final data for submission
    const formattedData = {
      id: profileDetails?.profileDetails?.id
        ? profileDetails?.profileDetails?.id
        : '',
      user_id: id,
      secondary_edu: existingSecondaryEdu,
    };

    if (profileDetails.profileDetails.id) {
      dispatch(updateProfileDetails(formattedData));
    } else {
      dispatch(addProfileDetails(formattedData));
    }

    // Dispatch the updated data to Redux
    // dispatch(updateProfileDetails(formattedData));

    // Reset state and close modal
    setModalVisible(false);
    setSelectedItem(null);
  };

  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const deleteEntry = item => {
    const filteredArray = educationData.filter(
      item => item.course_name !== selectedItem.course_name,
    );
    setEducationData(filteredArray);
    const payload = {
      id: profileDetails?.profileDetails?.id,
      secondary_edu: filteredArray,
    };
    dispatch(updateProfileDetails(payload));

    // Reset state and close modal
    setModalVisible(false);
    setSelectedItem(null);
  };

  const allClassesAdded = EducationClass.every(cls =>
    profileDetails?.profileDetails?.secondary_edu.some(
      edu => edu.course_name === cls.value,
    ),
  );

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>SECONDARY EDUCATION DETAILS</Text>
        {!allClassesAdded && (
          <IconButton
            icon="plus-circle-outline"
            size={20}
            onPress={() => openModal(null)}
            iconColor={'black'}
          />
        )}
      </View>

      {profileDetails?.profileDetails?.secondary_edu.length > 0 ? (
        <FlatList
          data={profileDetails?.profileDetails?.secondary_edu}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <>
              <TouchableOpacity onPress={() => openModal(index)}>
                <View style={profileStyle.userDataContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.ClassText}>{item.course_name}</Text>
                    <IconButton
                      icon="pencil-outline"
                      size={20}
                      onPress={() => openModal(item)}
                      iconColor={'black'}
                    />
                  </View>
                  <View style={{marginTop: -10}}>
                    <Text style={styles.boardText}>{item?.board}</Text>
                    <Text style={styles.passoutText}>{item?.passout_year}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {profileDetails?.profileDetails?.secondary_edu.length > 1 &&
                index <
                  profileDetails?.profileDetails?.secondary_edu.length - 1 && (
                  <View style={styles.horizontalLine} />
                )}
            </>
          )}
        />
      ) : (
        <Text style={profileStyle.optionalData}>
          Details like Board, Marks, and more educational background.
        </Text>
      )}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalContainer}>
          <ScrollView>
            <Formik
              initialValues={{
                course_name: selectedItem?.course_name || '',
                board: selectedItem?.board || '',
                passout_year: selectedItem?.passout_year || '',
                school_medium: selectedItem?.school_medium || '',
                marks: selectedItem?.marks || '',
              }}
              validationSchema={validationSchema}
              innerRef={ref => (formikRef = ref)}
              onSubmit={handleFormSubmit}>
              {({
                handleChange,
                handleSubmit,
                values,
                setFieldValue,
                errors,
                touched,
              }) => (
                <View style={profileStyle.formContainer}>
                  <Text style={profileStyle.formHeading}>
                    SECONDARY EDUCATION INFORMATION
                  </Text>
                  <View style={profileStyle.formSubHeading}>
                    <Text style={profileStyle.formSubHeading}>
                      Details like course_name, Board, Marks, and more, help
                      recruiters identify your educational background.
                    </Text>
                  </View>
                  <View style={styles.classTabContainer}>
                    <Text
                      style={[
                        profileStyle.label,
                        touched.course_name && errors.course_name
                          ? {color: 'red'}
                          : null,
                      ]}>
                      Education* {values.course_name}
                    </Text>

                    <View style={profileStyle.TabContainer}>
                      {EducationClass.map(option => (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            profileStyle.tabBtnStyle,
                            values?.course_name === option.value
                              ? profileStyle.selectedTab
                              : profileStyle.unselectedTab,
                          ]}
                          onPress={() =>
                            setFieldValue('course_name', option.value)
                          }>
                          <Text
                            style={[
                              styles.tabBtnText,
                              values?.course_name === option.value
                                ? profileStyle.selectedTabText
                                : profileStyle.unselectedTabText,
                            ]}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <CustomSelectionModal
                    title="Board"
                    data={boardMasters}
                    selectedItems={
                      boardMasters?.find(
                        item => item.value === values?.board,
                      ) || null
                    }
                    setSelectedItems={item =>
                      setFieldValue('board', item?.value || '')
                    }
                    placeholder="Select Board"
                  />

                  <CustomSelectionModal
                    title="Passout Year"
                    data={PassoutYear}
                    selectedItems={
                      PassoutYear?.find(
                        item => item.value === values?.passout_year,
                      ) || null
                    }
                    setSelectedItems={item =>
                      setFieldValue('passout_year', item?.value || '')
                    }
                    placeholder="Select Passout Year"
                  />
                  <CustomSelectionModal
                    title="School Medium"
                    data={mediumMasters}
                    selectedItems={
                      mediumMasters?.find(
                        item => item.value === values?.school_medium,
                      ) || null
                    }
                    setSelectedItems={item =>
                      setFieldValue('school_medium', item?.value || '')
                    }
                    placeholder="Select School Medium"
                  />
                  <ReusableTextInput
                    name="marks"
                    label="Marks"
                    value={values?.marks}
                    onChangeText={handleChange('marks')}
                    keyboardType="numeric"
                    note="% marks of 100 maximum"
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={closeModal}
            showDelete={selectedItem !== null}
            onDelete={() => deleteEntry(selectedItem)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ClassText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  classTabContainer: {
    marginTop: 12,
  },
  boardText: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.primary,
  },
  passoutText: {
    fontSize: 13,
    color: colors.primary,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: 'lightgray', // Light gray color
    marginVertical: 4,
  },
});
export default Education;
