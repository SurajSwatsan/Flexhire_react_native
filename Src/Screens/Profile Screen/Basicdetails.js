import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';

const validationSchema = Yup.object().shape({
  workStatus: Yup.string().required('Work Status is required'),
  currentCity: Yup.string().required('Current City is required'),
  mobileNumber: Yup.string().required('Mobile Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  availability: Yup.string().when('workStatus', {
    is: 'availability',
    then: Yup.string().required('Availability to join is required'),
  }),
  experienceYears: Yup.number().when('workStatus', {
    is: 'Experienced',
    then: Yup.number().required('Experience in years is required'),
  }),
  experienceMonths: Yup.number().when('workStatus', {
    is: 'Experienced',
    then: Yup.number().required('Experience in months is required'),
  }),
  annualSalary: Yup.number().when('workStatus', {
    is: 'Experienced',
    then: Yup.number().required('Annual salary is required'),
  }),
  salaryBreakdown: Yup.string().when('workStatus', {
    is: 'Experienced',
    then: Yup.string().required('Salary breakdown is required'),
  }),
});

const Basicdetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [workStatus, setWorkStatus] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [availability, setAvailability] = useState('');
  const [annualSalary, setAnnualSalary] = useState('');
  const [experienceYears, setExperianceYears] = useState('');
  const [experienceMonths, setExperianceMonths] = useState('');
  const [salaryBreakdown, setSalaryBreakdown] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleFormSubmit = values => {
    setWorkStatus(values.workStatus);
    setCurrentCity(values.currentCity);
    setMobileNumber(values.mobileNumber);
    setEmail(values.email);
    setAvailability(values.availability);
    setAnnualSalary(values.annualSalary);
    setExperianceYears(values.experienceYears);
    setExperianceMonths(values.experienceMonths);
    setSalaryBreakdown(values.salaryBreakdown);

    closeModal();
    // Handle form submission (e.g., save data)
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <Text style={styles.heading}>Basic details</Text>
        <IconButton
          icon="lead-pencil"
          iconColor="#f2f2f2"
          size={18}
          onPress={openModal}
          style={styles.iconButton}
        />
      </View>
      <View style={styles.displayContainer}>
        <View style={styles.displayDataContainer}>
          <Ionicons name="briefcase" size={16} style={styles.iconStyles} />
          <Text style={styles.submitedData}>{workStatus}</Text>
        </View>
        <View style={styles.displayDataContainer}>
          <Ionicons name="location" size={16} style={styles.iconStyles} />
          <Text style={styles.submitedData}>{currentCity}</Text>
        </View>
        <View style={styles.displayDataContainer}>
          <Ionicons name="mail" size={16} style={styles.iconStyles} />
          <Text style={styles.submitedData}>{email}</Text>
        </View>
        <View style={styles.displayDataContainer}>
          <Ionicons name="call" size={16} style={styles.iconStyles} />
          <Text style={styles.submitedData}>{mobileNumber}</Text>
        </View>
        <View style={styles.displayDataContainer}>
          <Ionicons name="calendar" size={16} style={styles.iconStyles} />
          <Text style={styles.submitedData}>{availability}</Text>
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
              <View>
                <Text style={styles.heading}>Introduction</Text>
                <Text style={styles.headingText1}>Work Status</Text>
                <Text style={styles.headingText2}>
                  We will personalise your Flexhire experiance based on this
                </Text>
              </View>
              <Formik
                initialValues={{
                  workStatus: workStatus, // Set initial value to 'Fresher'
                  currentCity: currentCity,
                  mobileNumber: mobileNumber,
                  email: email,
                  availability: availability,
                  experienceYears: experienceYears,
                  experienceMonths: experienceMonths,
                  annualSalary: annualSalary,
                  salaryBreakdown: salaryBreakdown,
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.container}>
                    <View style={styles.workStatusContainer}>
                      <TouchableOpacity
                        style={[
                          styles.statusButton,
                          values.workStatus === 'Fresher'
                            ? styles.selectedButton
                            : styles.unselectedButton,
                        ]}
                        onPress={() => handleChange('workStatus')('Fresher')}>
                        <Text
                          style={[
                            styles.statusText,
                            values.workStatus === 'Fresher'
                              ? styles.selectedText
                              : styles.unselectedText,
                          ]}>
                          Fresher
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.statusButton,
                          values.workStatus === 'Experienced'
                            ? styles.selectedButton
                            : styles.unselectedButton,
                        ]}
                        onPress={() =>
                          handleChange('workStatus')('Experienced')
                        }>
                        <Text
                          style={[
                            styles.statusText,
                            values.workStatus === 'Experienced'
                              ? styles.selectedText
                              : styles.unselectedText,
                          ]}>
                          Experienced
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {errors.workStatus && touched.workStatus && (
                      <Text style={styles.error}>{errors.workStatus}</Text>
                    )}

                    <TextInput
                      mode="outlined"
                      label="Current City*"
                      style={styles.input}
                      textColor="#333"
                      outlineColor="lightgray"
                      activeOutlineColor="gray"
                      onChangeText={handleChange('currentCity')}
                      onBlur={handleBlur('currentCity')}
                      value={values.currentCity}
                    />
                    {errors.currentCity && touched.currentCity && (
                      <Text style={styles.error}>{errors.currentCity}</Text>
                    )}

                    <TextInput
                      mode="outlined"
                      label="Mobile Number*"
                      style={styles.input}
                      textColor="#333"
                      outlineColor="lightgray"
                      activeOutlineColor="gray"
                      onChangeText={handleChange('mobileNumber')}
                      onBlur={handleBlur('mobileNumber')}
                      value={values.mobileNumber}
                      keyboardType="numeric"
                    />
                    {errors.mobileNumber && touched.mobileNumber && (
                      <Text style={styles.error}>{errors.mobileNumber}</Text>
                    )}

                    <TextInput
                      mode="outlined"
                      label="Email*"
                      style={styles.input}
                      textColor="#333"
                      outlineColor="lightgray"
                      activeOutlineColor="gray"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}

                    {values.workStatus === 'Experienced' && (
                      <>
                        <TextInput
                          mode="outlined"
                          label="Experience (Years)*"
                          style={styles.input}
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('experienceYears')}
                          onBlur={handleBlur('experienceYears')}
                          value={values.experienceYears}
                          keyboardType="numeric"
                        />
                        {errors.experienceYears && touched.experienceYears && (
                          <Text style={styles.error}>
                            {errors.experienceYears}
                          </Text>
                        )}

                        <TextInput
                          mode="outlined"
                          label="Experience (Months)*"
                          style={styles.input}
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('experienceMonths')}
                          onBlur={handleBlur('experienceMonths')}
                          value={values.experienceMonths}
                          keyboardType="numeric"
                        />
                        {errors.experienceMonths &&
                          touched.experienceMonths && (
                            <Text style={styles.error}>
                              {errors.experienceMonths}
                            </Text>
                          )}

                        <TextInput
                          mode="outlined"
                          label="Annual Salary*"
                          style={styles.input}
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('annualSalary')}
                          onBlur={handleBlur('annualSalary')}
                          value={values.annualSalary}
                          keyboardType="numeric"
                        />
                        {errors.annualSalary && touched.annualSalary && (
                          <Text style={styles.error}>
                            {errors.annualSalary}
                          </Text>
                        )}

                        <TextInput
                          mode="outlined"
                          label="Salary Breakdown*"
                          style={styles.input}
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('salaryBreakdown')}
                          onBlur={handleBlur('salaryBreakdown')}
                          value={values.salaryBreakdown}
                          placeholder="Fixed / Fixed + Variable"
                        />
                        {errors.salaryBreakdown && touched.salaryBreakdown && (
                          <Text style={styles.error}>
                            {errors.salaryBreakdown}
                          </Text>
                        )}
                      </>
                    )}

                    <View>
                      <Text style={styles.label}>Availability to Join*</Text>
                      <View style={styles.availabilityContainer}>
                        {[
                          '15 days',
                          '1 month',
                          '2 months',
                          '3 months',
                          'more than 3 months',
                        ].map(option => (
                          <TouchableOpacity
                            key={option}
                            style={[
                              styles.availabilityButton,
                              values.availability === option
                                ? styles.selectedAvailabilityButton
                                : styles.unselectedAvailabilityButton,
                            ]}
                            onPress={() =>
                              handleChange('availability')(option)
                            }>
                            <Text
                              style={[
                                styles.availabilityText,
                                values.availability === option
                                  ? styles.selectedAvailabilityText
                                  : styles.unselectedAvailabilityText,
                              ]}>
                              {option}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                      {errors.availability && touched.availability && (
                        <Text style={styles.error}>{errors.availability}</Text>
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
    borderRadius: 8,
    backgroundColor: '#00334d',
  },
  editContainer: {
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  iconButton: {},
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
    fontSize: 18,
    color: '#000',
    marginVertical: 12,
    fontWeight: 'bold',
  },
  displayContainer: {
    marginLeft: 12,
    marginBottom: 12,
  },
  iconStyles: {
    color: '#f2f2f2',
  },
  submitedData: {
    color: '#fff',
  },
  displayDataContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  headingText1: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
    fontWeight: 'bold',
  },
  headingText2: {
    fontSize: 14,
    color: '#333',
    marginVertical: 4,
  },

  container: {
    marginVertical: 8,
  },
  label: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  workStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
  },
  statusButton: {
    // flex: 1,
    marginRight: 12,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#4caf50', // Change color for selected
  },
  unselectedButton: {
    backgroundColor: '#333', // Change color for unselected
  },
  statusText: {
    fontSize: 16,
  },
  selectedText: {
    color: '#fff', // Text color for selected
  },
  unselectedText: {
    color: '#fff', // Text color for unselected
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48, // Ensures the input field always has at least this height
    borderRadius: 8,
    marginVertical: 12,
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  availabilityButton: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  selectedAvailabilityButton: {
    backgroundColor: '#4caf50', // Change color for selected
  },
  unselectedAvailabilityButton: {
    backgroundColor: '#333', // Change color for unselected
  },
  availabilityText: {
    fontSize: 16,
  },
  selectedAvailabilityText: {
    color: '#fff', // Text color for selected
  },
  unselectedAvailabilityText: {
    color: '#fff', // Text color for unselected
  },
});

export default Basicdetails;
