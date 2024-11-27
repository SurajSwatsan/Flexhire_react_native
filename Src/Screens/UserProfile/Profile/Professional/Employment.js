import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import CustomTabs from '../../../../Constant/CustomTabs';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import ReusableDropdown from '../../../../Constant/CustomDropdown';
import ReusableDatePicker from '../../../../Constant/CustomDatePicker';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal'; // Import CustomSelectionModal
import {IconButton} from 'react-native-paper';
import profileStyle from '../../ProfileStyle';
import * as Yup from 'yup';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {colors} from '../../../../Global_CSS/TheamColors';
const CURRENT_COMPANY_OPTIONS = [
  {id: 1, value: 'Yes'},
  {id: 2, value: 'No'},
];

const EMPLOYMENT_TYPES = [
  {id: 1, value: 'Full-time'},
  {id: 2, value: 'Internship'},
];

const NOTICEPERIOD_OPTIONS = [
  {id: 1, value: '15 days'},
  {id: 2, value: '1 month'},
  {id: 3, value: '2 months'},
  {id: 4, value: '3 months'},
  {id: 5, value: 'More than 3 months'},
];

const YEAR_OPTIONS = Array.from({length: 31}, (_, i) => ({
  id: i,
  value: i === 30 ? '30+' : i.toString(),
  label: i === 30 ? '30+' : i.toString(),
}));

const MONTH_OPTIONS = Array.from({length: 12}, (_, i) => ({
  id: i,
  value: i.toString(),
  label: i.toString(),
}));

const CURRENCY_OPTIONS = [
  {id: 1, value: '$', label: '$'},
  {id: 2, value: '₹', label: '₹'},
];
const SALARY_OPTIONS = [
  {id: 1, value: 'Fixed', label: 'Fixed'},
  {id: 2, value: 'Fixed + Variable', label: 'Fixed + Variable'},
];

const SKILLS = [
  {id: 1, value: 'JavaScript'},
  {id: 2, value: 'React'},
  {id: 3, value: 'Node.js'},
  {id: 4, value: 'Python'},
  {id: 5, value: 'SQL'},
  {id: 6, value: 'C++'},
  {id: 7, value: 'Java'},
  {id: 8, value: 'AWS'},
  {id: 9, value: 'Docker'},
  {id: 10, value: 'Kubernetes'},
];

const getInitialValues = (editingIndex, submittedDataList) => {
  if (
    editingIndex !== null &&
    submittedDataList &&
    submittedDataList[editingIndex]
  ) {
    const submittedData = submittedDataList[editingIndex];
    return {
      currentCompany: submittedData.currentCompany || 'Yes',
      employmentType: submittedData.employmentType || 'Full-time',
      currentCompanyName: submittedData.currentCompanyName || '',
      currentJobTitle: submittedData.currentJobTitle || '',
      jobProfile: submittedData.jobProfile || '',
      updatedExperienceYears: submittedData.updatedExperienceYears || '',
      updatedExperienceMonths: submittedData.updatedExperienceMonths || '',
      joiningDate: submittedData.joiningDate || new Date(),
      leavingDate: submittedData.leavingDate || new Date(),
      noticePeriod: submittedData.noticePeriod || '',
      currency: submittedData.currency || '₹',
      salary: submittedData.salary || '',
      selectedSkills: submittedData.selectedSkills || [],
      previousCompanyName: submittedData.previousCompanyName || '',
      previousJobTitle: submittedData.previousJobTitle || '',
      previousJobProfile: submittedData.previousJobProfile || '',
      workedfrom: submittedData.workedfrom || new Date(),
      workedtill: submittedData.workedtill || new Date(),
      location: submittedData.location || '',
      department: submittedData.department || '',
    };
  }

  // Default values for a new entry
  return {
    currentCompany: 'Yes',
    employmentType: 'Full-time',
    currentCompanyName: '',
    currentJobTitle: '',
    jobProfile: '',
    updatedExperienceYears: '',
    updatedExperienceMonths: '',
    joiningDate: new Date(),
    leavingDate: new Date(),
    noticePeriod: '',
    currency: '₹',
    salary: '',
    salarybreakdown: '',
    selectedSkills: [],
    previousCompanyName: '',
    previousJobTitle: '',
    previousJobProfile: '',
    workedfrom: new Date(),
    workedtill: new Date(),
    location: '',
    department: '',
  };
};

// // Validation Schema
// const EmploymentValidationSchema = Yup.object().shape({
//   currentCompanyName: Yup.string().when('currentCompany', {
//     is: 'Yes',
//     then: Yup.string().required('Current company name is required'),
//   }),
//   currentJobTitle: Yup.string().when('currentCompany', {
//     is: 'Yes',
//     then: Yup.string().required('Current job title is required'),
//   }),
//   jobProfile: Yup.string()
//     .required('Job profile is required')
//     .min(10, 'Profile description must be at least 10 characters'),
//   updatedExperienceYears: Yup.string().when('currentCompany', {
//     is: 'Yes',
//     then: Yup.string().required('Experience in years is required'),
//   }),
//   updatedExperienceMonths: Yup.string().when('updatedExperienceYears', {
//     is: value => value !== '30+',
//     then: Yup.string().required('Experience in months is required'),
//   }),
//   salary: Yup.number()
//     .required('Salary is required')
//     .positive('Salary must be a positive number'),
//   joiningDate: Yup.date().required('Joining date is required'),
//   leavingDate: Yup.date().when('currentCompany', {
//     is: 'No',
//     then: Yup.date()
//       .required('Leaving date is required')
//       .min(Yup.ref('joiningDate'), 'Leaving date must be after joining date'),
//   }),
//   selectedSkills: Yup.array()
//     .of(Yup.string())
//     .min(1, 'At least one skill must be selected'),
//   previousCompanyName: Yup.string().when('currentCompany', {
//     is: 'No',
//     then: Yup.string().required('Previous company name is required'),
//   }),
//   previousJobTitle: Yup.string().when('currentCompany', {
//     is: 'No',
//     then: Yup.string().required('Previous job title is required'),
//   }),
// });
const Employment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedDataList, setSubmittedDataList] = useState([]); // For multiple entries
  const [editingIndex, setEditingIndex] = useState(null); // Track which entry is being edited

  const handleSubmitForm = values => {
    const formattedSkills = values.selectedSkills.map(skill =>
      typeof skill === 'string'
        ? skill
        : SKILLS.find(item => item.value === skill?.value)?.value ||
          skill?.value ||
          '',
    );

    const formattedData = {
      ...values,
      selectedSkills: formattedSkills, // Add formatted skills to saved data
    };

    if (editingIndex !== null) {
      // Update existing entry
      setSubmittedDataList(prevData =>
        prevData.map((entry, index) =>
          index === editingIndex ? formattedData : entry,
        ),
      );
    } else {
      // Add new entry
      setSubmittedDataList(prevData => [...prevData, formattedData]);
    }

    setModalVisible(false); // Close modal
    setEditingIndex(null); // Reset editing index
  };

  const openModalForNewEntry = () => {
    setEditingIndex(null);
    setModalVisible(true);
  };

  const openModalForEdit = index => {
    setEditingIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>EMPLOYMENT</Text>
        <IconButton
          icon={'plus-circle-outline'}
          iconColor={colors.blackText}
          size={20}
          onPress={openModalForNewEntry}
          style={profileStyle.editButton}
        />
      </View>

      {/* Display all submitted data entries */}
      {submittedDataList.length > 0 ? (
        submittedDataList.map((entry, index) => (
          <View key={index} style={styles.outputContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.outputHeading}>Entry {index + 1}</Text>
              <IconButton
                icon="pencil-outline"
                iconColor={'black'}
                size={20}
                onPress={() => openModalForEdit(index)} // Open modal with entry index
                style={profileStyle.editButton}
              />
            </View>
            <Text style={styles.outputText}>
              Current Company: {entry.currentCompany}
            </Text>
            <Text style={styles.outputText}>
              Employment Type: {entry.employmentType}
            </Text>
            <Text style={styles.outputText}>
              Current Company Name: {entry.currentCompanyName}
            </Text>
            <Text style={styles.outputText}>
              Current Job Title: {entry.currentJobTitle}
            </Text>
            <Text style={styles.outputText}>
              Job Profile: {entry.jobProfile}
            </Text>
            <Text style={styles.outputText}>
              Joining Date: {new Date(entry.joiningDate).toLocaleDateString()}
            </Text>
            <Text style={styles.outputText}>
              Notice Period: {entry.noticePeriod}
            </Text>
            <Text style={styles.outputText}>
              Updated Experience: {entry.updatedExperienceYears} Years{' '}
              {entry.updatedExperienceYears !== '30+'
                ? `${entry.updatedExperienceMonths} Months`
                : ''}
            </Text>
            <Text style={styles.outputText}>Currency: {entry.currency}</Text>
            <Text style={styles.outputText}>Salary: {entry.salary}</Text>
            <Text style={styles.outputText}>
              Skills Used: {entry.selectedSkills.join(', ')}
            </Text>
          </View>
        ))
      ) : (
        <Text style={profileStyle.optionalData}>No data submitted yet.</Text>
      )}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalBackground}>
          <View style={profileStyle.modalContainer}>
            <Formik
              initialValues={getInitialValues(editingIndex, submittedDataList)}
              onSubmit={handleSubmitForm}>
              {({values, setFieldValue, handleSubmit, handleChange}) => (
                <ScrollView contentContainerStyle={styles.container}>
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>
                      Dropdown Fields Example with Save
                    </Text>
                    <Text style={profileStyle.formSubHeading}>
                      Details like job title, company name, etc, help employers
                      understand your work{' '}
                    </Text>
                    <CustomTabs
                      label="Current Company"
                      options={CURRENT_COMPANY_OPTIONS}
                      selectedValue={values.currentCompany}
                      setFieldValue={setFieldValue}
                      fieldName="currentCompany"
                    />
                    <CustomTabs
                      label="Employment Type"
                      options={EMPLOYMENT_TYPES}
                      selectedValue={values.employmentType}
                      setFieldValue={setFieldValue}
                      fieldName="employmentType"
                    />

                    {/* Conditional Fields */}
                    {values.currentCompany === 'Yes' &&
                      values.employmentType === 'Full-time' && (
                        <View>
                          {/* Updated Experience Dropdowns */}
                          <Text style={styles.subheading}>
                            Updated Experience
                          </Text>
                          <View style={{flexDirection: 'row', gap: 8}}>
                            <View style={{flex: 1}}>
                              <ReusableDropdown
                                options={YEAR_OPTIONS}
                                placeholder="Select Years*"
                                selectedValue={values.updatedExperienceYears}
                                onSelect={selected =>
                                  setFieldValue(
                                    'updatedExperienceYears',
                                    selected.value,
                                  )
                                }
                              />
                            </View>

                            {values.updatedExperienceYears !== '30+' && (
                              <View style={{flex: 1}}>
                                <ReusableDropdown
                                  options={MONTH_OPTIONS}
                                  placeholder="Select Months*"
                                  selectedValue={values.updatedExperienceMonths}
                                  onSelect={selected =>
                                    setFieldValue(
                                      'updatedExperienceMonths',
                                      selected.value,
                                    )
                                  }
                                />
                              </View>
                            )}
                          </View>

                          <ReusableTextInput
                            name="currentCompanyName"
                            label="Current Company Name*"
                            value={values.currentCompanyName}
                            onChangeText={handleChange('currentCompanyName')}
                          />
                          <ReusableTextInput
                            name="currentJobTitle"
                            label="Current job title*"
                            value={values.currentJobTitle}
                            onChangeText={handleChange('currentJobTitle')}
                          />

                          {/* Joining Date Picker */}
                          <ReusableDatePicker
                            label="Joining Date*"
                            value={values.joiningDate}
                            onChange={date =>
                              setFieldValue('joiningDate', date)
                            }
                          />

                          {/* Currency Dropdown */}
                          <Text style={styles.subheading}>Currency</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 4,
                            }}>
                            <View style={{width: '20%'}}>
                              <ReusableDropdown
                                options={CURRENCY_OPTIONS}
                                placeholder={values.currency}
                                selectedValue={values.currency}
                                onSelect={selected =>
                                  setFieldValue('currency', selected.value)
                                }
                              />
                            </View>
                            <View style={{flex: 1, marginTop: -7}}>
                              <ReusableTextInput
                                name="salary"
                                label="Current salary"
                                value={values.salary}
                                onChangeText={handleChange('salary')}
                              />
                            </View>
                          </View>

                          <ReusableDropdown
                            options={SALARY_OPTIONS}
                            placeholder="Salary Breakdown*"
                            selectedValue={values.salarybreakdown}
                            onSelect={selected =>
                              setFieldValue('salarybreakdown', selected.value)
                            }
                          />

                          {/* Show note if "Fixed" is selected */}
                          {values.salarybreakdown === 'Fixed' && (
                            <Text style={styles.noteText}>
                              Your total salary has been considered as fixed
                              component.
                            </Text>
                          )}

                          {/* Show additional fields if "Fixed + Variable" is selected */}
                          {values.salarybreakdown === 'Fixed + Variable' && (
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 4,
                                  marginBottom: 8,
                                }}>
                                {/* Fixed Salary */}
                                <View style={{flex: 1}}>
                                  <ReusableTextInput
                                    name="fixedSalary"
                                    label="Fixed Salary"
                                    value={values.fixedSalary}
                                    onChangeText={handleChange('fixedSalary')}
                                    keyboardType="numeric"
                                  />
                                </View>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  gap: 4,
                                }}>
                                {/* Variable Salary */}
                                <View style={{flex: 1}}>
                                  <ReusableTextInput
                                    name="variableSalary"
                                    label="Variable Salary"
                                    value={values.variableSalary}
                                    onChangeText={handleChange(
                                      'variableSalary',
                                    )}
                                    keyboardType="numeric"
                                  />
                                </View>
                              </View>
                            </View>
                          )}

                          {/* Skills Used Multi-Select */}
                          <Text style={styles.subheading}>Skills Used</Text>
                          <CustomSelectionModal
                            title="Skills Used"
                            data={SKILLS}
                            selectedItems={values.selectedSkills.map(
                              skill =>
                                SKILLS.find(item => item.value === skill) || {
                                  id: null,
                                  value: skill,
                                },
                            )}
                            setSelectedItems={items =>
                              setFieldValue(
                                'selectedSkills',
                                items.map(item => item?.value || ''),
                              )
                            }
                            placeholder="Select Skills"
                            isMultiSelect
                            maxSelectionLimit={5}
                          />

                          <ReusableTextInput
                            name="jobProfile"
                            label="Job profile*"
                            value={values.jobProfile}
                            onChangeText={handleChange('jobProfile')}
                          />

                          {/* Notice Period Tabs */}
                          <CustomTabs
                            label="Notice Period*"
                            options={NOTICEPERIOD_OPTIONS}
                            selectedValue={values.noticePeriod}
                            setFieldValue={setFieldValue}
                            fieldName="noticePeriod"
                          />
                        </View>
                      )}

                    {values.currentCompany === 'No' &&
                      values.employmentType === 'Full-time' && (
                        <View>
                          <ReusableTextInput
                            name="previousCompanyName"
                            label="Previous Company Name"
                            value={values.previousCompanyName}
                            onChangeText={handleChange('previousCompanyName')}
                          />
                          <ReusableTextInput
                            name="previousJobTitle"
                            label="Previous Job Title"
                            value={values.previousJobTitle}
                            onChangeText={handleChange('previousJobTitle')}
                          />
                          <ReusableTextInput
                            name="previousJobProfile"
                            label="Job Profile"
                            value={values.previousJobProfile}
                            onChangeText={handleChange('previousJobProfile')}
                          />

                          <ReusableDatePicker
                            label="Joining Date"
                            value={values.joiningDate}
                            onChange={date =>
                              setFieldValue('joiningDate', date)
                            }
                          />
                          <ReusableDatePicker
                            label="Leaving Date"
                            value={values.leavingDate}
                            onChange={date =>
                              setFieldValue('leavingDate', date)
                            }
                          />
                        </View>
                      )}
                    {/* Yes - Internship Condition */}
                    {values.currentCompany === 'Yes' &&
                      values.employmentType === 'Internship' && (
                        <View>
                          <ReusableTextInput
                            name="companyName"
                            label="Company Name"
                            value={values.companyName}
                            onChangeText={handleChange('companyName')}
                          />
                          <ReusableTextInput
                            name="location"
                            label="Location"
                            value={values.location}
                            onChangeText={handleChange('location')}
                          />
                          <ReusableTextInput
                            name="department"
                            label="Department"
                            value={values.department}
                            onChangeText={handleChange('department')}
                          />
                          {/* Currency Dropdown */}
                          <Text style={styles.subheading}>Currency</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 4,
                            }}>
                            <View style={{width: '20%'}}>
                              <ReusableDropdown
                                options={CURRENCY_OPTIONS}
                                placeholder={values.currency}
                                selectedValue={values.currency}
                                onSelect={selected =>
                                  setFieldValue('currency', selected.value)
                                }
                              />
                            </View>
                            <View style={{flex: 1, marginTop: -7}}>
                              <ReusableTextInput
                                name="salary"
                                label="Current salary"
                                value={values.salary}
                                onChangeText={handleChange('salary')}
                              />
                            </View>
                          </View>
                          <ReusableDatePicker
                            label="Worked From"
                            value={values.joiningDate}
                            onChange={date =>
                              setFieldValue('workingtrom', date)
                            }
                          />

                          <ReusableTextInput
                            name="workingtill"
                            label="Worked Till"
                            value="Present" // Sets the value to "Present"
                            editable={false} // Makes the field non-editable
                          />
                        </View>
                      )}
                    {values.currentCompany === 'No' &&
                      values.employmentType === 'Internship' && (
                        <View>
                          <ReusableTextInput
                            name="companyName"
                            label="Company Name"
                            value={values.companyName}
                            onChangeText={handleChange('companyName')}
                          />
                          <ReusableTextInput
                            name="location"
                            label="Location"
                            value={values.location}
                            onChangeText={handleChange('location')}
                          />
                          <ReusableTextInput
                            name="department"
                            label="Department"
                            value={values.department}
                            onChangeText={handleChange('department')}
                          />
                          {/* Currency Dropdown */}
                          <Text style={styles.subheading}>Currency</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 4,
                            }}>
                            <View style={{width: '20%'}}>
                              <ReusableDropdown
                                options={CURRENCY_OPTIONS}
                                placeholder={values.currency}
                                selectedValue={values.currency}
                                onSelect={selected =>
                                  setFieldValue('currency', selected.value)
                                }
                              />
                            </View>
                            <View style={{flex: 1, marginTop: -7}}>
                              <ReusableTextInput
                                name="salary"
                                label="Current salary"
                                value={values.salary}
                                onChangeText={handleChange('salary')}
                              />
                            </View>
                          </View>
                          <ReusableDatePicker
                            label="Worked From"
                            value={values.joiningDate}
                            onChange={date =>
                              setFieldValue('joiningDate', date)
                            }
                          />

                          <ReusableDatePicker
                            label="Worked Till*"
                            value={values.leavingDate}
                            onChange={date =>
                              setFieldValue('leavingDate', date)
                            }
                          />
                        </View>
                      )}
                    {/* Modal Footer */}
                    <ModalFooter
                      onPress={handleSubmit} // Correctly wired to handle form submission
                      onCancel={() => console.log('Modal closed')}
                    />
                  </View>
                </ScrollView>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheading: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  outputContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#e8f5e9',
  },
  outputHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2e7d32',
  },
  outputText: {
    fontSize: 16,
    color: '#388e3c',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 11,
    color: '#009900',
  },
});

export default Employment;
