
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  TextInput,
  Provider as PaperProvider,
  Button,
  IconButton,
} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

export default function EducationComponent() {
  const [activeTab, setActiveTab] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [classXAdded, setClassXAdded] = useState(false);
  const [classXIIAdded, setClassXIIAdded] = useState(false);
  const [courseType, setCourseType] = useState('');
  const [showMarksInput, setShowMarksInput] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filteredBoardOptions, setFilteredBoardOptions] = useState([]);

  const [filteredSchoolMediumOptions, setFilteredSchoolMediumOptions] =
    useState([]);
  let formikRef = null;

  // Define options for educational boards
  const boardOptions = ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'];
  const schoolMediumOptions = [
    'English',
    'Hindi',
    'Marathi',
    'French',
    'Spanish',
  ];
  const handleBoardInputChange = (text, formikProps) => {
    formikProps.setFieldValue('board', text);
    const filteredOptions = boardOptions.filter(option =>
      option.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBoardOptions(filteredOptions);
    setDropdownVisible(true); // Show dropdown when typing
  };
  const handleSchoolMediumInputChange = (text, formikProps) => {
    formikProps.setFieldValue('schoolMedium', text);
    if (text) {
      const filteredOptions = schoolMediumOptions.filter(option =>
        option.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredSchoolMediumOptions(filteredOptions);
    } else {
      setFilteredSchoolMediumOptions([]);
    }
  };
  const currentYear = new Date().getFullYear();
  const Yearsused = Array.from(
    {length: currentYear - 1940 + 1},
    (_, i) => currentYear - i,
  );
  const yearOptions = Yearsused.map(year => ({
    label: year.toString(),
    value: year,
  }));

  const gradingSystemOptions = [
    {label: 'Scale 10 Grading System', value: 'Scale 10 Grading System'},
    {label: 'Scale 4 Grading System', value: 'Scale 4 Grading System'},
    {label: '% Marks of 100 Maximum', value: '% Marks of 100 Maximum'},
    {label: 'Course Requires a Pass', value: 'Course Requires a Pass'},
  ];

  const validationSchemas = {
    'Class XII': Yup.object().shape({
      board: Yup.string().required('Board is required'),
      schoolMedium: Yup.string().required('School Medium is required'),
      yearOfPassing: Yup.string().required('Year of Passing is required'),
      marks: Yup.string()
        .required('Marks is required')
        .test('is-valid-marks', 'Marks must be between 0 and 100', value => {
          const num = Number(value);
          return num >= 0 && num <= 100;
        }),
      englishMarks: Yup.number()
        .min(0, 'Marks must be at least 0')
        .max(100, 'Marks must be 100 or less')
        .nullable(), // Allows the field to be empty
      mathMarks: Yup.number()
        .min(0, 'Marks must be at least 0')
        .max(100, 'Marks must be 100 or less')
        .nullable(),
    }),
    'Class X': Yup.object().shape({
      board: Yup.string().required('Board is required'),
      schoolMedium: Yup.string().required('School Medium is required'),
      yearOfPassing: Yup.string().required('Year of Passing is required'),
      marks: Yup.string()
        .required('Marks is required')
        .test('is-valid-marks', '% must be between 0 and 100', value => {
          const num = Number(value);
          return num >= 0 && num <= 100;
        }),
    }),
    Doctorate: Yup.object().shape({
      universityName: Yup.string().required('University Name is required'),
      course: Yup.string().required('Course is required'),
      specialization: Yup.string().required('Specialization is required'),
      courseType: Yup.string().required('Course Type is required'),
      startingYear: Yup.string().required('Starting Year is required'),
      endingYear: Yup.string().required('Ending Year is required'),
      gradingSystem: Yup.string().required('Grading System is required'),
      marks: Yup.string().test(
        'is-required-based-on-grading-system',
        'Marks is required',
        function (value) {
          const {gradingSystem} = this.parent;
          return gradingSystem === 'Course Requires a Pass' || !!value;
        },
      ),
    }),
    'Post Graduate': Yup.object().shape({
      universityName: Yup.string().required('University Name is required'),
      course: Yup.string().required('Course is required'),
      specialization: Yup.string().required('Specialization is required'),
      courseType: Yup.string().required('Course Type is required'),
      startingYear: Yup.string().required('Starting Year is required'),
      endingYear: Yup.string().required('Ending Year is required'),
      gradingSystem: Yup.string().required('Grading System is required'),
      marks: Yup.string().test(
        'is-required-based-on-grading-system',
        'Marks is required',
        function (value) {
          const {gradingSystem} = this.parent;
          return gradingSystem === 'Course Requires a Pass' || !!value;
        },
      ),
    }),
    Graduate: Yup.object().shape({
      universityName: Yup.string().required('University Name is required'),
      course: Yup.string().required('Course is required'),
      specialization: Yup.string().required('Specialization is required'),
      courseType: Yup.string().required('Course Type is required'),
      startingYear: Yup.string().required('Starting Year is required'),
      endingYear: Yup.string().required('Ending Year is required'),
      gradingSystem: Yup.string().required('Grading System is required'),
      marks: Yup.string().test(
        'is-required-based-on-grading-system',
        'Marks is required',
        function (value) {
          const {gradingSystem} = this.parent;
          return gradingSystem === 'Course Requires a Pass' || !!value;
        },
      ),
    }),
  };

  const handleFormSubmit = values => {
    const data = {...values, courseType};
    if (editingIndex !== null) {
      const updatedData = [...savedData];
      updatedData[editingIndex] = {tab: activeTab, ...data};
      setSavedData(updatedData);
    } else {
      setSavedData(prevData => [...prevData, {tab: activeTab, ...data}]);
    }

    if (activeTab === 'Class X') {
      setClassXAdded(true);
    } else if (activeTab === 'Class XII') {
      setClassXIIAdded(true);
    }

    setEditingIndex(null);
    setActiveTab(null);
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      const updatedData = savedData.filter(
        (_, index) => index !== editingIndex,
      );
      setSavedData(updatedData);

      if (savedData[editingIndex].tab === 'Class X') {
        setClassXAdded(false);
      } else if (savedData[editingIndex].tab === 'Class XII') {
        setClassXIIAdded(false);
      }

      setEditingIndex(null);
      setModalVisible(false);
      setActiveTab(null);
    }
  };

  const handleEdit = (item, index) => {
    setActiveTab(item.tab);
    setCourseType(item.courseType);
    setModalVisible(true);
    setEditingIndex(index);
    setShowMarksInput(item.gradingSystem !== 'Course Requires a Pass'); // Set showMarksInput based on existing data

    if (formikRef) {
      formikRef.setValues(item);
    }
  };

  const handleCancel = () => {
    if (formikRef) {
      formikRef.resetForm();
    }
    setModalVisible(false);
    setActiveTab(null);
    setEditingIndex(null);
  };

  const toggleTab = tabName => {
    if (activeTab === tabName) {
      setActiveTab(null);
    } else {
      setActiveTab(tabName);
      setShowMarksInput(false); // Reset marks input visibility when switching tabs
    }
  };

  const getInitialValues = () => {
    if (editingIndex !== null) {
      return savedData[editingIndex];
    }
    return {
      board: '',
      schoolMedium: '',
      yearOfPassing: '',
      marks: '',
      englishMarks: '',
      mathMarks: '',
      universityName: '',
      course: '',
      specialization: '',
      startingYear: '',
      endingYear: '',
      gradingSystem: '',
      courseType: '',
    };
  };

  const handleGradingSystemChange = item => {
    formikRef.setFieldValue('gradingSystem', item.value);
    setShowMarksInput(item.value !== 'Course Requires a Pass');
  };

  const renderFormContent = formikProps => {
    formikRef = formikProps;
    const inputProps = {
      mode: 'outlined',
      textColor: '#333',
      outlineColor: 'lightgray',
      activeOutlineColor: 'gray',
      style: styles.input,
    };

    const renderConditionalText = (touched, error, noteText) => {
      if (touched && error) {
        return <Text style={styles.errorText}>{error}</Text>;
      } else {
        return <Text style={styles.noteText}>{noteText}</Text>;
      }
    };
    const renderErrorText = (touched, error) => {
      if (touched && error) {
        return <Text style={styles.errorText}>{error}</Text>;
      }
      return null;
    };

    const renderCourseTypeTabs = () => (
      <View style={styles.courseTypeContainer}>
        <Text
          style={[
            styles.courseTypeText,
            formikProps.errors.courseType && formikProps.touched.courseType
              ? styles.courseTypeTextError
              : {},
          ]}>
          Course Type*
        </Text>
        <View style={styles.courseTypeTabsContainer}>
          {['Full Time', 'Part Time', 'Correspondence/Distance Learning'].map(
            type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.courseTypeTab,
                  formikProps.values.courseType === type &&
                    styles.activeCourseTypeTab,
                ]}
                onPress={() => {
                  formikProps.setFieldValue('courseType', type);
                  setCourseType(type);
                }}>
                <Text
                  style={[
                    styles.courseTypeTabText,
                    formikProps.values.courseType === type &&
                      styles.activeCourseTypeTabText,
                  ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      </View>
    );
    switch (activeTab) {
      case 'Class XII':
        return (
          <>
            {/* Board Dropdown */}
            <TextInput
              label="Board"
              mode="outlined"
              {...inputProps}
              value={formikProps.values.board}
              onChangeText={text => handleBoardInputChange(text, formikProps)}
              onFocus={() => setDropdownVisible(true)} // Show dropdown on focus
              onBlur={() => setDropdownVisible(false)} // Hide dropdown on blur
            />

            {formikProps.errors.board && formikProps.touched.board && (
              <Text style={styles.errorText}>{formikProps.errors.board}</Text>
            )}

            {isDropdownVisible &&
              filteredBoardOptions &&
              filteredBoardOptions.length > 0 && (
                <View style={styles.dropdownContainer}>
                  {filteredBoardOptions.map(option => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        formikProps.setFieldValue('board', option);
                        setDropdownVisible(false); // Close dropdown on selection
                      }}
                      style={styles.dropdownItem}>
                      <Text style={styles.dropdownText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

            {/* School Medium Dropdown */}
            <TextInput
              placeholder="School Medium"
              {...inputProps}
              value={formikProps.values.schoolMedium}
              onChangeText={text =>
                handleSchoolMediumInputChange(text, formikProps)
              }
            />
            {filteredSchoolMediumOptions.length > 0 && (
              <View style={styles.dropdownContainer}>
                {filteredSchoolMediumOptions.map(option => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      formikProps.setFieldValue('schoolMedium', option);
                      setFilteredSchoolMediumOptions([]); // Hide dropdown after selection
                    }}
                    style={styles.dropdownItem}>
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {formikProps.errors.schoolMedium &&
              formikProps.touched.schoolMedium && (
                <Text style={styles.errorText}>
                  {formikProps.errors.schoolMedium}
                </Text>
              )}
            {renderErrorText(
              formikProps.touched.schoolMedium,
              formikProps.errors.schoolMedium,
            )}
            <View style={styles.YearOptionscontainer}>
              <Dropdown
                style={styles.dropdown}
                data={yearOptions}
                labelField="label"
                valueField="value"
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{color: '#000'}}
                placeholder="Year of Passing"
                value={formikProps.values.yearOfPassing}
                onChange={item =>
                  formikProps.setFieldValue('yearOfPassing', item.value)
                }
              />
            </View>
            {renderErrorText(
              formikProps.touched.yearOfPassing,
              formikProps.errors.yearOfPassing,
            )}
            <TextInput
              label="Marks"
              {...inputProps}
              onChangeText={formikProps.handleChange('marks')}
              onBlur={formikProps.handleBlur('marks')}
              value={formikProps.values.marks}
              keyboardType="numeric"
            />
            {renderConditionalText(
              formikProps.touched.marks,
              formikProps.errors.marks,
              '% marks of 100 maximum',
            )}
            <TextInput
              label="English Marks"
              {...inputProps}
              onChangeText={formikProps.handleChange('englishMarks')}
              onBlur={formikProps.handleBlur('englishMarks')}
              value={formikProps.values.englishMarks}
              keyboardType="numeric"
            />
            {renderConditionalText(
              formikProps.touched.englishMarks,
              formikProps.errors.englishMarks,
              'Marks out of 100',
            )}
            <TextInput
              label="Math Marks"
              {...inputProps}
              onChangeText={formikProps.handleChange('mathMarks')}
              onBlur={formikProps.handleBlur('mathMarks')}
              value={formikProps.values.mathMarks}
              keyboardType="numeric"
            />
            {renderConditionalText(
              formikProps.touched.mathMarks,
              formikProps.errors.mathMarks,
              'Marks out of 100',
            )}
          </>
        );
      case 'Class X':
        return (
          <>
            <TextInput
              label="Board"
              {...inputProps}
              onChangeText={formikProps.handleChange('board')}
              onBlur={formikProps.handleBlur('board')}
              value={formikProps.values.board}
            />
            {renderErrorText(
              formikProps.touched.board,
              formikProps.errors.board,
            )}
            <TextInput
              label="School Medium"
              {...inputProps}
              onChangeText={formikProps.handleChange('schoolMedium')}
              onBlur={formikProps.handleBlur('schoolMedium')}
              value={formikProps.values.schoolMedium}
            />
            {renderErrorText(
              formikProps.touched.schoolMedium,
              formikProps.errors.schoolMedium,
            )}
            <View style={styles.YearOptionscontainer}>
              <Dropdown
                style={styles.dropdown}
                data={yearOptions}
                labelField="label"
                valueField="value"
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{color: '#000'}}
                placeholder="Year of Passing"
                value={formikProps.values.yearOfPassing}
                onChange={item =>
                  formikProps.setFieldValue('yearOfPassing', item.value)
                }
              />
            </View>
            {renderErrorText(
              formikProps.touched.yearOfPassing,
              formikProps.errors.yearOfPassing,
            )}
            <TextInput
              label="Marks"
              {...inputProps}
              onChangeText={formikProps.handleChange('marks')}
              onBlur={formikProps.handleBlur('marks')}
              value={formikProps.values.marks}
              keyboardType="numeric"
            />
            {renderErrorText(
              formikProps.touched.marks,
              formikProps.errors.marks,
            )}
            <Text style={styles.noteText}>% marks of 100 maximum</Text>
          </>
        );
      case 'Doctorate':
      case 'Post Graduate':
      case 'Graduate':
        return (
          <>
            <TextInput
              label="University Name"
              {...inputProps}
              onChangeText={formikProps.handleChange('universityName')}
              onBlur={formikProps.handleBlur('universityName')}
              value={formikProps.values.universityName}
            />
            {renderErrorText(
              formikProps.touched.universityName,
              formikProps.errors.universityName,
            )}
            <TextInput
              label="Course"
              {...inputProps}
              onChangeText={formikProps.handleChange('course')}
              onBlur={formikProps.handleBlur('course')}
              value={formikProps.values.course}
            />
            {renderErrorText(
              formikProps.touched.course,
              formikProps.errors.course,
            )}
            <TextInput
              label="Specialization"
              {...inputProps}
              onChangeText={formikProps.handleChange('specialization')}
              onBlur={formikProps.handleBlur('specialization')}
              value={formikProps.values.specialization}
            />
            {renderErrorText(
              formikProps.touched.specialization,
              formikProps.errors.specialization,
            )}
            {renderCourseTypeTabs()}
            <TextInput
              label="Starting Year"
              {...inputProps}
              onChangeText={formikProps.handleChange('startingYear')}
              onBlur={formikProps.handleBlur('startingYear')}
              value={formikProps.values.startingYear}
              keyboardType="numeric"
            />
            {renderErrorText(
              formikProps.touched.startingYear,
              formikProps.errors.startingYear,
            )}
            <TextInput
              label="Ending Year"
              {...inputProps}
              onChangeText={formikProps.handleChange('endingYear')}
              onBlur={formikProps.handleBlur('endingYear')}
              value={formikProps.values.endingYear}
              keyboardType="numeric"
            />
            {renderErrorText(
              formikProps.touched.endingYear,
              formikProps.errors.endingYear,
            )}
            <View style={styles.YearOptionscontainer}>
              <Dropdown
                style={styles.dropdown}
                data={gradingSystemOptions}
                labelField="label"
                valueField="value"
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{color: '#000'}}
                placeholder="Grading System"
                value={formikProps.values.gradingSystem}
                onChange={handleGradingSystemChange}
              />
            </View>
            {renderErrorText(
              formikProps.touched.gradingSystem,
              formikProps.errors.gradingSystem,
            )}
            {showMarksInput && (
              <>
                <TextInput
                  label="Marks"
                  {...inputProps}
                  onChangeText={formikProps.handleChange('marks')}
                  onBlur={formikProps.handleBlur('marks')}
                  value={formikProps.values.marks}
                  keyboardType="numeric"
                />
                {renderErrorText(
                  formikProps.touched.marks,
                  formikProps.errors.marks,
                )}
                <Text style={styles.noteText}>% marks of 100 maximum</Text>
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PaperProvider>
      <View style={styles.mainContainer}>
        <View style={styles.editContainer}>
          <Text style={styles.outerheading}>Education</Text>
          <Text style={styles.AddButton} onPress={() => setModalVisible(true)}>
            Add
          </Text>
        </View>
        <ScrollView style={styles.savedDataContainer}>
          {savedData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleEdit(item, index)}>
              <View style={styles.savedDataItem}>
                {(item.tab === 'Class X' || item.tab === 'Class XII') && (
                  <Text style={styles.savedDataTitle}>{item.tab}</Text>
                )}

                {/* Individual Text components for each field */}
                {item.board && (
                  <Text style={styles.boardText}>{item.board}</Text>
                )}
                {/* {item.schoolMedium && (
                  <Text style={styles.schoolMediumText}>
                    School Medium: {item.schoolMedium}
                  </Text>
                )} */}
                {item.yearOfPassing && (
                  <Text style={styles.yearOfPassingText}>
                    {item.yearOfPassing}
                  </Text>
                )}
                {/* {item.marks && (
                  <Text style={styles.marksText}>Marks: {item.marks}</Text>
                )} */}
                <View style={styles.coursespecializationContainer}>
                  {item.course && (
                    <Text style={styles.coursespecializationText}>
                      {item.course}
                    </Text>
                  )}
                  {item.specialization && (
                    <Text style={styles.coursespecializationText}>
                      {item.specialization}
                    </Text>
                  )}
                </View>
                {item.universityName && (
                  <Text style={styles.universityNameText}>
                    {item.universityName}
                  </Text>
                )}
                <View style={styles.yearOptionsContainer}>
                  <View style={styles.yearOptionsTextContainer}>
                    {item.startingYear && (
                      <Text style={styles.yearOptionsText}>
                        {item.startingYear}-
                      </Text>
                    )}
                    {item.endingYear && (
                      <Text style={styles.yearOptionsText}>
                        {item.endingYear}
                      </Text>
                    )}
                  </View>
                  {item.courseType && (
                    <Text style={styles.yearOptionsText}>
                      {'\u2022'} {item.courseType}
                    </Text>
                  )}
                </View>
                {/* {item.gradingSystem && (
                  <Text style={styles.gradingSystemText}>
                    Grading System: {item.gradingSystem}
                  </Text>
                )} */}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={handleCancel}>
          <ScrollView contentContainerStyle={styles.modalContainer}>
            <Text style={styles.heading}>Education Details</Text>
            {activeTab ? (
              <TouchableOpacity
                style={[styles.tab, activeTab && styles.activeTabStyle]}
                onPress={() => toggleTab(activeTab)}>
                <Text style={styles.tabText}>{activeTab}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.tabsContainer}>
                {!classXIIAdded && (
                  <TouchableOpacity
                    style={styles.tab}
                    onPress={() => toggleTab('Class XII')}>
                    <Text style={styles.tabText}>Class XII</Text>
                  </TouchableOpacity>
                )}
                {!classXAdded && (
                  <TouchableOpacity
                    style={styles.tab}
                    onPress={() => toggleTab('Class X')}>
                    <Text style={styles.tabText}>Class X</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => toggleTab('Doctorate')}>
                  <Text style={styles.tabText}>Doctorate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => toggleTab('Post Graduate')}>
                  <Text style={styles.tabText}>Post Graduate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => toggleTab('Graduate')}>
                  <Text style={styles.tabText}>Graduate</Text>
                </TouchableOpacity>
              </View>
            )}

            {activeTab && (
              <Formik
                innerRef={ref => (formikRef = ref)}
                initialValues={getInitialValues()}
                validationSchema={validationSchemas[activeTab]}
                onSubmit={handleFormSubmit}>
                {formikProps => (
                  <View style={styles.formContainer}>
                    {renderFormContent(formikProps)}
                  </View>
                )}
              </Formik>
            )}
          </ScrollView>
          <View style={styles.modalFooter}>
            <View style={styles.modalbuttonContainer}>
              <Button
                onPress={() => formikRef?.handleSubmit()}
                labelStyle={GlobalStyle.savelabelStyle}>
                Save
              </Button>
              <Button
                onPress={handleCancel}
                labelStyle={GlobalStyle.closelabelStyle}>
                Cancel
              </Button>
            </View>
            <View>
              {editingIndex !== null && (
                <IconButton
                  icon="delete"
                  iconColor="#ff0000"
                  size={24}
                  onPress={handleDelete}
                  style={styles.iconButtonStyle}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 12,
    backgroundColor: '#00334d',
    borderRadius: 8,
  },
  editContainer: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  outerheading: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  AddButton: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  savedDataContainer: {
    marginTop: 16,
  },
  savedDataItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  savedDataTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  boardText: {
    fontSize: 16,
    color: '#f2f2f2',
  },
  yearOfPassingText: {
    fontSize: 12,
    color: '#d9d9d9',
  },
  coursespecializationContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  coursespecializationText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  universityNameText: {
    fontSize: 16,
    color: '#f2f2f2',
  },
  yearOptionsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  yearOptionsTextContainer: {
    flexDirection: 'row',
  },
  yearOptionsText: {
    fontSize: 12,
    color: '#d9d9d9',
  },
  savedDataText: {
    color: '#555',
  },
  modalContainer: {
    flexGrow: 1,
    padding: 16,
  },
  heading: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tab: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  activeTabStyle: {
    backgroundColor: '#e0e0e0', // Active background color
    alignSelf: 'flex-start',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  formContainer: {},
  input: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
    marginVertical: 12,
  },
  YearOptionscontainer: {
    marginBottom: 12,
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  noteText: {
    fontSize: 12,
    color: '#888',
    marginTop: -5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  dropdownContainer: {
    position: 'static',
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    // zIndex: 10,
    // width: '100%',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  modalFooter: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    borderTopColor: '#d9d9d9',
    borderTopWidth: 1,
    marginHorizontal: 12,
  },
  modalbuttonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  courseTypeContainer: {
    flexDirection: 'column',
  },
  courseTypeTabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  courseTypeTextError: {
    color: 'red', // Error color when validation fails
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseTypeTab: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    flexWrap: 'wrap',
    marginRight: 12,
    marginTop: 8,
  },
  activeCourseTypeTab: {
    backgroundColor: '#007BFF',
  },
  courseTypeTabText: {
    fontSize: 14,
    color: '#333',
  },
  activeCourseTypeTabText: {
    color: '#fff',
  },
});
