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
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {colors} from '../../../../Global_CSS/TheamColors';

const EducationLevels = [
  {id: 1, value: 'Doctorate'},
  {id: 2, value: 'Post Graduate'},
  {id: 3, value: 'Graduate'},
  {id: 4, value: 'Diploma'},
];

const GradingSystem = [
  {id: 1, value: 'Scale 10 Grading System'},
  {id: 2, value: 'Scale 4 Grading System'},
  {id: 3, value: '% Marks of 100 Maximum'},
  {id: 4, value: 'Course Requires a Pass'},
];

const validationSchema = Yup.object().shape({
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
  marks: Yup.string()
    .matches(
      /^\d+(\.\d{1,2})?$/,
      'Marks must be a number with up to two decimals',
    )
    .nullable(),
});

const getInitialValues = () => ({
  educationLevel: '',
  universityName: '',
  course: '',
  specialization: '',
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
            <TouchableOpacity onPress={() => openModal(index)}>
              <View style={profileStyle.userDataContainer}>
                <Text style={styles.ClassText}>{item.educationLevel}</Text>
                <Text style={styles.passoutText}>
                  {item.universityName}, {item.course}, {item.specialization}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No education details added yet.</Text>
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
                    ADD EDUCATION DETAILS
                  </Text>

                  <View style={profileStyle.TabContainer}>
                    {EducationLevels.map(option => (
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
                    ))}
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
                      <View style={styles.YearContainer}>
                        <View style={{width: '48%'}}>
                          <ReusableTextInput
                            name="startingYear"
                            label="Starting Year*"
                            value={values.startingYear}
                            onChangeText={handleChange('startingYear')}
                            keyboardType="numeric"
                          />
                        </View>
                        <View style={{width: '48%'}}>
                          <ReusableTextInput
                            name="endingYear"
                            label="Ending Year*"
                            value={values.endingYear}
                            onChangeText={handleChange('endingYear')}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>
                      <CustomSelectionModal
                        title="Grading System*"
                        data={GradingSystem}
                        selectedItems={
                          GradingSystem.find(
                            item => item.value === values.gradingSystem,
                          ) || null
                        }
                        setSelectedItems={item =>
                          setFieldValue('gradingSystem', item?.value || '')
                        }
                        placeholder="Select Grading System"
                      />
                      {/* Conditionally render Marks field */}
                      {values.gradingSystem &&
                        values.gradingSystem !== 'Course Requires a Pass' && (
                          <ReusableTextInput
                            name="marks"
                            label="Marks"
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  passoutText: {
    fontSize: 14,
    color: colors.primary,
  },
  YearContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HigherEducation;
