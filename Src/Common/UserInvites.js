import React, {useState} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ReusableTextInput from '../GlobalFields/ReusableTextInput';
import Basicdetails from '../UserProfile/Basicdetails';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const UserInvites = () => {
  const [submittedValues, setSubmittedValues] = useState(null);

  return (
    <View style={{flex: 1, marginTop: 12}}>
      <Basicdetails />
    </View>
    // <Formik
    //   initialValues={{name: '', email: ''}}
    //   validationSchema={validationSchema}
    //   onSubmit={values => {
    //     console.log('Form values:', values);
    //     setSubmittedValues(values); // Store the submitted values in state
    //   }}>
    //   {({handleSubmit}) => (
    //     <View style={{flex: 1, padding: 16}}>
    //       <ReusableTextInput name="name" label="Name" />
    //       <ReusableTextInput name="email" label="Email" />

    //       <Button title="Submit" onPress={handleSubmit} />

    //       {/* Display submitted data below the form */}
    //       {submittedValues && (
    //         <View style={styles.resultContainer}>
    //           <Text style={styles.resultTitle}>Submitted Data:</Text>
    //           <Text style={styles.resultText}>
    //             Name: {submittedValues.name}
    //           </Text>
    //           <Text style={styles.resultText}>
    //             Email: {submittedValues.email}
    //           </Text>
    //         </View>
    //       )}
    //     </View>
    //   )}
    // </Formik>
  );
};

export default UserInvites;

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: 'black',
  },
});
