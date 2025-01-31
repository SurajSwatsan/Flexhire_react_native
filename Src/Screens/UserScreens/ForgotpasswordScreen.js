import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';
const ForgotpasswordScreen = () => {
  const navigation = useNavigation();
  const forgotPasswordSchema = Yup.object().shape({
    identifier: Yup.string()
      .test(
        'identifier',
        'Please enter a valid email or phone number',
        value =>
          Yup.string().email().isValidSync(value) || /^[0-9]{10}$/.test(value),
      )
      .required('Email or phone number is required'),
  });

  const handleSendOtp = values => {
    navigation.navigate('OtpVerificationScreen', {
      identifier: values.identifier,
    });
  };
  return (
    <SafeAreaView style={styles.maincontainer}>
      <Formik
        initialValues={{identifier: ''}}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSendOtp}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.Formcontainer}>
            {/* <Text style={styles.companyname}>FlexHire</Text> */}

            <View style={{marginBottom: 18}}>
              <Text style={styles.title1}>OTP</Text>
              <Text style={styles.title2}>
                VERIFICATION
                <Text style={{color: '#0088cc', fontSize: 48}}>.</Text>
              </Text>
            </View>
            <Text style={{color: '#004466', fontSize: 14, marginBottom: 18}}>
              We will send you an One Time Password on this email address or
              mobile number
            </Text>
            <TextInput
              mode="outlined"
              style={styles.textarea}
              label="Enter Email / Mobile Number"
              textColor="black"
              value={values.identifier}
              onChangeText={handleChange('identifier')}
              onBlur={() => setFieldTouched('identifier')}
              activeOutlineColor="lightgray"
              error={!!errors.identifier}
            />
            {errors.identifier && touched.identifier ? (
              <Text style={GlobalStyle.errorText}>{errors.identifier}</Text>
            ) : null}
            <View style={styles.buttonContainer}>
              <Button
                labelStyle={GlobalStyle.labelStyle}
                onPress={handleSubmit}>
                GET OTP
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  Formcontainer: {
    margin: 18,
  },
  companyname: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#004466',
  },
  title1: {
    fontSize: 32,
    color: '#0088cc',
    fontWeight: 'bold',
    marginBottom: -10,
  },
  title2: {
    fontSize: 32,
    color: '#004466',
    fontWeight: 'bold',
  },
  headingText: {
    marginVertical: 20,
    fontSize: 32,
    color: '#cc4400',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textarea: {
    marginVertical: 12,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    height: 48,
  },
  buttonContainer: {
    marginVertical: 12,
  },
  labelStyle: {
    color: '#ffffff',
    backgroundColor: '#407093',
    // backgroundColor: '#1A6F4A',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default ForgotpasswordScreen;
