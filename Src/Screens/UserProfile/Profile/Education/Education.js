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
import CustomTabs from '../../../../Constant/CustomTabs';

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

const getInitialValues = () => ({
  course_name: '',
  board: '',
  passout_year: '',
  school_medium: '',
  marks: '',
});

const Education = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [educationData, setEducationData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  let formikRef = null;

  const handleFormSubmit = values => {
    const formattedData = {
      course_name: values.course_name,
      board: values.board,
      passout_year: values.passout_year,
      school_medium: values.school_medium,
      marks: values.marks,
    };
    if (editingIndex !== null) {
      const updatedData = [...educationData];
      updatedData[editingIndex] = values;
      setEducationData(updatedData);
    } else {
      setEducationData([...educationData, values]);
    }
    setModalVisible(false);
    setEditingIndex(null);
    console.log(
      'Updated Data:',
      JSON.stringify([...educationData, formattedData], null, 2),
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

  const allClassesAdded = EducationClass.every(cls =>
    educationData.some(edu => edu.course_name === cls.value),
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
                      alignItems: 'center',
                    }}>
                    <Text style={styles.ClassText}>{item.course_name}</Text>
                    <IconButton
                      icon="pencil-outline"
                      size={20}
                      onPress={() => openModal(index)}
                      iconColor={'black'}
                    />
                  </View>
                  <View style={{marginTop: -10}}>
                    <Text style={styles.boardText}>{item.board}</Text>
                    <Text style={styles.passoutText}>{item.passout_year}</Text>
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
                      Education*
                    </Text>

                    <View style={profileStyle.TabContainer}>
                      {EducationClass.filter(
                        option =>
                          !educationData.some(
                            saved => saved.course_name === option.value,
                          ),
                      ).map(option => (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            profileStyle.tabBtnStyle,
                            values.course_name === option.value
                              ? profileStyle.selectedTab
                              : profileStyle.unselectedTab,
                          ]}
                          onPress={() =>
                            setFieldValue('course_name', option.value)
                          }>
                          <Text
                            style={[
                              profileStyle.tabBtnText,
                              values.course_name === option.value
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
                      PassoutYear.find(
                        item => item.value === values.passout_year,
                      ) || null
                    }
                    setSelectedItems={item =>
                      setFieldValue('passout_year', item?.value || '')
                    }
                    placeholder="Select Passout Year"
                  />
                  <CustomSelectionModal
                    title="School Medium"
                    data={SchoolMedium}
                    selectedItems={
                      SchoolMedium.find(
                        item => item.value === values.school_medium,
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
                    value={values.marks}
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
