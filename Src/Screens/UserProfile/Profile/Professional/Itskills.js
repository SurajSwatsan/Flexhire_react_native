import {
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import profileStyle from '../../ProfileStyle';
import {colors} from '../../../../Global_CSS/TheamColors';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ReusableDropdown from '../../../../Constant/CustomDropdown';
import ModalFooter from '../../../../Constant/ProfileModalFooter';

// Suggestions for software names
const SOFTWARE_SUGGESTIONS = [
  'Java',
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  'SQL',
  'C++',
  'AWS',
  'Docker',
  'Kubernetes',
  'Ruby',
  'PHP',
  'Go',
  'C#',
  'Swift',
  'TypeScript',
  'HTML',
  'CSS',
  'Angular',
  'Vue.js',
  'Flutter',
  'Django',
  'Flask',
  'Spring Boot',
  'Laravel',
  'Bootstrap',
  'Tailwind CSS',
  'SASS',
  'LESS',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Elasticsearch',
  'Firebase',
  'GraphQL',
  'REST API',
  'SOAP',
  'JUnit',
  'Mockito',
  'Jenkins',
  'Git',
  'GitHub',
  'GitLab',
  'Bitbucket',
  'Terraform',
  'Ansible',
  'Puppet',
  'Chef',
  'NGINX',
  'Apache',
  'Microsoft SQL Server',
  'Oracle Database',
  'SQLite',
  'MariaDB',
  'Snowflake',
  'BigQuery',
  'Hadoop',
  'Spark',
  'Tableau',
  'Power BI',
  'QlikView',
  'Excel',
  'MATLAB',
  'R',
  'TensorFlow',
  'PyTorch',
  'Keras',
  'OpenCV',
  'Scikit-learn',
  'Pandas',
  'NumPy',
  'SciPy',
  'Jupyter Notebook',
  'VS Code',
  'Eclipse',
  'IntelliJ IDEA',
  'NetBeans',
  'Xcode',
  'Android Studio',
  'Unity',
  'Unreal Engine',
  'Blender',
  'Maya',
  'AutoCAD',
  'SolidWorks',
  'Tableau',
  'Salesforce',
  'Zoho CRM',
  'HubSpot',
  'Marketo',
  'Slack',
  'Microsoft Teams',
  'Zoom',
  'Figma',
  'Adobe XD',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe Premiere Pro',
  'Final Cut Pro',
  'WordPress',
  'Shopify',
  'WooCommerce',
];

// Dropdown Options
const Years = Array.from({length: 31}, (_, i) => ({
  label: `${i} Years`,
  value: i,
}));

const Months = Array.from({length: 12}, (_, i) => ({
  label: `${i} Months`,
  value: i,
}));

const LastUsedYears = Array.from(
  {length: new Date().getFullYear() - 1940 + 1},
  (_, i) => ({
    label: `${new Date().getFullYear() - i}`,
    value: new Date().getFullYear() - i,
  }),
);

// Validation Schema
const validationSchema = Yup.object().shape({
  softwareName: Yup.string()
    .required('Skill / Software name is required')
    .min(2, 'Must be at least 2 characters')
    .max(50, 'Must be at most 50 characters'),
});

// Initial Values Helper
const getInitialValues = (editingIndex, itSkillList) => {
  if (editingIndex !== null && itSkillList[editingIndex]) {
    const skill = itSkillList[editingIndex];
    return {
      softwareName: skill.softwareName || '',
      softwareVersion: skill.softwareVersion || '',
      experianceinYear: skill.experianceinYear || '',
      experianceinMonths: skill.experianceinMonths || '',
      lastused: skill.lastused || '',
    };
  }
  return {
    softwareName: '',
    softwareVersion: '',
    experianceinYear: '',
    experianceinMonths: '',
    lastused: '',
  };
};

const Itskills = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itSkillList, setItSkillList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // For suggestions dropdown

  const handleFormSubmit = values => {
    const updatedSkillList = [...itSkillList];
    if (editingIndex !== null) {
      updatedSkillList[editingIndex] = values;
    } else {
      updatedSkillList.push(values);
    }
    setItSkillList(updatedSkillList);
    closeModal();
  };

  const handleSoftwareNameChange = (text, setFieldValue) => {
    setFieldValue('softwareName', text);
    // Filter suggestions based on input text
    if (text.length > 0) {
      const suggestions = SOFTWARE_SUGGESTIONS.filter(suggestion =>
        suggestion.toLowerCase().startsWith(text.toLowerCase()),
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };
  let formikRef = null;
  const handleSuggestionSelect = (suggestion, setFieldValue) => {
    setFieldValue('softwareName', suggestion);
    setFilteredSuggestions([]); // Clear suggestions once selected
  };

  const openModal = (index = null) => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
    setFilteredSuggestions([]);
  };

  const deleteSkill = () => {
    if (editingIndex !== null) {
      setItSkillList(itSkillList.filter((_, idx) => idx !== editingIndex));
      closeModal();
    }
  };

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>IT Skills</Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor={colors.blackText}
          size={20}
          onPress={() => openModal()}
          style={profileStyle.editButton}
        />
      </View>

      {/* Display IT Skills List */}
      <FlatList
        horizontal
        data={itSkillList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[profileStyle.userDataContainer, styles.listContainer]}
            onPress={() => openModal(index)}>
            <Text style={profileStyle.optionalData}>
              {item.softwareName || '-'} - {item.softwareVersion || '-'}
            </Text>
            <Text style={profileStyle.optionalData}>
              {item.experianceinYear && item.experianceinMonths
                ? `${item.experianceinYear} Years ${item.experianceinMonths} Months`
                : '-'}
            </Text>
            <Text style={profileStyle.optionalData}>
              {item.lastused || '-'}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Adding or Editing IT Skills */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalContainer}>
          <FlatList
            data={[{key: 'form'}]}
            renderItem={() => (
              <Formik
                initialValues={getInitialValues(editingIndex, itSkillList)}
                validationSchema={validationSchema}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({handleChange, handleSubmit, values, setFieldValue}) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>IT SKILLS</Text>
                    <Text style={profileStyle.formSubHeading}>
                      Mention skills like programming languages (Java, Python),
                      softwares (Microsoft Word, Excel) and more, to show your
                      technical expertise.
                    </Text>
                    <ReusableTextInput
                      name="softwareName"
                      label="Skill / Software Name*"
                      value={values.softwareName}
                      onChangeText={text =>
                        handleSoftwareNameChange(text, setFieldValue)
                      }
                      // error={errors.softwareName}
                      // touched={touched.softwareName}
                    />
                    {/* Suggestions Dropdown */}
                    {filteredSuggestions.length > 0 && (
                      <View style={profileStyle.suggestionsContainer}>
                        {filteredSuggestions.map((suggestion, idx) => (
                          <TouchableOpacity
                            key={idx}
                            onPress={() =>
                              handleSuggestionSelect(suggestion, setFieldValue)
                            }
                            style={{
                              borderBottomColor: 'white',
                              borderBottomWidth: 0.5,
                              width: '100%',
                            }}>
                            <Text style={profileStyle.suggestionText}>
                              {suggestion}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    <ReusableTextInput
                      name="softwareVersion"
                      label="Software Version"
                      value={values.softwareVersion}
                      onChangeText={handleChange('softwareVersion')}
                    />
                    <Text style={{color: '#000'}}>Experiance</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}>
                      <ReusableDropdown
                        options={Years}
                        placeholder=" Years*"
                        selectedValue={values.experianceinYear}
                        onSelect={selected =>
                          setFieldValue('experianceinYear', selected.value)
                        }
                      />
                      <ReusableDropdown
                        options={Months}
                        placeholder="Months*"
                        selectedValue={values.experianceinMonths}
                        onSelect={selected =>
                          setFieldValue('experianceinMonths', selected.value)
                        }
                      />
                    </View>
                    <ReusableDropdown
                      options={LastUsedYears}
                      placeholder="Last Used*"
                      selectedValue={values.lastused}
                      onSelect={selected =>
                        setFieldValue('lastused', selected.value)
                      }
                    />
                  </View>
                )}
              </Formik>
            )}
            keyExtractor={item => item.key}
          />
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={closeModal}
            showDelete={editingIndex !== null} // Show delete only if editing
            onDelete={() => {
              if (editingIndex !== null) {
                deleteSkill(editingIndex); // Call deleteLanguage with the current index
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
  listContainer: {
    justifyContent: 'center',
    width: 160,
    padding: 12,
    backgroundColor: colors.background,
    marginRight: 12,
    borderRadius: 8,
  },
});
export default Itskills;
