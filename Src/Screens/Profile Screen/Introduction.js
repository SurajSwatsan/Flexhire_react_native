import {Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  profileHeadline: Yup.string().required('Profile Headline is required'),
});

const Introduction = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [headlineHeight, setHeadlineHeight] = useState(48); // Initial height
  const [fullName, setFullName] = useState(''); // State for full name
  const [profileHeadline, setProfileHeadline] = useState(''); // State for profile headline

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleFormSubmit = values => {
    setFullName(values.fullName);
    setProfileHeadline(values.profileHeadline);
    closeModal();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.editContainer}>
        <View></View>
        <View style={styles.displayContainer}>
          <Text style={styles.displayFullname}>{fullName}</Text>
        </View>

        <IconButton
          icon="lead-pencil"
          iconColor="#f2f2f2"
          size={18}
          onPress={openModal}
          style={styles.iconButton}
        />
      </View>
      <Text style={styles.displayText}>{profileHeadline}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.heading}>Introduction</Text>
              <Formik
                initialValues={{
                  fullName: fullName,
                  profileHeadline: profileHeadline,
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
                    <View style={styles.Fullnamecontainer}>
                      <TextInput
                        mode="outlined"
                        label="Full Name*"
                        style={styles.input}
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        value={values.fullName}
                      />
                      {errors.fullName && touched.fullName && (
                        <Text style={styles.error}>{errors.fullName}</Text>
                      )}
                    </View>
                    <View style={styles.headlinecontainer}>
                      <TextInput
                        style={[
                          styles.input,
                          {height: Math.min(Math.max(48, headlineHeight), 200)}, // Ensures a minimum height of 48 and a max of 200
                        ]}
                        mode="outlined"
                        label="Profile Headline*"
                        textColor="#333"
                        outlineColor="lightgray"
                        activeOutlineColor="gray"
                        onChangeText={handleChange('profileHeadline')}
                        onBlur={handleBlur('profileHeadline')}
                        value={values.profileHeadline}
                        multiline // Ensure multi-line support
                        onContentSizeChange={e => {
                          const contentHeight =
                            e.nativeEvent.contentSize.height;
                          setHeadlineHeight(contentHeight); // Dynamically adjust height based on content
                        }}
                      />
                      {errors.profileHeadline && touched.profileHeadline && (
                        <Text style={styles.error}>
                          {errors.profileHeadline}
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
    marginHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#00334d',
    elevation: 2,
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

  displayFullname: {
    marginLeft: 24,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  displayText: {
    marginHorizontal: 12,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
    color: '#ffffff',
  },
});

export default Introduction;
