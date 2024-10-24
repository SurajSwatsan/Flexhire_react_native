import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Checkbox, IconButton, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the DatePicker
import GlobalStyle from '../../Global_CSS/GlobalStyle';

const validationSchema = Yup.object().shape({
  gender: Yup.string().required('Gender is required'),
  dateofBirth: Yup.string().required('Date of Birth is required'),
  maritalStatus: Yup.string().optional(),
  category: Yup.string().optional(),
  disabilityType: Yup.string().when('differentlyabled', {
    is: 'Yes',
    then: Yup.string().required('Disability Type is required'),
  }),
  careerbreak: Yup.string().required('This field is required'),
  breakReason: Yup.string().when('careerbreak', {
    is: 'Yes',
    then: Yup.string().required('Reason for career break is required'),
  }),
  fromDate: Yup.string().when('careerbreak', {
    is: 'Yes',
    then: Yup.string().required('From date is required'),
  }),
  tillDate: Yup.string().when('careerbreak', {
    is: 'Yes',
    then: Yup.string().required('Till date is required'),
  }),
  permanentaddress: Yup.string().optional(),
  hometown: Yup.string().optional(),
  pincode: Yup.string().optional(),
});

const Personaldetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [moreinformation, setMoreinformation] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [dateofBirth, setDateofBirth] = useState('');
  const [category, setCategory] = useState('');

  const [differentlyabled, setDifferentlyabled] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [needAssistance, setNeedAssistance] = useState('');

  const [careerbreak, setCareerbreak] = useState('');
  const [breakReason, setBreakReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [tillDate, setTillDate] = useState('');
  const [currentlyOnBreak, setCurrentlyOnBreak] = useState(false);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false); // State to show/hide DatePicker for from date
  const [showTillDatePicker, setShowTillDatePicker] = useState(false); // State to show/hide DatePicker for till date

  const [workpermitUSA, setWorkpermitUSA] = useState('');
  const [workpermitOther, setWorkpermitOther] = useState('');

  const [permanentaddres, setPermanentaddres] = useState('');
  const [hometown, setHometown] = useState('');
  const [pincode, setPincode] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(''); // State to show/hide DatePicker

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleFormSubmit = values => {
    setGender(values.gender);
    setMoreinformation(values.moreinformation);
    setMaritalStatus(values.maritalStatus);
    setDateofBirth(values.dateofBirth);
    setCategory(values.category);
    setDifferentlyabled(values.differentlyabled);
    setDisabilityType(values.disabilityType);
    setNeedAssistance(values.needAssistance);

    setCareerbreak(values.careerbreak);
    setBreakReason(values.breakReason);
    setFromDate(values.fromDate);
    setTillDate(values.currentlyOnBreak ? 'Present' : values.tillDate);

    setWorkpermitUSA(values.workpermitUSA);
    setWorkpermitOther(values.workpermitOther);

    setPermanentaddres(values.permanentaddres);
    setHometown(values.hometown);
    setPincode(values.pincode);
    closeModal();
  };

  const toggleSelection = (value, values, setFieldValue) => {
    const updatedSelection = values.moreinformation.includes(value)
      ? values.moreinformation.filter(item => item !== value)
      : [...values.moreinformation, value];
    setFieldValue('moreinformation', updatedSelection);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(dateofBirth);
    setShowDatePicker(Platform.OS === 'ios'); // Close DatePicker on Android after selection
    setDateofBirth(currentDate.toISOString().split('T')[0]); // Format the date (YYYY-MM-DD)
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayProfileSummary}>Personal details</Text>
        </View>

        <IconButton
          icon="lead-pencil"
          iconColor="#f2f2f2"
          size={18}
          onPress={openModal}
          style={styles.iconButton}
        />
      </View>
      <Text style={styles.displayText}>
        Gender: {gender} {dateofBirth}
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.heading}>Personal details</Text>
              <Text style={styles.subText1}>
                This information is important for employers to know you better.
              </Text>
              <Formik
                initialValues={{
                  gender: gender,
                  moreinformation: moreinformation,
                  maritalStatus: maritalStatus,
                  dateofBirth: dateofBirth,
                  category: category,

                  differentlyabled: differentlyabled,
                  disabilityType: disabilityType,
                  needAssistance: needAssistance,

                  careerbreak: careerbreak,
                  breakReason: breakReason,
                  fromDate: fromDate,
                  tillDate: tillDate,
                  currentlyOnBreak: currentlyOnBreak,

                  workpermitUSA: workpermitUSA,
                  workpermitOther: workpermitOther,

                  permanentaddres: permanentaddres,
                  hometown: hometown,
                  pincode: pincode,
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
                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Gender
                      </Text>
                      <View style={styles.genderStatusContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.gender === 'Male'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => handleChange('gender')('Male')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.gender === 'Male'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Male
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.gender === 'Female'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => handleChange('gender')('Female')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.gender === 'Female'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Female
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.gender === 'Transgender'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => handleChange('gender')('Transgender')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.gender === 'Transgender'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Transgender
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {errors.gender && touched.gender && (
                        <Text style={styles.error}>{errors.gender}</Text>
                      )}
                    </View>
                    <View style={{marginVertical: 12}}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                        }}>
                        More information
                      </Text>
                      <Text style={{color: '#333', fontSize: 12}}>
                        Companies are focusing on equal opportunities and might
                        be looking for candidates from diverse backgrounds.
                      </Text>
                      <View style={styles.moreinformationContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.moreinformation.includes('Single parent')
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelection(
                              'Single parent',
                              values,
                              setFieldValue,
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.moreinformation.includes('Single parent')
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Single parent
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.moreinformation.includes('Working mother')
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelection(
                              'Working mother',
                              values,
                              setFieldValue,
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.moreinformation.includes('Working mother')
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Working mother
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.moreinformation.includes(
                              'Served in military',
                            )
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelection(
                              'Served in military',
                              values,
                              setFieldValue,
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.moreinformation.includes(
                                'Served in military',
                              )
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Served in military
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.moreinformation.includes('Retired (60+)')
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelection(
                              'Retired (60+)',
                              values,
                              setFieldValue,
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.moreinformation.includes('Retired (60+)')
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Retired (60+)
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.moreinformation.includes('LGBTQ+')
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            toggleSelection('LGBTQ+', values, setFieldValue)
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.moreinformation.includes('LGBTQ+')
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            LGBTQ+
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        marital Status
                      </Text>
                      <View style={styles.maritalStatusContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.maritalStatus === 'Single/unmarrid'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('maritalStatus')('Single/unmarrid')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.maritalStatus === 'Single/unmarrid'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Single/unmarrid
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.maritalStatus === 'Marrid'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('maritalStatus')('Marrid')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.maritalStatus === 'Marrid'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Marrid
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.maritalStatus === 'Widowed'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('maritalStatus')('Widowed')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.maritalStatus === 'Widowed'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Widowed
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.maritalStatus === 'Divorced'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('maritalStatus')('Divorced')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.maritalStatus === 'Divorced'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Divorced
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.maritalStatus === 'Separated'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('maritalStatus')('Separated')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.maritalStatus === 'Separated'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Separated
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.maritalStatus === 'Other'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('maritalStatus')('Other')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.maritalStatus === 'Other'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Other
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* {errors.gender && touched.gender && (
                      <Text style={styles.error}>{errors.gender}</Text>
                    )} */}
                    <View style={styles.DobContainer}>
                      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Date of Birth*"
                          textColor="black"
                          value={values.dateofBirth}
                          editable={false} // Disable editing
                          right={<TextInput.Icon icon="calendar" />} // Calendar icon
                        />
                      </TouchableOpacity>

                      {showDatePicker && (
                        <DateTimePicker
                          value={new Date(values.dateofBirth || new Date())}
                          mode="date"
                          display="default"
                          textColor="black"
                          onChange={handleDateChange}
                          maximumDate={new Date()} // Optional: Restrict to past dates
                        />
                      )}
                      {errors.dateofBirth && touched.dateofBirth && (
                        <Text style={styles.error}>{errors.dateofBirth}</Text>
                      )}
                    </View>
                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Category
                      </Text>
                      <Text style={{color: '#333', fontSize: 12}}>
                        Companies welcome people from various categories to
                        bring equality among all citizens
                      </Text>
                      <View style={styles.categoryStatusContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.category === 'General'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => handleChange('category')('General')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.category === 'General'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            General
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.category === 'Scheduled Caste (SC)'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('category')('Scheduled Caste (SC)')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.category === 'Scheduled Caste (SC)'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Scheduled Caste (SC)
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.category === 'Scheduled Tribe (ST)'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('category')('Scheduled Tribe (ST)')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.category === 'Scheduled Tribe (ST)'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Scheduled Tribe (ST)
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.category === 'OBC - Creamy'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('category')('OBC - Creamy')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.category === 'OBC - Creamy'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            OBC - Creamy
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.category === 'OBC - Non Creamy'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('category')('OBC - Non Creamy')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.category === 'OBC - Non Creamy'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            OBC - Non Creamy
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.category === 'Other'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => handleChange('category')('Other')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.category === 'Other'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Other
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Differently Abled Section */}
                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Are you differently abled?
                      </Text>

                      <View style={styles.DifferentlyAbledStatusContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.differentlyabled === 'Yes'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            setFieldValue('differentlyabled', 'Yes')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.differentlyabled === 'Yes'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Yes
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.differentlyabled === 'No'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => {
                            setFieldValue('differentlyabled', 'No');
                            setFieldValue('disabilityType', '');
                            setFieldValue('needAssistance', '');
                          }}>
                          <Text
                            style={[
                              styles.statusText,
                              values.differentlyabled === 'No'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            No
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {values.differentlyabled === 'Yes' && (
                      <>
                        {/* Disability Type */}
                        <View style={styles.DisabilityTypeContainer}>
                          <TextInput
                            style={styles.input}
                            mode="outlined"
                            label="Disability Type*"
                            textColor="black"
                            outlineColor="lightgray"
                            activeOutlineColor="gray"
                            value={values.disabilityType}
                            onChangeText={handleChange('disabilityType')}
                            onBlur={handleBlur('disabilityType')}
                          />
                          {errors.disabilityType && touched.disabilityType && (
                            <Text style={styles.error}>
                              {errors.disabilityType}
                            </Text>
                          )}
                        </View>
                        {/* Need Assistance */}
                        <View style={styles.needAssistanceContainer}>
                          <TextInput
                            style={styles.input}
                            mode="outlined"
                            label="Need Assistance*"
                            textColor="black"
                            outlineColor="lightgray"
                            activeOutlineColor="gray"
                            value={values.needAssistance}
                            onChangeText={handleChange('needAssistance')}
                            onBlur={handleBlur('needAssistance')}
                          />
                          {errors.needAssistance && touched.needAssistance && (
                            <Text style={styles.error}>
                              {errors.needAssistance}
                            </Text>
                          )}
                        </View>
                      </>
                    )}

                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Have you taken a career break?
                      </Text>
                      {/* Career Break Section */}
                      <View style={styles.CareerBreakStatusContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.careerbreak === 'Yes'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => setFieldValue('careerbreak', 'Yes')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.careerbreak === 'Yes'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Yes
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.careerbreak === 'No'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => {
                            setFieldValue('careerbreak', 'No');
                            setFieldValue('breakReason', '');
                            setFieldValue('fromDate', '');
                            setFieldValue('tillDate', '');
                            setFieldValue('currentlyOnBreak', false);
                          }}>
                          <Text
                            style={[
                              styles.statusText,
                              values.careerbreak === 'No'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            No
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {values.careerbreak === 'Yes' && (
                        <>
                          <View style={{marginVertical: 12}}>
                            {/* Reason of Break */}
                            <Text style={{color: '#000', fontWeight: 'bold'}}>
                              Reason of Break
                            </Text>
                            <View style={styles.breakReasonStatusContainer}>
                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.breakReason === 'Child care'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('breakReason')('Child care')
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.breakReason === 'Child care'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Child care
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.breakReason === 'Education'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('breakReason')('Education')
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.breakReason === 'Education'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Education
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.breakReason === 'Medical'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('breakReason')('Medical')
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.breakReason === 'Medical'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Medical
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.breakReason === 'Layoff'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('breakReason')('Layoff')
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.breakReason === 'Layoff'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Layoff
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.breakReason === 'Personal'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('breakReason')('Personal')
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.breakReason === 'Personal'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Personal
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.breakReason === 'Other'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('breakReason')('Other')
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.breakReason === 'Other'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Other
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View style={{marginVertical: 12}}>
                            {/* Break Duration */}
                            <Text style={{color: '#000', fontWeight: 'bold'}}>
                              Break Duration
                            </Text>
                            <View style={styles.BreakDurationStatusContainer}>
                              {/* From Date */}
                              <TouchableOpacity
                                onPress={() => setShowFromDatePicker(true)}>
                                <TextInput
                                  style={styles.input}
                                  mode="outlined"
                                  label="From*"
                                  textColor="black"
                                  outlineColor="lightgray"
                                  activeOutlineColor="gray"
                                  value={values.fromDate}
                                  editable={false} // Disable editing
                                  right={<TextInput.Icon icon="calendar" />} // Calendar icon
                                />
                              </TouchableOpacity>

                              {showFromDatePicker && (
                                <DateTimePicker
                                  value={new Date(fromDate || new Date())}
                                  mode="date"
                                  display="default"
                                  textColor="black"
                                  outlineColor="lightgray"
                                  activeOutlineColor="gray"
                                  onChange={(event, selectedDate) =>
                                    handleDateChange(
                                      event,
                                      selectedDate,
                                      setFieldValue,
                                      'fromDate',
                                    )
                                  }
                                />
                              )}

                              {/* Till Date */}
                              <TouchableOpacity
                                onPress={() =>
                                  !values.currentlyOnBreak &&
                                  setShowTillDatePicker(true)
                                }>
                                <TextInput
                                  style={styles.input}
                                  mode="outlined"
                                  label="Till*"
                                  textColor="black"
                                  outlineColor="lightgray"
                                  activeOutlineColor="gray"
                                  value={
                                    values.currentlyOnBreak
                                      ? 'Present'
                                      : values.tillDate
                                  }
                                  editable={!values.currentlyOnBreak} // Disable if "Currently on Break" is checked
                                  right={<TextInput.Icon icon="calendar" />} // Calendar icon
                                />
                              </TouchableOpacity>

                              {showTillDatePicker &&
                                !values.currentlyOnBreak && (
                                  <DateTimePicker
                                    value={new Date(tillDate || new Date())}
                                    mode="date"
                                    display="default"
                                    textColor="black"
                                    onChange={(event, selectedDate) =>
                                      handleDateChange(
                                        event,
                                        selectedDate,
                                        setFieldValue,
                                        'tillDate',
                                      )
                                    }
                                  />
                                )}
                            </View>
                          </View>
                          {/* Currently on Break Checkbox */}
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Checkbox
                              status={
                                values.currentlyOnBreak
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() =>
                                setFieldValue(
                                  'currentlyOnBreak',
                                  !values.currentlyOnBreak,
                                )
                              }
                            />
                            <Text style={{color: '#333'}}>
                              Currently on Break
                            </Text>
                          </View>
                        </>
                      )}
                    </View>

                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Work permit for USA
                      </Text>

                      <View style={styles.workpermitUSAStatusContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.workpermitUSA === 'Have H1 Visa'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('workpermitUSA')('Have H1 Visa')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.workpermitUSA === 'Have H1 Visa'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Have H1 Visa
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.workpermitUSA === 'Need H1 Visa'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('workpermitUSA')('Need H1 Visa')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.workpermitUSA === 'Need H1 Visa'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Need H1 Visa
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.workpermitUSA === 'TN Permit Holder'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('workpermitUSA')('TN Permit Holder')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.workpermitUSA === 'TN Permit Holder'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            TN Permit Holder
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.workpermitUSA === 'Green Card Holder'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('workpermitUSA')('Green Card Holder')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.workpermitUSA === 'Green Card Holder'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Green Card Holder
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.workpermitUSA === 'US Citizen'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('workpermitUSA')('US Citizen')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.workpermitUSA === 'US Citizen'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            US Citizen
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.workpermitUSA === 'Authorized to work in US'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('workpermitUSA')(
                              'Authorized to work in US',
                            )
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.workpermitUSA ===
                              'Authorized to work in US'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Authorized to work in US
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{marginVertical: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Work permit for other countries
                      </Text>
                      <View style={{marginVertical: 4}}>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label=" Work permit (other)"
                          textColor="black"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          value={values.workpermitOther}
                          onChangeText={handleChange('workpermitOther')}
                          onBlur={handleBlur('workpermitOther')}
                        />
                      </View>
                    </View>

                    <View style={{marginVertical: 12}}>
                      <View>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Permanent address"
                          textColor="black"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          value={values.permanentaddres}
                          onChangeText={handleChange('permanentaddres')}
                          onBlur={handleBlur('permanentaddres')}
                        />
                      </View>
                    </View>

                    <View style={{marginVertical: 12}}>
                      <View>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Hometown"
                          textColor="black"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          value={values.hometown}
                          onChangeText={handleChange('hometown')}
                          onBlur={handleBlur('hometown')}
                        />
                      </View>
                    </View>

                    <View style={{marginVertical: 12}}>
                      <View>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Pincode"
                          textColor="black"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          value={values.pincode}
                          onChangeText={handleChange('pincode')}
                          onBlur={handleBlur('pincode')}
                        />
                      </View>
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
  displayText: {
    marginHorizontal: 12,
    textAlign: 'justify',
    marginVertical: 6,
    fontSize: 14,
    color: '#ffffff',
  },
  genderStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginVertical: 12,
  },
  moreinformationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  maritalStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  DifferentlyAbledStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  CareerBreakStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  breakReasonStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  workpermitUSAStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  DobContainer: {
    marginVertical: 12,
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
  DisabilityTypeContainer: {
    marginBottom: 12,
  },
  needAssistanceContainer: {
    marginBottom: 12,
  },
});

export default Personaldetails;
