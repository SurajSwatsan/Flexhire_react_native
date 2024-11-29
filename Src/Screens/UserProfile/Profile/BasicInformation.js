import {Modal, Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ReusableTextInput from '../../../Constant/CustomTextInput';
import ModalFooter from '../../../Constant/ProfileModalFooter';
import profileStyle from '../ProfileStyle';
import {colors} from '../../../Global_CSS/TheamColors';
import ReusableDatePicker from '../../../Constant/CustomDatePicker';
import CustomSelectionModal from '../../../Constant/CustomSelectionModal';
import CustomTabs from '../../../Constant/CustomTabs';
import moment from 'moment';

const GENDER_OPTIONS = [
  {id: 1, value: 'Male'},
  {id: 2, value: 'Female'},
  {id: 3, value: 'Other'},
];

const IndiaStates = [
  {id: 1, value: 'Andhra Pradesh'},
  {id: 2, value: 'Arunachal Pradesh'},
  {id: 3, value: 'Assam'},
  {id: 4, value: 'Bihar'},
  {id: 5, value: 'Chhattisgarh'},
  {id: 6, value: 'Goa'},
  {id: 7, value: 'Gujarat'},
  {id: 8, value: 'Haryana'},
  {id: 9, value: 'Himachal Pradesh'},
  {id: 10, value: 'Jharkhand'},
  {id: 11, value: 'Karnataka'},
  {id: 12, value: 'Kerala'},
  {id: 13, value: 'Madhya Pradesh'},
  {id: 14, value: 'Maharashtra'},
  {id: 15, value: 'Manipur'},
  {id: 16, value: 'Meghalaya'},
  {id: 17, value: 'Mizoram'},
  {id: 18, value: 'Nagaland'},
  {id: 19, value: 'Odisha'},
  {id: 20, value: 'Punjab'},
  {id: 21, value: 'Rajasthan'},
  {id: 22, value: 'Sikkim'},
  {id: 23, value: 'Tamil Nadu'},
  {id: 24, value: 'Telangana'},
  {id: 25, value: 'Tripura'},
  {id: 26, value: 'Uttar Pradesh'},
  {id: 27, value: 'Uttarakhand'},
  {id: 28, value: 'West Bengal'},
  {id: 29, value: 'Andaman and Nicobar Islands'},
  {id: 30, value: 'Chandigarh'},
  {id: 31, value: 'Dadra and Nagar Haveli and Daman and Diu'},
  {id: 32, value: 'Lakshadweep'},
  {id: 33, value: 'Delhi'},
  {id: 34, value: 'Puducherry'},
  {id: 35, value: 'Jammu & Kashmir'},
  {id: 36, value: 'Ladakh'},
];

const MaharashtraCities = [
  {id: 1, value: 'Mumbai'},
  {id: 2, value: 'Pune'},
  {id: 3, value: 'Nagpur'},
  {id: 4, value: 'Nashik'},
  {id: 5, value: 'Thane'},
  {id: 6, value: 'Aurangabad'},
  {id: 7, value: 'Solapur'},
  {id: 8, value: 'Satara'},
  {id: 9, value: 'Kolhapur'},
  {id: 10, value: 'Navi Mumbai'},
  {id: 11, value: 'Kalyan-Dombivli'},
  {id: 12, value: 'Chandrapur'},
  {id: 13, value: 'Jalgaon'},
  {id: 14, value: 'Ulhasnagar'},
  {id: 15, value: 'Ahmednagar'},
  {id: 16, value: 'Ratnagiri'},
  {id: 17, value: 'Wardha'},
  {id: 18, value: 'Beed'},
  {id: 19, value: 'Shirdi'},
  {id: 20, value: 'Ichalkaranji'},
  {id: 21, value: 'Amravati'},
  {id: 22, value: 'Bhusawal'},
  {id: 23, value: 'Bhandara'},
  {id: 24, value: 'Chinchwad'},
  {id: 25, value: 'Dombivli'},
  {id: 26, value: 'Ghatkopar'},
  {id: 27, value: 'Ichalkaranji'},
  {id: 28, value: 'Jalna'},
  {id: 29, value: 'Khamgaon'},
  {id: 30, value: 'Latur'},
  {id: 31, value: 'Malegaon'},
  {id: 32, value: 'Matheran'},
  {id: 33, value: 'Miraj'},
  {id: 34, value: 'Nagothane'},
  {id: 35, value: 'Osmanabad'},
  {id: 36, value: 'Parbhani'},
  {id: 37, value: 'Raigad'},
  {id: 38, value: 'Sangli'},
  {id: 39, value: 'Satara'},
  {id: 40, value: 'Shivajinagar'},
  {id: 41, value: 'Solapur'},
  {id: 42, value: 'Talegaon'},
  {id: 43, value: 'Tirora'},
  {id: 44, value: 'Vadgaon'},
  {id: 45, value: 'Vasai-Virar'},
  {id: 46, value: 'Wai'},
  {id: 47, value: 'Worli'},
  {id: 48, value: 'Yavatmal'},
  {id: 49, value: 'Pimpalgaon'},
  {id: 50, value: 'Chopda'},
  {id: 51, value: 'Dattawadi'},
  {id: 52, value: 'Devgad'},
  {id: 53, value: 'Dhule'},
  {id: 54, value: 'Gadchiroli'},
  {id: 55, value: 'Gokul'},
  {id: 56, value: 'Hingoli'},
  {id: 57, value: 'Junnar'},
  {id: 58, value: 'Kankavli'},
  {id: 59, value: 'Karjat'},
  {id: 60, value: 'Khargone'},
  {id: 61, value: 'Kundal'},
  {id: 62, value: 'Lohgaon'},
  {id: 63, value: 'Malkapur'},
  {id: 64, value: 'Mhasla'},
  {id: 65, value: 'Mokhada'},
  {id: 66, value: 'Mulund'},
  {id: 67, value: 'Mulshi'},
  {id: 68, value: 'Nandurbar'},
  {id: 69, value: 'Ozar'},
  {id: 70, value: 'Pachora'},
  {id: 71, value: 'Palghar'},
  {id: 72, value: 'Panchgani'},
  {id: 73, value: 'Pandharpur'},
  {id: 74, value: 'Panvel'},
  {id: 75, value: 'Pratapgarh'},
  {id: 76, value: 'Rajapur'},
  {id: 77, value: 'Rajgurunagar'},
  {id: 78, value: 'Ranjangaon'},
  {id: 79, value: 'Sankh'},
  {id: 80, value: 'Saswad'},
  {id: 81, value: 'Sawantwadi'},
  {id: 82, value: 'Shahapur'},
  {id: 83, value: 'Shindkheda'},
  {id: 84, value: 'Sinnar'},
  {id: 85, value: 'Taloja'},
  {id: 86, value: 'Udgir'},
  {id: 87, value: 'Vasai'},
  {id: 88, value: 'Vengurla'},
  {id: 89, value: 'Vidyanagar'},
  {id: 90, value: 'Vikhroli'},
  {id: 91, value: 'Wada'},
  {id: 92, value: 'Wadi'},
];

const Country = [
  {id: 1, value: 'United States'},
  {id: 2, value: 'Canada'},
  {id: 3, value: 'United Kingdom'},
  {id: 4, value: 'Australia'},
  {id: 5, value: 'India'},
  {id: 6, value: 'Germany'},
  {id: 7, value: 'France'},
  {id: 8, value: 'Japan'},
  {id: 9, value: 'China'},
  {id: 10, value: 'Brazil'},
  {id: 11, value: 'South Africa'},
  {id: 12, value: 'Mexico'},
  {id: 13, value: 'Italy'},
  {id: 14, value: 'Russia'},
  {id: 15, value: 'Spain'},
];

// Validation Schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits')
    .required('Phone Number is required'),
  DOB: Yup.date()
    .nullable() // Allow null or empty values initially
    .required('Date of Birth is required')
    .typeError('Invalid Date of Birth') // Custom error message for invalid date format
    .max(new Date(), 'Date of Birth cannot be in the future'),
  gender: Yup.string()
    .oneOf(
      GENDER_OPTIONS.map(option => option.value),
      'Invalid gender selected',
    )
    .required('Gender is required'),
  //   Country: Yup.string().required('Country is required'),
  //   homeState: Yup.string().required('State is required'),
  //   homeCity: Yup.string().required('City is required'),
});

// Helper: Initial Valuesconst
const getInitialValues = (editingIndex, submittedData) => {
  if (editingIndex !== null && submittedData) {
    return {
      fullName: submittedData.fullName || '',
      email: submittedData.email || '',
      phoneNumber: submittedData.phoneNumber || '',
      DOB: submittedData.DOB || new Date(),
      gender: submittedData.gender || '',
      Country: submittedData.Country || '',
      homeState: submittedData.homeState || '',
      homeCity: submittedData.homeCity || '',
    };
  }
  return {
    fullName: '',
    email: '',
    phoneNumber: '',
    DOB: new Date(),
    gender: '',
    Country: '',
    homeState: '',
    homeCity: '',
  };
};

const BasicInformation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  let formikRef = null;

  const handleFormSubmit = values => {
    const formattedValues = {
      ...values,
      DOB: values.DOB ? moment(values.DOB).format('YYYY-MM-DD') : null, // Format DOB
      Country:
        Country.find(country => country.value === values.Country)?.value || '',
      homeState:
        IndiaStates.find(state => state.value === values.homeState)?.value ||
        '',
      homeCity:
        MaharashtraCities.find(city => city.value === values.homeCity)?.value ||
        '',
    };
    setSubmittedData(formattedValues);
    setModalVisible(false);
    console.log('Form Submitted:', formattedValues);
  };

  const openModal = () => {
    setModalVisible(true); // Ensure the modal opens
    setEditingIndex(submittedData ? 0 : null); // Set editing index
  };
  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };

  // const handleEdit = () => {
  //   setEditingIndex(0);
  //   openModal();
  // };

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>BASIC INFORMATION</Text>
        <IconButton
          icon={submittedData ? 'pencil-outline' : 'plus-circle-outline'}
          iconColor={colors.blackText}
          size={20}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>

      {submittedData ? (
  <View style={profileStyle.userDataContainer}>
    <TouchableOpacity onPress={openModal}>
      {[
        {label: 'Full Name', value: submittedData.fullName},
        {label: 'Email', value: submittedData.email},
        {label: 'Phone Number', value: submittedData.phoneNumber},
        {
          label: 'Date of Birth',
          value: submittedData.DOB
            ? moment(submittedData.DOB).format('MMMM DD, YYYY')
            : null,
        },
        {label: 'Gender', value: submittedData.gender},
        {label: 'Country', value: submittedData.Country},
        {label: 'State', value: submittedData.homeState},
        {label: 'City', value: submittedData.homeCity},
      ].map((field, index) => (
        <View key={index} style={{flexDirection: 'row', marginBottom: 5}}>
          <Text style={styles.labelText}>{field.label}</Text>
          <Text style={styles.valueText}>{field.value || '-'}</Text>
        </View>
      ))}
    </TouchableOpacity>
  </View>
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
                initialValues={getInitialValues(editingIndex, submittedData)}
                validationSchema={validationSchema}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  setFieldValue,
                  errors,
                  touched,
                }) => (
                  <View style={profileStyle.formContainer}>
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
                    <CustomTabs
                      label="Gender*"
                      options={GENDER_OPTIONS}
                      selectedValue={values.gender}
                      setFieldValue={setFieldValue}
                      fieldName="gender"
                      error={errors.gender}
                      touched={touched.gender}
                    />
                    <CustomSelectionModal
                      title="Country"
                      data={Country}
                      selectedItems={
                        Country.find(item => item.value === values.Country) ||
                        null
                      }
                      setSelectedItems={item =>
                        setFieldValue('Country', item?.value || '')
                      }
                      placeholder="Select Country"
                      isMultiSelect={false}
                    />
                    <CustomSelectionModal
                      title="Home State"
                      data={IndiaStates}
                      selectedItems={
                        IndiaStates.find(
                          item => item.value === values.homeState,
                        ) || null
                      }
                      setSelectedItems={item =>
                        setFieldValue('homeState', item?.value || '')
                      }
                      placeholder="Select Home State"
                      isMultiSelect={false}
                    />
                    {/* <Text style={{fontSize: 16, fontWeight: 'bold',color: '#000'}}>{values.homeState}</Text> */}
                    <CustomSelectionModal
                      title="Home City"
                      data={MaharashtraCities}
                      selectedItems={
                        MaharashtraCities.find(
                          item => item.value === values.homeCity,
                        ) || null
                      }
                      setSelectedItems={item =>
                        setFieldValue('homeCity', item?.value || '')
                      }
                      placeholder="Select Home City"
                      isMultiSelect={false}
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
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    width: '40%',
  },
  valueText: {
    fontSize: 16,
    color: '#000',
    width: '60%',
  },
});

export default BasicInformation;
