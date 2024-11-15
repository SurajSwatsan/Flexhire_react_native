import {Modal, Text, View, TouchableOpacity, FlatList} from 'react-native';
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

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const Citys = [
  {label: 'Bangalore', value: '1'},
  {label: 'Hyderabad', value: '2'},
  {label: 'Chennai', value: '3'},
  {label: 'Pune', value: '4'},
  {label: 'Gurgaon', value: '5'},
  {label: 'Noida', value: '6'},
  {label: 'Kolkata', value: '7'},
  {label: 'Mumbai', value: '8'},
  {label: 'Delhi', value: '9'},
  {label: 'Ahmedabad', value: '10'},
  {label: 'Chandigarh', value: '11'},
  {label: 'Coimbatore', value: '12'},
  {label: 'Jaipur', value: '13'},
  {label: 'Indore', value: '14'},
  {label: 'Bhubaneswar', value: '15'},
  {label: 'Mysuru', value: '16'},
  {label: 'Visakhapatnam', value: '17'},
  {label: 'Surat', value: '18'},
  {label: 'Kochi', value: '19'},
  {label: 'Nagpur', value: '20'},
];

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Only numeric values allowed')
    .required('Phone Number is required'),
  DOB: Yup.date().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  currentLocation: Yup.string().required('Current Location is required'),
  selectedLocations: Yup.array().min(1, 'Please select at least one location'),
});

const PersonalInformation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  let formikRef = null;

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };

  const handleFormSubmit = values => {
    setSubmittedData(values);
    closeModal();
  };

  const handleEdit = () => {
    setEditingIndex(0);
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
                    editingIndex !== null
                      ? submittedData.selectedLocations
                      : [],

                  homeState:
                    editingIndex !== null ? submittedData.homeState : '',
                  homeCity: editingIndex !== null ? submittedData.homeCity : '',
                  industry: editingIndex !== null ? submittedData.industry : '',
                  functionalarea:
                    editingIndex !== null ? submittedData.functionalarea : '',
                  noticePeriod:
                    editingIndex !== null ? submittedData.noticePeriod : '',
                  experience:
                    editingIndex !== null ? submittedData.experience : '',
                  annualSalary:
                    editingIndex !== null ? submittedData.annualSalary : '',
                  expectedSalary:
                    editingIndex !== null ? submittedData.expectedSalary : '',
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
                    <CustomMultiSelectDrop
                      options={Citys}
                      placeholder="Preferred Locations"
                      onSelect={items =>
                        setFieldValue('selectedLocations', items)
                      }
                    />
                    <ReusableTextInput
                      name="homeState"
                      label="Home State*"
                      value={values.homeState}
                      keyboardType="numeric"
                      onChangeText={handleChange('homeState')}
                    />
                    <ReusableTextInput
                      name="homeCountry"
                      label="Home Country*"
                      value={values.homeCountry}
                      keyboardType="numeric"
                      onChangeText={handleChange('homeCountry')}
                    />
                    <ReusableTextInput
                      name="industry"
                      label="Industry*"
                      value={values.industry}
                      keyboardType="numeric"
                      onChangeText={handleChange('industry')}
                    />
                    <ReusableTextInput
                      name="functionalarea"
                      label="Functional Area*"
                      value={values.functionalarea}
                      keyboardType="numeric"
                      onChangeText={handleChange('functionalarea')}
                    />
                    <ReusableTextInput
                      name="noticePeriod"
                      label="Notice Period*"
                      value={values.noticePeriod}
                      keyboardType="numeric"
                      onChangeText={handleChange('noticePeriod')}
                    />
                    <ReusableTextInput
                      name="experience"
                      label="Experience*"
                      value={values.experience}
                      keyboardType="numeric"
                      onChangeText={handleChange('homeCountry')}
                    />
                    <ReusableTextInput
                      name="annualSalary"
                      label="Annual Salary*"
                      value={values.annualSalary}
                      keyboardType="numeric"
                      onChangeText={handleChange('annualSalary')}
                    />
                    <ReusableTextInput
                      name="expectedSalary"
                      label="Expected Salary*"
                      value={values.expectedSalary}
                      keyboardType="numeric"
                      onChangeText={handleChange('expectedSalary')}
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
            onDelete={handleDelete}
            showDelete={editingIndex !== null}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PersonalInformation;
