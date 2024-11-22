import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this import is correct
import {Button} from 'react-native-paper';
import CustomJobCard from '../Constant/CustomJobCard';
import {useSelector} from 'react-redux';
import CustomCarousel from '../Constant/CustomCarousel';
import ReviewPage from '../Constant/CustomReviewPage';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

const {width, height} = Dimensions.get('window'); // Get the screen width

const {width: screenWidth} = Dimensions.get('window');

const CompanyOverviewScreen = ({route}) => {
  const {jobData} = route.params;
  const [activeTab, setActiveTab] = useState('Overview');
  const [isExpanded, setIsExpanded] = useState(false);

  const jobs = useSelector(state => state.Jobs.jobsData);

  const relatedJobs = jobData.related_jobs;

  const truncatedLength = 50;

  if (!jobs || jobs.length === 0) {
    return <Text style={styles.noCompanyText}>No jobs to display.</Text>;
  }

  // State to control visibility of all services
  const [showAllServices, setShowAllServices] = useState(false);

  // Function to toggle visibility of all services
  const toggleServices = () => setShowAllServices(prev => !prev);

  const images = [
    require('../Assets/sliderImages/slider4.jpg'),
    require('../Assets/sliderImages/slider5.jpg'),
    require('../Assets/sliderImages/slider1.jpg'),
    require('../Assets/sliderImages/slider2.jpg'),
    require('../Assets/sliderImages/slider3.jpg'),
  ];

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
                  <Text style={styles.jobDetailsheader}>About Us:</Text>
                  <Text style={styles.jobDetails1}>
                    {isExpanded
                      ? jobData.company.about // Show full description when expanded
                      : jobData.company.about.length > truncatedLength
                      ? `${jobData.company.about.substring(
                          0,
                          truncatedLength,
                        )}...` // Truncate if not expanded
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

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {jobData?.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitCard}>
                    <Image
                      source={require('../Assets/benifitsImages/Health.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.benefitText}>{benefit.name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.recentContainer}>
              <View style={{marginVertical: 12, marginLeft: 16}}>
                <View style={styles.displayContainer}>
                  <Text style={styles.contHead}>Recent Jobs</Text>
                  <Text style={styles.seeAll}>See All</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainer}>
                  {jobs.map((jobdata, index) => (
                    <View key={jobdata.id || index} style={{marginRight: 12}}>
                      <CustomJobCard jobData={jobdata} />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* our team */}
            <View
              style={{
                marginTop: 12,
                marginBottom: 12,
                flex: 1,
                // backgroundColor: colors.whiteText,
                width: '100%',
              }}>
              <CustomCarousel />
            </View>

            <View style={styles.review}>
              <ReviewPage />
            </View>
          </View>
        );

      case 'why_join_us':
        return (
          <View style={styles. companyContainer}>
          <View style={styles.companysliderContainer}>
          <Text style={styles.title}>Life at Company</Text>
          <SwiperFlatList
            autoplay
            autoplayDelay={10}
            autoplayLoop
            index={1}
            showPagination
            style={{ height: height * 0.3}} // Height of the swiper container
            data={images}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={item}
                  style={styles.image1}
                />
              </View>
            )}
            paginationStyle={styles.paginationStyle} // Custom pagination styling
            
          />
          </View>
        </View>
        );

      case 'Jobs':
        return (
          <View>
            {relatedJobs && Object.keys(relatedJobs).length > 0 && (
              <View style={styles.relatedjobcontainer}>
                <ScrollView>
                  {Object.entries(relatedJobs).map(([key, jobdata], index) => (
                    <View key={jobdata.id || index} style={{marginBottom: 14}}>
                      <TouchableOpacity
                        onPress={() => {
                          // Navigate to JobDetailScreen for the related job
                          navigation.navigate('JobDetailScreen', {
                            jobData: jobdata,
                          });
                        }}>
                        <CustomJobCard jobData={jobdata} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        );
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
            {/* <View style={styles.location}>
              <Ionicons
                name="person" // Icon for openings
                color={colors.primary} // Icon color
                size={18} // Icon size
                style={{padding: 0, marginLeft: -10, height: 20}} // Adjust the style
              />
              <Text style={styles.jobLocation}>
                {jobData.company.employee} employee
              </Text>
            </View> */}
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
                activeTab === 'why_join_us' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('why_join_us')}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'why_join_us' && styles.activeTabText,
                ]}>
                Why Join Us
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

  containermain: {},

  overviewContainer: {
    // marginHorizontal: 12,
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
  },
  overviewImage: {
    flexDirection: 'row', // Align image and content horizontally
    marginVertical: 12,
    alignItems: 'flex-start', // Align items at the start
    margin: 8,
  },
  image: {
    width: 120, // Set the width of the image
    height: 160, // Set the height of the image
    borderRadius: 10,
    resizeMode: 'cover', // Ensure the image doesn't stretch but covers the area
    marginRight: 12, // Space between image and content
  },
  content: {
    flex: 1, // Allow content to take the remaining space
    paddingLeft: 12, // Add padding to the left to create inner spacing
    justifyContent: 'center', // Align the text at the top
    alignSelf: 'center',
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
    color: colors.primary, // Use your theme color for the button
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
  benefitContainer: {
    marginTop: 18,
    paddingHorizontal: 10,
    marginBottom: 18,
  },
  textBenefits: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.blackText,
    marginHorizontal: 12,
  },
  benefitCard: {
    flexDirection: 'column', // Stack the icon below the name
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    width: 120,
    height: 150, // Increase height to give space for both icon and text
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // marginBottom:12,
    margin: 8,
    marginHorizontal: 8,
  },
  icon: {
    width: 72,
    height: 72,
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },

  recentContainer: {
    backgroundColor: '#fafafa',
    // margin:8,
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackText,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  teamHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackText,
    alignSelf: 'center',
    color: colors.primary,
    backgroundColor: colors.whiteText,
    width: '100%',
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
  seeAll: {
    fontSize: 14,
    color: colors.blackText,
    marginRight: 10,
  },

  screen: {
    flex: 1,
    backgroundColor: colors.whiteText,
    borderRadius: 8,
    // margin:12
    // marginLeft:-12,
  },
  contentContainer: {
    marginBottom: 12,
  },
  review: {
    // marginHorizontal:12,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  relatedjobcontainer: {
    margin: 12,
  },
  companyContainer: {
    backgroundColor: '#fafafa',
  },
  companysliderContainer: {
    marginHorizontal: 18,
    marginVertical: 18,
  },
  companyText: {
    color: 'black', // Replace with your color constant
    fontWeight: 'bold',
    fontSize: 16,
    // padding: 4,
    marginBottom: 8,
  },
  companyContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  companysliderContainer:{
    marginHorizontal:18,
    marginVertical:18
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000',
   
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
   margin:8
  },
  image1: {
    width: 250, // Image width
    height: 200, // Image height
    resizeMode: 'cover', // Ensure the image covers the container without distortion
    borderRadius: 8, // Optional: Rounded corners for images
  },
  paginationStyle: {
    bottom: 10, // Adjust the position of the pagination dots
   
  },
  
});

export default CompanyOverviewScreen;
