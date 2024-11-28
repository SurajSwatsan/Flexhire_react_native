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

const initialProject = {
  projecttitle: '',
  client: '',
  projectstatus: '',
  workedFrom: moment().toDate(),
  workedTill: '',
  projectDetails: '',
  projectlocation: '',
  projectsite: 'Off Site',
  natureofemployment: 'Full Time',
  teamsize: '',
  role: '',
  roledescription: '',
  skillsused: '',
};

// Validation Schema
const validationSchema = Yup.object().shape({
  projecttitle: Yup.string().required('Project title is required'),
  client: Yup.string().required('Client is required'),
  projectstatus: Yup.string().required('Project status is required'),
  projectDetails: Yup.string().required('Project details are required'),
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
    const updatedProjectList = [...projectList];
    if (selectedProjectIndex !== null) {
      updatedProjectList[selectedProjectIndex] = values;
    } else {
      updatedProjectList.push(values);
    }
    setProjectList(updatedProjectList);
    closeModal();
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

  const formatDate = date => (date ? moment(date).format('MMM YYYY') : '');

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
                  <Text style={profileStyle.optionalData}>
                    {item.projecttitle}
                  </Text>
                  <Text style={profileStyle.optionalData}>{item.client}</Text>

                  <Text style={profileStyle.optionalData}>
                    {formatDate(item.workedFrom)} -{' '}
                    {item.projectstatus === 'Finished'
                      ? formatDate(item.workedTill)
                      : 'Present'}{' '}
                    • {item.natureofemployment}
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
                    ? projectList[selectedProjectIndex]
                    : initialProject
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
                      name="projecttitle"
                      label="Project Title*"
                      value={values.projecttitle}
                      onChangeText={handleChange('projecttitle')}
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
                      selectedValue={values.projectstatus}
                      setFieldValue={setFieldValue}
                      fieldName="projectstatus"
                      error={errors.projectstatus}
                      touched={touched.projectstatus}
                    />
                    <ReusableDatePicker
                      label="Worked From*"
                      value={values.workedFrom}
                      onChange={date => setFieldValue('workedFrom', date)}
                    />
                    {values.projectstatus === 'Finished' && (
                      <ReusableDatePicker
                        label="Worked Till*"
                        value={values.workedTill}
                        onChange={date => setFieldValue('workedTill', date)}
                      />
                    )}
                    <ReusableTextInput
                      name="projectDetails"
                      label="Project Details*"
                      value={values.projectDetails}
                      onChangeText={handleChange('projectDetails')}
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
                          name="projectlocation"
                          label="Project Location"
                          value={values.projectlocation}
                          onChangeText={handleChange('projectlocation')}
                        />
                        <CustomTabs
                          label="Project Site*"
                          options={ProjectSiteOptions}
                          selectedValue={values.projectsite}
                          setFieldValue={setFieldValue}
                          fieldName="projectsite"
                        />
                        <CustomTabs
                          label="Nature of Employment*"
                          options={EmploymentNatureOptions}
                          selectedValue={values.natureofemployment}
                          setFieldValue={setFieldValue}
                          fieldName="natureofemployment"
                        />
                        <ReusableDropdown
                          options={TeamSizeOptions}
                          placeholder="Team Size"
                          selectedValue={values.teamsize}
                          onSelect={item =>
                            setFieldValue('teamsize', item.value)
                          }
                        />
                        <ReusableTextInput
                          name="role"
                          label="Role in Project"
                          value={values.role}
                          onChangeText={handleChange('role')}
                        />
                        <ReusableTextInput
                          name="roledescription"
                          label="Role Description"
                          value={values.roledescription}
                          onChangeText={handleChange('roledescription')}
                        />
                        <ReusableTextInput
                          name="skillsused"
                          label="Skills Used"
                          value={values.skillsused}
                          onChangeText={handleChange('skillsused')}
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
