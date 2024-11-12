import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ReusableTextInput from '../ReusableComponents/ReusableTextInput';
import ReusableDropdown from '../ReusableComponents/ReusableDropdown';
import ReusableDatePicker from '../ReusableComponents/ReusableDatePicker';
import {Button} from 'react-native-paper';
import {colors} from '../Global_CSS/theamColors';
import GlobalStyle from '../Global_CSS/GlobalStyle';
import BasicDetails from '../UserProfile/Basicdetails';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  selectedOption: Yup.string().required('Please select an option'),
  workedFrom: Yup.date().required('Please select a date').nullable(),
});

const UserInvites = () => {
  const [submittedValues, setSubmittedValues] = useState(null);

  const options = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  return (
    <View>
      <BasicDetails/>
    </View>
    // <Formik
    //   initialValues={{
    //     name: '',
    //     email: '',
    //     address: '',
    //     selectedOption: '',
    //     workedFrom: new Date(),
    //   }}
    //   validationSchema={validationSchema}
    //   onSubmit={values => {
    //     console.log('Form values:', values);
    //     setSubmittedValues(values);
    //   }}>
    //   {({handleSubmit, setFieldValue, values}) => (
    //     <View style={styles.container}>
    //       <ReusableTextInput name="name" label="Name" />
    //       <ReusableTextInput name="email" label="Email" />
    //       <ReusableTextInput name="address" label="Address" />

    //       <ReusableDropdown
    //         options={options}
    //         placeholder="Select an option"
    //         onSelect={item => setFieldValue('selectedOption', item.value)}
    //       />

    //       <ReusableDatePicker
    //         label="Worked from*"
    //         value={values.workedFrom}
    //         onChange={date => setFieldValue('workedFrom', date)}
    //       />

    //       <Button
    //         style={{flex: 1}}
    //         labelStyle={GlobalStyle.labelStyle}
    //         onPress={handleSubmit}>
    //         Submit
    //       </Button>

    //       {submittedValues && (
    //         <View style={styles.resultContainer}>
    //           <Text style={styles.resultTitle}>Submitted Data:</Text>
    //           <Text style={styles.resultText}>
    //             Name: {submittedValues.name}
    //           </Text>
    //           <Text style={styles.resultText}>
    //             Email: {submittedValues.email}
    //           </Text>
    //           <Text style={styles.resultText}>
    //             Address: {submittedValues.address}
    //           </Text>
    //           <Text style={styles.resultText}>
    //             Selected Option: {submittedValues.selectedOption}
    //           </Text>
    //           <Text style={styles.resultText}>
    //             Worked From: {submittedValues.workedFrom.toLocaleDateString()}
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
  container: {
    flexDirection: 'column',
    flex: 1,
    padding: 16,
    backgroundColor: colors.bacground,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: colors.background,
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
