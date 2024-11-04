import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup'; // Import Yup
import GlobalStyle from '../../Global_CSS/GlobalStyle';
import {Dropdown} from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
const Projects = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null); // New state for selected skill index

  const [workedFrom, setWorkedFrom] = useState(new Date());
  const [workedTill, setWorkedTill] = useState(new Date());
  const [showWorkedFromPicker, setShowWorkedFromPicker] = useState(false);
  const [showWorkedTillPicker, setShowWorkedTillPicker] = useState(false);

  const [newProject, setNewProject] = useState(initialProject); // Keep the initial state
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const initialProject = {
    projecttitle: '',
    employmentOReducation: '',
    client: '',
    projectstatus: '',
    workedFrom: '',
    workedTill: '',
    projectDetails: '',
    projectlocation: '',
    projectsite: '',
    natureofemployment: '',
    teamsize: '',
    role: '',
    roledescription: '',
    skillsused: '',
  };
  const TeamSize = Array.from({length: 31}, (_, i) => i);
  const SizeOptions = TeamSize.map(size => ({
    label: size.toString(),
    value: size,
  })); // Yup validation schema
  const validationSchema = Yup.object().shape({
    projecttitle: Yup.string().required('Project title is required'),
    client: Yup.string().required('Client is required'),
    projectDetails: Yup.string().required('Project details are required'),
    projectstatus: Yup.string().required('Project status is required'),
  });

  // Format the date to a readable string
  const formatDate = date => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };
  // Handle date changes for Worked From
  const handleWorkedFromChange = (event, date) => {
    setShowWorkedFromPicker(false);
    if (date) {
      setWorkedFrom(date);
    }
  };
  // Handle date changes for Worked Till with validation
  const handleWorkedTillChange = (event, date) => {
    setShowWorkedTillPicker(false);
    if (date) {
      if (date <= workedFrom) {
        Alert.alert(
          'Invalid Date',
          'Worked Till must be greater than Worked From.',
        );
      } else {
        setWorkedTill(date);
      }
    }
  };

  const handleFormSubmit = values => {
    const newEntry = {
      projecttitle: values.projecttitle,
      employmentOReducation: values.employmentOReducation,
      client: values.client,
      projectstatus: values.projectstatus,
      workedFrom: workedFrom,
      workedTill: values.projectstatus === 'Finished' ? workedTill : null,
      projectDetails: values.projectDetails,
      projectlocation: values.projectlocation,
      projectsite: values.projectsite,
      natureofemployment: values.natureofemployment,
      teamsize: values.teamsize,
      role: values.role,
      roledescription: values.roledescription,
      skillsused: values.skillsused,
    };

    console.log(projectList);
    if (selectedProjectIndex !== null) {
      // Update existing skill
      const updatedProjectList = [...projectList];
      updatedProjectList[selectedProjectIndex] = newEntry;
      setProjectList(updatedProjectList);
    } else {
      // Add new skill
      setProjectList([...projectList, newEntry]);
    }
    closeModal();
  };
  const deleteProject = () => {
    if (selectedProjectIndex !== null) {
      const updatedProjectList = projectList.filter(
        (_, index) => index !== selectedProjectIndex,
      );
      setProjectList(updatedProjectList);
      closeModal(); // Close modal after deletion
    }
  };
  const openModal = (index = null) => {
    if (index !== null) {
      const ProjectToEdit = projectList[index];
      setNewProject(ProjectToEdit);
      setSelectedProjectIndex(index); // Set the index of the skill to edit
    } else {
      setNewProject(initialProject);
      setSelectedProjectIndex(null); // Reset index for new skill
    }
    setModalVisible(true);
  };
  const toggleSelectionofemploymentOReducation = (
    value,
    values,
    setFieldValue,
  ) => {
    const updatedSelection = values.employmentOReducation.includes(value)
      ? values.employmentOReducation.filter(item => item !== value)
      : [...values.employmentOReducation, value];
    setFieldValue('employmentOReducation', updatedSelection);
  };
  const closeModal = () => setModalVisible(false);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.outerheading}>Projects</Text>
        </View>

        <Text style={styles.AddButton} onPress={() => openModal()}>
          Add
        </Text>
      </View>
      {/* Horizontal FlatList for IT skills */}

      <View style={styles.ProjectListContainer}>
        {projectList.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.outpurtData}
            onPress={() => openModal(index)} // Open modal with index of selected skill
          >
            <View style={styles.ProjectDetails}>
              <Text style={styles.displayText}>{item.projecttitle}</Text>
              {/* {item.employmentOReducation ? (
                <Text style={styles.displayText1}>
                  {item.employmentOReducation}
                </Text>
              ) : null} */}
              <Text style={styles.displayClient}>{item.client}</Text>
              {/* <Text style={styles.displayText2}>{item.projectstatus}</Text> */}
              <View style={styles.experienceOutput}>
                <Text style={styles.displayText2}>
                  {formatDate(new Date(item.workedFrom))}
                  {item.workedTill
                    ? ` - ${formatDate(new Date(item.workedTill))}`
                    : ' - Present'}
                </Text>
              </View>

              {/* <Text style={styles.displayText1}>{item.projectDetails}</Text> */}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for Adding or Editing IT Skill */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Formik
              initialValues={newProject}
              onSubmit={handleFormSubmit}
              validationSchema={validationSchema} // Add the validation schema here
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.container}>
                  <ScrollView contentContainerStyle={styles.modalContent}>
                    <View>
                      <View>
                        <Text style={styles.heading}>Project</Text>

                        <Text style={styles.subText1}>
                          Stand out for employers by adding details about
                          projects you have done in college, internships, or at
                          work
                        </Text>
                      </View>

                      <View style={styles.inputBoxContainer}>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Project title*"
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('projecttitle')}
                          onBlur={handleBlur('projecttitle')}
                          value={values.projecttitle}
                        />

                        {errors.projecttitle && touched.projecttitle && (
                          <Text style={styles.error}>
                            {errors.projecttitle}
                          </Text>
                        )}
                      </View>

                      <View style={{marginBottom: 12}}>
                        <Text
                          style={{
                            color: '#333',
                            fontSize: 12,
                          }}>
                          Tag project with Employment/education
                        </Text>

                        <View style={styles.ChipContainer}>
                          <TouchableOpacity
                            style={[
                              styles.statusButton,
                              values.employmentOReducation.includes(
                                'UG-Computers',
                              )
                                ? styles.selectedButton
                                : styles.unselectedButton,
                            ]}
                            onPress={() =>
                              toggleSelectionofemploymentOReducation(
                                'UG-Computers',
                                values,
                                setFieldValue,
                              )
                            }>
                            <Text
                              style={[
                                styles.statusText,
                                values.employmentOReducation.includes(
                                  'UG-Computers',
                                )
                                  ? styles.selectedText
                                  : styles.unselectedText,
                              ]}>
                              UG-Computers
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.inputBoxContainer}>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Client*"
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('client')}
                          onBlur={handleBlur('client')}
                          value={values.client}
                        />
                      </View>

                      <View style={{marginBottom: 12}}>
                        <Text style={{color: '#000', fontWeight: 'bold'}}>
                          Project status
                        </Text>

                        <View style={styles.ChipContainer}>
                          <TouchableOpacity
                            style={[
                              styles.statusButton,
                              values.projectstatus === 'In Progress'
                                ? styles.selectedButton
                                : styles.unselectedButton,
                            ]}
                            onPress={() =>
                              handleChange('projectstatus')('In Progress')
                            }>
                            <Text
                              style={[
                                styles.statusText,
                                values.projectstatus === 'In Progress'
                                  ? styles.selectedText
                                  : styles.unselectedText,
                              ]}>
                              In Progress
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={[
                              styles.statusButton,
                              values.projectstatus === 'Finished'
                                ? styles.selectedButton
                                : styles.unselectedButton,
                            ]}
                            onPress={() =>
                              handleChange('projectstatus')('Finished')
                            }>
                            <Text
                              style={[
                                styles.statusText,
                                values.projectstatus === 'Finished'
                                  ? styles.selectedText
                                  : styles.unselectedText,
                              ]}>
                              Finished
                            </Text>
                          </TouchableOpacity>
                        </View>

                        {errors.projectstatus && touched.projectstatus && (
                          <Text style={styles.error}>
                            {errors.projectstatus}
                          </Text>
                        )}
                      </View>

                      <View style={styles.Datecontainer}>
                        <TouchableOpacity
                          onPress={() => setShowWorkedFromPicker(true)}>
                          <TextInput
                            style={styles.inputBox}
                            label="Worked from*"
                            mode="outlined"
                            textColor="#333"
                            outlineColor="lightgray"
                            activeOutlineColor="gray"
                            value={workedFrom.toLocaleString('default', {
                              month: 'long',
                              year: 'numeric',
                            })}
                            editable={false} // Makes the input box non-editable
                          />
                        </TouchableOpacity>
                        {showWorkedFromPicker && (
                          <DateTimePicker
                            value={workedFrom}
                            mode="date"
                            display="default"
                            onChange={handleWorkedFromChange}
                          />
                        )}
                      </View>

                      {values.projectstatus === 'Finished' && (
                        <View style={styles.Datecontainer}>
                          <TouchableOpacity
                            onPress={() => setShowWorkedTillPicker(true)}>
                            <TextInput
                              style={styles.inputBox}
                              label="Worked till*"
                              mode="outlined"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              value={workedTill.toLocaleString('default', {
                                month: 'long',
                                year: 'numeric',
                              })}
                              editable={false} // Makes the input box non-editable
                            />
                          </TouchableOpacity>
                          {showWorkedTillPicker && (
                            <DateTimePicker
                              value={workedTill}
                              mode="date"
                              display="default"
                              onChange={handleWorkedTillChange}
                            />
                          )}
                        </View>
                      )}

                      <View style={styles.inputBoxContainer}>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Details of Project*"
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('projectDetails')}
                          onBlur={handleBlur('projectDetails')}
                          value={values.projectDetails}
                        />

                        {errors.projectDetails && touched.projectDetails && (
                          <Text style={styles.error}>
                            {errors.projectDetails}
                          </Text>
                        )}
                      </View>

                      {!showMoreDetails ? (
                        <TouchableOpacity
                          onPress={() => setShowMoreDetails(true)}>
                          <Text style={styles.addMoreDetails}>
                            Add more details +
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <Text></Text>
                      )}

                      {/* Conditionally render additional input fields */}

                      {showMoreDetails && (
                        <>
                          <View style={styles.inputBoxContainer}>
                            <TextInput
                              style={styles.input}
                              mode="outlined"
                              label="Project location"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              onChangeText={handleChange('projectlocation')}
                              onBlur={handleBlur('projectlocation')}
                              value={values.projectlocation}
                            />
                          </View>

                          <View style={{marginBottom: 12}}>
                            <Text style={{color: '#000', fontWeight: 'bold'}}>
                              Project site
                            </Text>

                            <View style={styles.ChipContainer}>
                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.projectsite === 'Off Site'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('projectsite')('Off Site')
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.projectsite === 'Off Site'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Off Site
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.projectsite === 'On Site'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('projectsite')('On Site')
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.projectsite === 'On Site'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  On Site
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>

                          <View style={{marginBottom: 12}}>
                            <Text style={{color: '#000', fontWeight: 'bold'}}>
                              Nature of employment
                            </Text>

                            <View style={styles.ChipContainer}>
                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.natureofemployment === 'Full Time'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('natureofemployment')(
                                    'Full Time',
                                  )
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.natureofemployment === 'Full Time'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Full Time
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.natureofemployment === 'Part Time'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('natureofemployment')(
                                    'Part Time',
                                  )
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.natureofemployment === 'Part Time'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Part Time
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={[
                                  styles.statusButton,
                                  values.natureofemployment === 'Contractual'
                                    ? styles.selectedButton
                                    : styles.unselectedButton,
                                ]}
                                onPress={() =>
                                  handleChange('natureofemployment')(
                                    'Contractual',
                                  )
                                }>
                                <Text
                                  style={[
                                    styles.statusText,
                                    values.natureofemployment === 'Contractual'
                                      ? styles.selectedText
                                      : styles.unselectedText,
                                  ]}>
                                  Contractual
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>

                          <View style={styles.Sizecontainer}>
                            <Dropdown
                              style={styles.dropdown}
                              data={SizeOptions}
                              labelField="label"
                              valueField="value"
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              itemTextStyle={{color: '#000'}}
                              placeholder="Team size Eg. 1"
                              textColor="#000"
                              value={values.experianceinYear}
                              onChange={item => {
                                setFieldValue('experianceinYear', item.value);
                              }}
                            />
                          </View>

                          <View style={styles.inputBoxContainer}>
                            <TextInput
                              style={styles.input}
                              mode="outlined"
                              label="Role"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              onChangeText={handleChange('role')}
                              onBlur={handleBlur('role')}
                              value={values.role}
                            />
                          </View>

                          <View style={styles.inputBoxContainer}>
                            <TextInput
                              style={styles.input}
                              mode="outlined"
                              label="Role description"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              onChangeText={handleChange('roledescription')}
                              onBlur={handleBlur('roledescription')}
                              value={values.roledescription}
                            />
                          </View>

                          <View style={styles.inputBoxContainer}>
                            <TextInput
                              style={styles.input}
                              mode="outlined"
                              label="Skills used"
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                              onChangeText={handleChange('skillsused')}
                              onBlur={handleBlur('skillsused')}
                              value={values.skillsused}
                            />
                          </View>
                        </>
                      )}
                    </View>
                  </ScrollView>

                  <View style={styles.ButtonContainer}>
                    <View>
                      {selectedProjectIndex !== null && (
                        <IconButton
                          icon="delete"
                          iconColor="#ff0000"
                          size={24}
                          onPress={() => deleteProject(selectedProjectIndex)} // Call deleteProject function here
                          style={styles.iconButtonStyle} // Define style in styles object
                        />
                      )}
                    </View>

                    <View style={{flexDirection: 'row-reverse'}}>
                      <Button
                        onPress={handleSubmit}
                        labelStyle={GlobalStyle.savelabelStyle}>
                        {selectedProjectIndex !== null ? 'Update' : 'save'}
                      </Button>

                      <Button
                        onPress={closeModal}
                        labelStyle={GlobalStyle.closelabelStyle}>
                        Cancel
                      </Button>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 12,
    backgroundColor: '#00334d',
    borderRadius: 8,
  },
  editContainer: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  AddButton: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outerheading: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    color: '#333',
    marginVertical: 12,
    fontWeight: 'bold',
  },
  subText1: {
    color: '#333',
    fontSize: 14,
  },
  container: {
    height: '100%',
    margin: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputBoxContainer: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
  },
  outpurtData: {
    backgroundColor: '#f2f2f2',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  displayText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  displayText1: {
    fontSize: 12,
    color: '#555',
  },
  displayText2: {
    fontSize: 12,
    marginRight: 4,
    marginBottom: 4,
    color: '#333',
  },
  displayClient: {
    fontSize: 12,
    marginRight: 4,
    marginBottom: 4,
    color: '#333',
    fontWeight: 'bold',
  },
  experienceOutput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Sizecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  dropdown: {
    height: 52,
    borderColor: 'lightgray',
    borderWidth: 1,
    marginVertical: 12,
    borderRadius: 5,
    padding: 12,
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#808080',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  ProjectListContainer: {
    paddingVertical: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },

  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  statusButton: {
    marginTop: 8,
    marginRight: 12,
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#4caf50',
  },
  unselectedButton: {
    backgroundColor: '#333',
  },
  statusText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#fff',
  },
  ChipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  Datecontainer: {
    marginBottom: 12,
    flex: 1,
  },
  inputBox: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
  },

  addMoreDetails: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
export default Projects;
