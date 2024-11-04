import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup'; // Import Yup
import GlobalStyle from '../../Global_CSS/GlobalStyle';
import {Dropdown} from 'react-native-element-dropdown';

const Itskills = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itSkillList, setitSkillList] = useState([]);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(null); // New state for selected skill index

  const initialSkill = {
    softwareName: '',
    softwareVersion: '',
    experianceinYear: '',
    experianceinMonths: '',
    lastused: '',
  };

  const [newSkill, setNewSkill] = useState(initialSkill); // Keep the initial state

  const Years = Array.from({length: 31}, (_, i) => i);
  const YearOptions = Years.map(year => ({
    label: year.toString(),
    value: year,
  }));

  const Months = Array.from({length: 12}, (_, i) => i);
  const MonthOptions = Months.map(month => ({
    label: month.toString(),
    value: month,
  }));

  const currentYear = new Date().getFullYear();
  const Yearsused = Array.from(
    {length: currentYear - 1940 + 1},
    (_, i) => currentYear - i,
  );
  const yearOptions = Yearsused.map(year => ({
    label: year.toString(),
    value: year,
  }));

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    softwareName: Yup.string()
      .required('Skill / Software name is required')
      .min(2, 'Must be at least 2 characters')
      .max(50, 'Must be at most 50 characters'),
  });

  const handleFormSubmit = values => {
    const newEntry = {
      softwareName: values.softwareName,
      softwareVersion: values.softwareVersion,
      experianceinYear: values.experianceinYear,
      experianceinMonths: values.experianceinMonths,
      lastused: values.lastused,
    };

    if (selectedSkillIndex !== null) {
      // Update existing skill
      const updatedSkillList = [...itSkillList];
      updatedSkillList[selectedSkillIndex] = newEntry;
      setitSkillList(updatedSkillList);
    } else {
      // Add new skill
      setitSkillList([...itSkillList, newEntry]);
    }
    closeModal();
  };

  const deleteSkill = () => {
    if (selectedSkillIndex !== null) {
      const updatedSkillList = itSkillList.filter(
        (_, index) => index !== selectedSkillIndex,
      );
      setitSkillList(updatedSkillList);
      closeModal(); // Close modal after deletion
    }
  };

  const openModal = (index = null) => {
    if (index !== null) {
      const skillToEdit = itSkillList[index];
      setNewSkill(skillToEdit);
      setSelectedSkillIndex(index); // Set the index of the skill to edit
    } else {
      setNewSkill(initialSkill);
      setSelectedSkillIndex(null); // Reset index for new skill
    }
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.outerheading}>IT skills</Text>
        </View>
        <Text style={styles.AddButton} onPress={() => openModal()}>
          Add
        </Text>
      </View>

      {/* Horizontal FlatList for IT skills */}
      <FlatList
        data={itSkillList}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.outpurtData}
            onPress={() => openModal(index)} // Open modal with index of selected skill
          >
            <View style={styles.languageDetails}>
              <Text style={styles.displayText}>
                {item.softwareName.length > 10
                  ? `${item.softwareName.substring(0, 10)}...`
                  : item.softwareName}
              </Text>
              {/* <Text style={styles.displayText1}>{item.softwareVersion}</Text> */}
              <View style={styles.experienceOutput}>
                <Text style={styles.displayText2}>
                  {item.experianceinYear
                    ? `${item.experianceinYear} Years`
                    : '-'}
                </Text>
                <Text style={styles.displayText2}>
                  {item.experianceinMonths
                    ? `${item.experianceinMonths} Months`
                    : '-'}
                </Text>
              </View>
              <Text style={styles.displayText1}>
                {item.lastused ? ` Last used ${item.lastused}` : '-'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.skillListContainer}
      />

      {/* Modal for Adding or Editing IT Skill */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Formik
              initialValues={newSkill}
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
                        <Text style={styles.heading}>IT skills</Text>
                        <Text style={styles.subText1}>
                          Mention skills like programming outerheading (Java,
                          Python), software (Microsoft Word, Excel) and more, to
                          show your technical expertise.
                        </Text>
                      </View>
                      <View style={styles.inboxcontainer}>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Skill / Software name*"
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('softwareName')}
                          onBlur={handleBlur('softwareName')}
                          value={values.softwareName}
                        />
                        {errors.softwareName && touched.softwareName && (
                          <Text style={styles.error}>
                            {errors.softwareName}
                          </Text>
                        )}
                      </View>
                      <View style={styles.inboxcontainer}>
                        <TextInput
                          style={styles.input}
                          mode="outlined"
                          label="Software Version*"
                          textColor="#333"
                          outlineColor="lightgray"
                          activeOutlineColor="gray"
                          onChangeText={handleChange('softwareVersion')}
                          onBlur={handleBlur('softwareVersion')}
                          value={values.softwareVersion}
                        />
                      </View>

                      <View style={styles.expiriancecontainer}>
                        <View style={styles.Yearcontainer}>
                          <Dropdown
                            style={styles.dropdown}
                            data={YearOptions}
                            labelField="label"
                            valueField="value"
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={{color: '#000'}}
                            placeholder="Eg. 1"
                            textColor="#000"
                            value={values.experianceinYear}
                            onChange={item => {
                              setFieldValue('experianceinYear', item.value);
                            }}
                          />
                          <Text style={{color: '#000'}}>Years</Text>
                        </View>
                        <View style={styles.Monthcontainer}>
                          <Dropdown
                            style={styles.dropdown}
                            data={MonthOptions}
                            labelField="label"
                            valueField="value"
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={{color: '#000'}}
                            placeholder="Eg. 2"
                            textColor="#000"
                            value={values.experianceinMonths}
                            onChange={item => {
                              setFieldValue('experianceinMonths', item.value);
                            }}
                          />
                          <Text style={{color: '#000'}}>Months</Text>
                        </View>
                      </View>
                      <View style={styles.container}>
                        <View style={styles.YearOptionscontainer}>
                          <Dropdown
                            style={styles.dropdown}
                            data={yearOptions}
                            labelField="label"
                            valueField="value"
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={{color: '#000'}}
                            placeholder="Last used"
                            textColor="#000"
                            value={values.lastused}
                            onChange={item => {
                              setFieldValue('lastused', item.value);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </ScrollView>

                  <View style={styles.ButtonContainer}>
                    <View>
                      {selectedSkillIndex !== null && (
                        <IconButton
                          icon="delete"
                          iconColor="#ff0000"
                          size={24}
                          onPress={() => deleteSkill(selectedSkillIndex)} // Call deleteSkill function here
                          style={styles.iconButtonStyle} // Define style in styles object
                        />
                      )}
                    </View>
                    <View style={{flexDirection: 'row-reverse'}}>
                      <Button
                        onPress={handleSubmit}
                        labelStyle={GlobalStyle.savelabelStyle}>
                        {selectedSkillIndex !== null ? 'Update' : 'save'}
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
  inputcontainer: {
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
  },
  inboxcontainer: {
    marginVertical: 12,
  },

  outpurtData: {
    backgroundColor: '#f2f2f2',
    marginLeft: 12,
    padding: 12,
    borderRadius: 8,
    width: 150,
    height: 90,
  },
  languageDetails: {
    alignItems: 'flex-start',
    paddingRight: 12,
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
  experienceOutput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expiriancecontainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  Yearcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  Monthcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
    marginRight: 8,
    padding: 12,
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#777',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  skillListContainer: {
    paddingVertical: 8,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#d9534f', // Bootstrap danger color
  },
  YearOptionscontainer: {
    width: '50%',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    alignItems: 'center',
  },
});

export default Itskills;
