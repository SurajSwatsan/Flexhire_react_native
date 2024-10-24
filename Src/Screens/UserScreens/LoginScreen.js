import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Alert,
  BackHandler,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Button, Checkbox, TextInput, IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [ispasswordVisible, setpasswordVisibility] = useState(false);

  useEffect(() => {
    handleLoadingCredentials();
  }, []);

  const handleLoadingCredentials = async () => {
    try {
      const userdata = await AsyncStorage.getItem('UserData');
      if (userdata) {
        Alert.alert('Welcome ', userdata);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to load credentials');
    }
  };

  const loginSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
      .test(
        'emailOrPhone',
        'Please enter a valid email or phone number',
        value =>
          Yup.string().email().isValidSync(value) || /^[0-9]{10}$/.test(value),
      )
      .required('Email or phone number is required'),
    password: Yup.string()
      .min(8, 'password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      )
      .required('password is required'),
  });

  const handleSubmit = async values => {
    try {
      const UserData = {
        emailOrPhone: values.emailOrPhone,
        password: values.password,
      };
      await AsyncStorage.setItem('userdata', JSON.stringify(UserData));
      navigation.navigate('DefaultScreen');
    } catch (error) {
      Alert.alert('Error saving credentials');
    }
  };

  const HandleForgotpassword = () => {
    navigation.navigate('ForgotpasswordScreen');
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <SafeAreaView style={styles.maincontainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.FormContainer}>
          <Image
            style={styles.loginpng}
            source={require('../../Assets/Logo/flexhire-logo.png')}
          />
          <Text style={styles.heading}>Login</Text>
          <Formik
            initialValues={{emailOrPhone: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View>
                  <KeyboardAwareScrollView>
                    <TextInput
                      style={styles.textarea}
                      mode="outlined"
                      outlineColor="lightgrey"
                      label="Email/Mobile Number"
                      textColor="black"
                      value={values.emailOrPhone}
                      onChangeText={handleChange('emailOrPhone')}
                      onBlur={handleBlur('emailOrPhone')}
                      activeOutlineColor="#333"
                      error={!!errors.emailOrPhone}
                    />
                    {errors.emailOrPhone && touched.emailOrPhone ? (
                      <Text style={styles.errorText}>
                        {errors.emailOrPhone}
                      </Text>
                    ) : null}

                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={[styles.textarea, styles.passwordInput]}
                        mode="outlined"
                        outlineColor="lightgrey"
                        label="Password"
                        textColor="black"
                        activeOutlineColor="#333"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry={!ispasswordVisible}
                        error={!!errors.password}
                        name="password"
                      />
                      <IconButton
                        icon={ispasswordVisible ? 'eye-off' : 'eye'}
                        color="grey"
                        size={26}
                        onPress={() =>
                          setpasswordVisibility(!ispasswordVisible)
                        }
                        style={styles.eyeIcon}
                      />
                    </View>
                    {errors.password && touched.password ? (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    ) : null}

                    <View style={styles.checkboxContainer}>
                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={() => setChecked(!checked)}
                        />
                        <Text style={styles.checkboxtext1}>Remember me</Text>
                      </View>

                      <TouchableOpacity onPress={HandleForgotpassword}>
                        <Text style={styles.checkboxtext2}>
                          Forgot password?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                      <Button
                        labelStyle={GlobalStyle.labelStyle}
                        onPress={handleSubmit}>
                        Login
                      </Button>
                    </View>

                    <View>
                      <View style={styles.socialContainer_Heading}>
                        <View style={styles.sociallineContainer} />
                        <Text style={styles.socialtextContainer}>OR</Text>
                        <View style={styles.sociallineContainer} />
                      </View>
                      <View style={styles.socialContainer}>
                        <Image
                          style={styles.socialImages}
                          source={require('../../Assets/Images/google_icon.png')}
                        />
                        <Image
                          style={styles.socialImages}
                          source={require('../../Assets/Images/linkedin_icon.png')}
                        />
                      </View>
                    </View>

                    <View style={styles.signupContainer}>
                      <Text style={styles.signupText1}>
                        Don't have an account?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.push('SignupScreen')}>
                        <Text style={styles.signupText2}>Create account</Text>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAwareScrollView>
                </View>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffff',
  },
  FormContainer: {
    margin: 12,
  },

  loginpng: {
    width: 250,
    height: 130,
    alignSelf: 'center',
  },
  heading: {
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
    borderColor: 'lightgrey',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
  },

  eyeIcon: {
    alignSelf: 'center',
    marginLeft: -46,
    paddingRight: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxtext1: {
    color: 'black',
    fontSize: 16,
  },
  checkboxtext2: {
    color: '#51b8e1',
    fontSize: 14,
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
  socialContainer_Heading: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 12,
    paddingHorizontal: 36,
  },
  sociallineContainer: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  socialtextContainer: {
    marginHorizontal: 14,
    fontSize: 16,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 100,
  },
  socialImages: {
    marginHorizontal: 12,
    width: 28,
    height: 28,
  },
  signupContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  signupText1: {
    fontSize: 16,
    color: 'black',
    alignContent: 'center',
  },
  signupText2: {
    marginLeft: 4,
    fontSize: 14,
    color: '#51b8e1',
    alignContent: 'center',
  },
});

export default LoginScreen;
