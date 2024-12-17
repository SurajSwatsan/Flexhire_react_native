import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../Global_CSS/TheamColors';
import CustomHeader from '../../Constant/CustomBackIcon';

const PrivacyPolicyScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.Header}>
        <CustomHeader/>
        <Text style={styles.headerText}>About Us</Text>
        </View>
       
        <ScrollView showsVerticalScrollIndicator={false}>
         <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.date}>Effective Date: 1st January 2024</Text>

        <Text style={styles.sectionHeader}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We may collect personal and non-personal information such as name, email address, phone number, device data, and usage statistics.
        </Text>

        <Text style={styles.sectionHeader}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use your data to provide app functionality, improve user experience, respond to queries, and ensure app security.
        </Text>

        <Text style={styles.sectionHeader}>3. Sharing Your Information</Text>
        <Text style={styles.paragraph}>
          We do not sell your data. However, we may share it with third-party services like analytics tools, or if required by law.
        </Text>

        <Text style={styles.sectionHeader}>4. Data Retention</Text>
        <Text style={styles.paragraph}>
          Your data is retained only for as long as necessary to fulfill its purpose or as required by law.
        </Text>

        <Text style={styles.sectionHeader}>5. Your Rights</Text>
        <Text style={styles.paragraph}>
          You have the right to access, correct, or delete your personal data. Contact us at support@example.com to exercise your rights.
        </Text>

        <Text style={styles.sectionHeader}>6. Children’s Privacy</Text>
        <Text style={styles.paragraph}>
          This app is not intended for children under the age of 13. If we collect data from a child, it will be deleted promptly.
        </Text>

        <Text style={styles.sectionHeader}>7. Changes to this Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update this Privacy Policy. Changes will be communicated by updating the effective date at the top of this page.
        </Text>

        <Text style={styles.sectionHeader}>8. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions or concerns about this Privacy Policy, contact us at:
          {'\n\n'}Email:  Ask@swatsan.com{'\n'}Website: https://swatsan.com
        </Text>

        <Text style={styles.footer}>Thank you for trusting **Flexhire**.</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop:12
  },
  date: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666666',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    color: colors.secondary,
  },
  paragraph: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'justify',
  },
  footer: {
    marginTop: 30,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#888888',
  },
});

export default PrivacyPolicyScreen;
