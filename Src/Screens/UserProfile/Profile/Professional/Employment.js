import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Modal} from 'react-native';
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
import {colors} from '../../../../Global_CSS/TheamColors';
import moment from 'moment';

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
      ...submittedData,
      selectedSkills: submittedData.selectedSkills || [], // Ensure selectedSkills is an array
      joiningDate: submittedData.joiningDate
        ? new Date(submittedData.joiningDate)
        : null,
      leavingDate: submittedData.leavingDate
        ? new Date(submittedData.leavingDate)
        : null,
      workedfrom: submittedData.workedfrom
        ? new Date(submittedData.workedfrom)
        : null,
      workedtill: submittedData.workedtill
        ? new Date(submittedData.workedtill)
        : null,
    };
  }

  return {
    currentCompany: 'Yes',
    employmentType: 'Full-time',
    CompanyName: '',
    JobTitle: '',
    jobProfile: '',
    updatedExperienceYears: '',
    updatedExperienceMonths: '',
    joiningDate: null,
    leavingDate: null,
    workedfrom: null,
    workedtill: null,
    location: '',
    department: '',
    roleCategory: '',
    role: '',
    noticePeriod: '',
    currency: '₹',
    salary: '',
    salarybreakdown: '',
    fixedSalary: '',
    variableSalary: '',
    selectedSkills: [],
  };
};

// const EmploymentValidationSchema = Yup.object().shape({
//   currentCompany: Yup.string()
//     .oneOf(['Yes', 'No'], 'Invalid current company selection')
//     .required('Current company selection is required'),

//   employmentType: Yup.string()
//     .oneOf(['Full-time', 'Internship'], 'Invalid employment type selection')
//     .required('Employment type is required'),

//   CompanyName: Yup.string().test(
//     'is-required-when-current-company',
//     'Current company name is required when currentCompany is "Yes"',
//     function (value) {
//       const {currentCompany} = this.parent || {}; // Access the related field
//       if (currentCompany === 'Yes') {
//         return !!value; // Return true if the field has a value
//       }
//       return true; // Skip validation if currentCompany is not "Yes"
//     },
//   ),

//   JobTitle: Yup.string().test(
//     'is-required-when-current-company',
//     'Current job title is required when currentCompany is "Yes"',
//     function (value) {
//       const {currentCompany} = this.parent || {}; // Access the value of currentCompany
//       if (currentCompany === 'Yes') {
//         return !!value; // Validate that JobTitle has a value
//       }
//       return true; // Skip validation if currentCompany is not "Yes"
//     },
//   ),

//   jobProfile: Yup.string()
//     .required('Job profile is required')
//     .min(10, 'Job profile must be at least 10 characters'),

//   updatedExperienceYears: Yup.string()
//     .required('Experience in years is required')
//     .test(
//       'valid-experience-years',
//       'Experience in years must be a valid number or "30+"',
//       value => value && (value === '30+' || /^\d+$/.test(value)), // Validates numbers or "30+"
//     ),

//   updatedExperienceMonths: Yup.string()
//     .test(
//       'required-experience-months',
//       'Experience in months is required',
//       function (value) {
//         const {updatedExperienceYears} = this.parent || {}; // Safely access parent values
//         if (updatedExperienceYears && updatedExperienceYears !== '30+') {
//           return !!value; // Months required if years are not "30+"
//         }
//         return true; // Skip validation if years are "30+"
//       },
//     )
//     .test(
//       'valid-experience-months',
//       'Experience in months must be a valid number between 0 and 11',
//       value =>
//         !value || (!isNaN(value) && Number(value) >= 0 && Number(value) <= 11), // Validate numeric months
//     ),

//   joiningDate: Yup.date()
//     .required('Joining date is required')
//     .max(new Date(), 'Joining date cannot be in the future'),

//   leavingDate: Yup.date()
//     .nullable() // Allow null when the field is not required
//     .test(
//       'is-required-when-no-current-company',
//       'Leaving date is required when currentCompany is "No"',
//       function (value) {
//         const {currentCompany} = this.parent || {}; // Access the parent value
//         if (currentCompany === 'No') {
//           return !!value; // Field must have a value when currentCompany is "No"
//         }
//         return true; // Skip validation otherwise
//       },
//     )
//     .test(
//       'must-be-after-joining-date',
//       'Leaving date must be after joining date',
//       function (value) {
//         const {joiningDate, currentCompany} = this.parent || {};
//         if (currentCompany === 'No' && value && joiningDate) {
//           return new Date(value) > new Date(joiningDate); // Ensure leavingDate > joiningDate
//         }
//         return true; // Skip validation for other cases
//       },
//     ),
//   noticePeriod: Yup.string().test(
//     'is-required-when-current-company',
//     'Notice period is required when currentCompany is "Yes"',
//     function (value) {
//       const {currentCompany} = this.parent || {}; // Access the parent value
//       if (currentCompany === 'Yes') {
//         return !!value; // Field must have a value when currentCompany is "Yes"
//       }
//       return true; // Skip validation otherwise
//     },
//   ),

//   salary: Yup.number()
//     .typeError('Salary must be a number')
//     .positive('Salary must be a positive number')
//     .required('Salary is required'),

//   salarybreakdown: Yup.string()
//     .oneOf(['Fixed', 'Fixed + Variable'], 'Invalid salary breakdown selection')
//     .required('Salary breakdown is required'),

//   fixedSalary: Yup.number()
//     .nullable() // Allow null when not required
//     .required('Fixed salary is required')
//     .test(
//       'match-total-salary',
//       'fixed + variable salary must match the total salary',
//       function (value) {
//         const {salary, variableSalary, salarybreakdown} = this.parent || {}; // Access parent fields
//         if (salarybreakdown === 'Fixed + Variable') {
//           const fixed = value || 0; // Default to 0 if value is null
//           const variable = variableSalary || 0; // Default to 0 if variableSalary is null
//           return fixed + variable === salary; // Ensure the sum matches the total salary
//         }
//         return true; // Skip validation for other cases
//       },
//     )
//     .typeError('Fixed salary must be a valid number'),

//   variableSalary: Yup.number()
//     .nullable() // Allow null when not required
//     .required('Variable salary is required')
//     .test(
//       'match-total-salary',
//       'fixed + variable salary must match the total salary',
//       function (value) {
//         const {salary, fixedSalary, salarybreakdown} = this.parent || {}; // Access parent fields
//         if (salarybreakdown === 'Fixed + Variable') {
//           const fixed = fixedSalary || 0; // Default to 0 if fixedSalary is null
//           const variable = value || 0; // Default to 0 if value is null
//           return fixed + variable === salary; // Ensure the sum matches the total salary
//         }
//         return true; // Skip validation for other cases
//       },
//     )
//     .typeError('Variable salary must be a valid number'),

//   selectedSkills: Yup.array()
//     .of(Yup.string())
//     .min(1, 'At least one skill must be selected')
//     .max(5, 'You can select up to 5 skills'),

//   CompanyName: Yup.string()
//     .nullable() // Allow null when not required
//     .test(
//       'is-required-when-no-current-company',
//       'Previous company name is required when currentCompany is "No"',
//       function (value) {
//         const {currentCompany} = this.parent || {}; // Access the value of currentCompany
//         if (currentCompany === 'No') {
//           return !!value; // Check if value exists
//         }
//         return true; // Skip validation for other cases
//       },
//     ),
//   JobTitle: Yup.string()
//     .nullable() // Allow null when not required
//     .test(
//       'is-required-when-no-current-company',
//       'Previous job title is required when currentCompany is "No"',
//       function (value) {
//         const {currentCompany} = this.parent || {}; // Access the value of currentCompany
//         if (currentCompany === 'No') {
//           return !!value; // Check if value exists
//         }
//         return true; // Skip validation for other cases
//       },
//     ),

//   location: Yup.string()
//     .nullable() // Allow null when not required
//     .test(
//       'is-required-when-internship',
//       'Location is required when employment type is "Internship"',
//       function (value) {
//         const {employmentType} = this.parent || {}; // Access the value of employmentType
//         if (employmentType === 'Internship') {
//           return !!value; // Validate that value exists
//         }
//         return true; // Skip validation for other cases
//       },
//     ),

//   department: Yup.string()
//     .nullable() // Allow null when not required
//     .test(
//       'is-required-when-internship',
//       'Department is required when employment type is "Internship"',
//       function (value) {
//         const {employmentType} = this.parent || {}; // Access the value of employmentType
//         if (employmentType === 'Internship') {
//           return !!value; // Validate that value exists
//         }
//         return true; // Skip validation for other cases
//       },
//     ),
// });

// Validation Schema

// Dynamic validation schema generator
// Dynamic validation schema generator
const EmploymentValidationSchema = values => {
  const schema = {};

  if (values.currentCompany === 'Yes') {
    schema.CompanyName = Yup.string().required(
      'Current company name is required',
    );
    schema.JobTitle = Yup.string().required('Current job title is required');
    schema.joiningDate = Yup.date()
      .required('Joining date is required')
      .max(new Date(), 'Joining date cannot be in the future');
    schema.updatedExperienceYears = Yup.string().required(
      'Experience in years is required',
    );

    schema.updatedExperienceMonths = Yup.string().required(
      'Experience in Month is required',
    );
    schema.salary = Yup.string().required('Salary is required');
    schema.salarybreakdown = Yup.string().required(
      'Salary breakdown is required',
    );
    schema.selectedSkills = Yup.array()
      .of(Yup.string())
      .min(1, 'At least one skill must be selected')
      .max(5, 'You can select up to 5 skills');
    schema.jobProfile = Yup.string()
      .nullable() // Allow the field to be null
      .min(10, 'Job profile must be at least 10 characters long when provided'); // Validate only if not null
  }

  if (values.currentCompany === 'No') {
    schema.CompanyName = Yup.string().required(
      'Previous company name is required',
    );
    schema.JobTitle = Yup.string().required('Previous job title is required');
    schema.joiningDate = Yup.date()
      .required('Joining date is required')
      .max(new Date(), 'Joining date cannot be in the future');
    schema.leavingDate = Yup.date()
      .required('Leaving date is required')
      .min(Yup.ref('joiningDate'), 'Leaving date must be after joining date');
  }

  if (values.employmentType === 'Internship') {
    schema.CompanyName = Yup.string().required(
      'Company name is required for internship',
    );
    schema.location = Yup.string().required(
      'Location is required for internships',
    );
    schema.department = Yup.string().required(
      'Department is required for internships',
    );
    schema.workedfrom = Yup.date()
      .required('Worked from date is required')
      .max(new Date(), 'Worked from date cannot be in the future');
    schema.workedtill = Yup.date()
      .required('Worked till date is required')
      .min(
        Yup.ref('workedfrom'),
        'Worked till date must be after worked from date',
      );
  }

  return Yup.object().shape(schema);
};

const Employment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedDataList, setSubmittedDataList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track which entry is being edited
  let formikRef = null;

  const handleSubmitForm = values => {
    
    const formattedData = {
      ...values,
      selectedSkills: values.selectedSkills.map(skill =>
        typeof skill === 'string'
          ? skill
          : SKILLS.find(item => item.value === skill?.value)?.value ||
            skill?.value ||
            '',
      ),
      workedfrom: values.workedfrom
        ? moment(values.workedfrom).format('YYYY-MM-DD')
        : null,
      workedtill: values.workedtill
        ? moment(values.workedtill).format('YYYY-MM-DD')
        : null,
      joiningDate: values.joiningDate
        ? moment(values.joiningDate).format('YYYY-MM-DD')
        : null,
      leavingDate: values.leavingDate
        ? moment(values.leavingDate).format('YYYY-MM-DD')
        : null,
      CompanyName: values.CompanyName || '',
      location: values.location || '',
      roleCategory: values.roleCategory || '',
      role: values.role || '',
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
  const deleteEmployment = () => {
    if (editingIndex !== null) {
      setSubmittedDataList(
        prevData => prevData.filter((_, index) => index !== editingIndex), // Use index for deletion
      );
      closeModal(); // Close modal after deletion
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };
  console.log('submited data', submittedDataList);

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
              Current Company Name: {entry.CompanyName}
            </Text>
            <Text style={styles.outputText}>
              Current Job Title: {entry.JobTitle}
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
              Selected Skills: {entry.selectedSkills.join(', ')}
            </Text>
            <Text style={styles.outputText}>
              salary breakdown: {entry.salarybreakdown}
            </Text>
            <Text style={styles.outputText}>
              fixedSalary: {entry.fixedSalary}
            </Text>
            <Text style={styles.outputText}>
              variableSalary: {entry.variableSalary}
            </Text>
            <Text style={styles.outputText}>
              CompanyName: {entry.CompanyName}
            </Text>
            <Text style={styles.outputText}>JobTitle: {entry.JobTitle}</Text>
            <Text>Joining Date: {entry.joiningDate || 'N/A'}</Text>
            <Text>Leaving Date: {entry.leavingDate || 'N/A'}</Text>
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
              // validationSchema={EmploymentValidationSchema}
              validate={values => {
                try {
                  EmploymentValidationSchema(values).validateSync(values, {
                    abortEarly: false,
                  });
                  return {};
                } catch (errors) {
                  return errors.inner.reduce((formErrors, err) => {
                    formErrors[err.path] = err.message;
                    return formErrors;
                  }, {});
                }
              }}
              innerRef={ref => (formikRef = ref)}
              onSubmit={handleSubmitForm}>
              {({
                values,
                setFieldValue,
                handleSubmit,
                handleChange,
                errors,
                touched,
              }) => (
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
                                error={errors.updatedExperienceYears}
                                touched={touched.updatedExperienceYears}
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
                                  error={errors.updatedExperienceMonths}
                                  touched={touched.updatedExperienceMonths}
                                />
                              </View>
                            )}
                          </View>

                          <ReusableTextInput
                            name="CompanyName"
                            label="Current Company Name*"
                            value={values.CompanyName}
                            onChangeText={handleChange('CompanyName')}
                          />
                          <ReusableTextInput
                            name="JobTitle"
                            label="Current job title*"
                            value={values.JobTitle}
                            onChangeText={handleChange('JobTitle')}
                          />

                          <ReusableDatePicker
                            label="Joining Date*"
                            value={values.joiningDate}
                            onChange={date =>
                              setFieldValue('joiningDate', date)
                            }
                            error={errors.joiningDate}
                            touched={touched.joiningDate}
                          />

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
                                keyboardType="numeric"
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
                            error={errors.salarybreakdown}
                            touched={touched.salarybreakdown}
                          />

                          {values.salarybreakdown === 'Fixed' && (
                            <Text style={styles.noteText}>
                              Your total salary has been considered as fixed
                              component.
                            </Text>
                          )}

                          {values.salarybreakdown === 'Fixed + Variable' && (
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
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
                            error={errors.selectedSkills}
                            touched={touched.selectedSkills}
                          />

                          <ReusableTextInput
                            name="jobProfile"
                            label="Job profile*"
                            value={values.jobProfile}
                            onChangeText={handleChange('jobProfile')}
                          />

                          <CustomTabs
                            label="Notice Period*"
                            options={NOTICEPERIOD_OPTIONS}
                            selectedValue={values.noticePeriod}
                            setFieldValue={setFieldValue}
                            fieldName="noticePeriod"
                            error={errors.noticePeriod}
                            touched={touched.noticePeriod}
                          />
                        </View>
                      )}

                    {values.currentCompany === 'No' &&
                      values.employmentType === 'Full-time' && (
                        <View>
                          <ReusableTextInput
                            name="CompanyName"
                            label="Previous Company Name"
                            value={values.CompanyName}
                            onChangeText={handleChange('CompanyName')}
                          />
                          <ReusableTextInput
                            name="JobTitle"
                            label="Previous Job Title"
                            value={values.JobTitle}
                            onChangeText={handleChange('JobTitle')}
                          />
                          <ReusableTextInput
                            name="jobProfile"
                            label="Job Profile"
                            value={values.jobProfile}
                            onChangeText={handleChange('jobProfile')}
                          />

                          <ReusableDatePicker
                            label="Joining Date"
                            value={values.joiningDate}
                            onChange={date =>
                              setFieldValue('joiningDate', new Date(date))
                            }
                          />
                          <ReusableDatePicker
                            label="Leaving Date"
                            value={values.leavingDate}
                            onChange={date =>
                              setFieldValue('leavingDate', new Date(date))
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
                            label="Department*"
                            value={values.department}
                            onChangeText={handleChange('department')}
                          />
                          <ReusableTextInput
                            name="roleCategory"
                            label="Role Category*"
                            value={values.roleCategory}
                            onChangeText={handleChange('roleCategory')}
                          />
                          <ReusableTextInput
                            name="role"
                            label="Role*"
                            value={values.role}
                            onChangeText={handleChange('role')}
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
                                keyboardType="numeric"
                              />
                            </View>
                          </View>
                          <ReusableDatePicker
                            label="Worked From"
                            value={values.workedfrom}
                            onChange={date =>
                              setFieldValue('workedfrom', new Date(date))
                            }
                            error={errors.workedfrom}
                            touched={touched.workedfrom}
                          />
                          {/* 
                          <ReusableTextInput
                            name="workingtill"
                            label="Worked Till"
                            value="Present" // Sets the value to "Present"
                            editable={false} // Makes the field non-editable
                          /> */}
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
                            label="Department*"
                            value={values.department}
                            onChangeText={handleChange('department')}
                          />
                          <ReusableTextInput
                            name="roleCategory"
                            label="Role Category*"
                            value={values.roleCategory}
                            onChangeText={handleChange('roleCategory')}
                          />
                          <ReusableTextInput
                            name="role"
                            label="Role*"
                            value={values.role}
                            onChangeText={handleChange('role')}
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
                            value={values.workedfrom}
                            onChange={date =>
                              setFieldValue('workedfrom', new Date(date))
                            }
                            error={errors.workedfrom}
                            touched={touched.workedfrom}
                          />

                          <ReusableDatePicker
                            label="Worked Till*"
                            value={values.workedtill}
                            onChange={date =>
                              setFieldValue('workedtill', new Date(date))
                            }
                            error={errors.workedtill}
                            touched={touched.workedtill}
                          />
                        </View>
                      )}
                    {/* Modal Footer */}
                  </View>
                </ScrollView>
              )}
            </Formik>
            <ModalFooter
              onPress={() => formikRef?.handleSubmit()}
              onCancel={closeModal}
              showDelete={editingIndex !== null}
              onDelete={editingIndex !== null ? deleteEmployment : null}
            />
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
