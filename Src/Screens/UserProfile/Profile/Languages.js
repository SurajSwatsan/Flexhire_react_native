import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton} from 'react-native-paper'; // Import IconButton
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../../Global_CSS/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../Global_CSS/TheamColors';
import CustomSelectionModal from '../../../Constant/CustomSelectionModal';
import profileStyle from '../ProfileStyle';
import ModalFooter from '../../../Constant/ProfileModalFooter';
import CustomTabs from '../../../Constant/CustomTabs';
const PROFICIENCY_OPTIONS = [
  {id: 1, value: 'Beginner'},
  {id: 2, value: 'Proficient'},
  {id: 3, value: 'Expert'},
];
const Language = [
  {id: 1, value: 'English'},
  {id: 2, value: 'Spanish'},
  {id: 3, value: 'French'},
  {id: 4, value: 'German'},
  {id: 5, value: 'Chinese'},
  {id: 6, value: 'Japanese'},
  {id: 7, value: 'Hindi'},
  {id: 8, value: 'Arabic'},
  {id: 9, value: 'Portuguese'},
  {id: 10, value: 'Russian'},
  {id: 11, value: 'Korean'},
  {id: 12, value: 'Italian'},
  {id: 13, value: 'Dutch'},
  {id: 14, value: 'Swedish'},
  {id: 15, value: 'Turkish'},
  {id: 16, value: 'Thai'},
  {id: 17, value: 'Vietnamese'},
  {id: 18, value: 'Greek'},
  {id: 19, value: 'Polish'},
  {id: 20, value: 'Bengali'},
  {id: 21, value: 'Tamil'},
  {id: 22, value: 'Telugu'},
  {id: 23, value: 'Marathi'},
  {id: 24, value: 'Urdu'},
  {id: 25, value: 'Punjabi'},
  {id: 26, value: 'Malay'},
  {id: 27, value: 'Filipino'},
  {id: 28, value: 'Hebrew'},
  {id: 29, value: 'Czech'},
  {id: 30, value: 'Hungarian'},
];

// Validation schema for the form
const validationSchema = Yup.object().shape({
  language: Yup.string().required('Language is required'),
  proficiency: Yup.string().required('Proficiency is required'),
  comfortablein: Yup.array().min(1, 'At least one option must be selected'),
});

const Languages = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [language, setLanguage] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [comfortablein, setComfortablein] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track if editing
  const [languagesList, setLanguagesList] = useState([]); // Array for multiple languages

  let formikRef = null;

  const handleFormSubmit = values => {
    console.log('Submitted Values:', values);

    if (editIndex !== null) {
      // Edit Mode: Update the existing language
      const updatedLanguages = languagesList.map((lang, index) =>
        index === editIndex ? values : lang,
      );
      setLanguagesList(updatedLanguages);
    } else {
      // Add Mode: Add new language to the list
      setLanguagesList([...languagesList, values]);
    }

    // Reset the modal state and close it
    setLanguage('');
    setProficiency('');
    setComfortablein([]);
    setEditIndex(null);
    setModalVisible(false);

    console.log('Updated Languages List:', languagesList);
  };

  const handleEdit = index => {
    const langData = languagesList[index];
    setLanguage(langData.language);
    setProficiency(langData.proficiency);
    setComfortablein(langData.comfortablein);
    setEditIndex(index);
    setModalVisible(true);
    console.log('Editing Language:', langData.language);
  };

  const openModal = () => {
    setLanguage('');
    setProficiency('');
    setComfortablein([]);
    setEditIndex(null);
    setModalVisible(true);
  };
  const deleteLanguage = index => {
    // Filter out the language at the specified index
    const updatedLanguages = languagesList.filter((_, i) => i !== index);
    setLanguagesList(updatedLanguages); // Update the state
  };
  const closeModal = () => setModalVisible(false);

  const toggleSelection = (value, values, setFieldValue) => {
    const updatedSelection = values.comfortablein.includes(value)
      ? values.comfortablein.filter(item => item !== value)
      : [...values.comfortablein, value];
    setFieldValue('comfortablein', updatedSelection);
  };
  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>LANGUAGE</Text>
        <IconButton
          icon={'plus-circle-outline'}
          iconColor={colors.blackText}
          size={20}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>

      {/* Display List of Languages */}
      {languagesList.map((lang, index) => (
        <TouchableOpacity key={index} onPress={() => handleEdit(index)}>
          <View style={styles.outpurtData}>
            <View style={styles.languageDetails}>
              <Text style={styles.displayText}>{lang.language}</Text>
              <View style={styles.iconsContainer}>
                {/* Delete Icon */}
                <IconButton
                  icon="pencil-outline"
                  iconColor="#000"
                  size={18}
                  onPress={() => handleEdit(index)} // Call the separate delete function
                  style={styles.iconButton}
                />
              </View>
            </View>
            <View style={styles.iconTextContainer}>
              {lang.comfortablein.map(option => {
                // Define icons for each comfortablein option
                const icons = {
                  Reading: 'book-outline',
                  Writing: 'pencil-outline',
                  Speaking: 'mic-outline',
                };

                return (
                  <View key={option} style={profileStyle.chip}>
                    <Ionicons
                      name={icons[option]} // Match the icon with the option
                      size={16}
                      color="#333"
                      style={{marginRight: 4}} // Spacing between icon and text
                    />
                    <Text style={profileStyle.chipText}>{option}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* Modal for Adding or Editing Language */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalContainer}>
          <FlatList
            data={[{key: 'form'}]}
            renderItem={() => (
              <Formik
                initialValues={{
                  language: language,
                  proficiency: proficiency,
                  comfortablein: comfortablein || [],
                }}
                validationSchema={validationSchema}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({handleSubmit, setFieldValue, values, errors, touched}) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>
                      LANGUAGE PROFICIENCY
                    </Text>
                    <Text style={profileStyle.formSubHeading}>
                      Strengthen your resume by letting recruiters know you can
                      communicate in multiple languages
                    </Text>
                    <CustomSelectionModal
                      title="Language"
                      data={Language}
                      selectedItems={
                        Language.find(item => item.value === values.language) ||
                        null
                      }
                      setSelectedItems={item =>
                        setFieldValue('language', item?.value || '')
                      }
                      placeholder="Select Language"
                      isMultiSelect={false}
                    />
                    {errors.language && touched.language && (
                      <Text style={styles.error}>{errors.language}</Text>
                    )}

                    <CustomTabs
                      label=" Proficiency*"
                      options={PROFICIENCY_OPTIONS}
                      selectedValue={values.proficiency}
                      setFieldValue={setFieldValue}
                      fieldName="proficiency"
                      error={errors.proficiency}
                      touched={touched.proficiency}
                    />
                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Comfortable In
                      </Text>
                      <View style={styles.comfortableinContainer}>
                        {[
                          {label: 'Reading', icon: 'book-outline'},
                          {label: 'Writing', icon: 'pencil-outline'},
                          {label: 'Speaking', icon: 'mic-outline'},
                        ].map(option => (
                          <TouchableOpacity
                            key={option.label}
                            style={[
                              styles.statusButton,
                              values.comfortablein.includes(option.label)
                                ? styles.selectedButton
                                : styles.unselectedButton,
                            ]}
                            onPress={() =>
                              toggleSelection(
                                option.label,
                                values,
                                setFieldValue,
                              )
                            }>
                            <Ionicons
                              name={option.icon}
                              size={18}
                              color={
                                values.comfortablein.includes(option.label)
                                  ? '#fff'
                                  : '#333'
                              }
                              style={{marginRight: 8}} // Add spacing between the icon and text
                            />
                            <Text
                              style={[
                                styles.statusText,
                                values.comfortablein.includes(option.label)
                                  ? styles.selectedText
                                  : styles.unselectedText,
                              ]}>
                              {option.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

                      {errors.comfortablein && touched.comfortablein && (
                        <Text style={styles.error}>{errors.comfortablein}</Text>
                      )}
                    </View>
                  </View>
                )}
              </Formik>
            )}
            keyExtractor={item => item.key}
          />
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={closeModal}
            showDelete={editIndex !== null} // Show delete only if editing
            onDelete={() => {
              if (editIndex !== null) {
                deleteLanguage(editIndex); // Call deleteLanguage with the current index
                closeModal(); // Close the modal after deletion
              }
            }}
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
    color: colors.secodary,
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
