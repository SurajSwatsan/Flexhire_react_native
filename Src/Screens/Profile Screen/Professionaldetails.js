import {Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

const validationSchema = Yup.object().shape({
  Currentindustry: Yup.string().required('Currentindustry is required'),
  CurrentDepartment: Yup.string().required('Current Department is required'),
  CurrentRolecategory: Yup.string().required(
    'Current Role category is required',
  ),
  CurrentJobrole: Yup.string().required('Current Job role is required'),
});

const Professionaldetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Currentindustry, setCurrentindustry] = useState('');
  const [CurrentDepartment, setCurrentDepartment] = useState('');
  const [CurrentRolecategory, setCurrentRolecategory] = useState('');
  const [CurrentJobrole, setCurrentJobrole] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleFormSubmit = values => {
    setCurrentindustry(values.Currentindustry);
    setCurrentDepartment(values.CurrentDepartment);
    setCurrentRolecategory(values.CurrentRolecategory);
    setCurrentJobrole(values.CurrentJobrole);
    closeModal();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayheading}>Professional details</Text>
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
        <View style={styles.outputdataView}>
          <Text style={styles.displayText1}>Current industry</Text>
          <Text style={styles.displayText}>{Currentindustry}</Text>
        </View>
        <View style={styles.outputdataView}>
          <Text style={styles.displayText1}>Current department</Text>
          <Text style={styles.displayText}>{CurrentDepartment}</Text>
        </View>
        <View style={styles.outputdataView}>
          <Text style={styles.displayText1}>Current role category</Text>
          <Text style={styles.displayText}>{CurrentRolecategory}</Text>
        </View>
        <View style={styles.outputdataView}>
          <Text style={styles.displayText1}>Current job role</Text>
          <Text style={styles.displayText}>{CurrentJobrole}</Text>
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
              <Text style={styles.heading}>Professional details</Text>
              <Text style={styles.subText1}>
                Add details about your current and preferred job profile. This
                helps us personalise your job recommendations.
              </Text>
              <Formik
                initialValues={{
                  Currentindustry: Currentindustry,
                  CurrentDepartment: CurrentDepartment,
                  CurrentRolecategory: CurrentRolecategory,
                  CurrentJobrole: CurrentJobrole,
                }}
                validationSchema={validationSchema}
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
                        label="Current industry*"
                        style={styles.input}
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('Currentindustry')}
                        onBlur={handleBlur('Currentindustry')}
                        value={values.Currentindustry}
                      />
                      {errors.Currentindustry && touched.Currentindustry && (
                        <Text style={styles.error}>
                          {errors.Currentindustry}
                        </Text>
                      )}
                    </View>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        mode="outlined"
                        label="Current Department*"
                        style={styles.input}
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('CurrentDepartment')}
                        onBlur={handleBlur('CurrentDepartment')}
                        value={values.CurrentDepartment}
                      />
                      {errors.CurrentDepartment &&
                        touched.CurrentDepartment && (
                          <Text style={styles.error}>
                            {errors.CurrentDepartment}
                          </Text>
                        )}
                    </View>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        mode="outlined"
                        label="Current Rolecategory*"
                        style={styles.input}
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('CurrentRolecategory')}
                        onBlur={handleBlur('CurrentRolecategory')}
                        value={values.CurrentRolecategory}
                      />
                      {errors.CurrentRolecategory &&
                        touched.CurrentRolecategory && (
                          <Text style={styles.error}>
                            {errors.CurrentRolecategory}
                          </Text>
                        )}
                    </View>
                    <View style={styles.inputcontainer}>
                      <TextInput
                        mode="outlined"
                        label="Current Jobrole*"
                        style={styles.input}
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('CurrentJobrole')}
                        onBlur={handleBlur('CurrentJobrole')}
                        value={values.CurrentJobrole}
                      />
                      {errors.CurrentJobrole && touched.CurrentJobrole && (
                        <Text style={styles.error}>
                          {errors.CurrentJobrole}
                        </Text>
                      )}
                    </View>

                    <Button
                      onPress={handleSubmit}
                      labelStyle={GlobalStyle.labelStyle}>
                      Submit
                    </Button>
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
    // justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
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
  container: {
    marginVertical: 12,
  },
  inputcontainer: {
    marginVertical: 12,
  },
  headlinecontainer: {
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#fff',
    minHeight: 48, // Ensures the input field always has at least this height
    borderRadius: 8,
  },
  error: {
    color: 'red',
    marginVertical: 6,
  },
  displayContainer: {
    marginTop: 12,
    // height: 'auto',
    alignItems: 'center',
  },
  displayheading: {
    marginHorizontal: 12,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  displayText1: {
    fontSize: 12,
    color: '#f2f2f2',
  },
  displayText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  subText1: {
    fontSize: 12,
    color: '#000000',
  },
  outputdataView: {
    marginBottom: 8,
  },
});

export default Professionaldetails;
