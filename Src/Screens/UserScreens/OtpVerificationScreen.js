import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

const OtpVerificationScreen = ({route}) => {
  const {email} = route.params; // Retrieve email from navigation params
  const navigation = useNavigation();
  const predefinedOTP = '1234'; // OTP is now 4 digits

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false); // Enable resend button when timer ends
    }
  }, [timer]);

  const handleChange = (text, index) => {
    if (text.length > 1) return; // Prevent multiple character input

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input field if not last
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all four digits are filled
    if (newOtp.join('').length === 4) {
      handleOTPSubmit(newOtp.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPSubmit = enteredOtp => {
    if (enteredOtp === predefinedOTP) {
      navigation.navigate('ResetPasswordScreen');
    }
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '']); // Clear previous OTP input
    setTimer(30); // Reset timer
    setResendDisabled(true); // Disable button again
    alert('A new OTP has been sent to your email.');
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 18}}>
        <Text style={styles.title1}>OTP</Text>
        <Text style={styles.title2}>
          VERIFICATION
          <Text style={{color: '#0088cc', fontSize: 48}}>.</Text>
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 18,
        }}>
        <Text style={{color: '#004466', fontSize: 14}}>
          Enter the OTP sent to
        </Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            placeholderTextColor={'gray'}
            color={'black'}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/* Timer Display */}
      <View style={styles.timerContainer}></View>

      <View style={styles.buttonContainer}>
        <Button
          labelStyle={GlobalStyle.labelStyle}
          onPress={() => handleOTPSubmit(otp.join(''))}>
          Verify OTP
        </Button>
      </View>

      <View style={styles.resendContainer}>
        <Text style={{color: '#004466', fontSize: 14}}>
          Didn't receive OTP?{' '}
        </Text>
        <TouchableOpacity disabled={resendDisabled} onPress={handleResendOTP}>
          <Text
            style={{
              color: resendDisabled ? 'gray' : '#0088cc',
              fontSize: 14,
              alignItems: 'center',
            }}>
            {resendDisabled ? 'Resend OTP' : 'Resend OTP'}{' '}
            {timer > 0 ? (
              <Text style={styles.timerText}>in {timer}s</Text>
            ) : null}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...StyleSheet.flatten({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      padding: 18,
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
    emailText: {
      fontSize: 16,
      color: '#0088cc',
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginVertical: 18,
    },
    otpInput: {
      width: 50,
      height: 50,
      borderWidth: 0.5,
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 18,
      borderColor: 'gray',
      backgroundColor: '#fff',
    },
    buttonContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    resendContainer: {
      alignItems: 'center',
      marginTop: 18,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    timerContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    timerText: {
      color: '#cc4400',
      fontSize: 14,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
  }),
});

export default OtpVerificationScreen;
