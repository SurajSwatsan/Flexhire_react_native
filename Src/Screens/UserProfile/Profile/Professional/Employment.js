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
import {colors} from '../../../../Global_CSS/TheamColors';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const EmploymentValidationSchema = values => {
  const schema = {};

  // Validation for Full-time employment when currentCompany is "Yes"
  if (
    values.employmentType === 'Full-time' &&
    values.currentCompany === 'Yes'
  ) {
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
      'Experience in months is required',
    );
    schema.salary = Yup.string().required('Salary is required');
    schema.salarybreakdown = Yup.string()
      .required('Salary breakdown is required')
      .oneOf(
        ['Fixed', 'Fixed + Variable'],
        'Invalid salary breakdown selection',
      );
    schema.jobProfile = Yup.string()
      .nullable() // Allow the field to be null or undefined
      .notRequired() // Explicitly mark it as not required
      .test(
        'min-length-when-provided',
        'Job profile must be at least 10 characters when provided',
        value => !value || value.length >= 10,
      );
    schema.noticePeriod = Yup.string().required('Notice period is required');
  }

  // Validation for Full-time employment when currentCompany is "No"
  if (values.employmentType === 'Full-time' && values.currentCompany === 'No') {
    schema.CompanyName = Yup.string().required(
      'Previous company name is required',
    );
    schema.JobTitle = Yup.string().required('Previous job title is required');
    schema.jobProfile = Yup.string()
    .nullable() // Allow the field to be null or undefined
    .notRequired() // Explicitly mark it as not required
    .test(
      'min-length-when-provided',
      'Job profile must be at least 10 characters when provided',
      value => !value || value.length >= 10,
    );
    schema.joiningDate = Yup.date()
      .required('Joining date is required')
      .max(new Date(), 'Joining date cannot be in the future');
    schema.leavingDate = Yup.date()
      .required('Leaving date is required')
      .min(Yup.ref('joiningDate'), 'Leaving date must be after joining date');
  }

  // Validation for Internship
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
    schema.roleCategory = Yup.string().required(
      'Role category is required for internship',
    );
    schema.role = Yup.string().required('Role is required for internship');
    schema.workedfrom = Yup.date()
      .required('Worked from date is required')
      .max(new Date(), 'Worked from date cannot be in the future');

    // Conditional validation for workedtill
    if (values.currentCompany === 'No') {
      schema.workedtill = Yup.date()
        .required('Worked till date is required')
        .min(
          Yup.ref('workedfrom'),
          'Worked till date must be after worked from date',
        );
    }
  }

  return Yup.object().shape(schema);
};

const Employment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedDataList, setSubmittedDataList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track which data is being edited
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
    };

    if (editingIndex !== null) {
      // Update existing data
      setSubmittedDataList(prevData =>
        prevData.map((data, index) =>
          index === editingIndex ? formattedData : data,
        ),
      );
    } else {
      // Add new data
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
        submittedDataList.map((data, index) => (
          <TouchableOpacity
            key={index}
            style={styles.outputContainer}
            onPress={() => openModalForEdit(index)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 18,
                  marginHorizontal: 18,
                  gap: 12,
                }}>
                <Ionicons
                  name="business" // Match the icon with the option
                  size={42}
                  color="gray"
                  // style={{alignSelf: 'flex-start'}} // Spacing between icon and text
                />
                <View style={{flex: 1}}>
                  <Text style={styles.CompanyName}>{data.CompanyName}</Text>
                  {data.JobTitle && (
                    <Text style={styles.JobTitle}>{data.JobTitle}</Text>
                  )}
                  {data.role && (
                    <Text style={styles.JobTitle}>{data.role}</Text>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <Text style={styles.otherdata}>{data.employmentType}</Text>
                    <Text style={styles.otherdata}>
                      {new Date(data.joiningDate).toLocaleDateString()} -{' '}
                      {data.leavingDate
                        ? new Date(data.leavingDate).toLocaleDateString()
                        : 'Present'}
                    </Text>
                  </View>
                </View>
              </View>
              <IconButton
                icon="pencil-outline"
                iconColor={'black'}
                size={20}
                onPress={() => openModalForEdit(index)}
                style={{alignSelf: 'flex-start'}}
              />
            </View>
            {data.jobProfile && (
              <Text style={styles.jobProfile}>{data.jobProfile}</Text>
            )}
          </TouchableOpacity>
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
                } catch (validationErrors) {
                  return validationErrors.inner.reduce((acc, error) => {
                    acc[error.path] = error.message;
                    return acc;
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
                            <View style={{flex: 1, top: -6}}>
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
                            label="Previous Company Name*"
                            value={values.CompanyName}
                            onChangeText={handleChange('CompanyName')}
                          />
                          <ReusableTextInput
                            name="JobTitle"
                            label="Previous Job Title*"
                            value={values.JobTitle}
                            onChangeText={handleChange('JobTitle')}
                          />
                          <ReusableTextInput
                            name="jobProfile"
                            label="Job Profile*"
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
                            name="CompanyName"
                            label="Company Name*"
                            value={values.CompanyName}
                            onChangeText={handleChange('CompanyName')}
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
                            name="CompanyName"
                            label="Company Name"
                            value={values.CompanyName}
                            onChangeText={handleChange('CompanyName')}
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
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  CompanyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  JobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 4,
  },

  otherdata: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  jobProfile: {
    fontSize: 13,
    color: '#808080',
    marginBottom: 18,
    marginHorizontal: 18,
  },

  noteText: {
    fontSize: 11,
    color: '#009900',
  },
});

export default Employment;
