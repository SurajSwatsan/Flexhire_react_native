import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ReusableTextInput from '../../Constant/CustomTextInput';
import ModalFooter from '../../Constant/ProfileModalFooter';
import {colors} from '../../Global_CSS/TheamColors';
import profileStyle from './ProfileStyle';

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
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>Basic details</Text>
        <IconButton
          icon="lead-pencil"
          iconColor={colors.blackText}
          size={18}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>

      {submittedData ? (
        <TouchableOpacity
          onPress={handleEdit}
          style={profileStyle.userDataContainer}>
          <Text style={profileStyle.submittedDataText}>Submitted Data:</Text>
          <Text>Work Status: {submittedData.workStatus}</Text>
          <Text>Current City: {submittedData.currentCity}</Text>
          <Text>Mobile Number: {submittedData.mobileNumber}</Text>
          <Text>Email: {submittedData.email}</Text>
          {submittedData.workStatus === 'Experienced' && (
            <>
              <Text>Experience (Years): {submittedData.experienceYears}</Text>
              <Text>Experience (Months): {submittedData.experienceMonths}</Text>
              <Text>Annual Salary: {submittedData.annualSalary}</Text>
              <Text>Salary Breakdown: {submittedData.salaryBreakdown}</Text>
            </>
          )}
          <Text>Availability to Join: {submittedData.availability}</Text>
        </TouchableOpacity>
      ) : (
        <View style={profileStyle.userDataContainer}>
          <Text style={profileStyle.optionalData}>No submitted data</Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalContainer}>
          <ScrollView contentContainerStyle={profileStyle.ScrollViewContent}>
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
                <View style={profileStyle.formContainer}>
                  <View style={profileStyle.formHeadCon}>
                    <Text style={profileStyle.formHeading}>Basic Details</Text>
                    <Text style={profileStyle.formSubHeading}>
                      Basic Details
                    </Text>
                  </View>
                  <View style={profileStyle.TabContainer}>
                    {['Fresher', 'Experienced'].map(status => (
                      <TouchableOpacity
                        key={status}
                        style={[
                          profileStyle.tabBtnStyle,
                          values.workStatus === status
                            ? profileStyle.selectedTab
                            : profileStyle.unselectedTab,
                        ]}
                        onPress={() => setFieldValue('workStatus', status)}>
                        <Text
                          style={[
                            profileStyle.tabBtnText,
                            values.workStatus === status
                              ? profileStyle.selectedTabText
                              : profileStyle.unselectedTabText,
                          ]}>
                          {status}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <ReusableTextInput name="currentCity" label="Current City*" />
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

                  <Text style={profileStyle.label}>Availability to Join*</Text>
                  <View style={profileStyle.TabContainer}>
                    {AVAILABILITY_OPTIONS.map(option => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          profileStyle.tabBtnStyle,
                          values.availability === option
                            ? profileStyle.selectedTab
                            : profileStyle.unselectedTab,
                        ]}
                        onPress={() => setFieldValue('availability', option)}>
                        <Text
                          style={[
                            profileStyle.tabBtnText,
                            values.availability === option
                              ? profileStyle.selectedTabText
                              : profileStyle.unselectedTabText,
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
      </Modal>
    </View>
  );
};

const Style = StyleSheet.create({
  Text: {
    color: colors.blackText,
  },
});

export default BasicDetails;
