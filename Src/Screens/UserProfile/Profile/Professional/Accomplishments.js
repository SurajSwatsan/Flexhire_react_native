import React, {useState} from 'react';
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

const TAB_OPTIONS = [
  {label: 'Research Publication', key: 'research'},
  {label: 'Patent', key: 'patent'},
  {label: 'Certification', key: 'certification'},
  {label: 'Work Sample', key: 'workSample'},
  {label: 'Online Profile', key: 'onlineProfile'},
  {label: 'Presentation', key: 'presentation'},
];

const initialValues = {
  title: '',
  url: '',
  description: '',
  publishedDate: null,
  patentTitle: '',
  patentURL: '',
  patentOffice: '',
  patentdescription: '',
  applicationNumber: '',
  status: '',
  issuedDate: null,
  certificationName: '',
  certificationProvider: '',
  completionID: '',
  certificationURL: '',
  validFrom: null,
  validTill: null,
  noExpiry: false,
  workSampleTitle: '',
  workSampleURL: '',
  workSampledescription: '',
  workedFrom: null,
  workedTill: null,
  stillWorking: false,
  profileName: '',
  profileURL: '',
  profiledescription: '',
  presentationTitle: '',
  presentationURL: '',
  presentationdescription: '',
};

const Accomplishments = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [savedData, setSavedData] = useState({
    research: [],
    patent: [],
    certification: [],
    workSample: [],
    onlineProfile: [],
    presentation: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  let formikRef = null;

  const openModal = (key, index = null) => {
    setActiveTab(key);
    setModalVisible(true);
    setEditingIndex(index);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveTab(null);
    setEditingIndex(null);
  };
  console.log(savedData);

  const handleSubmit = values => {
    const updatedTabData = [...(savedData[activeTab] || [])];
    if (editingIndex !== null) {
      updatedTabData[editingIndex] = values;
    } else {
      updatedTabData.push(values);
    }
    setSavedData(prevData => ({
      ...prevData,
      [activeTab]: updatedTabData,
    }));
    closeModal();
  };
  const deleteItem = () => {
    if (editingIndex !== null && activeTab) {
      // Remove the item from the active tab's data
      const updatedTabData = savedData[activeTab].filter(
        (_, idx) => idx !== editingIndex,
      );
      setSavedData(prevData => ({
        ...prevData,
        [activeTab]: updatedTabData, // Update the specific tab
      }));
      closeModal();
    }
  };
  const getValidationSchema = () => {
    switch (activeTab) {
      case 'research':
        return Yup.object().shape({
          title: Yup.string().required('Title is required'),
          url: Yup.string().url('Invalid URL').required('URL is required'),
        });
      case 'patent':
        return Yup.object().shape({
          patentTitle: Yup.string().required('Patent Title is required'),
          patentURL: Yup.string()
            .url('Invalid URL')
            .required('Patent URL is required'),
        });
      case 'certification':
        return Yup.object().shape({
          certificationName: Yup.string().required(
            'Certification Name is required',
          ),
          certificationProvider: Yup.string().required('Provider is required'),
        });
      case 'workSample':
        return Yup.object().shape({
          workSampleTitle: Yup.string().required(
            'Work Sample Title is required',
          ),
          workSampleURL: Yup.string()
            .url('Invalid URL')
            .required('Work Sample URL is required'),
        });
      case 'onlineProfile':
        return Yup.object().shape({
          profileName: Yup.string().required('Profile Name is required'),
          profileURL: Yup.string()
            .url('Invalid URL')
            .required('Profile URL is required'),
        });
      case 'presentation':
        return Yup.object().shape({
          presentationTitle: Yup.string().required(
            'Presentation Title is required',
          ),
          presentationURL: Yup.string()
            .url('Invalid URL')
            .required('Presentation URL is required'),
        });
      default:
        return Yup.object();
    }
  };

  const renderFields = (values, handleChange, setFieldValue) => {
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
                values.publishedDate ? new Date(values.publishedDate) : null
              } // Convert to Date object
              onChange={date => setFieldValue('publishedDate', date)}
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
              name="patentTitle"
              label="Patent Title*"
              value={values.patentTitle}
              onChangeText={handleChange('patentTitle')}
            />
            <ReusableTextInput
              name="patentURL"
              label="Patent URL*"
              value={values.patentURL}
              onChangeText={handleChange('patentURL')}
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
              name="applicationNumber"
              label="Application Number"
              value={values.applicationNumber}
              onChangeText={handleChange('applicationNumber')}
            />
            {values.status === 'issued' && (
              <ReusableDatePicker
                label="Issued Date"
                value={values.issuedDate}
                onChange={date => setFieldValue('issuedDate', date)}
              />
            )}
            <ReusableTextInput
              name="patentdescription"
              label="Patent description"
              value={values.patentdescription}
              onChangeText={handleChange('patentdescription')}
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
              name="certificationName"
              label="Certification Name*"
              value={values.certificationName}
              onChangeText={handleChange('certificationName')}
            />
            <ReusableTextInput
              name="certificationProvider"
              label="Certification Provider*"
              value={values.certificationProvider}
              onChangeText={handleChange('certificationProvider')}
            />
            <ReusableTextInput
              name="completionID"
              label="Certification Completion ID"
              value={values.completionID}
              onChangeText={handleChange('completionID')}
            />
            <ReusableTextInput
              name="certificationURL"
              label="Certification URL (recommended)"
              value={values.certificationURL}
              onChangeText={handleChange('certificationURL')}
            />
            <ReusableDatePicker
              label="Valid from"
              value={values.validFrom}
              onChange={date => setFieldValue('validFrom', date)}
            />

            {!values.noExpiry && (
              <ReusableDatePicker
                label="Valid till"
                value={values.validTill}
                onChange={date => setFieldValue('validTill', date)}
              />
            )}
            <Checkbox.Item
              label="This certification does not expire"
              status={values.noExpiry ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('noExpiry', !values.noExpiry)}
            />
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
              name="workSampleTitle"
              label="Work sample Title*"
              value={values.workSampleTitle}
              onChangeText={handleChange('workSampleTitle')}
            />
            <ReusableTextInput
              name="workSampleURL"
              label="Work sample URL*"
              value={values.workSampleURL}
              onChangeText={handleChange('workSampleURL')}
            />

            <ReusableDatePicker
              label="Worked from"
              value={values.workedFrom}
              onChange={date => setFieldValue('workedFrom', date)}
            />

            {!values.stillWorking && (
              <ReusableDatePicker
                label="Worked till"
                value={values.workedTill}
                onChange={date => setFieldValue('workedTill', date)}
              />
            )}
            <Checkbox.Item
              label="Still Working"
              status={values.stillWorking ? 'checked' : 'unchecked'}
              onPress={() =>
                setFieldValue('stillWorking', !values.stillWorking)
              }
            />
            <ReusableTextInput
              name="workSampledescription"
              label="Work Sample description"
              value={values.workSampledescription}
              onChangeText={handleChange('workSampledescription')}
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
              name="profileName"
              label="Social profile*"
              value={values.profileName}
              onChangeText={handleChange('profileName')}
            />
            <ReusableTextInput
              name="profileURL"
              label="Profile URL*"
              value={values.profileURL}
              onChangeText={handleChange('profileURL')}
            />
            <ReusableTextInput
              name="profiledescription"
              label="Profile description"
              value={values.profiledescription}
              onChangeText={handleChange('profiledescription')}
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
              name="presentationTitle"
              label="Presentation Title*"
              value={values.presentationTitle}
              onChangeText={handleChange('presentationTitle')}
            />
            <ReusableTextInput
              name="presentationURL"
              label="Presentation URL*"
              value={values.presentationURL}
              onChangeText={handleChange('presentationURL')}
            />
            <ReusableTextInput
              name="presentationdescription"
              label="Presentation description"
              value={values.presentationdescription}
              onChangeText={handleChange('presentationdescription')}
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderSavedData = () => {
    const displayFields = [
      'title',
      'url',
      'description',
      'patentTitle',
      'patentURL',
      'patentdescription',
      'certificationName',
      'certificationProvider',
      'completionID',
      'certificationURL',
      'validFrom',
      // 'validTill',
      'workSampleTitle',
      'workSampleURL',
      'workSampledescription',
      'profileName',
      'profileURL',
      'profiledescription',
      'presentationTitle',
      'presentationURL',
      'presentationdescription',
    ]; // Specify fields to show

    return Object.keys(savedData).map(tabKey => {
      const tabData = savedData[tabKey];
      if (tabData.length === 0) {
        return null; // Skip empty categories
      }

      return (
        <View key={tabKey} style={styles.categoryContainer}>
          <Text style={styles.labelStyle}>
            {TAB_OPTIONS.find(tab => tab.key === tabKey)?.label}
          </Text>

          {tabData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.savedDataContainer}
              onPress={() => openModal(tabKey, index)}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  flex: 1,
                }}>
                {Object.entries(item)
                  .filter(
                    ([key, value]) =>
                      displayFields.includes(key) &&
                      value !== null &&
                      value !== undefined &&
                      value !== '',
                  ) // Only show specific fields with data
                  .map(([key, value]) => {
                    // Check if validFrom and validTill exist
                    if (key === 'validFrom' && item.validTill) {
                      return (
                        <Text
                          key={`valid-range-${index}`}
                          style={[styles.fieldValue, styles.dateRange]}>
                          {item.validFrom && item.validTill
                            ? `Validity : ${moment(item.validFrom).format(
                                'YYYY',
                              )} - ${moment(item.validTill).format('YYYY')}`
                            : ''}
                        </Text>
                      );
                    }

                    // Render other fields
                    return (
                      <View key={key} style={styles.fieldContainer}>
                        {/* <Text
                          style={[
                            styles.fieldLabel,
                            labelSpecificStyles[key]?.labelStyle,
                          ]}>
                          {key}:
                        </Text> */}
                        <Text
                          style={[
                            styles.fieldValue,
                            labelSpecificStyles[key]?.valueStyle,
                          ]}>
                          {typeof value === 'object' && value.toISOString
                            ? moment(value).format('YYYY')
                            : value}
                        </Text>
                      </View>
                    );
                  })}
              </View>
              <IconButton
                icon="pencil-outline"
                iconColor={colors.blackText}
                size={20}
                onPress={() => openModal(tabKey, index)}
                style={styles.editButton}
              />
              {/* <TouchableOpacity
                onPress={() => openModal(tabKey, index)}
                style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity> */}
            </TouchableOpacity>
          ))}
          <View style={styles.separator} />
        </View>
      );
    });
  };

  return (
    <View style={profileStyle.mainContainer}>
      <ScrollView>
        <View style={profileStyle.editContainer}>
          <Text style={profileStyle.heading}>Accomplishments</Text>
        </View>

        <View style={styles.tabContainer}>
          {TAB_OPTIONS.map(item => (
            <TouchableOpacity
              key={item.key}
              onPress={() => openModal(item.key)}
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

        <View style={styles.savedDataSection}>{renderSavedData()}</View>

        <Modal visible={modalVisible} transparent onRequestClose={closeModal}>
          <View style={profileStyle.modalContainer}>
            <FlatList
              data={[{key: 'form'}]}
              renderItem={() => (
                <Formik
                  initialValues={
                    editingIndex !== null &&
                    savedData[activeTab] &&
                    savedData[activeTab][editingIndex]
                      ? savedData[activeTab][editingIndex]
                      : initialValues
                  }
                  validationSchema={getValidationSchema()}
                  innerRef={ref => (formikRef = ref)}
                  onSubmit={handleSubmit}>
                  {({values, handleChange, handleSubmit, setFieldValue}) => (
                    <View style={profileStyle.modalContainer}>
                      {renderFields(values, handleChange, setFieldValue)}
                    </View>
                  )}
                </Formik>
              )}
              keyExtractor={item => item.key}
            />
            <ModalFooter
              onPress={() => formikRef?.handleSubmit()} // Submits the form
              onCancel={closeModal} // Cancels and closes the modal
              showDelete={editingIndex !== null} // Shows the delete button if a project is selected
              onDelete={deleteItem} // Deletes the project
            />
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};
const labelSpecificStyles = {
  title: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  url: {
    valueStyle: {color: 'skyblue', textDecorationLine: 'underline'},
  },
  description: {
    valueStyle: {color: 'gray', fontSize: 13},
  },
  publishedDate: {
    valueStyle: {color: '#D35400', fontSize: 12},
  },
  patentTitle: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  patentURL: {
    valueStyle: {color: 'skyblue', fontSize: 13},
  },
  certificationName: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  certificationProvider: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  completionID: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  certificationURL: {
    valueStyle: {color: 'skyblue', fontSize: 13},
  },
  validFrom: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  workSampleTitle: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  workSampleURL: {color: 'skyblue', fontSize: 13},
  profileName: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  profileURL: {
    valueStyle: {color: 'skyblue', fontSize: 13},
  },
  profiledescription: {
    valueStyle: {color: 'gray', fontSize: 13},
  },
  presentationTitle: {
    valueStyle: {color: colors.primary, fontSize: 14, fontWeight: 'bold'},
  },
  presentationURL: {
    valueStyle: {color: 'skyblue', fontSize: 13},
  },
  presentationdescription: {
    valueStyle: {color: 'gray', fontSize: 13},
  },
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
  savedDataSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingBottom: 5,
  },
  savedDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,

    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  fieldLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    textTransform: 'capitalize',
  },
  fieldValue: {
    flex: 1,
    color: colors.primary,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
  labelStyle: {
    marginBottom: 12,
    color: colors.secondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: colors.primary, // Customize line color
  },
});

export default Accomplishments;
