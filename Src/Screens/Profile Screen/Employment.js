import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';

const Employment = () => {
  const initialEmployment = {
    currentCompany: 'Yes',
    employmentType: 'Full-time',
    updatedTotalExperienceYears: '',
    updatedTotalExperienceMonths: '',
    currentCompanyName: '',
    currentJobTitle: '',
    joiningDate: new Date(),
    currentAnnualSalary: '',
    skillsUsed: '',
    jobProfile: '',
    noticeperiod: '',
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [employmentDataList, setEmploymentDataList] = useState([]);
  const [selectedemploymentIndex, setSelectedemploymentIndex] = useState(null);
  const [joiningDate, setJoiningDate] = useState(new Date());
  const [showjoiningDatePicker, setShowjoiningDatePicker] = useState(false);
  const [newEmployment, setEmployment] = useState(initialEmployment);
  const [currency, setCurrency] = useState('INR'); // State for currency
  const currencies = [
    {label: '$', value: 'USD'},
    {label: '₹', value: 'INR'},
  ];
  const validate = values => {
    const errors = {};

    // Validate updatedTotalExperienceYears
    if (!values.updatedTotalExperienceYears) {
      errors.updatedTotalExperienceYears =
        'Please select years.';
    }

    // Validate updatedTotalExperienceMonths
    if (
      values.updatedTotalExperienceYears !== '30+' &&
      !values.updatedTotalExperienceMonths
    ) {
      errors.updatedTotalExperienceMonths =
        'Please select months.';
    }

    return errors;
  };
  const validationSchema = Yup.object().shape({
    // updatedTotalExperienceYears: Yup.number().required(
    //   'Please select your total experience in years.',
    // ),
    // updatedTotalExperienceMonths: Yup.number().when(
    //   'updatedTotalExperienceYears',
    //   {
    //     is: value => value !== '30+', // Checks if the selected year is not "30+"
    //     then: Yup.number().required(
    //       'Please select your total experience in months.',
    //     ),
    //     otherwise: Yup.number().nullable(), // Allows null when "30+" is selected
    //   },
    // ),
    currentCompanyName: Yup.string().required(
      'Current company name is required.',
    ),
    currentJobTitle: Yup.string().required('Job title is required.'),
    currentAnnualSalary: Yup.number()
      .required('Current annual salary is required.')
      .positive('Salary must be a positive number.'),
    skillsUsed: Yup.string().required('Skills used is required.'),
    jobProfile: Yup.string().required('Job profile is required.'),
    noticeperiod: Yup.string().required('Notice period is required.'),
  });
  const Years = [...Array.from({length: 30}, (_, i) => i), 30, '30+'];
  const YearOptions = Years.map(year => ({
    label: year.toString(),
    value: year,
  }));

  const Months = Array.from({length: 12}, (_, i) => i);
  const MonthOptions = Months.map(month => ({
    label: month.toString(),
    value: month,
  }));
  const formatDate = date => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const handlejoiningDateChange = (_, date) => {
    if (date) {
      setJoiningDate(date);
      setShowjoiningDatePicker(false);
    }
  };

  const handleFormSubmit = values => {
    const newEntry = {
      currentCompany: values.currentCompany,
      employmentType: values.employmentType,
      updatedTotalExperienceYears: values.updatedTotalExperienceYears,
      updatedTotalExperienceMonths: values.updatedTotalExperienceMonths,
      currentCompanyName: values.currentCompanyName,
      currentJobTitle: values.currentJobTitle,
      joiningDate: values.joiningDate,
      currentAnnualSalary: values.currentAnnualSalary,
      skillsUsed: values.skillsUsed,
      jobProfile: values.jobProfile,
      noticeperiod: values.noticeperiod,
    };

    if (selectedemploymentIndex !== null) {
      const updatedemploymentDataList = [...employmentDataList];
      updatedemploymentDataList[selectedemploymentIndex] = newEntry;
      setEmploymentDataList(updatedemploymentDataList);
    } else {
      setEmploymentDataList([...employmentDataList, newEntry]);
    }
    closeModal();
  };

  const deleteEmployment = () => {
    if (selectedemploymentIndex !== null) {
      const updatedemploymentDataList = employmentDataList.filter(
        (_, index) => index !== selectedemploymentIndex,
      );
      setEmploymentDataList(updatedemploymentDataList);
      closeModal();
    }
  };

  const openModal = (index = null) => {
    if (index !== null) {
      const ProjectToEdit = employmentDataList[index];
      setEmployment(ProjectToEdit);
      setSelectedemploymentIndex(index);
    } else {
      setEmployment(initialEmployment);
      setSelectedemploymentIndex(null);
    }
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.outerheading}>Employment</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.AddButton}>Add</Text>
        </TouchableOpacity>
      </View>
      {/* I want where output of modal data  */}

      {employmentDataList.length === 0 ? (
        <Text style={styles.defoulttext}>No employment data available</Text>
      ) : (
        employmentDataList.map((employment, index) => (
          <TouchableOpacity onPress={() => openModal(index)}>
            <View key={index} style={styles.dataContainer}>
              <Text style={styles.dataText}>
                Company: {employment.currentCompanyName}
              </Text>
              <Text style={styles.dataText}>
                Job Title: {employment.currentJobTitle}
              </Text>
              <Text style={styles.dataText}>
                Joining Date: {employment.joiningDate.toLocaleDateString()}
              </Text>
              <Text style={styles.dataText}>
                Annual Salary: {employment.currentAnnualSalary} {currency}
              </Text>
              <Text style={styles.dataText}>
                Skills Used: {employment.skillsUsed}
              </Text>
              <Text style={styles.dataText}>
                Job Profile: {employment.jobProfile}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => openModal(index)}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  setSelectedemploymentIndex(index);
                  Alert.alert(
                    'Delete Employment',
                    'Are you sure you want to delete this employment record?',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Delete',
                        onPress: deleteEmployment,
                        style: 'destructive',
                      },
                    ],
                  );
                }}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Formik
              initialValues={newEmployment}
              validationSchema={validationSchema}
              validate={validate}
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
                  <ScrollView contentContainerStyle={styles.modalContent}>
                    <View style={{marginBottom: 12}}>
                      <Text style={styles.heading}>Employment</Text>
                      <Text style={styles.subText1}>
                        Details like job title, company name, etc, help
                        employers understand your work
                      </Text>
                    </View>
                    <View style={{marginBottom: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Current Company
                      </Text>
                      <View style={styles.ChipContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.currentCompany === 'Yes'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => handleChange('currentCompany')('Yes')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.currentCompany === 'Yes'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Yes
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.currentCompany === 'No'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() => handleChange('currentCompany')('No')}>
                          <Text
                            style={[
                              styles.statusText,
                              values.currentCompany === 'No'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            No
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{marginBottom: 12}}>
                      <Text style={{color: '#000', fontWeight: 'bold'}}>
                        Employment type
                      </Text>
                      <View style={styles.ChipContainer}>
                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.employmentType === 'Full-time'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('employmentType')('Full-time')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.employmentType === 'Full-time'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Full-time
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.statusButton,
                            values.employmentType === 'Internship'
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            handleChange('employmentType')('Internship')
                          }>
                          <Text
                            style={[
                              styles.statusText,
                              values.employmentType === 'Internship'
                                ? styles.selectedText
                                : styles.unselectedText,
                            ]}>
                            Internship
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {values.currentCompany === 'Yes' &&
                      values.employmentType === 'Full-time' && (
                        <>
                          <View style={{marginBottom: 12}}>
                            <View style={styles.expiriancecontainer}>
                              <View style={styles.Yearcontainer}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                  }}>
                                  <Dropdown
                                    style={styles.dropdownexpiriance}
                                    data={YearOptions}
                                    labelField="label"
                                    valueField="value"
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    itemTextStyle={{color: '#000'}}
                                    placeholder="Eg. 1"
                                    textColor="#000"
                                    value={values.updatedTotalExperienceYears}
                                    onChange={item => {
                                      setFieldValue(
                                        'updatedTotalExperienceYears',
                                        item.value,
                                      );
                                    }}
                                  />
                                  <Text style={{color: '#000'}}>Years</Text>
                                </View>
                                {errors.updatedTotalExperienceYears && (
                                  <Text style={styles.error}>
                                    {errors.updatedTotalExperienceYears}
                                  </Text>
                                )}
                              </View>

                              {/* Conditionally render Monthcontainer only if the selected year is not "30+" */}
                              {values.updatedTotalExperienceYears !== '30+' && (
                                <View style={styles.Monthcontainer}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      flex: 1,
                                    }}>
                                    <Dropdown
                                      style={styles.dropdownexpiriance}
                                      data={MonthOptions}
                                      labelField="label"
                                      valueField="value"
                                      placeholderStyle={styles.placeholderStyle}
                                      selectedTextStyle={
                                        styles.selectedTextStyle
                                      }
                                      itemTextStyle={{color: '#000'}}
                                      placeholder="Eg. 2"
                                      textColor="#000"
                                      value={
                                        values.updatedTotalExperienceMonths
                                      }
                                      onChange={item => {
                                        setFieldValue(
                                          'updatedTotalExperienceMonths',
                                          item.value,
                                        );
                                      }}
                                    />
                                    <Text style={{color: '#000'}}>Months</Text>
                                  </View>
                                  {errors.updatedTotalExperienceMonths && (
                                    <Text style={styles.error}>
                                      {errors.updatedTotalExperienceMonths}
                                    </Text>
                                  )}
                                </View>
                              )}
                            </View>
                          </View>
                          <View style={styles.inputBoxContainer}>
                            <TextInput
                              label="Current Company Name*"
                              mode="outlined"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              value={values.currentCompanyName}
                              onChangeText={handleChange('currentCompanyName')}
                              onBlur={handleBlur('currentCompanyName')}
                              style={styles.input}
                            />
                            {errors.currentCompanyName &&
                              touched.currentCompanyName && (
                                <Text style={styles.error}>
                                  {errors.currentCompanyName}
                                </Text>
                              )}
                          </View>
                          <View style={styles.inputBoxContainer}>
                            <TextInput
                              label="Current Job Title"
                              mode="outlined"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              value={values.currentJobTitle}
                              onChangeText={handleChange('currentJobTitle')}
                              onBlur={handleBlur('currentJobTitle')}
                              style={styles.input}
                            />
                            {errors.currentJobTitle &&
                              touched.currentJobTitle && (
                                <Text style={styles.error}>
                                  {errors.currentJobTitle}
                                </Text>
                              )}
                          </View>
                          <View style={styles.Datecontainer}>
                            <TouchableOpacity
                              onPress={() => setShowjoiningDatePicker(true)}>
                              <TextInput
                                style={styles.inputBox}
                                label="Joining date*"
                                mode="outlined"
                                textColor="#333"
                                outlineColor="lightgray"
                                activeOutlineColor="gray"
                                value={joiningDate.toLocaleString('default', {
                                  month: 'long',
                                  year: 'numeric',
                                })}
                                editable={false} // Makes the input box non-editable
                              />
                            </TouchableOpacity>
                            {showjoiningDatePicker && (
                              <DateTimePicker
                                value={joiningDate}
                                mode="date"
                                display="default"
                                onChange={handlejoiningDateChange}
                              />
                            )}
                          </View>
                          <View style={styles.inputBoxContainer}>
                            <Text
                              style={{
                                color: '#333',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              Current annual salary*
                            </Text>
                            <View style={styles.salaryContainer}>
                              <View style={styles.salarydropdowncontainer}>
                                <Dropdown
                                  style={styles.salarydropdown}
                                  data={currencies}
                                  labelField="label"
                                  valueField="value"
                                  placeholderStyle={
                                    styles.salaryplaceholderStyle
                                  }
                                  selectedTextStyle={
                                    styles.salaryselectedTextStyle
                                  }
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
                                value={values.currentAnnualSalary}
                                onChangeText={handleChange(
                                  'currentAnnualSalary',
                                )}
                                onBlur={handleBlur('currentAnnualSalary')}
                                keyboardType="numeric"
                                style={styles.salaryInput}
                              />
                            </View>
                            {errors.currentAnnualSalary &&
                              touched.currentAnnualSalary && (
                                <Text style={styles.error}>
                                  {errors.currentAnnualSalary}
                                </Text>
                              )}
                          </View>
                          <View style={styles.inputBoxContainer}>
                            <TextInput
                              label="Skills Used"
                              mode="outlined"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              value={values.skillsUsed}
                              onChangeText={handleChange('skillsUsed')}
                              onBlur={handleBlur('skillsUsed')}
                              style={styles.input}
                            />
                            {errors.skillsUsed && touched.skillsUsed && (
                              <Text style={styles.error}>
                                {errors.skillsUsed}
                              </Text>
                            )}
                          </View>
                          <View style={styles.inputBoxContainer}>
                            <TextInput
                              label="Job Profile"
                              mode="outlined"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              value={values.jobProfile}
                              onChangeText={handleChange('jobProfile')}
                              onBlur={handleBlur('jobProfile')}
                              style={styles.input}
                            />
                            {errors.jobProfile && touched.jobProfile && (
                              <Text style={styles.error}>
                                {errors.jobProfile}
                              </Text>
                            )}
                          </View>
                          <View style={styles.inputBoxContainer}>
                            <Text
                              style={{
                                color: '#333',
                                fontSize: 14,
                                fontWeight: 'bold',
                              }}>
                              Notice period*
                              {errors.noticeperiod && touched.noticeperiod && (
                                <Text style={styles.error}>
                                  {errors.noticeperiod}
                                </Text>
                              )}
                            </Text>

                            <View style={styles.ChipContainer}>
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
                                    styles.statusButton,
                                    values.noticeperiod === option
                                      ? styles.selectedButton
                                      : styles.unselectedButton,
                                  ]}
                                  onPress={() =>
                                    handleChange('noticeperiod')(option)
                                  }>
                                  <Text
                                    style={[
                                      styles.statusText,
                                      values.noticeperiod === option
                                        ? styles.selectedText
                                        : styles.unselectedText,
                                    ]}>
                                    {option}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          </View>
                        </>
                      )}
                  </ScrollView>
                  <View style={styles.ButtonContainer}>
                    <View>
                      {selectedemploymentIndex !== null && (
                        <IconButton
                          icon="delete"
                          iconColor="#ff0000"
                          size={24}
                          onPress={deleteEmployment}
                          style={styles.iconButtonStyle}
                        />
                      )}
                    </View>

                    <View style={{flexDirection: 'row-reverse'}}>
                      <Button
                        onPress={handleSubmit}
                        labelStyle={GlobalStyle.savelabelStyle}>
                        {selectedemploymentIndex !== null ? 'Update' : 'Save'}
                      </Button>

                      <Button
                        onPress={closeModal}
                        labelStyle={GlobalStyle.closelabelStyle}>
                        Cancel
                      </Button>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
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
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  AddButton: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  defoulttext: {
    marginHorizontal: 12,
    fontSize: 12,
    marginBottom:12,
    color: '#f2f2f2',
    fontWeight: 'bold',
  },
  dataContainer: {
    marginHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    paddingVertical: 12,
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outerheading: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    height: '100%',
    backgroundColor: 'white',
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
  container: {
    height: '100%',
    margin: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  expiriancecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  Yearcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  Monthcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  dropdownexpiriance: {
    height: 50,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
    marginRight: 8,
    padding: 12,
    flex: 1,
  },
  inputBoxContainer: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
  },
  outpurtData: {
    backgroundColor: '#f2f2f2',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  displayText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  displayText1: {
    fontSize: 12,
    color: '#555',
  },
  displayText2: {
    fontSize: 12,
    marginRight: 4,
    marginBottom: 4,
    color: '#333',
  },
  displayClient: {
    fontSize: 12,
    marginRight: 4,
    marginBottom: 4,
    color: '#333',
    fontWeight: 'bold',
  },
  experienceOutput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Sizecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  dropdown: {
    height: 52,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginVertical: 12,
    borderRadius: 5,
    padding: 12,
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#808080',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  employmentDataListContainer: {
    paddingVertical: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },

  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    alignItems: 'center',
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
  ChipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  Datecontainer: {
    marginBottom: 12,
    flex: 1,
  },
  inputBox: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
  },

  addMoreDetails: {
    color: 'blue',
    fontWeight: 'bold',
  },

  ///////

  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  salaryInput: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 48,
    // borderRadius: 8,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1,
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
  salarydropdown: {
    width: 50,
    height: 48,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,

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
  salaryplaceholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  salaryselectedTextStyle: {
    color: '#000',
    fontSize: 16,
  },
  salarydropdowncontainer: {},
});
export default Employment;
