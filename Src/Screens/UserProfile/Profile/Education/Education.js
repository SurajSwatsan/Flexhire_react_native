import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import profileStyle from '../../ProfileStyle';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {colors} from '../../../../Global_CSS/TheamColors';

const EducationBoards = [
  {id: 1, value: 'CBSE'},
  {id: 2, value: 'CISCE (ICSE/ISC)'},
  {id: 3, value: 'Diploma'},
  {id: 4, value: 'National Open School'},
  {id: 5, value: 'IB (International Baccalaureate)'},
  {id: 6, value: 'Andhra Pradesh'},
  {id: 7, value: 'Arunachal Pradesh'},
  {id: 8, value: 'Assam'},
  {id: 9, value: 'Bihar'},
  {id: 10, value: 'Chhattisgarh'},
  {id: 11, value: 'Goa'},
  {id: 12, value: 'Gujarat'},
  {id: 13, value: 'Haryana'},
  {id: 14, value: 'Himachal Pradesh'},
  {id: 15, value: 'J & K'},
  {id: 16, value: 'Jharkhand'},
  {id: 17, value: 'Karnataka'},
  {id: 18, value: 'Kerala'},
  {id: 19, value: 'Madhya Pradesh'},
  {id: 20, value: 'Maharashtra'},
  {id: 21, value: 'Manipur'},
  {id: 22, value: 'Meghalaya'},
  {id: 23, value: 'Mizoram'},
  {id: 24, value: 'Nagaland'},
  {id: 25, value: 'Odisha'},
  {id: 26, value: 'Punjab'},
  {id: 27, value: 'Rajasthan'},
  {id: 28, value: 'Tamil Nadu'},
  {id: 29, value: 'Telangana'},
  {id: 30, value: 'Tripura'},
  {id: 31, value: 'Uttar Pradesh'},
  {id: 32, value: 'Uttarakhand'},
  {id: 33, value: 'West Bengal'},
  {id: 34, value: 'Other'},
];
const Class = [
  {id: 1, value: '10th'},
  {id: 2, value: '12th'},
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

console.log(PassoutYear);

const SchoolMedium = [
  {id: 1, value: 'Assamese / Asomiya'},
  {id: 2, value: 'Bengali / Bangla'},
  {id: 3, value: 'English'},
  {id: 4, value: 'Gujarati'},
  {id: 5, value: 'Hindi'},
  {id: 6, value: 'Kannada'},
  {id: 7, value: 'Kashmiri'},
  {id: 8, value: 'Konkani'},
  {id: 9, value: 'Malayalam'},
  {id: 10, value: 'Manipuri'},
  {id: 11, value: 'Marathi'},
  {id: 12, value: 'Oriya'},
  {id: 13, value: 'Punjabi'},
  {id: 14, value: 'Sanskrit'},
  {id: 15, value: 'Tamil'},
  {id: 16, value: 'Telugu'},
  {id: 17, value: 'Urdu'},
  {id: 18, value: 'Other'},
];
const validationSchema = Yup.object().shape({
  board: Yup.string().required('Board is required'),
  passout: Yup.string().required('Passout Year is required'),
  schoolMedium: Yup.string().required('School Medium is required'),
  marks: Yup.string()
    .matches(
      /^\d+(\.\d{1,2})?$/,
      'Marks must be a number with up to two decimal places eg. 56.30',
    )
    .required('Marks are required'),
  englishMarks: Yup.string()
    .matches(/^\d+$/, 'English Marks must be a whole number, eg 85')
    .test(
      'is-valid-range',
      'English Marks must be between 0 and 100',
      value => {
        if (!value) return true; // Skip validation if the field is empty (nullable)
        const num = parseInt(value, 10);
        return num >= 0 && num <= 100;
      },
    )
    .nullable(),
  mathMarks: Yup.string()
    .matches(/^\d+$/, 'Math Marks must be a whole number, eg 85')
    .test('is-valid-range', 'Math Marks must be between 0 and 100', value => {
      if (!value) return true; // Skip validation if the field is empty (nullable)
      const num = parseInt(value, 10);
      return num >= 0 && num <= 100;
    })
    .nullable(),
});

const getInitialValues = () => ({
  class: '',
  board: '',
  passout: '',
  schoolMedium: '',
  marks: '',
  englishMarks: '',
  mathMarks: '',
});

const Education = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  let formikRef = null;

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

  const allClassesAdded = Class.every(cls =>
    educationData.some(edu => edu.class === cls.value),
  );

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>EDUCATION DETAILS</Text>
        {!allClassesAdded && (
          <IconButton
            icon="plus-circle-outline"
            size={20}
            onPress={() => openModal(null)}
            iconColor={'black'}
          />
        )}
      </View>

      {educationData.length > 0 ? (
        <FlatList
          data={educationData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => openModal(index)}>
              <View style={profileStyle.userDataContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.ClassText}>{item.class}</Text>
                  <IconButton
                    icon="pencil-outline"
                    size={20}
                    onPress={() => openModal(index)}
                    iconColor={'black'}
                  />
                </View>

                <View style={{marginTop: -10}}>
                  <Text style={styles.boardText}>{item.board}</Text>
                  <Text style={styles.passoutText}>{item.passout}</Text>
                </View>
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
                    EDUCATION INFORMATION
                  </Text>
                  <View style={profileStyle.formSubHeading}>
                    <Text style={profileStyle.formSubHeading}>
                      Please fill in all the required fields.
                    </Text>
                  </View>
                  <View style={styles.classTabContainer}>
                    <Text style={profileStyle.label}>Class</Text>
                    <View style={profileStyle.TabContainer}>
                      {Class.filter(
                        option =>
                          !educationData.some(
                            saved => saved.class === option.value,
                          ),
                      ).map(option => (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            profileStyle.tabBtnStyle,
                            values.class === option.value
                              ? profileStyle.selectedTab
                              : profileStyle.unselectedTab,
                          ]}
                          onPress={() => setFieldValue('class', option.value)}>
                          <Text
                            style={[
                              profileStyle.tabBtnText,
                              values.class === option.value
                                ? profileStyle.selectedTabText
                                : profileStyle.unselectedTabText,
                            ]}>
                            {option.value}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <CustomSelectionModal
                    title="Board"
                    data={EducationBoards}
                    selectedItems={
                      EducationBoards.find(
                        item => item.value === values.board,
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
                      PassoutYear.find(item => item.value === values.passout) ||
                      null
                    }
                    setSelectedItems={item =>
                      setFieldValue('passout', item?.value || '')
                    }
                    placeholder="Select Passout Year"
                  />
                  <CustomSelectionModal
                    title="School Medium"
                    data={SchoolMedium}
                    selectedItems={
                      SchoolMedium.find(
                        item => item.value === values.schoolMedium,
                      ) || null
                    }
                    setSelectedItems={item =>
                      setFieldValue('schoolMedium', item?.value || '')
                    }
                    placeholder="Select School Medium"
                  />
                  <ReusableTextInput
                    name="marks"
                    label="Marks"
                    value={values.marks}
                    onChangeText={handleChange('marks')}
                    keyboardType="numeric"
                    note="% marks of 100 maximum"
                  />
                  {/* Show English and Math Marks only for Class 12 */}
                  {values.class === '12th' && (
                    <>
                      <ReusableTextInput
                        name="englishMarks"
                        label="English Marks"
                        value={values.englishMarks}
                        onChangeText={handleChange('englishMarks')}
                        keyboardType="numeric"
                        note="marks out of 100"
                      />
                      <ReusableTextInput
                        name="mathMarks"
                        label="Math Marks"
                        value={values.mathMarks}
                        onChangeText={handleChange('mathMarks')}
                        keyboardType="numeric"
                        note="marks out of 100"
                      />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secodary,
  },
  classTabContainer: {
    marginTop: 12,
  },
  boardText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.primary,
  },
  passoutText: {
    fontSize: 13,
    color: colors.primary,
  },
});
export default Education;
