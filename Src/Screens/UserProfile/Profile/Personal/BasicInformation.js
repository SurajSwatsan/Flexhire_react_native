import {Modal, Text, View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import profileStyle from '../../ProfileStyle';
import {colors} from '../../../../Global_CSS/TheamColors';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';
import CustomTabs from '../../../../Constant/CustomTabs';
import ReusableDatePicker from '../../../../Constant/CustomDatePicker';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {useDispatch, useSelector} from 'react-redux';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import MasterViewController from '../../../../Redux/Action/MasterViewController';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const OPTIONS = {
  GENDER: [
    {id: 1, value: 'Male'},
    {id: 2, value: 'Female'},
    {id: 3, value: 'Other'},
  ],
  MARITAL_STATUS: [
    {id: 1, value: 'Single'},
    {id: 2, value: 'Married'},
    {id: 3, value: 'Divorced'},
    {id: 4, value: 'Widowed'},
    {id: 5, value: 'Separated'},
    {id: 6, value: 'Other'},
  ],
  DIFFERENTLY_ABLED: [
    {id: 1, value: 'Yes'},
    {id: 2, value: 'No'},
  ],
};

const validationSchema = Yup.object().shape({
  DOB: Yup.date()
    .required('Date of Birth is required')
    .typeError('Invalid Date of Birth')
    .max(new Date(), 'Date of Birth cannot be in the future'),
  gender: Yup.string()
    .oneOf(
      OPTIONS.GENDER.map(option => option.value),
      'Invalid gender selected',
    )
    .required('Gender is required'),
  marital_status: Yup.string()
    .oneOf(
      OPTIONS.MARITAL_STATUS.map(option => option.value),
      'Invalid Marital Status selected',
    )
    .required('Marital Status is required'),
  is_differently_abled: Yup.string()
    .oneOf(
      OPTIONS.DIFFERENTLY_ABLED.map(option => option.value),
      'Invalid Differently abled option selected',
    )
    .required('Differently abled option is required'),
  disability_type: Yup.string().test(
    'disability-type-validation',
    'Disability type is required when differently abled is Yes',
    function (value) {
      const {is_differently_abled} = this.parent; // Access sibling field
      if (is_differently_abled === 'Yes') {
        return !!value; // Validate if value exists
      }
      return true; // Pass validation if not "Yes"
    },
  ),
});

const BasicInformation = profileDetails => {
  const [modalVisible, setModalVisible] = useState(false);
  const [basicInfoData, setBasicInfoData] = useState(null);
  const [countrydata, setCountryData] = useState([]);
  const [homeStateData, setHomeStateData] = useState([]);
  const [homeCityData, setHomeCityData] = useState([]);
  const [renderFields, setRenderFields] = useState([]);
  const [id, setId] = useState();
  let formikRef = null;

  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const {GetCountry, GetState, GetCity} = MasterViewController();
  const {countries, states, cities} = useSelector(state => state.master);

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
    //   profileDetails?.profileDetails?.basic_details,
    // );

    // dispatch(GetProfileAnalytic('e')); // Dispatch the action when the component mounts
  }, [profileDetails]);
  // console.log(id);
  useEffect(() => {
    if (profileDetails?.profileDetails?.basic_details) {
      const render_Fields = [
        {
          label: 'Date of Birth',
          value: profileDetails?.profileDetails?.basic_details[0]?.DOB,
        },
        {
          label: 'Gender',
          value: profileDetails?.profileDetails?.basic_details[0]?.gender,
        },
        {
          label: 'Country',
          value: profileDetails?.profileDetails?.basic_details[0]?.country,
        },
        {
          label: 'State',
          value: profileDetails?.profileDetails?.basic_details[0]?.home_state,
        },
        {
          label: 'City',
          value: profileDetails?.profileDetails?.basic_details[0]?.home_city,
        },
      ];
      // console.log(render_Fields);

      setRenderFields(render_Fields);
    }
  }, [profileDetails]);
  useEffect(() => {
    const get_country = () => {
      dispatch(GetCountry());
    };
    const get_state = () => {
      dispatch(GetState());
    };
    const get_city = () => {
      dispatch(GetCity());
    };
    get_state();
    get_city();
    get_country();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const countries_data = countries?.map(country => ({
      id: country.id,
      value: country.name,
    }));

    const states_data = states?.map(state => ({
      id: state.id,
      value: state.name,
    }));

    const cities_data = cities?.map(city => ({
      id: city.id,
      value: city.name,
    }));

    setCountryData(countries_data);
    setHomeStateData(states_data);
    setHomeCityData(cities_data);

    // console.log('countrys===', countries_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries, states, cities]);

  const getInitialValues = data => ({
    DOB: profileDetails?.profileDetails?.basic_details[0]?.DOB
      ? moment(
          profileDetails.profileDetails.basic_details[0].DOB,
          'DD-MM-YYYY',
        ).toDate()
      : null,
    gender: profileDetails?.profileDetails?.basic_details[0]?.gender || '',
    country: profileDetails?.profileDetails?.basic_details[0]?.country || '',
    home_state:
      profileDetails?.profileDetails?.basic_details[0]?.home_state || '',
    home_city:
      profileDetails?.profileDetails?.basic_details[0]?.home_city || '',
    marital_status:
      profileDetails?.profileDetails?.basic_details[0]?.marital_status || '',
    is_differently_abled: profileDetails?.profileDetails?.basic_details[0]
      ?.is_differently_abled?.status
      ? 'Yes'
      : 'No',
    disability_type:
      profileDetails?.profileDetails?.basic_details[0]?.is_differently_abled
        ?.disability_type || '',
    need_assistance:
      profileDetails?.profileDetails?.basic_details[0]?.is_differently_abled
        ?.need_assistance || '',
  });

  const handleFormSubmit = values => {
    const formattedValues = {
      id: profileDetails?.profileDetails?.id
        ? profileDetails?.profileDetails?.id
        : '',
      user_id: id,
      basic_details: [
        {
          DOB: values.DOB ? moment(values.DOB).format('DD-MM-YYYY') : null, // Format DOB to DD-MM-YYYY
          gender: values.gender,
          country:
            countrydata?.find(c => c.value === values.country)?.value || '',
          home_state:
            homeStateData?.find(s => s.value === values.home_state)?.value ||
            '',
          home_city:
            homeCityData?.find(c => c.value === values.home_city)?.value || '',
          marital_status: values.marital_status,
          is_differently_abled:
            values.is_differently_abled === 'Yes'
              ? {
                  status: true,
                  disability_type: values.disability_type || null,
                  need_assistance: values.need_assistance || null,
                }
              : {status: false},
        },
      ],
    };

    setBasicInfoData(formattedValues);
    // console.log('Formatted Data:', JSON.stringify(formattedValues, null, 2));

    if (profileDetails?.profileDetails?.id) {
      dispatch(updateProfileDetails(formattedValues));
    } else {
      dispatch(addProfileDetails(formattedValues));
    }
    setModalVisible(false);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>BASIC INFORMATION</Text>
        <IconButton
          icon={
            profileDetails?.profileDetails?.basic_details
              ? 'pencil-outline'
              : 'plus-circle-outline'
          }
          size={20}
          onPress={openModal}
          iconColor={colors.blackText}
        />
      </View>

      {profileDetails?.profileDetails?.basic_details ? (
        <View style={profileStyle.userDataContainer}>
          {renderFields.map((field, index) => (
            <View key={index} style={styles.outputData}>
              <Text style={styles.labelText}>{field.label}</Text>
              <Text style={styles.valueText}>{field.value || '-'}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={profileStyle.userDataContainer}>
          <Text style={profileStyle.optionalData}>
            This information is important for employers to know you better
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
                initialValues={getInitialValues(
                  basicInfoData?.basic_details[0],
                )}
                innerRef={ref => (formikRef = ref)}
                validationSchema={validationSchema}
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
                      Basic Information
                    </Text>
                    <Text style={profileStyle.formSubHeading}>
                      This information is important for employers to know you
                      better
                    </Text>
                    <ReusableDatePicker
                      label="Date of Birth*"
                      value={values.DOB}
                      onChange={date => setFieldValue('DOB', date)}
                      error={errors.DOB}
                      touched={touched.DOB}
                    />
                    <CustomTabs
                      label="Gender*"
                      options={OPTIONS.GENDER}
                      selectedValue={values.gender}
                      setFieldValue={setFieldValue}
                      fieldName="gender"
                      error={errors.gender}
                      touched={touched.gender}
                    />

                    <CustomSelectionModal
                      title="Country"
                      data={countrydata}
                      selectedItems={countrydata?.find(
                        item => item.value === values.country,
                      )}
                      setSelectedItems={item =>
                        setFieldValue('country', item?.value || '')
                      }
                      placeholder="Select Country"
                      // error={errors.country}
                      // touched={touched.country}
                    />

                    <CustomSelectionModal
                      title="State"
                      data={homeStateData}
                      selectedItems={homeStateData?.find(
                        item => item.value === values.home_state,
                      )}
                      setSelectedItems={item =>
                        setFieldValue('home_state', item?.value || '')
                      }
                      placeholder="Select Home State"
                      // error={errors.home_state}
                      // touched={touched.home_state}
                    />

                    <CustomSelectionModal
                      title="City"
                      data={homeCityData}
                      selectedItems={homeCityData?.find(
                        item => item.value === values.home_city,
                      )}
                      setSelectedItems={item =>
                        setFieldValue('home_city', item?.value || '')
                      }
                      placeholder="Select Home City"
                      // error={errors.home_city}
                      // touched={touched.home_city}
                    />
                    <CustomTabs
                      label="Marital Status*"
                      options={OPTIONS.MARITAL_STATUS}
                      selectedValue={values.marital_status}
                      setFieldValue={setFieldValue}
                      fieldName="marital_status"
                      error={errors.marital_status}
                      touched={touched.marital_status}
                    />
                    <CustomTabs
                      label="Are you differently abled?*"
                      options={OPTIONS.DIFFERENTLY_ABLED}
                      selectedValue={values.is_differently_abled}
                      setFieldValue={setFieldValue}
                      fieldName="is_differently_abled"
                      error={errors.is_differently_abled}
                      touched={touched.is_differently_abled}
                    />
                    {values.is_differently_abled === 'Yes' && (
                      <View>
                        <ReusableTextInput
                          name="disability_type"
                          label="Disability Type*"
                          value={values.disability_type}
                          onChangeText={handleChange('disability_type')}
                        />

                        <ReusableTextInput
                          name="need_assistance"
                          label="Need Assistance ?"
                          value={values.need_assistance}
                          onChangeText={handleChange('need_assistance')}
                        />
                      </View>
                    )}
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
  outputData: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  labelText: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
    width: '40%',
  },
  valueText: {
    flex: 1,
    fontSize: 13,
    color: '#000',
    width: '60%',
  },
});

export default BasicInformation;
