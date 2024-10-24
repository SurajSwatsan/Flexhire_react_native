import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput, IconButton} from 'react-native-paper'; // Import IconButton
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

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

  // Open modal for editing a specific language
  const handleEdit = index => {
    const langData = languagesList[index];
    setLanguage(langData.language);
    setProficiency(langData.proficiency);
    setComfortablein(langData.comfortablein);
    setEditIndex(index);
    setModalVisible(true);
  };

  const openModal = () => {
    setLanguage(''); // Clear fields for adding new
    setProficiency('');
    setComfortablein([]);
    setEditIndex(null);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const toggleSelection = (value, values, setFieldValue) => {
    const updatedSelection = values.comfortablein.includes(value)
      ? values.comfortablein.filter(item => item !== value)
      : [...values.comfortablein, value];
    setFieldValue('comfortablein', updatedSelection);
  };

  const handleFormSubmit = values => {
    if (editIndex !== null) {
      // Update existing language
      const updatedLanguages = languagesList.map((lang, index) =>
        index === editIndex ? values : lang,
      );
      setLanguagesList(updatedLanguages);
    } else {
      // Add new language
      setLanguagesList([...languagesList, values]);
    }
    closeModal();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.Languages}>Languages</Text>
        </View>

        <Text style={styles.AddButton} onPress={openModal}>
          Add
        </Text>
      </View>

      {/* Display List of Languages */}
      {languagesList.map((lang, index) => (
        <TouchableOpacity key={index} onPress={() => handleEdit(index)}>
          <View style={styles.outpurtData}>
            <View style={styles.languageDetails}>
              <Text style={styles.displayText}>{lang.language}</Text>
              <Text style={styles.displayText1}>
                {lang.comfortablein.join(', ')}
              </Text>
              <Text style={styles.displayText2}>
                Proficiency: {lang.proficiency}
              </Text>
            </View>
            <View style={styles.iconsContainer}>
              {/* Edit Icon */}
              <IconButton
                icon="lead-pencil"
                iconColor="#217aff"
                size={18}
                onPress={() => handleEdit(index)}
                style={styles.iconButton}
              />
              {/* Delete Icon */}
              <IconButton
                icon="delete"
                iconColor="#ff0000"
                size={18}
                onPress={() => {
                  const updatedLanguages = languagesList.filter(
                    (_, i) => i !== index,
                  );
                  setLanguagesList(updatedLanguages);
                }}
                style={styles.iconButton}
              />
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
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.heading}>Language proficiency</Text>
              <Text style={styles.subText1}>
                Strengthen your resume by letting recruiters know you can
                communicate in multiple languages
              </Text>
              <Formik
                initialValues={{
                  language: language,
                  proficiency: proficiency,
                  comfortablein: comfortablein || [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.container}>
                    <View style={styles.headlinecontainer}>
                      <TextInput
                        style={styles.input}
                        mode="outlined"
                        label="Language"
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('language')}
                        onBlur={handleBlur('language')}
                        value={values.language}
                      />
                      {errors.language && touched.language && (
                        <Text style={styles.error}>{errors.language}</Text>
                      )}
                    </View>

                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Proficiency
                      </Text>
                      <View style={styles.proficiencyStatusContainer}>
                        {['Beginner', 'Proficient', 'Expert'].map(level => (
                          <TouchableOpacity
                            key={level}
                            style={[
                              styles.statusButton,
                              values.proficiency === level
                                ? styles.selectedButton
                                : styles.unselectedButton,
                            ]}
                            onPress={() => setFieldValue('proficiency', level)}>
                            <Text
                              style={[
                                styles.statusText,
                                values.proficiency === level
                                  ? styles.selectedText
                                  : styles.unselectedText,
                              ]}>
                              {level}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      {errors.proficiency && touched.proficiency && (
                        <Text style={styles.error}>{errors.proficiency}</Text>
                      )}
                    </View>

                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Comfortable In
                      </Text>
                      <View style={styles.comfortableinContainer}>
                        {['Reading', 'Writing', 'Speaking'].map(option => (
                          <TouchableOpacity
                            key={option}
                            style={[
                              styles.statusButton,
                              values.comfortablein.includes(option)
                                ? styles.selectedButton
                                : styles.unselectedButton,
                            ]}
                            onPress={() =>
                              toggleSelection(option, values, setFieldValue)
                            }>
                            <Text
                              style={[
                                styles.statusText,
                                values.comfortablein.includes(option)
                                  ? styles.selectedText
                                  : styles.unselectedText,
                              ]}>
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      {errors.comfortablein && touched.comfortablein && (
                        <Text style={styles.error}>{errors.comfortablein}</Text>
                      )}
                    </View>

                    <Button
                      onPress={handleSubmit}
                      labelStyle={GlobalStyle.labelStyle}>
                      Submit
                    </Button>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 12,
    backgroundColor: '#00334d',
    borderRadius: 8,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  AddButton: {
    color: '#f2f2f2',
    fontWeight: 'bold',
    margin: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  modalContent: {
    justifyContent: 'center',
    margin: 12,
  },
  heading: {
    fontSize: 24,
    color: '#333',
    marginVertical: 12,
    fontWeight: 'bold',
  },
  subText1: {
    color: '#333',
    fontSize: 12,
  },
  container: {
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginVertical: 6,
  },
  displayContainer: {
    marginTop: 12,
  },
  Languages: {
    color: '#fff',
    fontWeight: 'bold',
  },
  outpurtData: {
    margin: 12,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  languageDetails: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
    backgroundColor: '#007aff',
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
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: '#007aff',
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
