import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this import is correct

const CompanyOverviewScreen = ({route}) => {
  const {jobData} = route.params;
  console.log('overview', jobData);

  return (
    <View style={styles.container}>
      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../Assets/companyImges/banerimage.jpg')} // Add your banner image here
          style={styles.bannerImage}
        />
      </View>

      {/* Company Info Section */}
      <View style={styles.companyInfo}>
        {/* Logo Container (Left side) */}
        <View style={styles.logoContainer}>
          <Image
            source={
              jobData.company.logo
                ? {uri: jobData.company.logo} // Use URI if the logo is a valid URL or path
                : require('../Assets/CompanyLogo/TCS_logo.png') // Fallback to a default image
            }
            style={styles.logo}
          />
        </View>

        {/* Information Section (Right side) */}
        <View style={styles.infoContainer}>
          <Text style={styles.companyName}>{jobData.company.company_name}</Text>
          <Text style={styles.tagLine}>{jobData.company.tagline}</Text>

          {/* Location and Openings Section */}
          <View style={styles.locationContainer}>
            <View style={styles.location}>
              <Ionicons
                name="location-outline" // Icon for location
                color={colors.primary} // Icon color
                size={16} // Icon size
                style={{padding: 0, marginLeft: -10, height: 20}} // Adjust the style
              />
              <Text style={styles.jobLocation}>{jobData.location}</Text>
            </View>
            <View style={styles.location}>
              <Ionicons
                name="person" // Icon for openings
                color={colors.primary} // Icon color
                size={18} // Icon size
                style={{padding: 0, marginLeft: -10, height: 20}} // Adjust the style
              />
              <Text style={styles.jobLocation}>{jobData.openings}</Text>
            </View>
          </View>

          {/* Services Section */}
          <Text style={styles.services}>
            {jobData.company.services && jobData.company.services.length > 0
              ? jobData.company.services.join(", ")
              : "No services available"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bannerContainer: {},
  bannerImage: {
    width: '100%',
    height: 150,
  },
  companyInfo: {
    flexDirection: 'row', // Align the logo and information side-by-side (horizontally)
    marginTop: -30, // Adjust this if you want space above the logo
    paddingHorizontal: 20, // Padding for space on the sides
    alignItems: 'flex-start', // Align the items at the top (so the logo and info align properly)
    marginBottom: 20, // Space below the company info section
  },
  logoContainer: {
    borderWidth: 0.5,
    borderColor: colors.lightgaryText,
    backgroundColor: colors.cardBgcolor,
    width: 80,
    height: 80,
    overflow: 'hidden', // Ensures the image does not exceed the container bounds
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start', // Ensure logo is aligned at the start
    borderRadius: 10,
    marginRight: 20, // Add space between logo and the information
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1, // Take up remaining space for the information
    justifyContent: 'flex-start', // Align the information to the top
    marginTop: 40, // Add some top margin to adjust positioning
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5, // Space between company name and tagline
  },
  tagLine: {
    fontSize: 12,
    color: colors.blackText,
    marginBottom: 5, // Space between tagline and location
  },
  locationContainer: {
    flexDirection: 'row', // Align location and openings horizontally
    // justifyContent: 'space-between', // Distribute items evenly with space between
    // marginBottom: 10, // Space between location section and services
    gap:30,
  },
  location: {
    flexDirection: 'row', // Align the icon and text horizontally
   
    alignItems: 'center', // Vertically center the items
    marginHorizontal:5
  },
  jobLocation: {
    fontSize: 12,
    color: colors.blackText,
  },
  services: {
    fontSize: 12,
    color: colors.blackText,
    marginTop: 5, // Space between location/openings and services
    textAlign: 'left', // Align services text to the left
  },
});

export default CompanyOverviewScreen;
