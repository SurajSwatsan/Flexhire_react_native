import React, {useEffect, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';

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

const Projects = profileDetails => {
  const [modalVisible, setModalVisible] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  let formikRef = null;

  const [id, setId] = useState();
  const dispatch = useDispatch();
  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();
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
                ? moment(values.worked_duration.from).format('DD-MM-YYYY')
                : null,
              till:
                values.status === 'In Progress'
                  ? 'Present'
                  : values.worked_duration.till
                  ? moment(values.worked_duration.till).format('DD-MM-YYYY')
                  : null,
            },
            nature_of_employment: values.nature_of_employment,
            project_location: values.project_location,
            project_site: values.project_site,
            team_size: values.team_size,
            role: values.role,
            role_description: values.role_description,
            skills_used: values.skills_used,
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
      // dispatch(updateProfileDetails(formattedValues));

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

    // // Reset state and close modal
    setSelectedProject(null);
    closeModal();
  };

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>Projects</Text>
        <IconButton
          icon={'plus-circle-outline'}
          iconColor={colors.blackText}
          size={20}
          onPress={() => openModal(null)}
          style={profileStyle.editButton}
        />
      </View>

      <View>
        {profileDetails?.profileDetails?.project_details.length > 0 ? (
          profileDetails?.profileDetails?.project_details.map((item, index) => (
            <View key={index}>
              <View style={styles.outputContainer}>
                <TouchableOpacity
                  style={[profileStyle.userDataContainer, styles.dataContainer]}
                  onPress={() => openModal(item)}>
                  <Text style={profileStyle.optionalData}>
                    {item?.title || 'No Title'}
                  </Text>
                  <Text style={profileStyle.optionalData}>
                    {item?.client || 'No Client'}
                  </Text>
                  <Text style={profileStyle.optionalData}>
                    {item?.worked_duration?.from || 'No Start Date'} -{' '}
                    {item?.status === 'In Progress'
                      ? 'Present'
                      : item?.worked_duration?.till || 'No End Date'}{' '}
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

              {profileDetails?.profileDetails?.project_details.length > 1 &&
                index <
                  profileDetails?.profileDetails?.project_details.length -
                    1 && <View style={styles.horizontalLine} />}
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
                  status: selectedProject?.status || '',
                  description: selectedProject?.description || '',
                  worked_duration: {
                    from: selectedProject?.worked_duration?.from
                      ? moment(selectedProject?.worked_duration?.from).format(
                          'YYYY-MM-DD',
                        )
                      : null,
                    till: selectedProject?.worked_duration?.till
                      ? moment(selectedProject?.worked_duration?.till).format(
                          'YYYY-MM-DD',
                        )
                      : null,
                  },
                  project_location: selectedProject?.project_location || '',
                  project_site: selectedProject?.project_site || 'Off Site',
                  nature_of_employment:
                    selectedProject?.nature_of_employment || 'Full Time',
                  team_size: selectedProject?.team_size || '',
                  role: selectedProject?.role || '',
                  role_description: selectedProject?.role_description || '',
                  skills_used: selectedProject?.skills_used || '',
                }}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({handleChange, handleSubmit, setFieldValue, values}) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>
                      Project Details
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
                      value={
                        values.worked_duration?.from
                          ? moment(
                              values.worked_duration.from,
                              'YYYY-MM-DD',
                            ).toDate()
                          : null
                      }
                      onChange={date =>
                        setFieldValue('worked_duration', {
                          ...values.worked_duration,
                          from: moment(date).format('YYYY-MM-DD'), // Format date as YYYY-MM-DD
                        })
                      }
                    />

                    {values.status === 'Finished' && (
                      <ReusableDatePicker
                        label="Worked Till*"
                        value={
                          values.worked_duration?.till
                            ? moment(
                                values.worked_duration.till,
                                'YYYY-MM-DD',
                              ).toDate()
                            : null
                        }
                        onChange={date =>
                          setFieldValue('worked_duration', {
                            ...values.worked_duration,
                            till: moment(date).format('YYYY-MM-DD'), // Format date as YYYY-MM-DD
                          })
                        }
                      />
                    )}

                    <ReusableTextInput
                      name="description"
                      label="Project Details*"
                      value={values.description}
                      onChangeText={handleChange('description')}
                    />
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
                          name="role"
                          label="Role in Project"
                          value={values.role}
                          onChangeText={handleChange('role')}
                        />
                        <ReusableTextInput
                          name="role_description"
                          label="Role Description"
                          value={values.role_description}
                          onChangeText={handleChange('role_description')}
                        />
                        <ReusableTextInput
                          name="skills_used"
                          label="Skills Used"
                          value={values.skills_used}
                          onChangeText={handleChange('skills_used')}
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
});

export default Projects;
