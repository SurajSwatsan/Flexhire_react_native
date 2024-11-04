import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton, Chip, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

import {Dropdown} from 'react-native-element-dropdown';

const Careerpreferences = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [preferredJobrole, setPreferredJobrole] = useState([]);
  const [preferredCities, setPreferredCities] = useState([]);
  const [expectedSalary, setExpectedSalary] = useState('');
  const [currency, setCurrency] = useState('INR'); // State for currency
  const currencies = [
    {label: '$', value: 'USD'},
    {label: '₹', value: 'INR'},
  ];

  const [jobType, setJobType] = useState([]);
  const [employementType, setEmployementType] = useState([]);
  const [preferredShift, setPreferredShift] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    expectedSalary: Yup.number()
      .typeError('Expected a number')
      .required('Expected annual salary is required')
      .positive('Salary must be positive'),
  });

  const addJobRole = jobRole => {
    if (
      preferredJobrole.length < 3 &&
      jobRole &&
      !preferredJobrole.includes(jobRole)
    ) {
      setPreferredJobrole([...preferredJobrole, jobRole]);
    }
  };

  const addCity = city => {
    if (city && !preferredCities.includes(city)) {
      setPreferredCities([...preferredCities, city]);
    }
  };

  const toggleSelectionofjobType = (value, values, setFieldValue) => {
    const updatedSelection = values.jobType.includes(value)
      ? values.jobType.filter(item => item !== value)
      : [...values.jobType, value];
    setFieldValue('jobType', updatedSelection);
  };
  const toggleSelectionofemployementType = (value, values, setFieldValue) => {
    const updatedSelection = values.employementType.includes(value)
      ? values.employementType.filter(item => item !== value)
      : [...values.employementType, value];
    setFieldValue('employementType', updatedSelection);
  };

  const handleSubmitData = values => {
    setExpectedSalary(values.expectedSalary);
    setJobType(values.jobType);
    setEmployementType(values.employementType);
    setPreferredShift(values.preferredShift);
    closeModal();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayheading}>Your Career Preferences</Text>
        </View>

        <IconButton
          icon="lead-pencil"
          iconColor="#f2f2f2"
          size={18}
          onPress={openModal}
          style={styles.iconButton}
        />
      </View>

      <View style={styles.outputdata}>
        <View>
          <View style={{marginBottom: 8}}>
            <Text style={styles.displayText}>Preferred Job Roles</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              {preferredJobrole.length > 0
                ? `${
                    preferredJobrole.join(', ').length > 20
                      ? preferredJobrole.join(', ').substring(0, 20) + '...'
                      : preferredJobrole.join(', ')
                  }`
                : 'None selected'}
            </Text>
          </View>
          <View style={{marginBottom: 8}}>
            <Text style={styles.displayText}>Preferred Cities</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              {preferredCities.length > 0
                ? `${
                    preferredCities.join(', ').length > 20
                      ? preferredCities.join(', ').substring(0, 20) + '...'
                      : preferredCities.join(', ')
                  }`
                : 'None selected'}
            </Text>
          </View>
          <View style={{marginBottom: 8}}>
            <Text style={styles.displayText}>Expected Annual Salary</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              {expectedSalary
                ? `${currency} ${expectedSalary}`
                : 'None selected'}
            </Text>
          </View>
        </View>

        <View>
          <View style={{marginBottom: 8}}>
            <Text style={styles.displayText}>Job Type</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              {jobType.length > 0
                ? `${
                    jobType.join(', ').length > 20
                      ? jobType.join(', ').substring(0, 20) + '...'
                      : jobType.join(', ')
                  }`
                : 'None selected'}
            </Text>
          </View>
          <View style={{marginBottom: 8}}>
            <Text style={styles.displayText}>Employment Type</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              {employementType.length > 0
                ? `${
                    employementType.join(', ').length > 20
                      ? employementType.join(', ').substring(0, 20) + '...'
                      : employementType.join(', ')
                  }`
                : 'None selected'}
            </Text>
          </View>
          <View style={{marginBottom: 8}}>
            <Text style={styles.displayText}>Preferred Shift</Text>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
              {preferredShift || 'None selected'}
            </Text>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.heading}>Career Preferences</Text>
              <Text style={styles.subText1}>
                Add your preferred job roles, cities, and expected salary.
              </Text>

              <Formik
                initialValues={{
                  expectedSalary: expectedSalary,
                  preferredJobrole: '',
                  city: '',
                  currency: currency,
                  jobType: jobType,
                  employementType: employementType,
                  preferredShift: preferredShift,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmitData}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    {/* Input for adding job role */}
                    <View style={styles.inputcontainer}>
                      <TextInput
                        mode="outlined"
                        label="Preferred job role (up to3)*"
                        style={styles.input}
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('preferredJobrole')}
                        onBlur={handleBlur('preferredJobrole')}
                        value={values.preferredJobrole}
                        right={
                          <TextInput.Icon
                            icon="plus-circle-outline"
                            color="gray"
                            onPress={() => {
                              addJobRole(values.preferredJobrole); // Add job role when icon is pressed
                              handleChange('preferredJobrole')(''); // Clear input field
                            }}
                          />
                        }
                      />
                    </View>

                    {/* Display job role chips */}
                    <View style={styles.chipContainer}>
                      {preferredJobrole.map((role, index) => (
                        <Chip
                          key={index}
                          mode="outlined"
                          onClose={() =>
                            setPreferredJobrole(
                              preferredJobrole.filter((_, i) => i !== index),
                            )
                          }
                          style={styles.chip}>
                          {role}
                        </Chip>
                      ))}
                    </View>

                    {/* Input for adding preferred city */}
                    <View style={styles.inputcontainer}>
                      <TextInput
                        mode="outlined"
                        label="Preferred City"
                        style={styles.input}
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        value={values.city}
                        right={
                          <TextInput.Icon
                            icon="plus-circle-outline"
                            color="gray"
                            onPress={() => {
                              addCity(values.city); // Add city when icon is pressed
                              handleChange('city')(''); // Clear input field
                            }}
                          />
                        }
                      />
                    </View>

                    {/* Display city chips */}
                    <View style={styles.chipContainer}>
                      {preferredCities.map((city, index) => (
                        <Chip
                          key={index}
                          mode="outlined"
                          onClose={() =>
                            setPreferredCities(
                              preferredCities.filter((_, i) => i !== index),
                            )
                          }
                          style={styles.chip}>
                          {city}
                        </Chip>
                      ))}
                    </View>

                    {/* Input for expected annual salary with currency dropdown */}
                    <View style={styles.salaryContainer}>
                      <View style={styles.container}>
                        <Dropdown
                          style={styles.dropdown}
                          data={currencies}
                          labelField="label"
                          valueField="value"
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          itemTextStyle={{color: '#000'}}
                          placeholder="Select an option"
                          textColor="#000"
                          value={currency}
                          onChange={item => {
                            setCurrency(item.value);
                          }}
                        />
                      </View>
                      <TextInput
                        mode="outlined"
                        label="Expected Annual Salary"
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        value={values.expectedSalary}
                        onChangeText={handleChange('expectedSalary')}
                        onBlur={handleBlur('expectedSalary')}
                        keyboardType="numeric"
                        style={[styles.salaryInput, styles.input]}
                      />
                    </View>
                    {errors.expectedSalary && touched.expectedSalary && (
                      <Text style={styles.errorText}>
                        {errors.expectedSalary}
                      </Text>
                    )}

                    <View style={{marginVertical: 12}}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Job type
                      </Text>

                      <View style={styles.jobTypeContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.jobType.includes('Permanent')
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelectionofjobType(
                              'Permanent',
                              values,
                              setFieldValue,
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.jobType.includes('Permanent')
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Permanent
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.jobType.includes('Contractual')
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelectionofjobType(
                              'Contractual',
                              values,
                              setFieldValue,
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.jobType.includes('Contractual')
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Contractual
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{marginVertical: 12}}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        Employement type
                      </Text>

                      <View style={styles.jobTypeContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.employementType.includes('Full-Time')
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelectionofemployementType(
                              'Full-Time',
                              values,
                              setFieldValue,
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.employementType.includes('Full-Time')
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Full-Time
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.employementType.includes('Part-Time')
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelectionofemployementType(
                              'Part-Time',
                              values,
                              setFieldValue,
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.employementType.includes('Part-Time')
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Part-Time
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Preferred shift
                      </Text>
                      <View style={styles.preferredShiftContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.preferredShift === 'Day'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => handleChange('preferredShift')('Day')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.preferredShift === 'Day'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Day
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.preferredShift === 'Night'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('preferredShift')('Night')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.preferredShift === 'Night'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Night
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.preferredShift === 'Flexible'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('preferredShift')('Flexible')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.preferredShift === 'Flexible'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Flexible
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {errors.preferredShift && touched.preferredShift && (
                        <Text style={styles.error}>
                          {errors.preferredShift}
                        </Text>
                      )}
                    </View>

                    <Button
                      onPress={handleSubmit}
                      labelStyle={GlobalStyle.labelStyle}>
                      Submit
                    </Button>
                  </>
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
  displayheading: {
    margin: 12,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  outputdata: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 12,
  },
  iconButton: {},
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
    marginVertical: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    backgroundColor: '#fff',
    color: '#000',
    margin: 4,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    gap: 4,
  },
  salaryInput: {
    flex: 1,
  },

  dropdownText: {
    alignSelf: 'center',
    fontSize: 12,
    color: '#333',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: 'lightgray',
  },
  dropdownItem: {
    color: '#000',
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  dropdownItemText: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  dropdown: {
    width: 80,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
  itemContainer: {
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  itemText: {
    color: '#000',
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    color: '#000',
    fontSize: 16,
  },

  statusButton: {
    marginTop: 8,
    marginRight: 12,
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#4caf50',
  },
  unselectedButton: {
    backgroundColor: '#333',
  },
  statusText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#fff',
  },
  jobTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  employementTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  preferredShiftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  displayText: {
    marginVertical: 4,
    fontSize: 12,
    color: '#f2f2f2',
  },
});

export default Careerpreferences;
