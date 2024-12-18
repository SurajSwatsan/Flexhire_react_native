import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';
import CustomHeader from '../../Constant/CustomBackIcon';

const AboutUsPage = ({ navigation }) => {
  const handlePress = () => {
    Linking.openURL('https://swatsan.com/').catch(err =>
      console.error('Failed to open URL: ', err),
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <CustomHeader />
        <Text style={styles.headerText}>About Us</Text>
      </View>
      <View>
        <Image
          source={require('../../Assets/CompanyLogo/swatsan_logo2.png')}
          style={styles.logo}
        />

        <Text style={styles.TextContainer}>
          We are a IT company specializing in software development, IT
          consulting, and innovative technology solutions. Our team is dedicated
          to helping businesses achieve their goals through technology.
        </Text>

        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.innerText}>Learn More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ImageContainer}>
        <Image
          source={require('../../Assets/CompanyLogo/Swatsan.png')}
          style={styles.image}
        />
        <Image
          source={require('../../Assets/CompanyLogo/flexhire-logo.png')}
          style={styles.fleximage}
        />
      </View>

      <View style={styles.TextLinkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ReportPage')}>
        <View style={styles.linkContainer}>
          <View style={styles.dot}></View>
          <Text style={styles.reportText}>Report a Problem</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
        <View style={styles.linkContainer}>
          <View style={styles.dot}></View>
          <Text style={styles.reportText}>Privacy Policy</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('TermsAndCondition')}>
        <View style={styles.linkContainer}>
          <View style={styles.dot}></View>
          <Text style={styles.reportText}>Terms & Conditions</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreditPage')}>
        <View style={styles.linkContainer}>
          <View style={styles.dot}></View>
          <Text style={styles.reportText}>Credits</Text>
        </View>
      </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginHorizontal: 12,
    marginVertical: 18,
    backgroundColor:colors.background,
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
  logo: {
    width: 350,
    height: 72,
    marginBottom: 8,
    marginTop: 12,
  },

  TextContainer: {
    fontSize: 14,
    textAlign: 'center',
  },
  innerText: {
    color: colors.secondary,
    textAlign: 'center',
    margin: 12,
    fontSize: 12,
  },
  ImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
  },
  image: {
    marginTop: 12,
    width: 56,
    height: 56,
    alignSelf: 'center',
  },
  fleximage: {
    width: 200,
    height: 80,
  },
  TextLinkContainer:{
    marginTop:28,
    alignItems:'center',
  },
  linkContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4, // Make it a circle
    backgroundColor: colors.secondary, // Dot color
    
  },
  reportText:{
    color:colors.secondary,
    fontSize:14,
    margin:6
  }
});

export default AboutUsPage;
