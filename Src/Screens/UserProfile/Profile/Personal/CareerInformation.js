import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Checkbox, IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

import moment from 'moment';
import profileStyle from '../../ProfileStyle';
import {colors} from '../../../../Global_CSS/TheamColors';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';
import CustomTabs from '../../../../Constant/CustomTabs';
import ReusableDatePicker from '../../../../Constant/CustomDatePicker';
import ReusableDropdown from '../../../../Constant/CustomDropdown';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {useDispatch, useSelector} from 'react-redux';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import MasterViewController from '../../../../Redux/Action/MasterViewController';

const NOTICEPERIOD_OPTIONS = [
  {id: 1, value: 'Immediate'},
  {id: 2, value: '15 days'},
  {id: 3, value: '1 month'},
  {id: 4, value: '2 months'},
  {id: 5, value: '3 months'},
  {id: 6, value: 'more than 3 months'},
];
const CAREERBREAK_OPTIONS = [
  {id: 1, value: 'Yes'},
  {id: 2, value: 'No'},
];
const CAREERBREAKREASON_OPTIONS = [
  {id: 1, value: 'Childcare'},
  {id: 2, value: 'Education'},
  {id: 3, value: 'Medical'},
  {id: 4, value: 'Layoff'},
  {id: 5, value: 'Personal'},
];
const CURRENCY_OPTIONS = [
  {id: 1, value: '$', label: '$'},
  {id: 2, value: '₹', label: '₹'},
];

const validationSchema = Yup.object().shape({
  current_city: Yup.string().required('Current Location is required'),
  notice_period: Yup.string()
    .oneOf(
      NOTICEPERIOD_OPTIONS.map(option => option.value.toString()),
      'Invalid notice period selected',
    )
    .required('Notice Period is required'),
  current_total_exp: Yup.string().required('Experience is required'),
  current_annual_salary: Yup.object({
    currency: Yup.string().required('Currency is required'), // Validate the currency
    amount: Yup.string()
      .matches(/^\d+$/, 'Amount must be a valid number') // Ensure it's numeric
      .required('Amount is required'), // Validate the amount
  }).required('Annual Salary is required'), // Top-level validation for the object

  expected_salary: Yup.object({
    currency: Yup.string().required('Currency is required'), // Validate the currency
    amount: Yup.string()
      .matches(/^\d+$/, 'Amount must be a valid number') // Ensure it's numeric
      .required('Amount is required'), // Validate the amount
  }).required('Expected Salary is required'), // Top-level validation for the object
});

const CareerInformation = profileDetails => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // Single entry handlings
  const [editingIndex, setEditingIndex] = useState(null);
  const [cityMaster, setCityMaster] = useState([]);
  const [countryMaster, setCountryMaster] = useState([]);
  const [departmentMaster, setDepartmentMaster] = useState([]);
  const [industryMaster, setIndustryMaster] = useState([]);
  const [categoriesMaster, setCategoriesMaster] = useState([]);
  const [roleMaster, setRoleMaster] = useState([]);
  const [id, setId] = useState();

  let formikRef = null;

  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  const {
    GetCity,
    GetCountry,
    GetIndustry,
    GetDepartment,
    GetCategories,
    GetRoles,
  } = MasterViewController();
  const {cities, industries, departments, categories, roles, countries} =
    useSelector(state => state.master);

  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
        console.log(id); // Log the value once it's retrieved
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
    // console.log(
    //   '================================',
    //   profileDetails?.profileDetails?.career_preferences,
    // );

    // dispatch(GetProfileAnalytic('e')); // Dispatch the action when the component mounts
  }, [profileDetails]);

  const getInitialValues = (editingIndex, submittedData) => ({
    current_city:
      profileDetails?.profileDetails?.career_preferences[0]?.current_city || '',
    pref_locations:
      profileDetails?.profileDetails?.career_preferences[0]?.pref_locations ||
      [],
    current_industry:
      profileDetails?.profileDetails?.career_preferences[0]?.current_industry ||
      '',
    current_department:
      profileDetails?.profileDetails?.career_preferences[0]
        ?.current_department || '',
    current_job_title_category:
      profileDetails?.profileDetails?.career_preferences[0]
        ?.current_job_title_category || '',
    current_job_title:
      profileDetails?.profileDetails?.career_preferences[0]
        ?.current_job_title || [],
    notice_period:
      profileDetails?.profileDetails?.career_preferences[0]?.notice_period ||
      '',
    current_total_exp:
      profileDetails?.profileDetails?.career_preferences[0]
        ?.current_total_exp || '',
    current_annual_salary: {
      currency:
        profileDetails?.profileDetails?.career_preferences[0]
          ?.current_annual_salary?.currency || '₹',
      amount:
        profileDetails?.profileDetails?.career_preferences[0]
          ?.current_annual_salary?.amount || '', // Defaults to empty string
    },
    expected_salary: {
      currency:
        profileDetails?.profileDetails?.career_preferences[0]?.expected_salary
          ?.currency || '₹',
      amount:
        profileDetails?.profileDetails?.career_preferences[0]?.expected_salary
          ?.amount || '', // Defaults to empty string
    },
    is_career_break: profileDetails?.profileDetails?.career_preferences[0]
      ?.is_career_break?.status
      ? 'Yes'
      : 'No',
    reason:
      profileDetails?.profileDetails?.career_preferences[0]?.is_career_break
        ?.reason || '', // Only used if career break is "Yes"
    duration: {
      from: profileDetails?.profileDetails?.career_preferences[0]
        ?.is_career_break?.duration?.from
        ? moment(
            profileDetails?.profileDetails?.career_preferences[0]
              ?.is_career_break.duration.from,
          ).toDate()
        : null,
      till:
        profileDetails?.profileDetails?.career_preferences[0]?.is_career_break
          ?.duration?.till === 'Present'
          ? null // Use null for "Present" to avoid passing it to ReusableDatePicker
          : profileDetails?.profileDetails?.career_preferences[0]
              ?.is_career_break?.duration?.till
          ? moment(
              profileDetails?.profileDetails?.career_preferences[0]
                ?.is_career_break.duration.till,
            ).toDate()
          : null,
    },
    currently_working:
      profileDetails?.profileDetails?.career_preferences[0]?.is_career_break
        ?.duration?.till === 'Present', // Initialize checkbox
    work_permit:
      profileDetails?.profileDetails?.career_preferences[0]?.work_permit || [],
  });

  useEffect(() => {
    const get_city = () => {
      dispatch(GetCity());
    };
    const get_country = () => {
      dispatch(GetCountry());
    };
    const get_departments = () => {
      dispatch(GetDepartment());
    };

    const get_industries = () => {
      dispatch(GetIndustry());
    };
    const get_category = () => {
      dispatch(GetCategories());
    };
    const get_role = () => {
      dispatch(GetRoles());
    };

    get_industries();
    get_country();
    get_departments();
    get_category();
    get_role();
    get_city();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cities_data = cities?.map(city => ({
      id: city.id,
      value: city.name,
    }));
    const countries_data = countries?.map(country => ({
      id: country.id,
      value: country.name,
    }));
    const departments_data = departments?.map(department => ({
      id: department.id,
      value: department.name,
    }));
    const industries_data = industries?.map(industry => ({
      id: industry.id,
      value: industry.industry_name,
    }));
    const categories_data = categories?.map(category => ({
      id: category.id,
      value: category.name,
    }));
    const roles_data = roles?.map(role => ({
      id: role.id,
      value: role.title,
    }));

    setCityMaster(cities_data);
    setCountryMaster(countries_data);
    setDepartmentMaster(departments_data);
    setIndustryMaster(industries_data);
    setCategoriesMaster(categories_data);
    setRoleMaster(roles_data);

    // console.log('roles_data===', roles_data);
  }, [cities, industries, departments, categories, roles, countries]);

  function formatAmount(value) {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(1) + ' Cr';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1) + ' Lac';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + ' K';
    } else {
      return value.toString();
    }
  }

  const handleFormSubmit = values => {
    const formattedValues = {
      id: profileDetails?.profileDetails?.id
        ? profileDetails?.profileDetails?.id
        : '',
      user_id: id,
      career_preferences: [
        {
          current_city: values.current_city,
          pref_locations: values.pref_locations.map(location =>
            typeof location === 'string'
              ? location
              : cityMaster.find(city => city.value === location?.value)
                  ?.value ||
                location?.value ||
                '',
          ),
          current_industry:
            industryMaster?.find(ind => ind.value === values.current_industry)
              ?.value || '',
          current_department:
            departmentMaster?.find(
              dep => dep.value === values.current_department,
            )?.value || '',
          current_job_title_category:
            categoriesMaster?.find(
              cat => cat.value === values.current_job_title_category,
            )?.value || '',
          current_job_title: values.current_job_title.map(job =>
            typeof job === 'string'
              ? job
              : roleMaster?.find(role => role.value === job?.value)?.value ||
                job?.value ||
                '',
          ),

          notice_period:
            NOTICEPERIOD_OPTIONS.find(
              opt => opt.value === values?.notice_period,
            )?.value || '',
          current_total_exp: values.current_total_exp,
          current_annual_salary: {
            currency: values.current_annual_salary?.currency || '₹', // Default to '₹'
            amount: values.current_annual_salary?.amount || '', // Ensure amount is present
          },
          expected_salary: {
            currency: values.expected_salary?.currency || '₹', // Default to '₹'
            amount: values.expected_salary?.amount || '', // Ensure amount is present
          },
          is_career_break:
            values.is_career_break === 'Yes'
              ? {
                  status: true,
                  reason: values.reason || null,
                  duration: {
                    from: values.duration?.from
                      ? moment(values.duration?.from).format('YYYY-MM-DD')
                      : null,
                    till: values.currently_working
                      ? 'Present' // Submit "Present" when currently working
                      : values.duration?.till
                      ? moment(values.duration?.till).format('YYYY-MM-DD')
                      : null,
                  },
                }
              : {status: false},
          work_permit: values.work_permit.map(permit =>
            typeof permit === 'string'
              ? permit
              : countryMaster.find(
                  workpermit => workpermit.value === permit?.value,
                )?.value ||
                permit?.value ||
                '',
          ),
        },
      ],
    };

    // console.log('Formatted Data:', JSON.stringify(formattedValues, null, 2));
    // setSubmittedData(formattedValues);

    if (profileDetails?.profileDetails?.id) {
      dispatch(updateProfileDetails(formattedValues));
    } else {
      dispatch(addProfileDetails(formattedValues));
    }

    setModalVisible(false);
  };

  const openModal = () => {
    setEditingIndex(submittedData ? 0 : null); // Set editingIndex based on existing data
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };
  const getExistingObjects = data => {
    return cityMaster.filter(obj => data.includes(obj.value));
  };
  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>CAREER INFORMATION</Text>
        <IconButton
          icon={
            profileDetails?.profileDetails?.career_preferences
              ? 'pencil-outline'
              : 'plus-circle-outline'
          }
          iconColor={colors.blackText}
          size={20}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>

      {profileDetails?.profileDetails?.career_preferences ? (
        <View style={profileStyle.userDataContainer}>
          <TouchableOpacity onPress={openModal}>
            {[
              {
                label: 'Industry',
                value:
                  profileDetails?.profileDetails?.career_preferences[0]
                    ?.current_industry,
              },
              {
                label: 'Department',
                value:
                  profileDetails?.profileDetails?.career_preferences[0]
                    ?.current_department,
              },
              {
                label: 'Role Category',
                value:
                  profileDetails?.profileDetails?.career_preferences[0]
                    ?.current_job_title_category,
              },
              {
                label: 'Job Role',
                value:
                  Array.isArray(
                    profileDetails?.profileDetails?.career_preferences[0]
                      ?.current_job_title,
                  ) &&
                  profileDetails?.profileDetails?.career_preferences[0]
                    ?.current_job_title.length > 0
                    ? profileDetails?.profileDetails?.career_preferences[0]?.current_job_title.join(
                        ', ',
                      ) // Join array elements into a string
                    : profileDetails?.profileDetails?.career_preferences[0]
                        ?.current_job_title || 'Not provided', // Handle single string or default
              },

              {
                label: 'Experience',
                value: `${
                  profileDetails?.profileDetails?.career_preferences[0]
                    ?.current_total_exp || 0
                } Years`,
              },
              {
                label: 'Annual Salary',
                value: profileDetails?.profileDetails?.career_preferences[0]
                  ?.current_annual_salary
                  ? `${
                      profileDetails?.profileDetails?.career_preferences[0]
                        ?.current_annual_salary.currency || ''
                    } ${formatAmount(
                      profileDetails?.profileDetails?.career_preferences[0]
                        ?.current_annual_salary.amount || 0,
                    )} `
                  : null,
              },
              {
                label: 'Expected Salary',
                value: profileDetails?.profileDetails?.career_preferences[0]
                  ?.expected_salary
                  ? `${
                      profileDetails?.profileDetails?.career_preferences[0]
                        ?.expected_salary.currency || ''
                    } ${formatAmount(
                      profileDetails?.profileDetails?.career_preferences[0]
                        ?.expected_salary.amount || 0,
                    )}`
                  : null,
              },
              {
                label: 'Current Location',
                value:
                  profileDetails?.profileDetails?.career_preferences[0]
                    ?.current_city,
              },
              {
                label: 'Preferred Locations',
                value:
                  Array.isArray(
                    profileDetails?.profileDetails?.career_preferences[0]
                      ?.pref_locations,
                  ) &&
                  profileDetails?.profileDetails?.career_preferences[0]
                    ?.pref_locations.length
                    ? profileDetails?.profileDetails?.career_preferences[0]?.pref_locations.join(
                        ', ',
                      )
                    : null,
              },
            ].map((field, index) => (
              <View key={index} style={styles.dataRow}>
                <Text style={styles.labelText}>{field.label}</Text>
                <Text style={styles.valueText}>{field.value || '-'}</Text>
              </View>
            ))}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={profileStyle.userDataContainer}>
          <Text style={profileStyle.optionalData}>
            This information is important for employers to know you better.
          </Text>
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
                    <Text style={profileStyle.formHeading}>
                      CAREER INFORMATION
                    </Text>
                    <Text style={profileStyle.formSubHeading}>
                      Add details about your current and preferred job profile.
                      This helps us personalise your job recommendations.
                    </Text>

                    <ReusableTextInput
                      name="current_city"
                      label="Current Location*"
                      value={values.current_city}
                      onChangeText={handleChange('current_city')}
                    />

                    <CustomSelectionModal
                      title="Preferred Locations"
                      data={cityMaster} //object pass
                      selectedItems={values.pref_locations.map(
                        skill =>
                          cityMaster?.find(item => item.value === skill) || {
                            id: null,
                            value: skill,
                          },
                      )}
                      setSelectedItems={items => {
                        setFieldValue(
                          'pref_locations',
                          items.map(item => item?.value || ''),
                        );
                      }}
                      placeholder="Select Preferred Locations"
                      isMultiSelect
                      maxSelectionLimit={9}
                    />

                    <CustomSelectionModal
                      title="Industry"
                      data={industryMaster}
                      selectedItems={industryMaster?.find(
                        item => item.value === values.current_industry,
                      )}
                      setSelectedItems={item =>
                        setFieldValue('current_industry', item?.value || '')
                      }
                      placeholder="Select Current Industry"
                      isMultiSelect={false}
                    />

                    <CustomSelectionModal
                      title="Department"
                      data={departmentMaster}
                      selectedItems={departmentMaster?.find(
                        item => item.value === values.current_department,
                      )}
                      setSelectedItems={item =>
                        setFieldValue('current_department', item?.value || '')
                      }
                      placeholder="Select Current Department"
                      isMultiSelect={false}
                    />

                    <CustomSelectionModal
                      title="Role Category"
                      data={categoriesMaster}
                      selectedItems={categoriesMaster?.find(
                        item =>
                          item.value === values.current_job_title_category,
                      )}
                      setSelectedItems={item =>
                        setFieldValue(
                          'current_job_title_category',
                          item?.value || '',
                        )
                      }
                      placeholder="Select Role Category"
                      isMultiSelect={false}
                    />

                    <CustomSelectionModal
                      title="Job Role"
                      data={roleMaster}
                      selectedItems={values.current_job_title.map(
                        role =>
                          roleMaster?.find(item => item.value === role) || {
                            id: null,
                            value: role,
                          },
                      )}
                      setSelectedItems={items =>
                        setFieldValue(
                          'current_job_title',
                          items.map(item => item?.value || ''),
                        )
                      }
                      placeholder="Select Job Roles"
                      isMultiSelect
                      maxSelectionLimit={3}
                    />

                    <CustomTabs
                      label="Do you have a career break?*"
                      options={CAREERBREAK_OPTIONS}
                      selectedValue={values.is_career_break}
                      setFieldValue={setFieldValue}
                      fieldName="is_career_break"
                    />

                    {values.is_career_break === 'Yes' && (
                      <>
                        <CustomTabs
                          label="Reason for career break*"
                          options={CAREERBREAKREASON_OPTIONS}
                          selectedValue={values.reason}
                          setFieldValue={setFieldValue}
                          fieldName="reason"
                        />
                        <View>
                          <Text style={profileStyle.label}>
                            Career Break Duration
                          </Text>
                          <View style={{flexDirection: 'row', gap: 8}}>
                            <View style={{flex: 1}}>
                              <ReusableDatePicker
                                label="From*"
                                value={values.duration.from}
                                onChange={date =>
                                  setFieldValue('duration.from', date)
                                }
                              />
                            </View>
                            <View style={{flex: 1}}>
                              {values.currently_working ? (
                                <ReusableTextInput
                                  name="till"
                                  label="Till*"
                                  value="Present" // Display "Present"
                                  editable={false} // Make it read-only
                                />
                              ) : (
                                <ReusableDatePicker
                                  label="Till*"
                                  value={values.duration.till || null} // Ensure it's either a Date object or null
                                  onChange={date =>
                                    setFieldValue('duration.till', date)
                                  }
                                />
                              )}
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <Checkbox
                              color={colors.primary}
                              status={
                                values.currently_working
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() => {
                                const isChecked = !values.currently_working;
                                setFieldValue('currently_working', isChecked);

                                // Handle `till` field based on checkbox state
                                if (isChecked) {
                                  setFieldValue('duration.till', null); // Set `till` to null when "Present"
                                } else {
                                  setFieldValue('duration.till', new Date()); // Set default date if unchecked
                                }
                              }}
                            />
                            <Text style={profileStyle.label}>
                              Currently on a break
                            </Text>
                          </View>
                        </View>
                      </>
                    )}

                    <ReusableTextInput
                      name="current_total_exp"
                      label="Experience*"
                      value={values.current_total_exp}
                      keyboardType="numeric"
                      onChangeText={handleChange('current_total_exp')}
                    />

                    <View style={styles.salaryContainer}>
                      {/* Current Annual Salary */}
                      <View style={{width: '20%'}}>
                        <ReusableDropdown
                          options={CURRENCY_OPTIONS}
                          placeholder="Select Currency" // Clear placeholder
                          selectedValue={values.current_annual_salary?.currency}
                          onSelect={selected =>
                            setFieldValue(
                              'current_annual_salary.currency',
                              selected.value,
                            )
                          }
                        />
                      </View>
                      <View style={{flex: 1, top: -6}}>
                        <ReusableTextInput
                          name="current_annual_salary.amount"
                          label="Annual Salary*"
                          value={values.current_annual_salary?.amount}
                          keyboardType="numeric"
                          onChangeText={text =>
                            setFieldValue('current_annual_salary.amount', text)
                          }
                        />
                      </View>
                    </View>

                    <View style={styles.salaryContainer}>
                      {/* Expected Salary */}
                      <View style={{width: '20%'}}>
                        <ReusableDropdown
                          options={CURRENCY_OPTIONS}
                          placeholder="Select Currency" // Clear placeholder
                          selectedValue={values.expected_salary?.currency}
                          onSelect={selected =>
                            setFieldValue(
                              'expected_salary.currency',
                              selected.value,
                            )
                          }
                        />
                      </View>
                      <View style={{flex: 1, top: -6}}>
                        <ReusableTextInput
                          name="expected_salary.amount"
                          label="Expected Salary*"
                          value={values.expected_salary?.amount}
                          keyboardType="numeric"
                          onChangeText={text =>
                            setFieldValue('expected_salary.amount', text)
                          }
                        />
                      </View>
                    </View>

                    <CustomSelectionModal
                      title="Work Permit"
                      data={countryMaster}
                      selectedItems={values.work_permit.map(
                        permit =>
                          countryMaster?.find(
                            option => option.value === permit,
                          ) || {
                            id: null,
                            value: permit,
                          },
                      )}
                      setSelectedItems={items =>
                        setFieldValue(
                          'work_permit',
                          items.map(item => item?.value || ''),
                        )
                      }
                      placeholder="Select Work Permits"
                      isMultiSelect
                      maxSelectionLimit={3}
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
  dataRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  labelText: {
    color: '#000',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 13,
  },
  valueText: {
    color: '#000',
    flex: 1,
    textAlign: 'left',
    fontSize: 13,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export default CareerInformation;
