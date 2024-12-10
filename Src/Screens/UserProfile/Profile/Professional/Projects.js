import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment'; // Import moment for date formatting
import profileStyle from '../../ProfileStyle';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ReusableDropdown from '../../../../Constant/CustomDropdown';
import ReusableDatePicker from '../../../../Constant/CustomDatePicker';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {IconButton} from 'react-native-paper';
import {colors} from '../../../../Global_CSS/TheamColors';
import CustomTabs from '../../../../Constant/CustomTabs';

// Dropdown Options
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

const getInitialValues = data => ({});

// Validation Schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Project title is required'),
  client: Yup.string().required('Client is required'),
  status: Yup.string().required('Project status is required'),
  description: Yup.string().required('Project details are required'),
});

const Projects = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  let formikRef = null;

  const openModal = (index = null) => {
    setSelectedProjectIndex(index);
    setModalVisible(true);
    setShowMoreDetails(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProjectIndex(null);
  };

  const handleFormSubmit = values => {
    const {worked_duration, ...rest} = values;
    const formattedValues = {
      ...rest,
      worked_duration: {
        from: worked_duration.from
          ? moment(worked_duration.from).format('DD-MM-YYYY')
          : null,
        till: worked_duration.till
          ? moment(worked_duration.till).format('DD-MM-YYYY')
          : null,
      },
    };

    const updatedProjectList = [...projectList];
    if (selectedProjectIndex !== null) {
      updatedProjectList[selectedProjectIndex] = formattedValues;
    } else {
      updatedProjectList.push(formattedValues);
    }

    setProjectList(updatedProjectList);
    closeModal();

    console.log(
      'Updated Project Details:',
      JSON.stringify({project_details: updatedProjectList}, null, 2),
    );
  };

  const deleteProject = () => {
    if (selectedProjectIndex !== null) {
      setProjectList(prevList =>
        prevList.filter((_, idx) => idx !== selectedProjectIndex),
      );
      closeModal();
      setSelectedProjectIndex(null);
    }
  };
  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>Projects</Text>
        <IconButton
          icon={'plus-circle-outline'}
          iconColor={colors.blackText}
          size={20}
          onPress={() => openModal()}
          style={profileStyle.editButton}
        />
      </View>

      <View>
        {projectList.length > 0 ? (
          projectList.map((item, index) => (
            <View key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={[profileStyle.userDataContainer, styles.dataContainer]}
                  onPress={() => openModal(index)}>
                  <Text style={profileStyle.optionalData}>{item.title}</Text>
                  <Text style={profileStyle.optionalData}>{item.client}</Text>

                  <Text style={profileStyle.optionalData}>
                    {item.worked_duration?.from
                      ? item.worked_duration.from
                      : 'N/A'}{' '}
                    -{' '}
                    {item.status === 'Finished' && item.worked_duration?.till
                      ? item.worked_duration.till
                      : 'Present'}{' '}
                    • {item.nature_of_employment}
                  </Text>
                </TouchableOpacity>
                <IconButton
                  icon="pencil-outline"
                  iconColor={'black'}
                  size={20}
                  onPress={() => openModal(index)}
                />
              </View>

              {/* Separator */}
              {projectList.length > 1 && index < projectList.length - 1 && (
                <View style={styles.horizontalLine} />
              )}
            </View>
          ))
        ) : (
          // Render when no data is available
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
                initialValues={
                  selectedProjectIndex !== null
                    ? getInitialValues(projectList[selectedProjectIndex])
                    : getInitialValues({})
                }
                validationSchema={validationSchema}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>PROJECT</Text>
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
                    <CustomTabs
                      label="Project Status*"
                      options={ProjectStatusOptions}
                      selectedValue={values.status}
                      setFieldValue={setFieldValue}
                      fieldName="status"
                      error={errors.status}
                      touched={touched.status}
                    />

                    {/* Render Worked From and Till based on project status */}
                    <ReusableDatePicker
                      label="Worked From*"
                      value={values.from}
                      onChange={date => setFieldValue('from', date)}
                    />
                    {values.status &&
                      (values.status === 'In Progress' ? (
                        <ReusableTextInput
                          name="till"
                          label="Till*"
                          value="Present"
                          editable={false} // Make it read-only
                        />
                      ) : (
                        <ReusableDatePicker
                          label="Worked Till*"
                          value={values.till}
                          onChange={date => setFieldValue('till', date)}
                        />
                      ))}
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
                        {showMoreDetails
                          ? 'Hide more details -'
                          : 'Add more details +'}
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
            showDelete={selectedProjectIndex !== null} // Shows the delete button if a project is selected
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
  },
});

export default Projects;
