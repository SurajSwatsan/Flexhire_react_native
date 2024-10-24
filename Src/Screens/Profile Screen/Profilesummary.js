import {Alert, Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

const validationSchema = Yup.object().shape({
  ProfileSummary: Yup.string().required('Profile Summary is required'),
});

const Profilesummary = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ProfileSummary, setProfileSummary] = useState(''); // State for profile headline
  const [ProfileSummaryHeight, setProfileSummaryHeight] = useState(48); // Initial height

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleFormSubmit = values => {
    setProfileSummary(values.ProfileSummary);
    closeModal();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayProfileSummary}>Profile Summary</Text>
        </View>

        <IconButton
          icon="lead-pencil"
          iconColor="#f2f2f2"
          size={18}
          onPress={openModal}
          style={styles.iconButton}
        />
      </View>
      <Text style={styles.displayText}>{ProfileSummary}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.heading}>Profile Summary</Text>
              <Text style={styles.subText1}>
                Give recruiters a brief overview of the highlights of your
                career, key achievements, and career goals to help recruiters
                know your profile better.
              </Text>
              <Formik
                initialValues={{
                  ProfileSummary: ProfileSummary,
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
                    <View style={styles.headlinecontainer}>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            height: Math.min(
                              Math.max(48, ProfileSummaryHeight),
                              200,
                            ),
                          }, // Ensures a minimum height of 48 and a max of 200
                        ]}
                        mode="outlined"
                        label="Profile Summary*"
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('ProfileSummary')}
                        onBlur={handleBlur('ProfileSummary')}
                        value={values.ProfileSummary}
                        multiline // Ensure multi-line support
                        onContentSizeChange={e => {
                          const contentHeight =
                            e.nativeEvent.contentSize.height;
                          setProfileSummaryHeight(contentHeight); // Dynamically adjust height based on content
                        }}
                      />
                      {errors.ProfileSummary && touched.ProfileSummary && (
                        <Text style={styles.error}>
                          {errors.ProfileSummary}
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
  subText1: {
    color: '#333',
    fontSize: 12,
  },
  container: {
    marginVertical: 12,
  },
  Fullnamecontainer: {
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

  displayProfileSummary: {
    marginHorizontal: 12,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  displayText: {
    marginHorizontal: 12,
    textAlign: 'justify',
    marginVertical: 6,
    fontSize: 14,
    color: '#ffffff',
  },
});

export default Profilesummary;
