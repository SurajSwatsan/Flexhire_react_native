import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ReusableTextInput from '../ReusableComponents/ReusableTextInput';
import ModalFooter from '../ReusableComponents/ProfileModalFooter';

const screenWidth = Dimensions.get('window').width;
const horizontalMargin = 12 * 2; // Total margin (left + right)

const effectiveWidth = screenWidth - horizontalMargin;
const AVAILABILITY_OPTIONS = [
  '15 days',
  '1 month',
  '2 months',
  '3 months',
  'more than 3 months',
];

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

const BasicDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  let formikRef = null;

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null); // Reset editing state when modal closes
  };

  const handleFormSubmit = values => {
    setSubmittedData(values);
    closeModal();
  };

  const handleEdit = () => {
    setEditingIndex(0); // Set editing mode with an arbitrary index
    openModal();
  };

  const handleDelete = () => {
    setSubmittedData(null);
    closeModal();
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

      {submittedData ? (
        <View style={styles.submittedDataContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.submittedDataText}>Submitted Data:</Text>
            <Text>Work Status: {submittedData.workStatus}</Text>
            <Text>Current City: {submittedData.currentCity}</Text>
            <Text>Mobile Number: {submittedData.mobileNumber}</Text>
            <Text>Email: {submittedData.email}</Text>
            {submittedData.workStatus === 'Experienced' && (
              <>
                <Text>Experience (Years): {submittedData.experienceYears}</Text>
                <Text>
                  Experience (Months): {submittedData.experienceMonths}
                </Text>
                <Text>Annual Salary: {submittedData.annualSalary}</Text>
                <Text>Salary Breakdown: {submittedData.salaryBreakdown}</Text>
              </>
            )}
            <Text>Availability to Join: {submittedData.availability}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.submittedDataContainer}>
          <Text>No submitted data</Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Formik
                initialValues={{
                  workStatus:
                    editingIndex !== null ? submittedData.workStatus : '',
                  currentCity:
                    editingIndex !== null ? submittedData.currentCity : '',
                  mobileNumber:
                    editingIndex !== null ? submittedData.mobileNumber : '',
                  email: editingIndex !== null ? submittedData.email : '',
                  availability:
                    editingIndex !== null ? submittedData.availability : '',
                  experienceYears:
                    editingIndex !== null ? submittedData.experienceYears : '',
                  experienceMonths:
                    editingIndex !== null ? submittedData.experienceMonths : '',
                  annualSalary:
                    editingIndex !== null ? submittedData.annualSalary : '',
                  salaryBreakdown:
                    editingIndex !== null ? submittedData.salaryBreakdown : '',
                }}
                validationSchema={validationSchema}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({handleChange, handleSubmit, values, setFieldValue}) => (
                  <View style={styles.container}>
                    <View style={styles.headingContainer}>
                      <Text style={styles.heading}>Basic Details</Text>
                    </View>
                    <View style={styles.workStatusContainer}>
                      {['Fresher', 'Experienced'].map(status => (
                        <TouchableOpacity
                          key={status}
                          style={[
                            styles.statusButton,
                            values.workStatus === status
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => setFieldValue('workStatus', status)}>
                          <Text
                            style={[
                              styles.statusText,
                              values.workStatus === status
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            {status}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <ReusableTextInput
                      name="currentCity"
                      label="Current City*"
                    />
                    <ReusableTextInput
                      name="mobileNumber"
                      label="Mobile Number*"
                      keyboardType="numeric"
                    />
                    <ReusableTextInput name="email" label="Email*" />

                    {values.workStatus === 'Experienced' && (
                      <>
                        <ReusableTextInput
                          name="experienceYears"
                          label="Experience (Years)*"
                          keyboardType="numeric"
                        />
                        <ReusableTextInput
                          name="experienceMonths"
                          label="Experience (Months)*"
                          keyboardType="numeric"
                        />
                        <ReusableTextInput
                          name="annualSalary"
                          label="Annual Salary*"
                          keyboardType="numeric"
                        />
                        <ReusableTextInput
                          name="salaryBreakdown"
                          label="Salary Breakdown*"
                          placeholder="Fixed / Fixed + Variable"
                        />
                      </>
                    )}

                    <Text style={styles.label}>Availability to Join*</Text>
                    <View style={styles.availabilityContainer}>
                      {AVAILABILITY_OPTIONS.map(option => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.availabilityButton,
                            values.availability === option
                              ? styles.selectedAvailabilityButton
                              : styles.unselectedAvailabilityButton,
                          ]}
                          onPress={() => setFieldValue('availability', option)}>
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
                  </View>
                )}
              </Formik>
            </ScrollView>
            <ModalFooter
              onPress={() => formikRef?.handleSubmit()}
              onCancel={closeModal}
              onDelete={handleDelete}
              showDelete={editingIndex !== null}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const sharedButtonStyles = {
  padding: 12,
  alignItems: 'center',
  borderRadius: 8,
};

const styles = StyleSheet.create({
  mainContainer: {
    width: effectiveWidth,
    borderRadius: 8,
    backgroundColor: '#00334d',
  },
  editContainer: {
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submittedDataContainer: {
    marginHorizontal: 12,
    marginBottom: 12,
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
    fontSize: 18,
    color: '#fff',
    marginVertical: 12,
    fontWeight: 'bold',
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
    marginVertical: 8,
  },
  statusButton: {
    ...sharedButtonStyles,
    marginRight: 12,
  },
  selectedButton: {
    backgroundColor: '#4caf50',
  },
  unselectedButton: {
    backgroundColor: '#333',
  },
  statusText: {
    fontSize: 16,
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#fff',
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  availabilityButton: {
    ...sharedButtonStyles,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  selectedAvailabilityButton: {
    backgroundColor: '#4caf50',
  },
  unselectedAvailabilityButton: {
    backgroundColor: '#333',
  },
  availabilityText: {
    fontSize: 16,
  },
  selectedAvailabilityText: {
    color: '#fff',
  },
  unselectedAvailabilityText: {
    color: '#fff',
  },
});

export default BasicDetails;
