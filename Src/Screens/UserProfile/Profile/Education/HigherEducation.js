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
  { id: 1, value: 'Doctorate', label: 'Doctorate' },
  { id: 2, value: 'Post Graduate', label: 'Post Graduate' },
  { id: 3, value: 'Graduate', label: 'Graduate' },
  { id: 4, value: 'Diploma', label: 'Diploma' },
];;

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
  educationLevel: Yup.string().required('Education Level is required'),
  universityName: Yup.string().required('University Name is required'),
  course: Yup.string().required('Course is required'),
  specialization: Yup.string().required('Specialization is required'),
  startingYear: Yup.string()
    .matches(/^\d{4}$/, 'Starting Year must be a valid year')
    .required('Starting Year is required'),
  endingYear: Yup.string()
    .matches(/^\d{4}$/, 'Ending Year must be a valid year')
    .required('Ending Year is required'),
  gradingSystem: Yup.string().required('Grading System is required'),
  courseType: Yup.string().required('Course Type is required'),
  marks: Yup.string().test(
    'Marks must be a percentage (0-100)',
    function (value) {
      const {gradingSystem} = this.parent; // Access the gradingSystem field
      if (gradingSystem && gradingSystem !== 'Course Requires a Pass') {
        if (!value) {
          return this.createError({message: 'Marks is required'});
        }
        // Validate numeric format and range (0-100)
        const isValidFormat = /^\d+(\.\d{1,2})?$/.test(value); // Numeric with up to 2 decimals
        const isValidRange = parseFloat(value) >= 0 && parseFloat(value) <= 100; // Between 0 and 100
        return isValidFormat && isValidRange;
      }
      return true; // Skip validation when gradingSystem is "Course Requires a Pass"
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

const getInitialValues = () => ({
  educationLevel: '',
  universityName: '',
  course: '',
  specialization: '',
  courseType: '',
  startingYear: '',
  endingYear: '',
  gradingSystem: '',
  marks: '',
});

const HigherEducation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleFormSubmit = values => {
    if (editingIndex !== null) {
      const updatedData = [...educationData];
      updatedData[editingIndex] = values;
      setEducationData(updatedData);
    } else {
      setEducationData([...educationData, values]);
    }
    setModalVisible(false);
    setEditingIndex(null);
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flex:1}}>
                      <Text style={styles.ClassText}>
                        {item.course}/{item.specialization}
                      </Text>
                      <Text style={styles.universityName}>
                        {item.universityName}
                      </Text>
                      <Text style={styles.passoutText}>
                        {item.startingYear}-{item.endingYear} • {item.courseType}
                      </Text>
                    </View>
                    <View>
                      <IconButton
                        icon="pencil-outline"
                        size={20}
                        onPress={() => openModal(index)}
                        iconColor={'black'}
                        style={styles.editIcon}
                      />
                    </View>
                  </View>
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
          Details like course, university, and more, help recruiters identify
          your educational background.
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
              initialValues={
                editingIndex !== null
                  ? educationData[editingIndex]
                  : getInitialValues()
              }
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
                    Details like course, university, and more, help recruiters
                    identify your educational background
                  </Text>
                  <View style={profileStyle.TabContainer}>

                  <CustomTabs
                        label="Education*"
                        options={EducationLevels}
                        selectedValue={values.educationLevel}
                        setFieldValue={setFieldValue}
                        fieldName="educationLevel"
                        error={errors.educationLevel}
                        touched={touched.educationLevel}
                      />

                    {/* {EducationLevels.map(option => (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          profileStyle.tabBtnStyle,
                          values.educationLevel === option.value
                            ? profileStyle.selectedTab
                            : profileStyle.unselectedTab,
                        ]}
                        onPress={() =>
                          setFieldValue('educationLevel', option.value)
                        }>
                        <Text
                          style={[
                            profileStyle.tabBtnText,
                            values.educationLevel === option.value
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
                  ].includes(values.educationLevel) && (
                    <>
                      <ReusableTextInput
                        name="universityName"
                        label="University Name*"
                        value={values.universityName}
                        onChangeText={handleChange('universityName')}
                      />
                      <ReusableTextInput
                        name="course"
                        label="Course*"
                        value={values.course}
                        onChangeText={handleChange('course')}
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
                        selectedValue={values.courseType}
                        setFieldValue={setFieldValue}
                        fieldName="courseType"
                        error={errors.courseType}
                        touched={touched.courseType}
                      />
                      <View style={styles.YearContainer}>
                        <View style={{width: '48%'}}>
                          <ReusableDropdown
                            options={StartingYear}
                            placeholder="Starting Year*"
                            selectedValue={values.startingYear}
                            onSelect={selected =>
                              setFieldValue('startingYear', selected.value)
                            }
                            error={errors.startingYear}
                            touched={touched.startingYear}
                          />
                        </View>
                        <View style={{width: '48%'}}>
                          <ReusableDropdown
                            options={EndingYear}
                            placeholder="Ending Year*"
                            selectedValue={values.endingYear}
                            onSelect={selected =>
                              setFieldValue('endingYear', selected.value)
                            }
                            error={errors.endingYear}
                            touched={touched.endingYear}
                          />
                        </View>
                      </View>

                      <ReusableDropdown
                        options={GRADING_OPTIONS}
                        placeholder="Grading System*"
                        selectedValue={values.gradingSystem}
                        onSelect={selected =>
                          setFieldValue('gradingSystem', selected.value)
                        }
                        error={errors.gradingSystem}
                        touched={touched.gradingSystem}
                      />

                      {/* Conditionally render Marks field */}
                      {values.gradingSystem &&
                        values.gradingSystem !== 'Course Requires a Pass' && (
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
  universityName: {
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
