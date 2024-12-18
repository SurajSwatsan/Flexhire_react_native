import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import CustomHeader from '../../Constant/CustomBackIcon';
import { colors } from '../../Global_CSS/TheamColors';

const TermsAndConditionsScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.Header}>
        <CustomHeader/>
        <Text style={styles.headerText}>About Us</Text>
        </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Terms and Conditions</Text>
        <Text style={styles.date}>Effective Date: 1st January 2024</Text>

        <Text style={styles.sectionHeader}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to **Your App Name**. These terms and conditions outline the rules and regulations for using our app. By accessing this app, you accept these terms in full.
        </Text>

        <Text style={styles.sectionHeader}>2. License to Use</Text>
        <Text style={styles.paragraph}>
          We grant you a limited, non-exclusive, non-transferable license to use the app for personal, non-commercial purposes, subject to these terms.
        </Text>

        <Text style={styles.sectionHeader}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          You agree to use this app responsibly and not to:
          {'\n'}- Violate any applicable laws or regulations.
          {'\n'}- Use the app for unauthorized purposes.
          {'\n'}- Distribute, copy, or modify any content from this app without permission.
        </Text>

        <Text style={styles.sectionHeader}>4. Intellectual Property Rights</Text>
        <Text style={styles.paragraph}>
          All intellectual property rights related to this app and its content are owned by **Your Company Name** or its licensors. You must not use any part of this content without proper authorization.
        </Text>

        <Text style={styles.sectionHeader}>5. Limitations of Liability</Text>
        <Text style={styles.paragraph}>
          To the extent permitted by law, we are not liable for any indirect, incidental, or consequential damages resulting from the use of this app.
        </Text>

        <Text style={styles.sectionHeader}>6. Termination</Text>
        <Text style={styles.paragraph}>
          We may suspend or terminate your access to the app at any time, without prior notice, for any breach of these terms and conditions.
        </Text>

        <Text style={styles.sectionHeader}>7. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting the updated terms in the app.
        </Text>

        <Text style={styles.sectionHeader}>8. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms are governed by and interpreted in accordance with the laws of your jurisdiction, and you submit to the exclusive jurisdiction of its courts.
        </Text>

        <Text style={styles.sectionHeader}>9. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns about these Terms and Conditions, please contact us:
          {'\n\n'}Email:  Ask@swatsan.com{'\n'}Website: https://swatsan.com
        </Text>

        <Text style={styles.footer}>Thank you for using **Flexhire**!</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor:colors.background,
    padding: 18,
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 6,
    color: '#007BFF',
  },
  paragraph: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'justify',
  },
  footer: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#888888',
  },
});

export default TermsAndConditionsScreen;
