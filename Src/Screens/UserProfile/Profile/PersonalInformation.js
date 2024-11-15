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
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ReusableTextInput from '../../../Constant/CustomTextInput';
import ModalFooter from '../../../Constant/ProfileModalFooter';
import profileStyle from '../ProfileStyle';
import {colors} from '../../../Global_CSS/TheamColors';
import ReusableDatePicker from '../../../Constant/CustomDatePicker';
import CustomMultiSelectDrop from '../../../Constant/Data/CustomMultiselectDrop';

// Gender options
const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const Citys = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

// Validation schema for form validation using Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric values allowed')
    .required('Phone Number is required'),
  DOB: Yup.date().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  currentLocation: Yup.string().required('Current Location is required'),
  selectedLocations: Yup.array().min(1, 'Please select at least one location'), // Validation for multi-select
});

const PersonalInformation = () => {
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
        <Text style={profileStyle.heading}>PERSONAL INFORMATION</Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor={colors.blackText}
          size={20}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>

      {/* Conditionally render submitted data or a message if none */}
      {submittedData ? (
        <TouchableOpacity
          onPress={handleEdit}
          style={profileStyle.userDataContainer}>
          <Text style={{color: '#000'}}>Submitted Data:</Text>
          <Text style={{color: '#000'}}>
            Full Name: {submittedData.fullName}
          </Text>
          <Text style={{color: '#000'}}>Email: {submittedData.email}</Text>
          <Text style={{color: '#000'}}>
            Phone Number: {submittedData.phoneNumber}
          </Text>
          <Text style={{color: '#000'}}>
            DOB: {submittedData.DOB.toLocaleDateString()}
          </Text>
          <Text style={{color: '#000'}}>Gender: {submittedData.gender}</Text>
          <Text style={{color: '#000'}}>
            Current Location: {submittedData.currentLocation}
          </Text>
          <Text style={{color: '#000'}}>
            Preferred Locations: {submittedData.selectedLocations?.join(', ')}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={profileStyle.userDataContainer}>
          <Text style={profileStyle.optionalData}>No submitted data</Text>
        </View>
      )}

      {/* Modal for editing or adding personal information */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalContainer}>
          <ScrollView contentContainerStyle={profileStyle.ScrollViewContent}>
            <Formik
              initialValues={{
                fullName: editingIndex !== null ? submittedData.fullName : '',
                email: editingIndex !== null ? submittedData.email : '',
                phoneNumber:
                  editingIndex !== null ? submittedData.phoneNumber : '',
                DOB: editingIndex !== null ? submittedData.DOB : new Date(),
                gender: editingIndex !== null ? submittedData.gender : '',
                currentLocation:
                  editingIndex !== null ? submittedData.currentLocation : '',
                selectedLocations:
                  editingIndex !== null ? submittedData.selectedLocations : [],
              }}
              validationSchema={validationSchema}
              innerRef={ref => (formikRef = ref)}
              onSubmit={handleFormSubmit}>
              {({handleChange, handleSubmit, values, setFieldValue}) => (
                <View style={profileStyle.formContainer}>
                  <View style={profileStyle.formHeadCon}>
                    <Text style={profileStyle.formHeading}>
                      PERSONAL INFORMATION
                    </Text>
                  </View>

                  {/* Form Fields */}
                  <ReusableTextInput
                    name="fullName"
                    label="Full Name*"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                  />
                  <ReusableTextInput
                    name="email"
                    label="Email Id*"
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />
                  <ReusableTextInput
                    name="phoneNumber"
                    label="Phone Number*"
                    value={values.phoneNumber}
                    keyboardType="numeric"
                    onChangeText={handleChange('phoneNumber')}
                  />
                  <ReusableDatePicker
                    label="Date of Birth*"
                    value={values.DOB}
                    onChange={date => setFieldValue('DOB', date)}
                  />
                  <Text style={profileStyle.label}>Gender*</Text>
                  <View style={profileStyle.TabContainer}>
                    {GENDER_OPTIONS.map(option => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          profileStyle.tabBtnStyle,
                          values.gender === option
                            ? profileStyle.selectedTab
                            : profileStyle.unselectedTab,
                        ]}
                        onPress={() => setFieldValue('gender', option)}>
                        <Text
                          style={[
                            profileStyle.tabBtnText,
                            values.gender === option
                              ? profileStyle.selectedTabText
                              : profileStyle.unselectedTabText,
                          ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <ReusableTextInput
                    name="currentLocation"
                    label="Current Location*"
                    value={values.currentLocation}
                    onChangeText={handleChange('currentLocation')}
                  />

                  {/* Custom Multi Select Drop */}
                  <CustomMultiSelectDrop
                    options={Citys}
                    placeholder="Preferred Locations"
                    onSelect={items =>
                      setFieldValue('selectedLocations', items)
                    }
                  />
                </View>
              )}
            </Formik>
          </ScrollView>

          {/* Footer with Submit, Cancel, and Delete buttons */}
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

// Additional styles
const styles = StyleSheet.create({
  Text: {
    color: colors.blackText,
  },
});

export default PersonalInformation;
