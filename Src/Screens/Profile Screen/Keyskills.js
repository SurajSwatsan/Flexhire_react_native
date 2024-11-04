import {Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton, TextInput, Chip} from 'react-native-paper';
import {Formik} from 'formik';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

const Keyskills = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [keySkills, setKeySkills] = useState([]); // Chips that are added but not submitted
  const [submittedSkills, setSubmittedSkills] = useState([]); // Submitted skills

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setKeySkills([]); // Clear unsaved chips when modal is closed
    setModalVisible(false);
  };

  const addSkills = skill => {
    if (skill && !keySkills.includes(skill)) {
      setKeySkills(prevSkills => [...prevSkills, skill]);
    }
  };

  const handleFormSubmit = () => {
    setSubmittedSkills(prevSkills => [...prevSkills, ...keySkills]);
    setKeySkills([]); // Clear key skills after submission
    closeModal();
  };

  const removeSubmittedSkill = indexToRemove => {
    setSubmittedSkills(prevSkills =>
      prevSkills.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayheading}>Key Skills</Text>
        </View>

        <IconButton
          icon="lead-pencil"
          iconColor="#f2f2f2"
          size={18}
          onPress={openModal}
          style={styles.iconButton}
        />
      </View>
      <View style={styles.outputdata}>
        <View>
          <Text style={styles.displayText}>
            {submittedSkills.length > 0 ? (
              <View style={styles.chipContainer}>
                {submittedSkills.map((skill, index) => (
                  <Text key={index} style={styles.displaySkills}>
                    {skill}
                  </Text>
                ))}
              </View>
            ) : (
              'No skills added yet.'
            )}
          </Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.heading}>Key skills</Text>
              <Text style={styles.subText1}>
                Add skills that best define your expertise, for e.g, Direct
                Marketing, Oracle, Java, etc. (Minimum 1)
              </Text>
              <Formik
                initialValues={{keySkills: ''}}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.container}>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        mode="outlined"
                        label="Skill / Software name*"
                        style={styles.input}
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('keySkills')}
                        onBlur={handleBlur('keySkills')}
                        value={values.keySkills}
                        right={
                          <TextInput.Icon
                            icon="plus-circle-outline" // Directly pass the icon name here
                            color="gray"
                            onPress={() => {
                              addSkills(values.keySkills); // Add chip when plus icon is pressed
                              handleChange('keySkills')(''); // Clear input field
                            }}
                          />
                        }
                      />
                    </View>

                    {/* Display chips for added skills */}
                    <View style={styles.chipContainer}>
                      {keySkills.map((skill, index) => (
                        <Chip
                          key={index}
                          mode="outlined"
                          textStyle={{color: '#333'}}
                          style={styles.chip}
                          onClose={() =>
                            setKeySkills(
                              keySkills.filter((_, i) => i !== index),
                            )
                          }>
                          {skill}
                        </Chip>
                      ))}
                    </View>

                    <Button
                      onPress={handleSubmit}
                      labelStyle={GlobalStyle.labelStyle}>
                      Submit
                    </Button>

                    {/* Display chips for submitted skills */}
                    <View style={styles.submittedChipContainer}>
                      <View style={styles.chipContainer}>
                        {submittedSkills.map((skill, index) => (
                          <Chip
                            key={index}
                            mode="outlined"
                            textStyle={{color: '#333'}}
                            style={styles.submittedChip}
                            onClose={() => removeSubmittedSkill(index)}>
                            {skill}
                          </Chip>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  outputdata: {
    margin: 12,
  },
  iconButton: {},
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: '100%',
    backgroundColor: 'white',
  },
  modalContent: {
    justifyContent: 'center',
    margin: 12,
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
    marginVertical: 12,
  },
  inputcontainer: {
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48,
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginVertical: 6,
  },
  displayContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  displayheading: {
    marginHorizontal: 12,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  displayText: {
    marginVertical: 4,
    fontSize: 14,
    color: '#ffffff',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    backgroundColor: '#fff',
    color: '#000000',
    margin: 4,
  },
  submittedChipContainer: {
    marginTop: 20,
  },
  submittedSkillsHeading: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  submittedChip: {
    backgroundColor: '#fff',
    color: '#000000',
    margin: 4,
  },
  displaySkills: {
    marginHorizontal: 4,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: '#333',
    borderRadius: 8,
    fontSize: 12,
  },
});

export default Keyskills;
