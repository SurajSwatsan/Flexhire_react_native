import React, {useState} from 'react';
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
  university_name: Yup.string().required('University Name is required'),
  course_name: Yup.string().required('Course is required'),
  specialization: Yup.string().required('Specialization is required'),
  start_year: Yup.string()
    .matches(/^\d{4}$/, 'Starting Year must be a valid year')
    .required('Starting Year is required'),
  end_year: Yup.string()
    .matches(/^\d{4}$/, 'Ending Year must be a valid year')
    .required('Ending Year is required'),
  grading_system: Yup.string().required('Grading System is required'),
  course_type: Yup.string().required('Course Type is required'),
  marks: Yup.string().test(
    'Marks must be a percentage (0-100)',
    function (value) {
      const {grading_system} = this.parent; // Access the grading_system field
      if (grading_system && grading_system !== 'Course Requires a Pass') {
        if (!value) {
          return this.createError({message: 'Marks is required'});
        }
        // Validate numeric format and range (0-100)
        const isValidFormat = /^\d+(\.\d{1,2})?$/.test(value); // Numeric with up to 2 decimals
        const isValidRange = parseFloat(value) >= 0 && parseFloat(value) <= 100; // Between 0 and 100
        return isValidFormat && isValidRange;
      }
      return true; // Skip validation when grading_system is "Course Requires a Pass"
    },
  ),
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

const getInitialValues = (educationData = [], editingIndex = null) => {
  if (editingIndex !== null && educationData[editingIndex]) {
    const data = educationData[editingIndex];
    return {
      education_level: data.education_level || '',
      university_name: data.university_name || '',
      course_name: data.course_name || '',
      specialization: data.specialization || '',
      course_type: data.course_type || '',
      start_year: data.duration?.start_year || '',
      end_year: data.duration?.end_year || '',
      grading_system: data.grading_system?.name || '',
      marks: data.grading_system?.marks || '',
    };
  }

  // Default values for new entries
  return {
    education_level: '',
    university_name: '',
    course_name: '',
    specialization: '',
    course_type: '',
    start_year: '',
    end_year: '',
    grading_system: '',
    marks: '',
  };
};

const HigherEducation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleFormSubmit = values => {
    const formattedValues = {
      education_level: values.education_level,
      course_name: values.course_name,
      specialization: values.specialization,
      university_name: values.university_name,
      course_type: values.course_type,
      duration: {
        start_year: values.start_year,
        end_year: values.end_year,
      },
      grading_system: {
        name: values.grading_system,
        marks:
          values.grading_system !== 'Course Requires a Pass'
            ? values.marks
            : null,
      },
    };

    let updatedData;

    if (editingIndex !== null) {
      // Update the existing entry
      updatedData = educationData.map((item, index) =>
        index === editingIndex ? formattedValues : item,
      );
    } else {
      // Add new entry
      updatedData = [...educationData, formattedValues];
    }

    setEducationData(updatedData); // Update state
    setModalVisible(false); // Close modal
    setEditingIndex(null); // Reset editing index

    // Log updated data to console
    console.log(
      'Updated Education Data:',
      JSON.stringify(updatedData, null, 2),
    );
  };

  const openModal = index => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };

  const deleteEntry = index => {
    const updatedData = educationData.filter((_, i) => i !== index);
    setEducationData(updatedData);
    closeModal();
  };

  let formikRef = null;

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

      {educationData.length > 0 ? (
        <FlatList
          data={educationData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <>
              <TouchableOpacity onPress={() => openModal(index)}>
                <View style={profileStyle.userDataContainer}>
                  <Text style={styles.ClassText}>
                    {item.course_name}/{item.specialization}
                  </Text>
                  <Text style={styles.university_name}>
                    {item.university_name}
                  </Text>
                  <Text style={styles.passoutText}>
                    {item.duration.start_year}-{item.duration.end_year} •{' '}
                    {item.course_type}
                  </Text>
                  {/* <Text style={styles.passoutText}>
                    Grading System: {item.grading_system.name}
                    {item.grading_system.marks &&
                      ` • Marks: ${item.grading_system.marks}`}
                  </Text> */}
                </View>
              </TouchableOpacity>
              {educationData.length > 1 && index < educationData.length - 1 && (
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
              initialValues={getInitialValues(educationData, editingIndex)}
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

                    {/* {EducationLevels.map(option => (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          profileStyle.tabBtnStyle,
                          values.education_level === option.value
                            ? profileStyle.selectedTab
                            : profileStyle.unselectedTab,
                        ]}
                        onPress={() =>
                          setFieldValue('education_level', option.value)
                        }>
                        <Text
                          style={[
                            profileStyle.tabBtnText,
                            values.education_level === option.value
                              ? profileStyle.selectedTabText
                              : profileStyle.unselectedTabText,
                          ]}>
                          {option.value}
                        </Text>
                      </TouchableOpacity>
                    ))} */}
                  </View>

                  {[
                    'Doctorate',
                    'Post Graduate',
                    'Graduate',
                    'Diploma',
                  ].includes(values.education_level) && (
                    <>
                      <ReusableTextInput
                        name="university_name"
                        label="University Name*"
                        value={values.university_name}
                        onChangeText={handleChange('university_name')}
                      />
                      <ReusableTextInput
                        name="course_name"
                        label="Course*"
                        value={values.course_name}
                        onChangeText={handleChange('course_name')}
                      />
                      <ReusableTextInput
                        name="specialization"
                        label="Specialization*"
                        value={values.specialization}
                        onChangeText={handleChange('specialization')}
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
                            selectedValue={values.start_year}
                            onSelect={selected =>
                              setFieldValue('start_year', selected.value)
                            }
                            error={errors.start_year}
                            touched={touched.start_year}
                          />
                        </View>
                        <View style={{width: '48%'}}>
                          <ReusableDropdown
                            options={EndingYear}
                            placeholder="Ending Year*"
                            selectedValue={values.end_year}
                            onSelect={selected =>
                              setFieldValue('end_year', selected.value)
                            }
                            error={errors.end_year}
                            touched={touched.end_year}
                          />
                        </View>
                      </View>

                      <ReusableDropdown
                        options={GRADING_OPTIONS}
                        placeholder="Grading System*"
                        selectedValue={values.grading_system}
                        onSelect={selected =>
                          setFieldValue('grading_system', selected.value)
                        }
                        error={errors.grading_system}
                        touched={touched.grading_system}
                      />

                      {/* Conditionally render Marks field */}
                      {values.grading_system &&
                        values.grading_system !== 'Course Requires a Pass' && (
                          <ReusableTextInput
                            name="marks"
                            label="Marks*"
                            value={values.marks}
                            onChangeText={handleChange('marks')}
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
            showDelete={editingIndex !== null}
            onDelete={() => deleteEntry(editingIndex)}
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
