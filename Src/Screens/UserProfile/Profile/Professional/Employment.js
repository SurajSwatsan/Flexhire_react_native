import React, {useContext, useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import MasterViewController from '../../../../Redux/Action/MasterViewController';
import {ProfileContext} from '../../ProfileContext';

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

const CURRENCY_OPTIONS = [
  {id: 1, value: '$', label: '$'},
  {id: 2, value: '₹', label: '₹'},
  {id: 3, value: '€', label: '€'},
];
const SALARY_OPTIONS = [
  {id: 1, value: 'Fixed', label: 'Fixed'},
  {id: 2, value: 'Fixed + Variable', label: 'Fixed + Variable'},
];

const EmploymentValidationSchema = values => {
  const schema = {};

  // Validation for Full-time employment when currentCompany is "Yes"
  if (
    values.employment_type === 'Full-time' &&
    values.currentCompany === 'Yes'
  ) {
    schema.company_name = Yup.string().required(
      'Current company name is required',
    );
    schema.job_title = Yup.string().required('Current job title is required');
    schema.joining_date = Yup.date()
      .required('Joining date is required')
      .max(new Date(), 'Joining date cannot be in the future');

    // (schema.annual_salary = Yup.object({
    //   currency: Yup.string().required('Currency is required'), // Validate the currency
    //   amm: Yup.string()
    //     .matches(/^\d+$/, 'Amount must be a valid number') // Ensure it's numeric
    //     .required('Amount is required'), // Validate the amount
    // }).required('Annual Salary is required')), // Top-level validation for the object
    //   // schema.ammount = Yup.string().required('Salary is required');

    //   (schema.salary_breakdown = Yup.object().shape({
    //     name: Yup.string()
    //       .required('Salary breakdown is required')
    //       .oneOf(
    //         ['Fixed', 'Fixed + Variable'],
    //         'Invalid salary breakdown selection',
    //       ),
    //     fixed_salary: Yup.string()
    //       .matches(
    //         /^\d+(\.\d{1,2})?$/,
    //         'Fixed salary must be a valid number with up to two decimals',
    //       )
    //       .when('name', {
    //         is: 'Fixed + Variable',
    //         then: schema =>
    //           schema.required('Fixed salary is required for breakdown'),
    //       }),
    //     variable_salary: Yup.string()
    //       .matches(
    //         /^\d+(\.\d{1,2})?$/,
    //         'Variable salary must be a valid number with up to two decimals',
    //       )
    //       .when('name', {
    //         is: 'Fixed + Variable',
    //         then: schema =>
    //           schema.required('Variable salary is required for breakdown'),
    //       })
    //       .test(
    //         'sum-not-greater-than-total',
    //         'The sum of Fixed and Variable Salary must equal Total Salary',
    //         function (value) {
    //           const {fixed_salary, ammount, name} = this.parent;
    //           if (name === 'Fixed + Variable') {
    //             const fixed = parseFloat(fixed_salary || 0);
    //             const variable = parseFloat(value || 0);
    //             const totalSalary = parseFloat(ammount || 0);
    //             return fixed + variable === totalSalary;
    //           }
    //           return true;
    //         },
    //       ),
    //   }));

    schema.skills = Yup.array().min(1, 'At least one skill is required');
    schema.notice_period = Yup.string().required('Notice period is required');
  }

  // Validation for Full-time employment when currentCompany is "No"
  if (
    values.employment_type === 'Full-time' &&
    values.currentCompany === 'No'
  ) {
    schema.company_name = Yup.string().required(
      'Previous company name is required',
    );
    schema.job_title = Yup.string().required('Previous job title is required');

    schema.joining_date = Yup.date()
      .required('Joining date is required')
      .max(new Date(), 'Joining date cannot be in the future');
    schema.leaving_date = Yup.date()
      .required('Leaving date is required')
      .min(Yup.ref('joining_date'), 'Leaving date must be after joining date');
  }

  // Validation for Internship
  if (values.employment_type === 'Internship') {
    schema.company_name = Yup.string().required(
      'Company name is required for internship',
    );
    schema.location = Yup.string().required(
      'Location is required for internships',
    );
    schema.department = Yup.string().required(
      'Department is required for internships',
    );
    schema.job_title_category = Yup.string().required(
      'Role category is required for internship',
    );
    schema.role = Yup.string().required('Role is required for internship');
    schema.worked_from = Yup.date()
      .required('Worked from date is required')
      .max(new Date(), 'Worked from date cannot be in the future');

    // Conditional validation for worked_till
    if (values.currentCompany === 'No') {
      schema.worked_till = Yup.date()
        .required('Worked till date is required')
        .min(
          Yup.ref('worked_from'),
          'Worked till date must be after worked from date',
        );
    }
  }

  return Yup.object().shape(schema);
};

const Employment = profileDetails => {
  const {isUpdatedProfile, toggleIsUpdatedProfile} = useContext(ProfileContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [employmentList, setEmploymentList] = useState([]);
  const [selectedEmployment, setSelectedEmployment] = useState(null); // Track which data is being edited
  const [keyskillsMasters, setKeyskillsMasters] = useState([]);
  const [departmentsMasters, setDepartmentsMasters] = useState([]);
  const [jobTitleCategoriesMasters, setJobTitleCategoriesMasters] = useState(
    [],
  );
  const [rolesMasters, setRolesMasters] = useState([]);
  let formikRef = null;

  const dispatch = useDispatch();
  const [id, setId] = useState();
  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();
  const {GetKeyskills, GetDepartment, GetRoles, GetCategories} =
    MasterViewController();
  const {keyskills, departments, categories, roles} = useSelector(
    state => state.master,
  );
  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();

    setEmploymentList(profileDetails?.profileDetails?.employment_details);
    // dispatch(GetProfileAnalytic('e')); // Dispatch the action when the component mounts
  }, [profileDetails]);

  useEffect(() => {
    const get_keyskills = () => {
      dispatch(GetKeyskills());
    };
    const get_departments = () => {
      dispatch(GetDepartment());
    };
    const get_category = () => {
      dispatch(GetCategories());
    };
    const get_role = () => {
      dispatch(GetRoles());
    };

    get_departments();
    get_category();
    get_role();
    get_keyskills();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keyskills_data = keyskills?.map(skill => ({
      id: skill.id,
      value: skill.name,
    }));
    const department_data = departments?.map(de => ({
      id: de.id,
      value: de.name,
      label: de.name,
    }));
    const category_data = categories?.map(cor => ({
      id: cor.id,
      value: cor.name,
      label: cor.name,
    }));
    const role_data = roles?.map(ro => ({
      id: ro.id,
      value: ro.title,
      label: ro.title,
    }));
    setKeyskillsMasters(keyskills_data);
    setDepartmentsMasters(department_data);
    setJobTitleCategoriesMasters(category_data);
    setRolesMasters(role_data);
    // console.log('Job Title Category', role_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyskills, departments, categories, roles]);

  const handleSubmitForm = values => {
    if (selectedEmployment) {
      const updateOrAddObject = (array, obj) => {
        const index = array.findIndex(
          item =>
            item.company_name == selectedEmployment.company_name &&
            item.job_title == selectedEmployment.job_title,
        );

        if (index !== -1) {
          // Update the existing object
          array[index] = {...array[index], ...obj};
        } else {
          // Add the new object if not found
          array.push(obj);
        }
      };

      updateOrAddObject(employmentList, values);
      const payload = {
        id: profileDetails?.profileDetails?.id,
        employment_details: employmentList,
      };
      dispatch(updateProfileDetails(payload));
      toggleIsUpdatedProfile();
      setEmploymentList(employmentList);
      setModalVisible(false);
      setSelectedEmployment(null);
    } else {
      const formattedValues = {
        id: profileDetails?.profileDetails?.id
          ? profileDetails?.profileDetails?.id
          : '',
        user_id: id,
        employment_details: [
          ...(profileDetails?.profileDetails?.employment_details || []), // Include existing entries

          {
            is_current_company:
              values.currentCompany === 'Yes' ? 'true' : 'false',
            employment_type: values.employment_type || '',
            job_title: values?.job_title || '',
            job_profile: values?.job_profile || '',
            company_name: values?.company_name || '',
            joining_date: values.joining_date
              ? moment(values.joining_date).format('YYYY-MM-DD')
              : null,

            leaving_date: values?.leaving_date
              ? moment(values?.leaving_date).format('YYYY-MM-DD')
              : null,
            worked_from: values?.worked_from
              ? moment(values.worked_from).format('YYYY-MM-DD')
              : null,
            worked_till: values.worked_till
              ? moment(values.worked_till).format('YYYY-MM-DD')
              : null,
            location: values.location || '',
            department: values?.department || '',
            job_title_category: values?.job_title_category || '',
            role: values?.role || '',
            notice_period: values.notice_period || '',
            annual_salary: {
              currency: values.annual_salary?.currency || '₹',
              ammount: values.annual_salary?.ammount || '',
            },
            salary_breakdown: values.salary_breakdown
              ? {
                  name: values.salary_breakdown?.name || '',
                  fixed_salary: values.fixed_salary || '',
                  variable_salary: values.variable_salary || '',
                }
              : undefined,
            skills: values.skills.map(skill =>
              typeof skill === 'string'
                ? skill
                : keyskillsMasters.find(item => item.value === skill?.value)
                    ?.value || '',
            ),
          },
        ],
      };

      if (profileDetails.profileDetails.id) {
        dispatch(updateProfileDetails(formattedValues));
      } else {
        dispatch(addProfileDetails(formattedValues));
      }
      toggleIsUpdatedProfile();

      // dispatch(updateProfileDetails(formattedValues));

      setModalVisible(false);
      setSelectedEmployment(null);
    }
  };

  const openModalForNewEntry = () => {
    setSelectedEmployment(null);
    setModalVisible(true);
  };

  const openModalForEdit = item => {
    setSelectedEmployment(item);
    setModalVisible(true);
  };
  const deleteEmployment = () => {
    const filteredArray = employmentList.filter(
      item =>
        item.company_name !== selectedEmployment.company_name &&
        item.job_title !== selectedEmployment.job_title,
    );
    setEmploymentList(filteredArray);
    const payload = {
      id: profileDetails?.profileDetails?.id,
      employment_details: filteredArray,
    };

    dispatch(updateProfileDetails(payload));
    toggleIsUpdatedProfile();

    // // Reset state and close modal
    setSelectedEmployment(null);
    closeModal();
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEmployment(null);
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
      {profileDetails?.profileDetails?.employment_details?.length > 0 ? (
        profileDetails?.profileDetails?.employment_details.map(
          (data, index) => (
            <TouchableOpacity
              key={index}
              style={styles.outputContainer}
              onPress={() => openModalForEdit(data)}>
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
                  />
                  <View style={{flex: 1}}>
                    <Text style={styles.company_name}>{data.company_name}</Text>
                    {data.job_title && (
                      <Text style={styles.job_title}>{data.job_title}</Text>
                    )}
                    {data.role && (
                      <Text style={styles.job_title}>{data.role}</Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 4,
                      }}>
                      <Text style={styles.otherdata}>
                        {data.employment_type}
                      </Text>
                      {data?.employment_type === 'Full-time' && (
                        <Text style={styles.otherdata}>
                          {moment(data?.joining_date).format('DD MMM YYYY')}
                          {' - '}
                          {data?.leaving_date
                            ? moment(data?.leaving_date).format('DD MMM YYYY')
                            : 'Present'}
                        </Text>
                      )}
                      {data?.employment_type === 'Internship' && (
                        <Text style={styles.otherdata}>
                          {moment(data?.worked_from).format('DD MMM YYYY')}
                          {' - '}

                          {data?.worked_till
                            ? moment(data?.worked_till).format('DD MMM YYYY')
                            : 'Present'}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <IconButton
                  icon="pencil-outline"
                  iconColor={'black'}
                  size={20}
                  onPress={() => openModalForEdit(data)}
                  style={{alignSelf: 'flex-start'}}
                />
              </View>
              {data.job_profile && (
                <Text style={styles.job_profile}>{data.job_profile}</Text>
              )}
            </TouchableOpacity>
          ),
        )
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
              initialValues={{
                currentCompany:
                  selectedEmployment?.is_current_company === 'true'
                    ? 'Yes'
                    : selectedEmployment?.is_current_company === 'false'
                    ? 'No'
                    : 'Yes',
                employment_type:
                  selectedEmployment?.employment_type || 'Full-time',
                skills: selectedEmployment?.skills || [],
                job_title: selectedEmployment?.job_title || '',
                job_profile: selectedEmployment?.job_profile || '',
                company_name: selectedEmployment?.company_name || '',
                joining_date: selectedEmployment?.joining_date || null,
                leaving_date: selectedEmployment?.leaving_date || null,
                worked_from: selectedEmployment?.worked_from || null,
                worked_till: selectedEmployment?.worked_till || null,
                location: selectedEmployment?.location || '',
                department: selectedEmployment?.department || '',
                job_title_category:
                  selectedEmployment?.job_title_category || '',
                role: selectedEmployment?.role || '',
                notice_period: selectedEmployment?.notice_period || '',
                annual_salary: {
                  currency: selectedEmployment?.annual_salary?.currency || '₹',
                  ammount: selectedEmployment?.annual_salary?.ammount || '',
                },

                salary_breakdown: {
                  name: selectedEmployment?.salary_breakdown?.name || '',
                  fixed_salary:
                    selectedEmployment?.salary_breakdown?.fixed_salary || '',
                  variable_salary:
                    selectedEmployment?.salary_breakdown?.variable_salary || '',
                },
              }} // validationSchema={EmploymentValidationSchema}
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
                setValues,
                handleChange,
                errors,
                touched,
              }) => {
                const handleEmploymentTypeChange = value => {
                  // Reset fields to initial values when employment type changes
                  setValues({
                    ...values,
                    employment_type: value,
                    skills: [],
                    job_title: '',
                    job_profile: '',
                    company_name: '',
                    joining_date: null,
                    leaving_date: null,
                    worked_from: null,
                    worked_till: null,
                    location: '',
                    department: '',
                    job_title_category: '',
                    role: '',
                    notice_period: '',
                    annual_salary: {currency: '₹', ammount: ''},
                    salary_breakdown: {
                      name: '',
                      fixed_salary: '',
                      variable_salary: '',
                    },
                  });
                };

                return (
                  <ScrollView contentContainerStyle={styles.container}>
                    <View style={profileStyle.formContainer}>
                      <Text style={profileStyle.formHeading}>
                        EMPLOYMENT DETAILS
                      </Text>
                      <Text style={profileStyle.formSubHeading}>
                        Details like job title, company name, etc, help
                        employers understand your work{' '}
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
                        selectedValue={values.employment_type}
                        setFieldValue={(fieldName, value) =>
                          handleEmploymentTypeChange(value)
                        }
                        fieldName="employment_type"
                      />

                      {/* Conditional Fields */}
                      {values.currentCompany === 'Yes' &&
                        values.employment_type === 'Full-time' && (
                          <View>
                            <ReusableTextInput
                              name="company_name"
                              label="Current Company Name*"
                              value={values.company_name}
                              onChangeText={handleChange('company_name')}
                            />
                            <ReusableTextInput
                              name="job_title"
                              label="Current job title*"
                              value={values.job_title}
                              onChangeText={handleChange('job_title')}
                            />

                            <ReusableDatePicker
                              label="Joining Date*"
                              value={
                                values.joining_date
                                  ? new Date(values.joining_date)
                                  : null
                              } // Use Formik's value
                              onChange={date =>
                                setFieldValue('joining_date', date)
                              } // Update Formik's state
                              error={errors.joining_date}
                              touched={touched.joining_date}
                            />

                            <Text style={styles.subheading}>Salary</Text>
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
                                  selectedValue={values.annual_salary?.currency}
                                  onSelect={selected =>
                                    setFieldValue(
                                      'annual_salary.currency',
                                      selected.value,
                                    )
                                  }
                                  // error={errors.annual_salary.currency}
                                  // touched={touched.annual_salary.currency}
                                />
                              </View>

                              <View style={{flex: 1, top: -6}}>
                                <ReusableTextInput
                                  name="annual_salary"
                                  label="Current Annual Salary"
                                  value={values.annual_salary?.ammount}
                                  onChangeText={handleChange(
                                    'annual_salary.ammount',
                                  )}
                                  keyboardType="numeric"
                                  // error={errors.annual_salary?.ammount}
                                  // touched={touched.annual_salary.ammount}
                                />
                              </View>
                            </View>

                            <ReusableDropdown
                              options={SALARY_OPTIONS}
                              placeholder="Salary Breakdown*"
                              selectedValue={values.salary_breakdown?.name}
                              onSelect={selected =>
                                setFieldValue(
                                  'salary_breakdown.name',
                                  selected.value,
                                  setFieldValue(
                                    'salary_breakdown.fixed_salary',
                                    '',
                                  ),
                                  setFieldValue(
                                    'salary_breakdown.variable_salary',
                                    '',
                                  ),
                                )
                              }
                              // error={errors.salary_breakdown?.name}
                              // touched={touched.salary_breakdown?.name}
                            />

                            {values.salary_breakdown.name === 'Fixed' && (
                              <Text style={styles.noteText}>
                                Your total ammount has been considered as fixed
                                component.
                              </Text>
                            )}

                            {values.salary_breakdown.name ===
                              'Fixed + Variable' && (
                              <View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  {/* Fixed Salary */}
                                  <View style={{flex: 1}}>
                                    <ReusableTextInput
                                      name="fixed_salary"
                                      label="Fixed Salary"
                                      value={
                                        values.salary_breakdown.fixed_salary
                                      }
                                      onChangeText={handleChange(
                                        'salary_breakdown.fixed_salary',
                                      )}
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
                                      name="variable_salary"
                                      label="Variable Salary"
                                      value={
                                        values.salary_breakdown.variable_salary
                                      }
                                      onChangeText={handleChange(
                                        'salary_breakdown.variable_salary',
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
                              data={keyskillsMasters}
                              selectedItems={values.skills.map(
                                skill =>
                                  keyskillsMasters.find(
                                    item => item.value === skill,
                                  ) || {
                                    id: null,
                                    value: skill,
                                  },
                              )}
                              setSelectedItems={items =>
                                setFieldValue(
                                  'skills',
                                  items.map(item => item?.value || ''),
                                )
                              }
                              placeholder="Select Skills"
                              isMultiSelect
                              maxSelectionLimit={5}
                              error={errors.skills}
                              touched={touched.skills}
                            />

                            <ReusableTextInput
                              name="job_profile"
                              label="Job profile"
                              value={values.job_profile}
                              onChangeText={handleChange('job_profile')}
                            />

                            <CustomTabs
                              label="Notice Period*"
                              options={NOTICEPERIOD_OPTIONS}
                              selectedValue={values.notice_period}
                              setFieldValue={setFieldValue}
                              fieldName="notice_period"
                              error={errors.notice_period}
                              touched={touched.notice_period}
                            />
                          </View>
                        )}

                      {values.currentCompany === 'No' &&
                        values.employment_type === 'Full-time' && (
                          <View>
                            <ReusableTextInput
                              name="company_name"
                              label="Previous Company Name*"
                              value={values.company_name}
                              onChangeText={handleChange('company_name')}
                            />
                            <ReusableTextInput
                              name="job_title"
                              label="Previous Job Title*"
                              value={values.job_title}
                              onChangeText={handleChange('job_title')}
                            />
                            <ReusableTextInput
                              name="job_profile"
                              label="Job Profile"
                              value={values.job_profile}
                              onChangeText={handleChange('job_profile')}
                            />

                            <ReusableDatePicker
                              label="Joining Date"
                              value={
                                values.joining_date
                                  ? new Date(values.joining_date)
                                  : null
                              }
                              onChange={date =>
                                setFieldValue('joining_date', date)
                              }
                              error={errors.joining_date}
                              touched={touched.joining_date}
                            />
                            <ReusableDatePicker
                              label="Leaving Date"
                              value={
                                values?.leaving_date
                                  ? new Date(values.leaving_date)
                                  : null
                              }
                              onChange={date =>
                                setFieldValue('leaving_date', date)
                              }
                              error={errors.leaving_date}
                              touched={touched.leaving_date}
                            />
                          </View>
                        )}
                      {/* Yes - Internship Condition */}
                      {values.currentCompany === 'Yes' &&
                        values.employment_type === 'Internship' && (
                          <View>
                            <ReusableTextInput
                              name="company_name"
                              label="Company Name*"
                              value={values.company_name}
                              onChangeText={handleChange('company_name')}
                            />
                            <ReusableTextInput
                              name="location"
                              label="Location"
                              value={values.location}
                              onChangeText={handleChange('location')}
                            />
                            <ReusableDropdown
                              options={departmentsMasters}
                              placeholder="Department*"
                              selectedValue={values.department}
                              onSelect={selected =>
                                setFieldValue('department', selected.value)
                              }
                              error={errors.department}
                              touched={touched.department}
                            />
                            <ReusableDropdown
                              options={jobTitleCategoriesMasters}
                              placeholder="Role Category*"
                              selectedValue={values.job_title_category}
                              onSelect={selected =>
                                setFieldValue(
                                  'job_title_category',
                                  selected.value,
                                )
                              }
                              error={errors.job_title_category}
                              touched={touched.job_title_category}
                            />
                            <ReusableDropdown
                              options={rolesMasters}
                              placeholder="Role*"
                              selectedValue={values.role}
                              onSelect={selected =>
                                setFieldValue('role', selected.value)
                              }
                              error={errors.role}
                              touched={touched.role}
                            />

                            {/* Currency Dropdown */}
                            <Text style={styles.subheading}>Stipend</Text>
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
                                  selectedValue={values.annual_salary?.currency}
                                  onSelect={selected =>
                                    setFieldValue(
                                      'annual_salary.currency',
                                      selected.value,
                                    )
                                  }
                                />
                              </View>
                              <View style={{flex: 1, marginTop: -7}}>
                                <ReusableTextInput
                                  name="ammount"
                                  label="Monthly Stipend "
                                  value={values.annual_salary?.ammount}
                                  onChangeText={handleChange(
                                    'annual_salary.ammount',
                                  )}
                                  keyboardType="numeric"
                                />
                              </View>
                            </View>
                            <ReusableDatePicker
                              label="Worked From"
                              value={
                                values?.worked_from
                                  ? new Date(values?.worked_from)
                                  : null
                              }
                              onChange={date =>
                                setFieldValue('worked_from', date)
                              }
                              error={errors.worked_from}
                              touched={touched.worked_from}
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
                        values.employment_type === 'Internship' && (
                          <View>
                            <ReusableTextInput
                              name="company_name"
                              label="Company Name"
                              value={values.company_name}
                              onChangeText={handleChange('company_name')}
                            />
                            <ReusableTextInput
                              name="location"
                              label="Location"
                              value={values.location}
                              onChangeText={handleChange('location')}
                            />
                            <ReusableDropdown
                              options={departmentsMasters}
                              placeholder="Department*"
                              selectedValue={values.department}
                              onSelect={selected =>
                                setFieldValue('department', selected.value)
                              }
                              error={errors.department}
                              touched={touched.department}
                            />
                            <ReusableDropdown
                              options={jobTitleCategoriesMasters}
                              placeholder="Role Category*"
                              selectedValue={values.job_title_category}
                              onSelect={selected =>
                                setFieldValue(
                                  'job_title_category',
                                  selected.value,
                                )
                              }
                              error={errors.job_title_category}
                              touched={touched.job_title_category}
                            />
                            <ReusableDropdown
                              options={rolesMasters}
                              placeholder="Role*"
                              selectedValue={values.role}
                              onSelect={selected =>
                                setFieldValue('role', selected.value)
                              }
                              error={errors.role}
                              touched={touched.role}
                            />

                            {/* Currency Dropdown */}
                            <Text style={styles.subheading}>Salary</Text>
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
                                  selectedValue={values.annual_salary?.currency}
                                  onSelect={selected =>
                                    setFieldValue(
                                      'annual_salary.currency',
                                      selected.value,
                                    )
                                  }
                                />
                              </View>
                              <View style={{flex: 1, marginTop: -7}}>
                                <ReusableTextInput
                                  name="annual_salary.ammount"
                                  label="Current ammount"
                                  value={values.annual_salary?.ammount}
                                  onChangeText={handleChange(
                                    'annual_salary.ammount',
                                  )}
                                  keyboardType="numeric"
                                />
                              </View>
                            </View>
                            <ReusableDatePicker
                              label="Worked From"
                              value={
                                values.worked_from
                                  ? new Date(values.worked_from)
                                  : null
                              }
                              onChange={date =>
                                setFieldValue('worked_from', date)
                              }
                              error={errors.worked_from}
                              touched={touched.worked_from}
                            />

                            <ReusableDatePicker
                              label="Worked Till*"
                              value={
                                values.worked_till
                                  ? new Date(values.worked_till)
                                  : null
                              }
                              onChange={date =>
                                setFieldValue('worked_till', date)
                              }
                              error={errors.worked_till}
                              touched={touched.worked_till}
                            />
                          </View>
                        )}
                      {/* Modal Footer */}
                    </View>
                  </ScrollView>
                );
              }}
            </Formik>
            <ModalFooter
              onPress={() => formikRef?.handleSubmit()}
              onCancel={closeModal}
              showDelete={selectedEmployment !== null}
              onDelete={selectedEmployment !== null ? deleteEmployment : null}
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
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  company_name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  job_title: {
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
  job_profile: {
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
