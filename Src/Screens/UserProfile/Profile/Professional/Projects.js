import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import moment from 'moment';
import profileStyle from '../../ProfileStyle';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ReusableDropdown from '../../../../Constant/CustomDropdown';
import ReusableDatePicker from '../../../../Constant/CustomDatePicker';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {IconButton} from 'react-native-paper';
import {colors} from '../../../../Global_CSS/TheamColors';
import CustomTabs from '../../../../Constant/CustomTabs';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import * as Yup from 'yup';
import {ProfileContext} from '../../ProfileContext';
import MasterViewController from '../../../../Redux/Action/MasterViewController';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';

const TeamSizeOptions = Array.from({length: 31}, (_, i) => ({
  label: `${i}`,
  value: i,
}));

const ProjectStatusOptions = [
  {id: 1, label: 'In Progress', value: 'In Progress'},
  {id: 2, label: 'Finished', value: 'Finished'},
];

const ProjectSiteOptions = [
  {id: 1, label: 'Off Site', value: 'Off Site'},
  {id: 2, label: 'On Site', value: 'On Site'},
];

const EmploymentNatureOptions = [
  {id: 1, label: 'Full Time', value: 'Full Time'},
  {id: 2, label: 'Part Time', value: 'Part Time'},
  {id: 3, label: 'Contractual', value: 'Contractual'},
];
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Project Title is required')
    .min(3, 'Title should be at least 3 characters long')
    .matches(
      /^[A-Za-z\s,.]+$/,
      'Title must only contain letters, spaces, or commas',
    ),
  role: Yup.string()
    .required('Role is required')
    .matches(
      /^[A-Za-z\s,.]+$/,
      'Title must only contain letters, spaces, or commas',
    ),
  client: Yup.string()
    .required('Client is required')
    .min(2, 'Client name should be at least 2 characters long')
    .matches(
      /^[A-Za-z\s,.]+$/,
      'Title must only contain letters, spaces, or commas',
    ),
  status: Yup.string()
    .required('Project Status is required')
    .oneOf(['In Progress', 'Finished'], 'Invalid status'),
  description: Yup.string()
    .required('Project Details are required')
    .min(10, 'Description should be at least 10 characters long'),
  worked_duration: Yup.object().shape({
    from: Yup.date()
      .required('Start date is required')
      .typeError('Invalid start date format')
      .max(new Date(), 'Start date cannot be in the future'),
    till: Yup.date()
      .nullable()
      .typeError('Invalid end date format')
      .test(
        'validate-till-required',
        'End date is required when status is Finished',
        function (value) {
          const {status} = this.parent;
          if (status === 'Finished' && !value) {
            return this.createError({
              message: 'End date is required when status is Finished',
            });
          }
          return true; // Pass validation if not 'Finished' or value exists
        },
      )
      .test(
        'validate-till-after-from',
        'End date must be strictly after start date',
        function (value) {
          const {from, status} = this.parent;
          if (value && from && value <= from) {
            return this.createError({
              message:
                status === 'Finished'
                  ? 'End date must be strictly after start date when status is Finished'
                  : 'End date must be strictly after start date',
            });
          }
          return true; // Pass validation if no issues
        },
      ),
  }),
});

const Projects = profileDetails => {
  const {isUpdatedProfile, toggleIsUpdatedProfile} = useContext(ProfileContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [keyskillsMasters, setKeyskillsMasters] = useState([]);

  let formikRef = null;

  const [id, setId] = useState();
  const dispatch = useDispatch();
  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();

  const {GetKeyskills} = MasterViewController();
  const {keyskills} = useSelector(state => state.master);
  // const [selectedStatus, setSelectedStatus] = useState(null); // Track selected tab

  // const handleTabPress = value => {
  //   setSelectedStatus(value); // Update the selected tab
  // };
  useEffect(() => {
    if (profileDetails?.profileDetails?.project_details) {
      setProjectList(profileDetails?.profileDetails?.project_details);
    }
  }, [profileDetails]);

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

    // dispatch(GetProfileAnalytic('e')); // Dispatch the action when the component mounts
  }, [profileDetails]);

  useEffect(() => {
    const get_keyskills = () => {
      dispatch(GetKeyskills());
    };
    get_keyskills();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keyskills_data = keyskills?.map(skill => ({
      id: skill.id,
      value: skill.name,
    }));

    setKeyskillsMasters(keyskills_data);

    // console.log('Job Title Category', role_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyskills]);

  const openModal = item => {
    setSelectedProject(item);
    setModalVisible(true);
    setShowMoreDetails(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProject(null);
  };

  const handleFormSubmit = values => {
    if (selectedProject) {
      const updateOrAddObject = (array, obj) => {
        const index = array.findIndex(
          item => item.title === selectedProject.title,
        );

        if (index !== -1) {
          // Update the existing object
          array[index] = {...array[index], ...obj};
        } else {
          // Add the new object if not found
          array.push(obj);
        }
      };

      updateOrAddObject(projectList, values);
      const payload = {
        id: profileDetails?.profileDetails?.id,
        project_details: projectList,
      };

      dispatch(updateProfileDetails(payload));
      toggleIsUpdatedProfile();
      setProjectList(projectList);
      setModalVisible(false);
      setSelectedProject(null);
    } else {
      const formattedValues = {
        id: profileDetails?.profileDetails?.id
          ? profileDetails?.profileDetails?.id
          : '',
        user_id: id,
        project_details: [
          ...(profileDetails?.profileDetails?.project_details || []), // Include existing entries

          {
            title: values.title,
            client: values.client,
            status:
              values.status === 'In Progress' ? 'In Progress' : 'Finished',
            description: values.description,
            worked_duration: {
              from: values.worked_duration.from
                ? moment(values.worked_duration.from).format('YYYY-MM-DD')
                : null,
              till:
                values.status === 'In Progress'
                  ? null // Set till to null when the status is "In Progress"
                  : values.worked_duration.till
                  ? moment(values.worked_duration.till).format('YYYY-MM-DD')
                  : null,
            },
            nature_of_employment: values.nature_of_employment,
            project_location: values.project_location,
            project_site: values.project_site,
            team_size: values.team_size,
            role: values.role,
            role_description: values.role_description,
            skills_used: values.skills_used.map(skill =>
              typeof skill === 'string'
                ? skill
                : keyskillsMasters.find(item => item.value === skill?.value)
                    ?.value || '',
            ),
          },
        ],
      };

      setProjectList(prev => {
        if (selectedProject !== null) {
          const updatedList = [...prev];
          updatedList[selectedProject] = formattedValues;
          return updatedList;
        }
        return [...prev, formattedValues];
      });

      if (profileDetails?.profileDetails?.id) {
        dispatch(updateProfileDetails(formattedValues));
      } else {
        dispatch(addProfileDetails(formattedValues));
      }
      toggleIsUpdatedProfile();
      closeModal();
    }
  };

  const deleteProject = () => {
    const filteredArray = projectList.filter(
      item => item.title !== selectedProject.title,
    );
    setProjectList(filteredArray);
    const payload = {
      id: profileDetails?.profileDetails?.id,
      project_details: filteredArray,
    };

    dispatch(updateProfileDetails(payload));
    toggleIsUpdatedProfile();
    // // Reset state and close modal
    setSelectedProject(null);
    closeModal();
  };

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>PROJECTS</Text>
        <IconButton
          icon={'plus-circle-outline'}
          iconColor={colors.blackText}
          size={20}
          onPress={() => openModal(null)}
          style={profileStyle.editButton}
        />
      </View>

      <View>
        {Array.isArray(profileDetails?.profileDetails?.project_details) &&
        profileDetails?.profileDetails?.project_details.length > 0 ? (
          profileDetails.profileDetails.project_details.map((item, index) => (
            <View key={index}>
              <View style={styles.outputContainer}>
                <TouchableOpacity
                  style={[profileStyle.userDataContainer, styles.dataContainer]}
                  onPress={() => openModal(item)}>
                  <Text style={styles.titleText}>
                    {item?.title || 'No Title'}
                  </Text>
                  <Text style={styles.clientText}>
                    {item?.client || 'No Client'}
                  </Text>
                  <Text style={styles.optionalData}>
                    {item?.worked_duration?.from
                      ? moment(item?.worked_duration?.from).format(
                          'DD-MMM-YYYY',
                        )
                      : 'No Start Date'}
                    {' - '}
                    {item?.status === 'In Progress'
                      ? 'Present'
                      : item?.worked_duration?.till
                      ? moment(item?.worked_duration?.till).format(
                          'DD-MMM-YYYY',
                        )
                      : 'No End Date'}{' '}
                    • {item?.nature_of_employment || 'No Employment Type'}
                  </Text>
                </TouchableOpacity>

                <IconButton
                  icon="pencil-outline"
                  iconColor="black"
                  size={20}
                  onPress={() => openModal(item)}
                />
              </View>

              {profileDetails.profileDetails.project_details.length > 1 &&
                index <
                  profileDetails.profileDetails.project_details.length - 1 && (
                  <View style={styles.horizontalLine} />
                )}
            </View>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={profileStyle.optionalData}>
              Stand out to employers by adding details about projects that you
              have done so far
            </Text>
          </View>
        )}
      </View>

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
                initialValues={{
                  title: selectedProject?.title || '',
                  client: selectedProject?.client || '',
                  status: selectedProject?.status || 'Finished',
                  description: selectedProject?.description || '',
                  worked_duration: {
                    from: selectedProject?.worked_duration?.from
                      ? new Date(selectedProject?.worked_duration?.from)
                      : null,
                    till: selectedProject?.worked_duration?.till
                      ? new Date(selectedProject?.worked_duration?.till)
                      : null,
                  },
                  project_location: selectedProject?.project_location || '',
                  project_site: selectedProject?.project_site || 'Off Site',
                  nature_of_employment:
                    selectedProject?.nature_of_employment || 'Full Time',
                  team_size: selectedProject?.team_size || '',
                  role: selectedProject?.role || '',
                  role_description: selectedProject?.role_description || '',
                  skills_used: selectedProject?.skills_used || [],
                }}
                innerRef={ref => (formikRef = ref)}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  errors,
                  touched,
                  values,
                }) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>
                      PROJECT DETAILS
                    </Text>
                    <Text style={profileStyle.formSubHeading}>
                      Add details about your current and preferred job profile.
                    </Text>
                    <ReusableTextInput
                      name="title"
                      label="Project Title*"
                      value={values.title}
                      onChangeText={handleChange('title')}
                    />
                    <ReusableTextInput
                      name="role"
                      label="Role in Project"
                      value={values.role}
                      onChangeText={handleChange('role')}
                    />
                    <ReusableTextInput
                      name="client"
                      label="Client*"
                      value={values.client}
                      onChangeText={handleChange('client')}
                    />
                    {/* <CustomTabs
                      label="Project Status*"
                      options={ProjectStatusOptions}
                      selectedValue={values.status} // Bind to the Formik value
                      setFieldValue={setFieldValue}
                      fieldName="status"
                      // error={errors.status}
                      // touched={touched.status}
                    /> */}
                    <Text
                      style={[
                        styles.label, // Base label style
                        touched.status && errors.status
                          ? styles.errorLabel
                          : null, // Apply error styling conditionally
                      ]}>
                      Project Status*
                    </Text>
                    <View style={profileStyle.TabContainer}>
                      {ProjectStatusOptions.map(option => (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            profileStyle.tabBtnStyle,
                            values.status === option.value &&
                              profileStyle.selectedTab, // Apply style if selected
                          ]}
                          onPress={() => setFieldValue('status', option.value)}>
                          <Text
                            style={[
                              profileStyle.tabBtnText,
                              values.status === option.value &&
                                profileStyle.selectedTabText, // Change text color if selected
                            ]}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <ReusableDatePicker
                      label="Worked From*"
                      value={values.worked_duration?.from || null}
                      onChange={date =>
                        setFieldValue('worked_duration.from', date || null)
                      }
                      error={errors.worked_duration?.from} // Show error only if touched and there is an error
                      touched={touched.worked_duration?.from}
                    />

                    {values.status === 'Finished' && (
                      <ReusableDatePicker
                        label="Worked Till*"
                        value={values.worked_duration?.till || null}
                        onChange={date =>
                          setFieldValue('worked_duration.till', date || null)
                        }
                        error={errors.worked_duration?.till} // Show error only if touched and there is an error
                        touched={touched.worked_duration?.till}
                      />
                    )}

                    <ReusableTextInput
                      name="description"
                      label="Project Details*"
                      value={values.description}
                      onChangeText={handleChange('description')}
                    />
                    <CustomSelectionModal
                      title="Skills Used"
                      data={keyskillsMasters}
                      selectedItems={values.skills_used.map(
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
                          'skills_used',
                          items.map(item => item?.value || ''),
                        )
                      }
                      placeholder="Select Skills"
                      isMultiSelect
                      maxSelectionLimit={5}
                      // error={errors.skills_used}
                      // touched={touched.skills_used}
                    />
                    {showMoreDetails ? (
                      <View />
                    ) : (
                      <TouchableOpacity
                        onPress={() => setShowMoreDetails(!showMoreDetails)}>
                        <Text
                          style={{
                            color: 'blue',
                            fontWeight: 'bold',
                            marginVertical: 10,
                          }}>
                          Add more details +
                        </Text>
                      </TouchableOpacity>
                    )}

                    {showMoreDetails && (
                      <>
                        <ReusableTextInput
                          name="project_location"
                          label="Project Location"
                          value={values.project_location}
                          onChangeText={handleChange('project_location')}
                        />
                        <CustomTabs
                          label="Project Site*"
                          options={ProjectSiteOptions}
                          selectedValue={values.project_site}
                          setFieldValue={setFieldValue}
                          fieldName="project_site"
                        />
                        <CustomTabs
                          label="Nature of Employment*"
                          options={EmploymentNatureOptions}
                          selectedValue={values.nature_of_employment}
                          setFieldValue={setFieldValue}
                          fieldName="nature_of_employment"
                        />
                        <ReusableDropdown
                          options={TeamSizeOptions}
                          placeholder="Team Size"
                          selectedValue={values.team_size}
                          onSelect={item =>
                            setFieldValue('team_size', item.value)
                          }
                        />

                        <ReusableTextInput
                          name="role_description"
                          label="Role Description"
                          value={values.role_description}
                          onChangeText={handleChange('role_description')}
                        />
                      </>
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
            showDelete={selectedProject !== null} // Shows the delete button if a project is selected
            onDelete={deleteProject} // Deletes the project
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    height: 0.5,
    backgroundColor: 'lightgray', // Light gray color
    marginVertical: 8,
  },
  dataContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  outputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 8,
    paddingVertical: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  clientText: {
    fontSize: 14,
    color: colors.primary,
  },
  optionalData: {
    fontSize: 12,
    color: 'gray',
  },
  label: {
    fontSize: 12,
    color: colors.secondary,
  },
  errorLabel: {
    color: 'red',
  },
});

export default Projects;
