import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import profileStyle from '../../ProfileStyle';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {colors} from '../../../../Global_CSS/TheamColors';
import ReusableDropdown from '../../../../Constant/CustomDropdown';
import CustomTabs from '../../../../Constant/CustomTabs';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import MasterViewController from '../../../../Redux/Action/MasterViewController';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EducationLevels = [
  {id: 1, value: 'Doctorate', label: 'Doctorate'},
  {id: 2, value: 'Post Graduate', label: 'Post Graduate'},
  {id: 3, value: 'Graduate', label: 'Graduate'},
  {id: 4, value: 'Diploma', label: 'Diploma'},
];

const startYear = 1980;
const currentYear = new Date().getFullYear();
const endYear = currentYear + 4;

const StartingYear = Array.from(
  {length: currentYear - startYear + 1},
  (_, index) => ({
    id: index + 1,
    value: (currentYear - index).toString(),
    label: (currentYear - index).toString(),
  }),
);

const EndingYear = Array.from(
  {length: endYear - startYear + 1}, // Total years from startYear to endYear
  (_, index) => ({
    id: index + 1,
    value: (endYear - index).toString(), // Generate each year in descending order
    label: (endYear - index).toString(), // Use the same year as the label
  }),
);
const GRADING_OPTIONS = [
  {id: 1, value: 'Scale 10 Grading System', label: 'Scale 10 Grading System'},
  {id: 2, value: 'Scale 4 Grading System', label: 'Scale 4 Grading System'},
  {id: 3, value: '% Marks of 100 Maximum', label: '% Marks of 100 Maximum'},
  {id: 4, value: 'Course Requires a Pass', label: 'Course Requires a Pass'},
];

const validationSchema = Yup.object().shape({
  education_level: Yup.string().required('Education Level is required'),
  // university_name: Yup.string().required('University Name is required'),
  // course_name: Yup.string().required('Course is required'),
  // specialization: Yup.string().required('Specialization is required'),
  // start_year: Yup.string()
  //   .matches(/^\d{4}$/, 'Starting Year must be a valid year')
  //   .required('Starting Year is required'),
  // end_year: Yup.string()
  //   .matches(/^\d{4}$/, 'Ending Year must be a valid year')
  //   .required('Ending Year is required'),
  // grading_system: Yup.string().required('Grading System is required'),
  course_type: Yup.string().required('Course Type is required'),
  // marks: Yup.string().test(
  //   'Marks must be a percentage (0-100)',
  //   function (value) {
  //     const {grading_system} = this.parent; // Access the grading_system field
  //     if (grading_system && grading_system !== 'Course Requires a Pass') {
  //       if (!value) {
  //         return this.createError({message: 'Marks is required'});
  //       }
  //       // Validate numeric format and range (0-100)
  //       const isValidFormat = /^\d+(\.\d{1,2})?$/.test(value); // Numeric with up to 2 decimals
  //       const isValidRange = parseFloat(value) >= 0 && parseFloat(value) <= 100; // Between 0 and 100
  //       return isValidFormat && isValidRange;
  //     }
  //     return true; // Skip validation when grading_system is "Course Requires a Pass"
  //   },
  // ),
});
const CourseType = [
  {id: 1, label: 'Full Time', value: 'Full Time'},
  {id: 2, label: 'Part Time', value: 'Part Time'},
  {
    id: 3,
    label: 'Correspondence/Distance Learning',
    value: 'Correspondence/Distance Learning',
  },
];

const HigherEducation = profileDetails => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // Single entry handlings

  const [educationData, setEducationData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [universitydata, setUniversityData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [specializationData, setSpecializationData] = useState([]);

  const dispatch = useDispatch();
  const [id, setId] = useState();
  const isFocus = useIsFocused();

  const {GetUniversities, GetCourses, GetSpecializations} =
    MasterViewController();
  const {universities, courses, specializations} = useSelector(
    state => state.master,
  );
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
    // console.log(
    //   '================================',
    //   // profileDetails?.profileDetails?.higher_edu,
    // );

    // console.log(
    //   'Profile Data:',
    //   JSON.stringify(profileDetails?.profileDetails, null, 2),
    // );
    setEducationData(profileDetails?.profileDetails?.higher_edu);
  }, [profileDetails]);

  useEffect(() => {
    const get_university = () => {
      dispatch(GetUniversities());
    };
    const get_course = () => {
      dispatch(GetCourses());
    };
    const get_specialization = () => {
      dispatch(GetSpecializations());
    };
    get_university();
    get_course();
    get_specialization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const university_data = universities?.map(uni => ({
      id: uni.id,
      value: uni.name,
    }));

    const COURSES = courses?.map(course => ({
      id: course.id,
      value: course.name,
    }));

    const SPECIALIZATION = specializations?.map(speci => ({
      id: speci.id,
      value: speci.specialization_name,
    }));

    setUniversityData(university_data);
    setCourseData(COURSES);
    setSpecializationData(SPECIALIZATION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universities, courses, specializations]);

  const handleFormSubmit = values => {
    // Format the data in the higher_edu structure
    if (selectedItem) {
      const updateOrAddObject = (array, obj) => {
        const index = array.findIndex(
          item =>
            item.course_name === selectedItem.course_name &&
            item.university_name === selectedItem.university_name,
        );

        if (index !== -1) {
          // Update the existing object
          array[index] = {...array[index], ...obj};
        } else {
          // Add the new object if not found
          array.push(obj);
        }
      };

      updateOrAddObject(educationData, values);
      const payload = {
        id: profileDetails?.profileDetails?.id,
        higher_edu: educationData,
      };
      dispatch(updateProfileDetails(payload));

      setEducationData(educationData);
      setModalVisible(false);
      setSelectedItem(null);
    } else {
      const formattedValues = {
        id: profileDetails?.profileDetails?.id
          ? profileDetails?.profileDetails?.id
          : '',
        user_id: id,
        higher_edu: [
          ...(profileDetails?.profileDetails?.higher_edu || []), // Include existing entries
          {
            education_level:
              EducationLevels.find(opt => opt.value === values.education_level)
                ?.value || '',
            university_name:
              universitydata?.find(uni => uni.value === values.university_name)
                ?.value || '',
            course_name:
              courseData?.find(cn => cn.value === values.course_name)?.value ||
              '',
            specialization:
              specializationData?.find(sp => sp.value === values.specialization)
                ?.value || '',
            course_type:
              CourseType.find(ct => ct.value === values.course_type)?.value ||
              '',
            duration: {
              start_year: values?.duration?.start_year || '',
              end_year: values?.duration?.end_year || '',
            },
            grading_system: {
              name: values.grading_system?.name || '',
              marks:
                values.grading_system?.name !== 'Course Requires a Pass'
                  ? values.grading_system?.marks
                  : null,
            },
          },
        ],
      };

      // Dispatch the data

      if (profileDetails?.profileDetails?.id) {
        dispatch(updateProfileDetails(formattedValues));
      } else {
        dispatch(addProfileDetails(formattedValues));
      }

      // dispatch(updateProfileDetails(formattedValues));

      // Update local state for UI and reset modal

      setEducationData(formattedValues.higher_edu);
      setModalVisible(false);
      setSelectedItem(null);
    }

    // Debugging
    // console.log(
    //   'Updated Education Data:',
    //   JSON.stringify(formattedValues, null, 2),
    // );
  };

  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const deleteEntry = index => {
    const filteredArray = educationData.filter(
      item => item.course_name !== selectedItem.course_name,
    );
    setEducationData(filteredArray);
    const payload = {
      id: profileDetails?.profileDetails?.id,
      higher_edu: filteredArray,
    };
    dispatch(updateProfileDetails(payload));
    closeModal();
  };

  let formikRef = null;
  const check_grading_system = name => {
    if (name == 'Course Requires a Pass') {
      return {};
    }
  };
  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>HIGHER EDUCATION DETAILS</Text>
        <IconButton
          icon="plus-circle-outline"
          size={20}
          onPress={() => openModal(null)}
          iconColor={'black'}
        />
      </View>

      {profileDetails?.profileDetails?.higher_edu.length > 0 ? (
        <FlatList
          data={profileDetails?.profileDetails?.higher_edu}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <>
              <TouchableOpacity onPress={() => openModal(item)}>
                <View style={profileStyle.userDataContainer}>
                  <Text style={styles.ClassText}>
                    {item?.course_name}/{item?.specialization}
                  </Text>
                  <Text style={styles.university_name}>
                    {item?.university_name}
                  </Text>
                  <Text style={styles.passoutText}>
                    {item?.duration?.start_year}-{item?.duration?.end_year} •{' '}
                    {item?.course_type}
                  </Text>
                  {/* <Text style={styles.passoutText}>
                    Grading System: {item.grading_system.name}
                    {item.grading_system.marks &&
                      ` • Marks: ${item.grading_system.marks}`}
                  </Text> */}
                </View>
              </TouchableOpacity>
              {profileDetails?.profileDetails?.higher_edu.length > 1 &&
                index <
                  profileDetails?.profileDetails?.higher_edu.length - 1 && (
                  <View style={styles.horizontalLine} />
                )}
            </>
          )}
        />
      ) : (
        <Text style={profileStyle.optionalData}>
          Details like course_name, university, and more, help recruiters
          identify your educational background.
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
                education_level: selectedItem?.education_level || '',
                university_name: selectedItem?.university_name || '',
                course_name: selectedItem?.course_name || '',
                specialization: selectedItem?.specialization || '',
                course_type: selectedItem?.course_type || '',
                duration: {
                  start_year: selectedItem?.duration?.start_year || '',
                  end_year: selectedItem?.duration?.end_year || '',
                },
                grading_system: {
                  name: selectedItem?.grading_system?.name || '',
                  marks:
                    selectedItem?.grading_system?.name ===
                    'Course Requires a Pass'
                      ? ''
                      : selectedItem?.grading_system?.marks
                      ? selectedItem?.grading_system?.marks
                      : '',
                },
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
                    HIGHER EDUCATION DETAILS
                  </Text>
                  <Text style={profileStyle.formSubHeading}>
                    Details like course_name, university, and more, help
                    recruiters identify your educational background
                  </Text>
                  <View style={profileStyle.TabContainer}>
                    <CustomTabs
                      label="Education*"
                      options={EducationLevels}
                      selectedValue={values.education_level}
                      setFieldValue={setFieldValue}
                      fieldName="education_level"
                      error={errors.education_level}
                      touched={touched.education_level}
                    />
                  </View>

                  {[
                    'Doctorate',
                    'Post Graduate',
                    'Graduate',
                    'Diploma',
                  ].includes(values.education_level) && (
                    <>
                      <CustomSelectionModal
                        title="University Name"
                        data={universitydata}
                        selectedItems={universitydata?.find(
                          item => item.value === values.university_name,
                        )}
                        setSelectedItems={item =>
                          setFieldValue('university_name', item?.value || '')
                        }
                        placeholder="Select University"
                        // error={errors.country}
                        // touched={touched.country}
                      />

                      <CustomSelectionModal
                        title="Course Name"
                        data={courseData}
                        selectedItems={courseData?.find(
                          item => item.value === values.course_name,
                        )}
                        setSelectedItems={item =>
                          setFieldValue('course_name', item?.value || '')
                        }
                        placeholder="Select Course"
                        // error={errors.country}
                        // touched={touched.country}
                      />

                      <CustomSelectionModal
                        title="Specialization"
                        data={specializationData}
                        selectedItems={specializationData?.find(
                          item => item.value === values.specialization,
                        )}
                        setSelectedItems={item =>
                          setFieldValue('specialization', item?.value || '')
                        }
                        placeholder="Select Specialization"
                        // error={errors.country}
                        // touched={touched.country}
                      />

                      <CustomTabs
                        label="Course Type*"
                        options={CourseType}
                        selectedValue={values.course_type}
                        setFieldValue={setFieldValue}
                        fieldName="course_type"
                        error={errors.course_type}
                        touched={touched.course_type}
                      />
                      <View style={styles.YearContainer}>
                        <View style={{width: '48%'}}>
                          <ReusableDropdown
                            options={StartingYear}
                            placeholder="Starting Year*"
                            selectedValue={values.duration?.start_year}
                            onSelect={selected =>
                              setFieldValue(
                                'duration.start_year',
                                selected.value,
                              )
                            }
                            // error={errors.start_year}
                            // touched={touched.start_year}
                          />
                        </View>
                        <View style={{width: '48%'}}>
                          <ReusableDropdown
                            options={EndingYear}
                            placeholder="Ending Year*"
                            selectedValue={values.duration?.end_year}
                            onSelect={selected =>
                              setFieldValue('duration.end_year', selected.value)
                            }
                            // error={errors.end_year}
                            // touched={touched.end_year}
                          />
                        </View>
                      </View>

                      <ReusableDropdown
                        options={GRADING_OPTIONS}
                        placeholder="Grading System*"
                        selectedValue={values.grading_system?.name}
                        onSelect={selected => {
                          setFieldValue('grading_system.name', selected.value);
                          setFieldValue('grading_system.marks', null);
                        }}
                        error={errors.grading_system}
                        touched={touched.grading_system}
                      />

                      {/* Conditionally render Marks field */}
                      {values.grading_system?.name &&
                        values.grading_system?.name !==
                          'Course Requires a Pass' && (
                          <ReusableTextInput
                            name="marks"
                            label="Marks*"
                            value={values.grading_system?.marks}
                            onChangeText={handleChange('grading_system.marks')}
                            keyboardType="numeric"
                            note="Enter percentage marks (out of 100)"
                          />
                        )}
                    </>
                  )}
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
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  passoutText: {
    fontSize: 13,
    color: colors.primary,
  },
  university_name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  YearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: 'lightgray', // Light gray color
    marginVertical: 4,
  },
  editIcon: {},
});

export default HigherEducation;
