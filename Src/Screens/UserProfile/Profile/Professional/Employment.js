import React, {useEffect, useState} from 'react';
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

    // schema.ammount = Yup.string().required('Salary is required');

    // (schema.salary_breakdown = Yup.string()
    //   .required('Salary breakdown is required')
    //   .oneOf(
    //     ['Fixed', 'Fixed + Variable'],
    //     'Invalid ammount breakdown selection',
    //   )),
    (schema.fixedSalary = Yup.string()
      .matches(
        /^\d+(\.\d{1,2})?$/,
        'Fixed ammount must be a valid number with up to two decimals',
      )
      .test(
        'required-if-fixed-variable',
        'Fixed ammount is required for Fixed + Variable ammount breakdown',
        function (value) {
          const {salary_breakdown} = this.parent;
          return salary_breakdown !== 'Fixed + Variable' || Boolean(value);
        },
      ))(
      (schema.variableSalary = Yup.string()
        .matches(
          /^\d+(\.\d{1,2})?$/,
          'Variable ammount must be a valid number with up to two decimals',
        )
        .test(
          'required-if-fixed-variable',
          'Variable ammount is required for Fixed + Variable ammount breakdown',
          function (value) {
            const {salary_breakdown} = this.parent;
            return salary_breakdown !== 'Fixed + Variable' || Boolean(value);
          },
        )
        .test(
          'sum-not-greater-than-total',
          'The sum of Fixed and Variable Salary must not exceed Total Salary',
          function (value) {
            const {fixedSalary, ammount, salary_breakdown} = this.parent;
            if (salary_breakdown === 'Fixed + Variable') {
              const fixed = parseFloat(fixedSalary || 0);
              const variable = parseFloat(value || 0);
              const totalSalary = parseFloat(ammount || 0);
              return fixed + variable === totalSalary;
            }
            return true;
          },
        )),
    ),
      (schema.job_profile = Yup.string()
        .nullable() // Allow the field to be null or undefined
        .notRequired() // Explicitly mark it as not required
        .test(
          'min-length-when-provided',
          'Job profile must be at least 10 characters when provided',
          value => !value || value.length >= 10,
        ));
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
    schema.job_profile = Yup.string()
      .nullable() // Allow the field to be null or undefined
      .notRequired() // Explicitly mark it as not required
      .test(
        'min-length-when-provided',
        'Job profile must be at least 10 characters when provided',
        value => !value || value.length >= 10,
      );
    schema.joining_date = Yup.date()
      .required('Joining date is required')
      .max(new Date(), 'Joining date cannot be in the future');
    schema.leavingDate = Yup.date()
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
    // schema.department = Yup.string().required(
    //   'Department is required for internships',
    // );
    // schema.job_title_category = Yup.string().required(
    //   'Role category is required for internship',
    // );
    // schema.role = Yup.string().required('Role is required for internship');
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

const Employment = profileDetails => {
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
              values?.currentCompany === 'Yes' ? 'true' : 'false',
            employment_type: values?.employment_type || '',
            job_title: values?.job_title || '',
            job_profile: values?.job_profile || '',
            company_name: values?.company_name || '',
            joining_date: values?.joining_date
              ? moment(values?.joining_date).format('DD-MM-YYYY')
              : null,
            leaving_date: values?.leaving_date
              ? moment(values?.leaving_date).format('DD-MM-YYYY')
              : null,
            worked_from: values?.workedfrom
              ? moment(values?.workedfrom).format('DD-MM-YYYY')
              : null,
            worked_till: values?.workedtill
              ? moment(values?.workedtill).format('DD-MM-YYYY')
              : null,
            location: values?.location || '',
            department: values?.department || '',
            job_title_category: values?.job_title_category || '',
            role: values?.role || '',
            notice_period: values?.notice_period || '',
            annual_salary: {
              currency: values.annual_salary?.currency || '₹',
              ammount: values.annual_salary?.ammount || '',
            },
            salary_breakdown: values?.salary_breakdown
              ? {
                  name: values.salary_breakdown?.name || '',
                  fixed_salary: values?.fixed_salary || '',
                  variable_salary: values?.variable_salary || '',
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
              <View style={styles.innerContainer}>
                <View style={styles.companydataContainer}>
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
                      <Text style={styles.otherdata}>
                        {data?.joining_date
                          ? new Date(data?.joining_date).toLocaleDateString()
                          : ''}
                        {' - '}
                        {data?.leaving_date
                          ? new Date(data?.leaving_date).toLocaleDateString()
                          : 'Present'}
                      </Text>
                    </View>
                  </View>
                </View>
                <IconButton
                  icon="pencil-outline"
                  iconColor={'black'}
                  size={20}
                  onPress={() => openModalForEdit(data)}
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
                  selectedEmployment?.employment_type || 'Part-time',
                skills: selectedEmployment?.skills || [],
                job_title: selectedEmployment?.job_title || '',
                job_profile: selectedEmployment?.job_profile || '',
                company_name: selectedEmployment?.company_name || '',
                joining_date: selectedEmployment?.joining_date
                  ? moment(
                      selectedEmployment?.joining_date,
                      'DD-MM-YYYY',
                    ).toDate()
                  : null,
                leaving_date: selectedEmployment?.leaving_date
                  ? moment(
                      selectedEmployment?.leaving_date,
                      'DD-MM-YYYY',
                    ).toDate()
                  : null,
                workedfrom: selectedEmployment?.worked_from
                  ? moment(
                      selectedEmployment?.worked_from,
                      'DD-MM-YYYY',
                    ).toDate()
                  : null,
                workedtill: selectedEmployment?.worked_till
                  ? moment(
                      selectedEmployment?.worked_till,
                      'DD-MM-YYYY',
                    ).toDate()
                  : null,
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
                      selectedValue={values.employment_type}
                      setFieldValue={setFieldValue}
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
                            value={values.joining_date}
                            onChange={date =>
                              setFieldValue('joining_date', date)
                            }
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
                              />
                            </View>
                            <View style={{flex: 1, top: -6}}>
                              <ReusableTextInput
                                name="ammount"
                                label="Current ammount"
                                value={values.annual_salary?.ammount}
                                onChangeText={handleChange(
                                  'annual_salary.ammount',
                                )}
                                keyboardType="numeric"
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
                              )
                            }
                            // error={errors.salary_breakdown}
                            // touched={touched.salary_breakdown}
                          />

                          {values.salary_breakdown === 'Fixed' && (
                            <Text style={styles.noteText}>
                              Your total ammount has been considered as fixed
                              component.
                            </Text>
                          )}

                          {values.salary_breakdown === 'Fixed + Variable' && (
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
                            label="Job profile*"
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
                            label="Job Profile*"
                            value={values.job_profile}
                            onChangeText={handleChange('job_profile')}
                          />

                          <ReusableDatePicker
                            label="Joining Date"
                            value={values.joining_date}
                            onChange={date =>
                              setFieldValue('joining_date', new Date(date))
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
                            selectedValue={values?.department}
                            onSelect={selected =>
                              setFieldValue('department', selected.value)
                            }
                            // error={errors.department}
                            // touched={touched.department}
                          />
                          <ReusableDropdown
                            options={jobTitleCategoriesMasters}
                            placeholder="Role Category*"
                            selectedValue={values?.job_title_category}
                            onSelect={selected =>
                              setFieldValue(
                                'job_title_category',
                                selected?.value,
                              )
                            }
                            // error={errors.job_title_category}
                            // touched={touched.job_title_category}
                          />
                          <ReusableDropdown
                            options={rolesMasters}
                            placeholder="Role*"
                            selectedValue={values?.role}
                            onSelect={selected =>
                              setFieldValue('role', selected?.value)
                            }
                            // error={errors.role}
                            // touched={touched.role}
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
                                name="ammount"
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
                            // error={errors.department}
                            // touched={touched.department}
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
                            // error={errors.job_title_category}
                            // touched={touched.job_title_category}
                          />
                          <ReusableDropdown
                            options={rolesMasters}
                            placeholder="Role*"
                            selectedValue={values.role}
                            onSelect={selected =>
                              setFieldValue('role', selected.value)
                            }
                            // error={errors.role}
                            // touched={touched.role}
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
                                name="ammount"
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
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  companydataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
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
