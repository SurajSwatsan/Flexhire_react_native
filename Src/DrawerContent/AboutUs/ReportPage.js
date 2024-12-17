import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';
import CustomHeader from '../../Constant/CustomBackIcon';

const ReportPage = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSend = () => {
    console.log({
      feedback,
      email,
      mobileNumber,
      name,
    });
    // Add your send logic here (e.g., API integration)
    alert('Feedback Sent!');
  };

  const getInputStyle = inputName => [
    styles.input,
    focusedInput === inputName && styles.inputFocused,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <CustomHeader />
        <Text style={styles.headerText}>About Us</Text>
      </View>
      <Text style={styles.title}>Contact Us</Text>

      <Text style={styles.label}>Your Feedback</Text>
      <TextInput
        style={[
          styles.inputMulti,
          focusedInput === 'feedback' && styles.inputFocused,
        ]}
        placeholder="Write a Feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
        onFocus={() => setFocusedInput('feedback')}
        onBlur={() => setFocusedInput(null)}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={getInputStyle('email')}
        placeholder="Enter Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput(null)}
      />

      <Text style={styles.label}>Mobile Number</Text>
      <View style={styles.mobileContainer}>
        <Text style={styles.countryCode}>+91</Text>
        <TextInput
          style={[
            styles.inputMobile,
            focusedInput === 'mobileNumber' && styles.inputFocused,
          ]}
          placeholder="Enter Mobile Number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          onFocus={() => setFocusedInput('mobileNumber')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={getInputStyle('name')}
        placeholder="Enter Your Full Name"
        value={name}
        onChangeText={setName}
        onFocus={() => setFocusedInput('name')}
        onBlur={() => setFocusedInput(null)}
      />

      {/* Send Button */}
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor:colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'black',
    marginLeft: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
    height: 48,
  },
  inputMulti: {
    borderWidth: 1,
    borderColor: '#ccc',

    borderRadius: 5,
    padding: 10,
    height: 80,
    marginBottom: 15,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: '500',
  },
  inputMobile: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: '#000',
    // backgroundColor: '#fff',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportPage;
