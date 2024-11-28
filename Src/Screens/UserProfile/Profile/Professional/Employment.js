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

const DEPARTMENT_OPTIONS = [
  {
    id: 1,
    value: 'BFSI, Investments & Trading',
    label: 'BFSI, Investments & Trading',
  },
  {
    id: 2,
    value: 'Customer Success, Service & Operations',
    label: 'Customer Success, Service & Operations',
  },
  {id: 3, value: 'Data Science & Analytics', label: 'Data Science & Analytics'},
  {
    id: 4,
    value: 'Engineering - Hardware & Networks',
    label: 'Engineering - Hardware & Networks',
  },
  {
    id: 5,
    value: 'Engineering - Software & QA',
    label: 'Engineering - Software & QA',
  },
  {id: 6, value: 'Finance & Accounting', label: 'Finance & Accounting'},
  {id: 7, value: 'Human Resources', label: 'Human Resources'},
  {
    id: 8,
    value: 'IT & Information Security',
    label: 'IT & Information Security',
  },
  {
    id: 9,
    value: 'Marketing & Communication',
    label: 'Marketing & Communication',
  },
  {id: 10, value: 'Product Management', label: 'Product Management'},
  {
    id: 11,
    value: 'Production, Manufacturing & Engineering',
    label: 'Production, Manufacturing & Engineering',
  },
  {
    id: 12,
    value: 'Project & Program Management',
    label: 'Project & Program Management',
  },
  {id: 13, value: 'Quality Assurance', label: 'Quality Assurance'},
  {
    id: 14,
    value: 'Sales & Business Development',
    label: 'Sales & Business Development',
  },
  {
    id: 15,
    value: 'UX, Design & Architecture',
    label: 'UX, Design & Architecture',
  },
  {
    id: 16,
    value: 'Administration & Facilities',
    label: 'Administration & Facilities',
  },
  {id: 17, value: 'Aviation & Aerospace', label: 'Aviation & Aerospace'},
  {
    id: 18,
    value: 'Construction & Site Engineering',
    label: 'Construction & Site Engineering',
  },
  {id: 19, value: 'Consulting', label: 'Consulting'},
  {
    id: 20,
    value: 'Content, Editorial & Journalism',
    label: 'Content, Editorial & Journalism',
  },
  {id: 21, value: 'CSR & Social Service', label: 'CSR & Social Service'},
  {id: 22, value: 'Energy & Mining', label: 'Energy & Mining'},
  {
    id: 23,
    value: 'Environment Health & Safety',
    label: 'Environment Health & Safety',
  },
  {
    id: 24,
    value: 'Food, Beverage & Hospitality',
    label: 'Food, Beverage & Hospitality',
  },
  {
    id: 25,
    value: 'Healthcare & Life Sciences',
    label: 'Healthcare & Life Sciences',
  },
  {id: 26, value: 'Legal & Regulatory', label: 'Legal & Regulatory'},
  {
    id: 27,
    value: 'Media Production & Entertainment',
    label: 'Media Production & Entertainment',
  },
  {
    id: 28,
    value: 'Merchandising, Retail & eCommerce',
    label: 'Merchandising, Retail & eCommerce',
  },
  {
    id: 29,
    value: 'Procurement & Supply Chain',
    label: 'Procurement & Supply Chain',
  },
  {id: 30, value: 'Research & Development', label: 'Research & Development'},
  {
    id: 31,
    value: 'Risk Management & Compliance',
    label: 'Risk Management & Compliance',
  },
  {id: 32, value: 'Security Services', label: 'Security Services'},
  {id: 33, value: 'Shipping & Maritime', label: 'Shipping & Maritime'},
  {
    id: 34,
    value: 'Sports, Fitness & Personal Care',
    label: 'Sports, Fitness & Personal Care',
  },
  {
    id: 35,
    value: 'Strategic & Top Management',
    label: 'Strategic & Top Management',
  },
  {id: 36, value: 'Teaching & Training', label: 'Teaching & Training'},
  {id: 37, value: 'Other', label: 'Other'},
];

const ROLECATEGORY_OPTIONS = [
  {id: 1, value: 'DBA / Data Warehousing', label: 'DBA / Data Warehousing'},
  {id: 2, value: 'DevOps', label: 'DevOps'},
  {
    id: 3,
    value: 'Quality Assurance and Testing',
    label: 'Quality Assurance and Testing',
  },
  {id: 4, value: 'Software Development', label: 'Software Development'},
];

const ROLE_OPTIONS = [
  {id: 1, value: 'Automation Architect', label: 'Automation Architect'},
  {id: 2, value: 'Automation Developer', label: 'Automation Developer'},
  {id: 3, value: 'Back End Developer', label: 'Back End Developer'},
  {id: 4, value: 'Big Data Engineer', label: 'Big Data Engineer'},
  {id: 5, value: 'CRM Architect', label: 'CRM Architect'},
  {id: 6, value: 'Data Engineer', label: 'Data Engineer'},
  {id: 7, value: 'Data Platform Engineer', label: 'Data Platform Engineer'},
  {
    id: 8,
    value: 'Embedded Systems Engineer',
    label: 'Embedded Systems Engineer',
  },
  {id: 9, value: 'Engineering Manager', label: 'Engineering Manager'},
  {id: 10, value: 'ERP Architect', label: 'ERP Architect'},
  {id: 11, value: 'ERP Developer', label: 'ERP Developer'},
  {id: 12, value: 'Front End Developer', label: 'Front End Developer'},
  {id: 13, value: 'Full Stack Developer', label: 'Full Stack Developer'},
  {
    id: 14,
    value: 'Game Developer / Programmer',
    label: 'Game Developer / Programmer',
  },
  {id: 15, value: 'Head - Engineering', label: 'Head - Engineering'},
  {id: 16, value: 'Mobile / App Developer', label: 'Mobile / App Developer'},
  {id: 17, value: 'Practice Manager / Head', label: 'Practice Manager / Head'},
  {id: 18, value: 'Search Engineer', label: 'Search Engineer'},
  {id: 19, value: 'Solution Architect', label: 'Solution Architect'},
  {id: 20, value: 'Technical Architect', label: 'Technical Architect'},
  {id: 21, value: 'Technical Lead', label: 'Technical Lead'},
  {id: 22, value: 'Webmaster', label: 'Webmaster'},
  {
    id: 23,
    value: 'Software Development - Other',
    label: 'Software Development - Other',
  },
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

    (schema.salarybreakdown = Yup.string()
      .required('Salary breakdown is required')
      .oneOf(
        ['Fixed', 'Fixed + Variable'],
        'Invalid salary breakdown selection',
      )),
      (schema.fixedSalary = Yup.string()
        .matches(
          /^\d+(\.\d{1,2})?$/,
          'Fixed salary must be a valid number with up to two decimals',
        )
        .test(
          'required-if-fixed-variable',
          'Fixed salary is required for Fixed + Variable salary breakdown',
          function (value) {
            const {salarybreakdown} = this.parent;
            return salarybreakdown !== 'Fixed + Variable' || Boolean(value);
          },
        )),
      (schema.variableSalary = Yup.string()
        .matches(
          /^\d+(\.\d{1,2})?$/,
          'Variable salary must be a valid number with up to two decimals',
        )
        .test(
          'required-if-fixed-variable',
          'Variable salary is required for Fixed + Variable salary breakdown',
          function (value) {
            const {salarybreakdown} = this.parent;
            return salarybreakdown !== 'Fixed + Variable' || Boolean(value);
          },
        )
        .test(
          'sum-not-greater-than-total',
          'The sum of Fixed and Variable Salary must not exceed Total Salary',
          function (value) {
            const {fixedSalary, salary, salarybreakdown} = this.parent;
            if (salarybreakdown === 'Fixed + Variable') {
              const fixed = parseFloat(fixedSalary || 0);
              const variable = parseFloat(value || 0);
              const totalSalary = parseFloat(salary || 0);
              return fixed + variable === totalSalary;
            }
            return true;
          },
        )),
      (schema.jobProfile = Yup.string()
        .nullable() // Allow the field to be null or undefined
        .notRequired() // Explicitly mark it as not required
        .test(
          'min-length-when-provided',
          'Job profile must be at least 10 characters when provided',
          value => !value || value.length >= 10,
        ));
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
        <Text style={profileStyle.optionalData}>
          Your employment details will help recruiters understand your
          experience.
        </Text>
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
                          <ReusableDropdown
                            options={DEPARTMENT_OPTIONS}
                            placeholder="Department*"
                            selectedValue={values.department}
                            onSelect={selected =>
                              setFieldValue('department', selected.value)
                            }
                            error={errors.department}
                            touched={touched.department}
                          />
                          <ReusableDropdown
                            options={ROLECATEGORY_OPTIONS}
                            placeholder="Role Category*"
                            selectedValue={values.roleCategory}
                            onSelect={selected =>
                              setFieldValue('roleCategory', selected.value)
                            }
                            error={errors.roleCategory}
                            touched={touched.roleCategory}
                          />
                          <ReusableDropdown
                            options={ROLE_OPTIONS}
                            placeholder="Role*"
                            selectedValue={values.role}
                            onSelect={selected =>
                              setFieldValue('role', selected.value)
                            }
                            error={errors.role}
                            touched={touched.role}
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
                          <ReusableDropdown
                            options={DEPARTMENT_OPTIONS}
                            placeholder="Department*"
                            selectedValue={values.department}
                            onSelect={selected =>
                              setFieldValue('department', selected.value)
                            }
                            error={errors.department}
                            touched={touched.department}
                          />
                          <ReusableDropdown
                            options={ROLECATEGORY_OPTIONS}
                            placeholder="Role Category*"
                            selectedValue={values.roleCategory}
                            onSelect={selected =>
                              setFieldValue('roleCategory', selected.value)
                            }
                            error={errors.roleCategory}
                            touched={touched.roleCategory}
                          />
                          <ReusableDropdown
                            options={ROLE_OPTIONS}
                            placeholder="Role*"
                            selectedValue={values.role}
                            onSelect={selected =>
                              setFieldValue('role', selected.value)
                            }
                            error={errors.role}
                            touched={touched.role}
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
