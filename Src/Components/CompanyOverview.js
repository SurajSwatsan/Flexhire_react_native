import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this import is correct
import {Button} from 'react-native-paper';

const CompanyOverviewScreen = ({route}) => {
  const {jobData} = route.params;
  const [activeTab, setActiveTab] = useState('Overview');
  const [isExpanded, setIsExpanded] = useState(false);

  // State to control visibility of all services
  const [showAllServices, setShowAllServices] = useState(false);

  // Function to toggle visibility of all services
  const toggleServices = () => setShowAllServices(prev => !prev);

  const renderTabs = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <View style={styles.containermain}>
            <View style={styles.overviewContainer}>
              <View style={styles.overviewImage}>
                <Image
                  source={require('../Assets/companyImges/overviewImage.jpg')} // Add your banner image here
                  style={styles.image}
                />

                <View style={styles.content}>
                  {/* <Text style={styles.jobDetailsheader}>About Us:</Text>
                  <Text style={styles.jobDetails1}>
                    {isExpanded
                      ? jobData.company.about
                      : jobData.company.about.length > 50
                      ? `${jobData.company.about.substring(0, 50)}...`
                      : jobData.company.about}
                  </Text>
                  <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <Text style={styles.readMoreText}>
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </Text>
                  </TouchableOpacity>
                   */}
                    <Text style={styles.jobDetailsheader}>About Us:</Text>
              <Text style={styles.jobDetails1}>
                {isExpanded
                  ? jobData.company.about // Full description when expanded
                  : jobData.company.about.length > 50
                  ? `${jobData.company.about.substring(0, 50)}...` // Truncate if not expanded
                  : jobData.company.about}
              </Text>
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.readMoreText}>
                  {isExpanded ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get in touch</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.benefitContainer}>
              <Text style={styles.textBenefits}>Benefits</Text>
            </View>
          </View>
        );
      case 'Beyond-Work':
        return <View></View>;
      case 'Jobs':
        return <View></View>;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
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

          {/* Location and Openings Section */}
          <View style={styles.locationContainer}>
            <View style={styles.location}>
              <Ionicons
                name="location" // Icon for location
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
              <Text style={styles.jobLocation}>
                {jobData.company.employee} employee
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tagline and Services Section */}
      <View style={styles.textInfo}>
        {/* Tagline Section */}
        <Text style={styles.tagLine}>{jobData.company.tagline}</Text>

        {/* Services Section */}
        <View style={styles.servicesContainer}>
          {Array.isArray(jobData?.company?.services) &&
          jobData.company.services.length > 0 ? (
            <>
              {/* Display the first two services */}
              {jobData.company.services.slice(0, 2).map((service, index) => (
                <TouchableOpacity key={index} style={styles.chip}>
                  <Text style={styles.chipText}>{service}</Text>
                </TouchableOpacity>
              ))}

              {/* Display the "See All" button as a chip */}
              {jobData.company.services.length > 2 && (
                <TouchableOpacity onPress={toggleServices} style={styles.chip}>
                  <Text style={styles.chipText}>
                    {showAllServices ? 'See Less' : 'See All'}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Display all services if "See All" is clicked */}
              {showAllServices &&
                jobData.company.services.slice(2).map((service, index) => (
                  <TouchableOpacity key={index + 2} style={styles.chip}>
                    <Text style={styles.chipText}>{service}</Text>
                  </TouchableOpacity>
                ))}
            </>
          ) : (
            <Text style={styles.noServices}>No services available</Text>
          )}
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.ScrollViewContainer}>
          <View
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'Overview' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('Overview')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Overview' && styles.activeTabText,
                ]}>
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'Beyond-Work' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('Beyond-Work')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Beyond-Work' && styles.activeTabText,
                ]}>
                Beyond Work
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === 'Jobs' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('Jobs')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'Jobs' && styles.activeTabText,
                ]}>
                Jobs
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>{renderTabs()}</View>
        </View>
      </View>
    </ScrollView>
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
    marginBottom: 10, // Space below the company info section
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
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 40,
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
    gap: 30,
  },
  location: {
    flexDirection: 'row', // Align the icon and text horizontally
    alignItems: 'center', // Vertically center the items
    marginHorizontal: 5,
  },
  jobLocation: {
    fontSize: 12,
    color: colors.blackText,
  },
  textInfo: {
    marginHorizontal: 12,
  },
  servicesContainer: {
    marginTop: 5, // Space between location/openings and services
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensure the chips wrap to the next line if there's not enough space
  },
  chip: {
    backgroundColor: colors.lightgaryText,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  chipText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  seeAllButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  noServices: {
    fontSize: 12,
    color: colors.blackText,
  },
  bodyContainer: {
    borderTopLeftRadius: 50,
  },
  ScrollViewContainer: {
    // paddingVertical: 12,
  },

  tabContainer: {
    flexDirection: 'row',

    backgroundColor: 'white',
    margin: 12,
    borderRadius: 4,
    justifyContent: 'space-around',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 4,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.blackText,
  },
  activeTabText: {
    color: colors.whiteText,
  },

  containermain: {
   
  },

  overviewContainer: {
    marginHorizontal: 12,
   backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom:10
    
  },
  overviewImage: {
    marginRight: 20, // Add margin to separate the image from the content
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  image: {
    width: 120, // Set the width of the image
    height: 160, // Set the height of the image
    borderRadius: 10,
    resizeMode: 'cover', // Make sure the image doesn't stretch, but covers the area
  },
  content: {
    flex: 2, // Ensures the content takes more space than the image
    paddingLeft: 12, // Add padding to the left to create inner spacing
    justifyContent: 'center',
  },
  jobDetailsheader: {
    fontSize: 16, // Set font size for the header
    fontWeight: 'bold', // Make header bold
    color: '#333', // Set text color for the header
    marginBottom: 5, // Space below the header
  },
  jobDetails1: {
    fontSize: 12, // Set font size for the description text
    color: 'black', // Set text color for the description
  },
  readMoreText: {
    fontSize: 10,
    color: colors.primary, // You can use your theme color for the button

    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary, // Button background color
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Centers text horizontally
    justifyContent: 'center', // Centers text vertically
    marginVertical: 4, // Vertical margin for spacing
    width: 100,
    height: 36,
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 12, // Smaller font size
    fontWeight: 'bold', // Bold text
  },
  benefitContainer:{
    backgroundColor:colors.whiteText,marginHorizontal: 12,
    backgroundColor: 'white',
     padding: 12,
     borderRadius: 8,
  },
  textBenefits:{
    color:colors.blackText,
    fontSize:16,
    fontWeight:'bold'
  },
});

export default CompanyOverviewScreen;
