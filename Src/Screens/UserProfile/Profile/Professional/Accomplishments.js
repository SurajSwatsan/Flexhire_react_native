import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Checkbox, IconButton} from 'react-native-paper';
import moment from 'moment';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ReusableDatePicker from '../../../../Constant/CustomDatePicker';
import CustomTabs from '../../../../Constant/CustomTabs';
import profileStyle from '../../ProfileStyle';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {colors} from '../../../../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {ProfileContext} from '../../ProfileContext';

const TAB_OPTIONS = [
  {label: 'Research Publication', key: 'research'},
  {label: 'Patent', key: 'patent'},
  {label: 'Certification', key: 'certification'},
  {label: 'Work Sample', key: 'workSample'},
  {label: 'Online Profile', key: 'onlineProfile'},
  {label: 'Presentation', key: 'presentation'},
];

const Accomplishments = profileDetails => {
  // const [activeTab, setActiveTab] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const {isUpdatedProfile, toggleIsUpdatedProfile} = useContext(ProfileContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [accomplishmentsData, setAccomplishmentsData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [id, setId] = useState();

  let formikRef = null;
  const dispatch = useDispatch();
  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();

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
    // console.log(
    //   '================================',
    //   profileDetails?.profileDetails?.accomplishments,
    // );
    // console.log(
    //   'accomplishments Data:',
    //   JSON.stringify(profileDetails?.profileDetails?.accomplishments, null, 2),
    // );
    setAccomplishmentsData(profileDetails?.profileDetails?.accomplishments);
  }, [profileDetails]);

  const openModal = (key, item = null) => {
    setActiveTab(key);
    setModalVisible(true); // Show the modal
    if (item && item.title) {
      setSelectedItem(item);
      console.log('Editing existing item:', item);
    } else {
      setSelectedItem(null);
      console.log('Creating new entry for:', key);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    setActiveTab(null); // Reset activeTab
    setSelectedItem(null);
  };
  // console.log(savedData);
  useEffect(() => {
    console.log('Selected Item:', selectedItem);
  }, [selectedItem]);

  const handleSubmit = values => {
    // Find the selected tab's label
    const selectedTab = TAB_OPTIONS.find(tab => tab.key === activeTab);

    if (selectedItem) {
      const updateOrAddObject = (array, obj) => {
        const index = array.findIndex(item => item.title == selectedItem.title);

        if (index !== -1) {
          // Update the existing object
          array[index] = {...array[index], ...obj};
        } else {
          // Add the new object if not found
          array.push(obj);
        }
      };

      updateOrAddObject(accomplishmentsData, values);
      const payload = {
        id: profileDetails?.profileDetails?.id,
        accomplishments: accomplishmentsData,
      };
      dispatch(updateProfileDetails(payload));
      toggleIsUpdatedProfile();
      setAccomplishmentsData(accomplishmentsData);
      setModalVisible(false);
      setSelectedItem(null);
    } else {
      const formattedValues = {
        id: profileDetails?.profileDetails?.id
          ? profileDetails?.profileDetails?.id
          : '',
        user_id: id,
        accomplishments: [
          ...(profileDetails?.profileDetails?.accomplishments || []), // Include existing entries

          {
            name: selectedTab.label,
            title: values.title || '',
            url: values.url || '',
            description: values.description || '',
            published_date: values.published_date
              ? moment(values.published_date).format('YYYY-MM-DD')
              : null,
            patentOffice: values.patentOffice || '',
            application_number: values.application_number || '',
            status: values.status || '',
            issued_date: values.issued_date
              ? moment(values.issued_date).format('YYYY-MM-DD')
              : null,
            certification_provider: values.certification_provider || '',
            completion_id: values.completion_id || '',
            from: values.from ? moment(values.from).format('YYYY-MM-DD') : null,
            till:
              values.noExpiry || values.stillWorking
                ? null
                : values.till
                ? moment(values.till).format('YYYY-MM-DD')
                : null,
            noExpiry: values.noExpiry || false,
            stillWorking: values.stillWorking || false,
          },
        ],
      };
      // console.log('selected tab', selectedTab);

      if (profileDetails.profileDetails.id) {
        dispatch(updateProfileDetails(formattedValues));
      } else {
        dispatch(addProfileDetails(formattedValues));
      }
      // dispatch(updateProfileDetails(formattedValues));
      toggleIsUpdatedProfile();

      setModalVisible(false);
      setSelectedItem(null);
    }
  };

  const deleteItem = () => {
    const filteredArray = accomplishmentsData.filter(
      item => item.title !== selectedItem.title,
    );
    setAccomplishmentsData(filteredArray);
    const payload = {
      id: profileDetails?.profileDetails?.id,
      accomplishments: filteredArray,
    };

    dispatch(updateProfileDetails(payload));
    toggleIsUpdatedProfile();

    // // Reset state and close modal
    setSelectedItem(null);
    closeModal();
  };
  const getValidationSchema = () => {
    switch (activeTab) {
      case 'research':
        return Yup.object().shape({
          title: Yup.string()
            .required('Title is required')
            .matches(/^[A-Za-z\s,.]+$/, 'must only contain letters'),
          description: Yup.string().matches(/^[A-Za-z\s,.]+$/, {
            message: 'Must only contain letters, spaces, commas, or periods',
            excludeEmptyString: true, // Allows blank strings to pass validation
          }),
          url: Yup.string().url('Invalid URL').required('URL is required'),
          published_date: Yup.string()
            .required('Published Date is required')
            .test(
              'not-future-date',
              'Date cannot be in the future',
              function (value) {
                return value ? new Date(value) <= new Date() : true; // Ensure from is not in the future
              },
            ),
        });
      case 'patent':
        return Yup.object().shape({
          title: Yup.string()
            .required('Patent Title is required')
            .matches(/^[A-Za-z\s,.]+$/, 'must only contain letters'),
          description: Yup.string().matches(/^[A-Za-z\s,.]+$/, {
            message: 'Must only contain letters, spaces, commas, or periods',
            excludeEmptyString: true, // Allows blank strings to pass validation
          }),
          url: Yup.string()
            .url('Invalid URL')
            .required('Patent URL is required'),
        });
      case 'certification':
        return Yup.object().shape({
          title: Yup.string()
            .required('Certification Name is required')
            .matches(/^[A-Za-z\s,.]+$/, 'must only contain letters'),
          certification_provider: Yup.string().required('Provider is required'),
          from: Yup.date()
            .required('From date is required')
            .test(
              'not-future-date',
              'Valid From date cannot be in the future',
              function (value) {
                return value ? new Date(value) <= new Date() : true; // Ensure from is not in the future
              },
            ),
          till: Yup.date().test(
            'till-validation',
            'Valid Till date must be before From date and cannot be the same',
            function (value) {
              const {from, noExpiry} = this.parent;

              if (noExpiry) {
                return true; // Skip validation if noExpiry is true
              }
              if (!value) {
                return this.createError({message: 'Till date is required'});
              }
              if (from) {
                const fromDate = new Date(from);
                const tillDate = new Date(value);

                if (tillDate <= fromDate) {
                  if (
                    tillDate.toISOString().split('T')[0] ===
                    fromDate.toISOString().split('T')[0]
                  ) {
                    return this.createError({
                      message: 'Till date cannot be the same as From date',
                    });
                  }
                  return this.createError({
                    message: 'Till date must be after From date',
                  });
                }
              }
              if (new Date(value) > new Date()) {
                return this.createError({
                  message: 'Till date cannot be in the future',
                });
              }
              return true;
            },
          ),
          noExpiry: Yup.boolean(),
        });

      case 'workSample':
        return Yup.object().shape({
          title: Yup.string()
            .required('Work Sample Title is required')
            .matches(/^[A-Za-z\s,.]+$/, 'must only contain letters'),
          description: Yup.string().matches(/^[A-Za-z\s,.]+$/, {
            message: 'Must only contain letters, spaces, commas, or periods',
            excludeEmptyString: true, // Allows blank strings to pass validation
          }),
          url: Yup.string()
            .url('Invalid URL')
            .required('Work Sample URL is required'),
          from: Yup.date()
            .required('From date is required')
            .test(
              'not-future-date',
              'Valid From date cannot be in the future',
              function (value) {
                return value ? new Date(value) <= new Date() : true; // Ensure from is not in the future
              },
            ),
          till: Yup.date().test(
            'till-validation',
            'Valid Till date must be before From date and cannot be the same',
            function (value) {
              const {from, stillWorking} = this.parent;
              if (stillWorking) {
                return true;
              }
              if (!value) {
                return this.createError({message: 'Till date is required'});
              }
              if (from) {
                const fromDate = new Date(from);
                const tillDate = new Date(value);
                if (tillDate <= fromDate) {
                  if (
                    tillDate.toISOString().split('T')[0] ===
                    fromDate.toISOString().split('T')[0]
                  ) {
                    return this.createError({
                      message: 'Till date cannot be the same as From date',
                    });
                  }
                  return this.createError({
                    message: 'Till date must be after From date',
                  });
                }
              }
              if (new Date(value) > new Date()) {
                return this.createError({
                  message: 'Till date cannot be in the future',
                });
              }
              return true;
            },
          ),
          noExpiry: Yup.boolean(),
        });
      case 'onlineProfile':
        return Yup.object().shape({
          title: Yup.string().required('Profile Name is required'),
          url: Yup.string()
            .url('Invalid URL')
            .required('Profile URL is required'),
          description: Yup.string().matches(/^[A-Za-z\s,.]+$/, {
            message: 'Must only contain letters, spaces, commas, or periods',
            excludeEmptyString: true, // Allows blank strings to pass validation
          }),
        });
      case 'presentation':
        return Yup.object().shape({
          title: Yup.string()
            .required('Presentation Title is required')
            .matches(/^[A-Za-z\s,.]+$/, 'must only contain letters'),
          description: Yup.string().matches(/^[A-Za-z\s,.]+$/, {
            message: 'Must only contain letters, spaces, commas, or periods',
            excludeEmptyString: true, // Allows blank strings to pass validation
          }),
          url: Yup.string()
            .url('Invalid URL')
            .required('Presentation URL is required'),
        });
      default:
        return Yup.object();
    }
  };

  const renderFields = (
    values,
    handleChange,
    errors,
    touched,
    setFieldValue,
  ) => {
    switch (activeTab) {
      case 'research':
        return (
          <>
            <Text style={profileStyle.formHeading}>
              Research Publication / Journal entry
            </Text>
            <Text style={profileStyle.formSubHeading}>
              Add links to your online publications
            </Text>
            <ReusableTextInput
              name="title"
              label="Research Publication / Journal entry Title*"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <ReusableTextInput
              name="url"
              label="Research Publication / Journal entry URL*"
              value={values.url}
              onChangeText={handleChange('url')}
            />

            <ReusableDatePicker
              label="Published Date"
              value={
                values.published_date ? new Date(values.published_date) : null
              } // Convert to Date object
              onChange={date => setFieldValue('published_date', date)}
              error={errors.published_date}
              touched={touched.published_date}
            />

            <ReusableTextInput
              name="description"
              label="Description"
              value={values.description}
              onChangeText={handleChange('description')}
            />
          </>
        );
      case 'patent':
        return (
          <>
            <Text style={profileStyle.formHeading}>Patent</Text>
            <Text style={profileStyle.formSubHeading}>
              Add details of patents you have filed
            </Text>
            <ReusableTextInput
              name="title"
              label="Patent Title*"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <ReusableTextInput
              name="url"
              label="Patent URL*"
              value={values.url}
              onChangeText={handleChange('url')}
            />
            <ReusableTextInput
              name="patentOffice"
              label="Patent office"
              value={values.patentOffice}
              onChangeText={handleChange('patentOffice')}
            />

            <CustomTabs
              label="Status"
              options={[
                {id: 1, label: 'Patent Issued', value: 'Patent Issued'},
                {id: 2, label: 'Patent Pending', value: 'Patent Pending'},
              ]}
              selectedValue={values.status}
              setFieldValue={setFieldValue}
              fieldName="status"
            />
            <ReusableTextInput
              name="application_number"
              label="Application Number"
              value={values.application_number}
              onChangeText={handleChange('application_number')}
            />
            {values.status === 'issued' && (
              <ReusableDatePicker
                label="Issued Date"
                value={values.issued_date}
                onChange={date => setFieldValue('issued_date', date)}
              />
            )}
            <ReusableTextInput
              name="description"
              label="Patent description"
              value={values.description}
              onChangeText={handleChange('description')}
            />
          </>
        );
      case 'certification':
        return (
          <>
            <Text style={profileStyle.formHeading}>Certifications</Text>
            <Text style={profileStyle.formSubHeading}>
              Add details of Certifications you have achieved/completed
            </Text>
            <ReusableTextInput
              name="title"
              label="Certification Name*"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <ReusableTextInput
              name="certification_provider"
              label="Certification Provider*"
              value={values.certification_provider}
              onChangeText={handleChange('certification_provider')}
            />
            <ReusableTextInput
              name="completion_id"
              label="Certification Completion ID"
              value={values.completion_id}
              onChangeText={handleChange('completion_id')}
            />
            <ReusableTextInput
              name="url"
              label="Certification URL (recommended)"
              value={values.url}
              onChangeText={handleChange('url')}
            />
            <ReusableDatePicker
              label="Valid from"
              value={values.from ? new Date(values.from) : null}
              onChange={date => setFieldValue('from', date)}
              error={errors.from}
              touched={touched.from}
            />

            {!values.noExpiry && (
              <ReusableDatePicker
                label="Valid till"
                value={values.till ? new Date(values.till) : null}
                onChange={date => setFieldValue('till', date)}
                error={errors.till}
                touched={touched.till}
              />
            )}
            <View style={styles.checkboxContainer}>
              <Checkbox.Item
                labelStyle={styles.checkboxLabel}
                status={values.noExpiry ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFieldValue('noExpiry', !values.noExpiry);
                  setFieldValue('till', '');
                }}
                color={colors.primary}
              />
              <Text style={styles.checkboxLabel}>
                This certification does not expire
              </Text>
            </View>
          </>
        );
      case 'workSample':
        return (
          <>
            <Text style={profileStyle.formHeading}>Work samples</Text>
            <Text style={profileStyle.formSubHeading}>
              Link relevant work samples (e.g. Github, Behance)
            </Text>
            <ReusableTextInput
              name="title"
              label="Work sample Title*"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <ReusableTextInput
              name="url"
              label="Work sample URL*"
              value={values.url}
              onChangeText={handleChange('url')}
            />

            <ReusableDatePicker
              label="Worked from"
              value={values.from ? new Date(values?.from) : null}
              onChange={date => setFieldValue('from', date)}
              error={errors.from}
              touched={touched.from}
            />

            {!values.stillWorking && (
              <ReusableDatePicker
                label="Worked till"
                value={values.till ? new Date(values?.till) : null}
                onChange={date => setFieldValue('till', date)}
                error={errors.till}
                touched={touched.till}
              />
            )}
            <View style={styles.checkboxContainer}>
              <Checkbox.Item
                status={values.stillWorking ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFieldValue('stillWorking', !values.stillWorking);
                  setFieldValue('till', '');
                }}
                color={colors.primary}
              />
              <Text style={styles.checkboxLabel}>Still Working </Text>
            </View>
            <ReusableTextInput
              name="description"
              label="Work Sample description"
              value={values.description}
              onChangeText={handleChange('description')}
            />
          </>
        );
      case 'onlineProfile':
        return (
          <>
            <Text style={profileStyle.formHeading}>Online profiles</Text>
            <Text style={profileStyle.formSubHeading}>
              Add link to online professional profiles (e.g. LinkedIn, etc.)
            </Text>
            <ReusableTextInput
              name="title"
              label="Social profile*"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <ReusableTextInput
              name="url"
              label="Profile URL*"
              value={values.url}
              onChangeText={handleChange('url')}
            />
            <ReusableTextInput
              name="description"
              label="Profile description"
              value={values.description}
              onChangeText={handleChange('description')}
            />
          </>
        );
      case 'presentation':
        return (
          <>
            <Text style={profileStyle.formHeading}>Presentation</Text>
            <Text style={profileStyle.formSubHeading}>
              Add links to your online presentations (e.g. Slideshare
              presentation links etc.).
            </Text>
            <ReusableTextInput
              name="title"
              label="Presentation Title*"
              value={values.title}
              onChangeText={handleChange('title')}
            />
            <ReusableTextInput
              name="url"
              label="Presentation URL*"
              value={values.url}
              onChangeText={handleChange('url')}
            />
            <ReusableTextInput
              name="description"
              label="Presentation description"
              value={values.description}
              onChangeText={handleChange('description')}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={profileStyle.mainContainer}>
      <ScrollView>
        <View style={profileStyle.editContainer}>
          <Text style={profileStyle.heading}>ACCOMPLISHMENTS</Text>
        </View>

        <View style={styles.tabContainer}>
          {TAB_OPTIONS.map(item => (
            <TouchableOpacity
              key={item.key}
              onPress={() => openModal(item.key, item)}
              style={[profileStyle.userDataContainer, styles.tabOption]}>
              <Text style={[profileStyle.optionalData, styles.tabOptionText]}>
                {item.label}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                style={styles.iconStyles}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.savedDataSection}>
          {accomplishmentsData?.length > 0 ? (
            accomplishmentsData.map((item, index) => (
              <View key={index} style={styles.categoryContainer}>
                <TouchableOpacity
                  onPress={() =>
                    openModal(
                      TAB_OPTIONS.find(tab => tab.label === item.name)?.key ||
                        null,
                      item, // Pass the full item
                    )
                  }>
                  <View style={styles.savedDataContainer}>
                    <View>
                      <Text style={styles.labelStyle}>
                        {item.name || 'Unknown Category'}
                      </Text>
                      {item.title && (
                        <View style={styles.outputData}>
                          <Text style={styles.titleText}>{item.title}</Text>
                        </View>
                      )}
                      {item.url && (
                        <View style={styles.outputData}>
                          <Text style={styles.urlText}>{item.url}</Text>
                        </View>
                      )}
                      {item.description && (
                        <View style={styles.outputData}>
                          <Text style={styles.descriptionText}>
                            {item.description}
                          </Text>
                        </View>
                      )}
                    </View>
                    <IconButton
                      icon="pencil-outline"
                      iconColor={'black'}
                      size={20}
                      onPress={() =>
                        openModal(
                          TAB_OPTIONS.find(tab => tab.label === item.name)
                            ?.key || null,
                          item, // Pass the full item
                        )
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No accomplishments added yet.</Text>
          )}
        </View>

        <Modal visible={modalVisible} transparent onRequestClose={closeModal}>
          <View style={profileStyle.modalContainer}>
            <FlatList
              data={[{key: 'form'}]}
              renderItem={() => (
                <Formik
                  initialValues={{
                    name:
                      selectedItem?.name ||
                      TAB_OPTIONS.find(tab => tab.key === activeTab)?.label ||
                      '', // Fallback to the tab label
                    title: selectedItem?.title || '',

                    url: selectedItem?.url || '',
                    description: selectedItem?.description || '',
                    published_date: selectedItem?.published_date || null,
                    patentOffice: selectedItem?.patentOffice || '',
                    application_number: selectedItem?.application_number || '',
                    status: selectedItem?.status || '',
                    issued_date: selectedItem?.issued_date || null,
                    certification_provider:
                      selectedItem?.certification_provider || '',
                    completion_id: selectedItem?.completion_id || '',
                    from: selectedItem?.from || null,
                    till:
                      selectedItem?.noExpiry || selectedItem?.stillWorking
                        ? null
                        : selectedItem?.till || null,
                    noExpiry: selectedItem?.noExpiry || false,
                    stillWorking: selectedItem?.stillWorking || false,
                  }}
                  validationSchema={getValidationSchema()}
                  innerRef={ref => (formikRef = ref)}
                  onSubmit={handleSubmit}>
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    setFieldValue,
                  }) => (
                    <View style={profileStyle.modalContainer}>
                      {renderFields(
                        values,
                        handleChange,
                        errors,
                        touched,
                        setFieldValue,
                      )}
                    </View>
                  )}
                </Formik>
              )}
              keyExtractor={item => item.key}
            />
            <ModalFooter
              onPress={() => formikRef?.handleSubmit()} // Submits the form
              onCancel={closeModal} // Cancels and closes the modal
              showDelete={selectedItem !== null}
              onDelete={deleteItem} // Deletes the project
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
  },
  tabOption: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.background,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 8,
  },
  tabOptionText: {
    fontSize: 12,
    color: colors.primary,
  },
  iconStyles: {
    color: colors.secondary,
  },

  categoryContainer: {
    marginBottom: 20,
  },
  savedDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
    paddingLeft: 12,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  urlText: {
    fontSize: 12,
    color: colors.secondary,
  },
  descriptionText: {
    fontSize: 12,
    color: colors.blackText,
  },

  labelStyle: {
    marginBottom: 12,
    color: colors.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 12,
    color: colors.primary,
  },
});

export default Accomplishments;
