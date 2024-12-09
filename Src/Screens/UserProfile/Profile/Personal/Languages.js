import React, { useCallback, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profileStyle from '../../ProfileStyle';
import { colors } from '../../../../Global_CSS/TheamColors';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';
import CustomTabs from '../../../../Constant/CustomTabs';
import ModalFooter from '../../../../Constant/ProfileModalFooter';

const PROFICIENCY_OPTIONS = [
  { id: 1, value: 'Beginner' },
  { id: 2, value: 'Medium' },
  { id: 3, value: 'Expert' },
];

const LANGUAGES = [
  { id: 1, value: 'English' },
  { id: 2, value: 'Spanish' },
  { id: 3, value: 'French' },
  { id: 4, value: 'German' },
  { id: 5, value: 'Chinese' },
  { id: 6, value: 'Japanese' },
  { id: 7, value: 'Hindi' },
  { id: 8, value: 'Arabic' },
  { id: 9, value: 'Portuguese' },
  { id: 10, value: 'Russian' },
  { id: 11, value: 'Marathi' },
  { id: 12, value: 'Telugu' },
];

const validationSchema = Yup.object().shape({
  language: Yup.string().required('Language is required'),
  proficiency: Yup.string().required('Proficiency is required'),
  comfortablein: Yup.array().min(1, 'At least one option must be selected'),
});

const getInitialValues = (name = '', proficiency = '', comfortable_in = []) => ({
  language: name,
  proficiency,
  comfortablein: comfortable_in,
});

const Languages = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [languages, setLanguages] = useState([]);

  let formikRef = null;

  const handleFormSubmit = (values) => {
    const formattedValues = {
      name: values.language,
      proficiency: values.proficiency,
      comfortable_in: values.comfortablein,
    };

    if (editIndex !== null) {
      const updatedLanguages = languages.map((lang, index) =>
        index === editIndex ? formattedValues : lang
      );
      setLanguages(updatedLanguages);
    } else {
      const updatedLanguages = [...languages, formattedValues];
      setLanguages(updatedLanguages);
    }

    setEditIndex(null);
    setModalVisible(false);
    console.log('Formatted Data:', JSON.stringify(languages, null, 2));

  };

  const deleteLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
    setModalVisible(false);
  };

  const openModal = useCallback((index = null) => {
    setEditIndex(index);
    setModalVisible(true);
  }, []);

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>LANGUAGE</Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor={colors.blackText}
          size={20}
          onPress={() => openModal()}
          style={profileStyle.editButton}
        />
      </View>

      <View>
        {languages.length > 0 ? (
          languages.map((lang, index) => (
            <TouchableOpacity key={index} onPress={() => openModal(index)}>
              <View style={styles.outpurtData}>
                <View style={styles.languageDetails}>
                  <Text style={styles.displayText}>{lang.name}</Text>
                  <View style={styles.iconsContainer}>
                    <IconButton
                      icon="pencil-outline"
                      iconColor={colors.blackText}
                      size={18}
                      onPress={() => openModal(index)}
                      style={styles.iconButton}
                    />
                  </View>
                </View>
                <Text style={styles.displayText2}>
                  Proficiency: {lang.proficiency}
                </Text>
                <View style={styles.iconTextContainer}>
                  {lang.comfortable_in.map((option) => (
                    <View key={option} style={profileStyle.chip}>
                      <Ionicons
                        name={
                          option === 'Read'
                            ? 'book-outline'
                            : option === 'Writing'
                            ? 'pencil-outline'
                            : 'mic-outline'
                        }
                        size={16}
                        color="#333"
                        style={{ marginRight: 4 }}
                      />
                      <Text style={profileStyle.chipText}>{option}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={profileStyle.optionalData}>
            Add languages to showcase your proficiency and comfort in
            communication.
          </Text>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={profileStyle.modalContainer}>
          <Formik
            initialValues={
              editIndex !== null
                ? getInitialValues(
                    languages[editIndex]?.name,
                    languages[editIndex]?.proficiency,
                    languages[editIndex]?.comfortable_in
                  )
                : getInitialValues()
            }
            validationSchema={validationSchema}
            innerRef={(ref) => (formikRef = ref)}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
              <View style={profileStyle.formContainer}>
                <Text style={profileStyle.formHeading}>
                  Add or Edit Language
                </Text>
                <CustomSelectionModal
                  title="Language"
                  data={LANGUAGES}
                  selectedItems={
                    LANGUAGES.find((item) => item.value === values.language) ||
                    null
                  }
                  setSelectedItems={(item) =>
                    setFieldValue('language', item?.value || '')
                  }
                  placeholder="Select a language"
                />
                {errors.language && touched.language && (
                  <Text style={styles.error}>{errors.language}</Text>
                )}

                <CustomTabs
                  label="Proficiency"
                  options={PROFICIENCY_OPTIONS}
                  selectedValue={values.proficiency}
                  setFieldValue={setFieldValue}
                  fieldName="proficiency"
                  error={errors.proficiency}
                  touched={touched.proficiency}
                />

                <Text style={styles.subHeading}>Comfortable In</Text>
                <View style={styles.comfortableinContainer}>
                  {['Read', 'Writing', 'Speaking'].map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.statusButton,
                        values.comfortablein.includes(option)
                          ? styles.selectedButton
                          : styles.unselectedButton,
                      ]}
                      onPress={() =>
                        setFieldValue(
                          'comfortablein',
                          values.comfortablein.includes(option)
                            ? values.comfortablein.filter(
                                (item) => item !== option
                              )
                            : [...values.comfortablein, option]
                        )
                      }
                    >
                      <Ionicons
                        name={
                          option === 'Read'
                            ? 'book-outline'
                            : option === 'Writing'
                            ? 'pencil-outline'
                            : 'mic-outline'
                        }
                        size={18}
                        color={
                          values.comfortablein.includes(option)
                            ? '#fff'
                            : '#333'
                        }
                      />
                      <Text
                        style={
                          values.comfortablein.includes(option)
                            ? styles.selectedText
                            : styles.unselectedText
                        }
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {errors.comfortablein && touched.comfortablein && (
                  <Text style={styles.error}>{errors.comfortablein}</Text>
                )}
              </View>
            )}
          </Formik>
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={() => setModalVisible(false)}
            showDelete={editIndex !== null}
            onDelete={() => deleteLanguage(editIndex)}
          />
        </View>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  error: {
    color: 'red',
    marginVertical: 6,
  },
  displayContainer: {
    marginTop: 12,
  },
  Languages: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  outpurtData: {
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'column',
    borderBottomColor: colors.lightgaryText,
    borderBottomWidth: 1,
  },
  languageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.primary,
  },
  displayText1: {
    color: '#000',
  },
  displayText2: {
    color: '#000',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
  },
  proficiencyStatusContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  comfortableinContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    fontWeight: '600',
  },
  unselectedButton: {
    backgroundColor: '#f0f0f0',
  },
  statusText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#333',
  },
});

export default Languages;
