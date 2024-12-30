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
  ImageBackground,
  Animated,
} from 'react-native';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this import is correct
import {Button, IconButton} from 'react-native-paper';
// import CustomJobCard from '../Constant/CustomJobCard';
import {useDispatch, useSelector} from 'react-redux';
import CustomCarousel from '../Constant/CustomCarousel';
import ReviewPage from '../Constant/CustomReviewPage';
import Swiper from 'react-native-swiper';
import Timeline from 'react-native-timeline-flatlist';
import JobViewController from '../Redux/Action/jobViewController';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../Services/baseAPI';
import moment from 'moment';

const {width, height} = Dimensions.get('window'); // Get the screen width

const {width: screenWidth} = Dimensions.get('window');

const CompanyOverviewScreen = ({route}) => {
  const {company_id} = route?.params;
  // console.log('company_id', company_id);
  const [id, setId] = useState();
  const isFocus = useIsFocused();

  const [activeTab, setActiveTab] = useState('Overview');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const animatedValue = new Animated.Value(0); // Initialize animated value
  const [currentCount, setCurrentCount] = useState(0); // Track the live counter value
  const [selectedChip, setSelectedChip] = useState('All');

  const dispatch = useDispatch();
  const {GetCompanyDetails} = JobViewController();
  const {CompanyDetails} = useSelector(state => state?.job);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
        dispatch(GetCompanyDetails(company_id, id));

        console.log(id); // Log the value once it's retrieved
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('CompanyDetails', CompanyDetails);
  // console.log(CompanyDetails?.company_size);

  const [employeeCount] = useState(
    Number(CompanyDetails?.company_size) || 0, // Default to 0 if conversion fails
  );

  // console.log('EmployeeCount', employeeCount);

  const truncatedLength = 50;
  // State to control visibility of all services

  // Function to toggle visibility of all services
  const toggleServices = () => setShowAllServices(prev => !prev);

  const images = [
    require('../Assets/sliderImages/slider4.jpg'),
    require('../Assets/sliderImages/slider5.jpg'),
    require('../Assets/sliderImages/slider1.jpg'),
    require('../Assets/sliderImages/slider2.jpg'),
    require('../Assets/sliderImages/slider3.jpg'),
  ];
  const chipLabels = ['All', 'New', 'Popular', 'Trending', 'Recommended'];

  // Function to animate the counter incrementally
  // const animateCounter = () => {
  //   let count = 0;
  //   const interval = setInterval(() => {
  //     if (count >= employeeCount) {
  //       clearInterval(interval); // Stop once we reach the employee count
  //     } else {
  //       count += 1; // Increment by 1 every interval
  //       setCurrentCount(count); // Update state to reflect the current count
  //       animatedValue.setValue(count); // Update animated value
  //     }
  //   }, 0); // Update the counter every 30 milliseconds (adjust as needed for smoother animation)
  // };

  // useEffect(() => {
  //   animateCounter(); // Start the counter animation when the component mounts
  // }, []);

  const animateCounter = () => {
    Animated.timing(animatedValue, {
      toValue: employeeCount, // Target the employee count
      duration: 3000, // Duration of the animation (3 seconds)
      useNativeDriver: false, // No native driver needed for text updates
    }).start();
  };

  // Start the counter animation and listen for updates
  useEffect(() => {
    animateCounter();

    const listenerId = animatedValue?.addListener(({value}) => {
      setCurrentCount(Math?.floor(value)); // Use Math.floor to avoid fractional values
    });

    // Cleanup listener on unmount
    return () => {
      animatedValue?.removeListener(listenerId);
    };
  }, [employeeCount]); // Run effect when employeeCount changes

  const renderTabs = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <View style={styles.containermain}>
            <View style={styles.overviewContainer}>
              <View style={styles.overviewImage}>
                <Image
                  source={
                    CompanyDetails?.about_us?.[0]?.image
                      ? {
                          uri:
                            BASE_URL +
                            '/' +
                            CompanyDetails?.about_us?.[0]?.image,
                        }
                      : require('../Assets/companyImges/overviewImage.jpg')
                  }
                  style={styles.image}
                />

                <View style={styles.content}>
                  <Text style={styles.jobDetailsheader}>About Us:</Text>
                  <Text style={styles.jobDetails1}>
                    {isExpanded
                      ? CompanyDetails?.company_description // Show full description when expanded
                      : CompanyDetails?.company_description?.length >
                        truncatedLength
                      ? `${CompanyDetails?.company_description?.substring(
                          0,
                          truncatedLength,
                        )}...` // Truncate if not expanded
                      : CompanyDetails?.company_description}
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
                {Array.isArray(CompanyDetails?.company_benefits) &&
                  CompanyDetails?.company_benefits?.map((benefit, index) => (
                    <View key={index} style={styles.benefitCard}>
                      <Image
                        source={
                          benefit?.icon
                            ? {uri: BASE_URL + benefit?.icon}
                            : require('../Assets/benifitsImages/Health.png') // Default image
                        }
                        style={styles.icon}
                      />
                      <Text style={styles.benefitText}>{benefit?.name}</Text>
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
                {/* <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainer}>
                  {CompanyDetails?.map((jobdata, index) => (
                    <View key={jobdata.id || index} style={{marginRight: 12}}>
                      <ScrollView
                        style={styles.companyContainer}
                        contentContainerStyle={{paddingBottom: 16}}
                        scrollEventThrottle={16}>
                        {CompanyDetails && CompanyDetails.length > 0 ? (
                          CompanyDetails.map(jobData => (
                            <TouchableOpacity
                              key={jobData.id}
                              // onPress={() => handleJobDetails(jobData)}
                            >
                              <View style={styles.jobCard}>
                                <View style={styles.companyInfo}>
                                  <View style={styles.companylogo}>
                                    <Image
                                      source={
                                        jobData?.company?.logo
                                          ? {
                                              uri: `${BASE_URL}${jobData?.company?.logo}`,
                                            }
                                          : require('../Assets/CompanyLogo/Swatsan.png')
                                      }
                                      style={styles.companyImage}
                                    />
                                    <View style={styles.textName}>
                                      <Text style={styles.jobTitle}>
                                        {jobData?.job_title?.title}
                                      </Text>
                                      <Text style={styles.companyName}>
                                        {jobData?.company_name}
                                      </Text>
                                    </View>
                                  </View>
                                  <IconButton
                                    icon="bookmark-outline"
                                    iconColor={colors.primary}
                                    size={24}
                                    style={styles.saveicon}
                                    // onPress={() => handleBookmark(jobData.id)}
                                  />
                                </View>
                                <View style={styles.workModeContainer}>
                                  {jobData.work_modes &&
                                    jobData.work_modes.map((mode, idx) => (
                                      <View
                                        key={idx}
                                        style={styles.workModeChip}>
                                        <Text style={styles.chipText}>
                                          {mode}
                                        </Text>
                                      </View>
                                    ))}
                                </View>
                                <View style={styles.location}>
                                  <IconButton
                                    icon="map-marker"
                                    iconColor={colors.primary}
                                    size={18}
                                    style={{
                                      padding: 0,
                                      marginLeft: -10,
                                      height: 20,
                                    }}
                                  />
                                  {jobData.job_location.map(
                                    (location, locIndex) => (
                                      <Text
                                        key={locIndex}
                                        style={styles.jobCardLocation}>
                                        {location.name}
                                        {locIndex <
                                          jobData.job_location.length - 1 &&
                                          ', '}
                                      </Text>
                                    ),
                                  )}
                                </View>
                                <View style={styles.line} />
                                <View style={styles.jobFooter}>
                                  {jobData?.salary?.yearly && (
                                    <View style={styles.experienceContainer}>
                                      <Ionicons
                                        name="cash"
                                        size={14}
                                        color="#004466"
                                      />
                                      <Text style={styles.jobDetailsalary}>
                                        ₹
                                        {jobData.salary.yearly.min.toLocaleString()}{' '}
                                        - ₹
                                        {jobData.salary.yearly.max.toLocaleString()}{' '}
                                        INR
                                      </Text>
                                    </View>
                                  )}
                                  <Text style={styles.jobPostedDate}>
                                    {moment(
                                      jobData.reviews[0]?.review_date,
                                    ).fromNow()}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          ))
                        ) : (
                          <View style={[styles.noJobsContainer]}>
                            <Text style={[styles.noJobsText]}>
                              No jobs found.....
                            </Text>
                          </View>
                        )}
                      </ScrollView>
                    </View>
                  ))}
                </ScrollView> */}
              </View>
            </View>

            {/* our team */}
            <View
              style={{
                marginTop: 12,
                marginBottom: 12,
                flex: 1,
                width: '100%',
              }}>
              <CustomCarousel companyDetails={CompanyDetails} />
            </View>

            <View style={styles.review}>
              <ReviewPage />
            </View>

            <View style={styles.counterContainer}>
              <Image
                source={require('../Assets/ApplyImages/team5.png')}
                style={styles.conterImage}
              />
              <View style={styles.counternumberContainer}>
                {/* Display the animated counter */}
                <Animated.Text style={styles.counter}>
                  {currentCount}+
                </Animated.Text>
                <Text style={styles.counterTitle}>Professional Team</Text>
              </View>
            </View>
          </View>
        );

      case 'why_join_us':
        return (
          <View style={styles.companymainContaner}>
            <View style={styles.videoContainer}>
              {CompanyDetails?.youtubeVideos?.map((video, index) => (
                <View key={index} style={styles.videoCard}>
                  {/* Left side: Image & Video Thumbnail */}
                  <TouchableOpacity
                    style={styles.imageContainer}
                    // onPress={() => openVideo(video.url)} // Handle the click to open the video
                  >
                    <ImageBackground
                      source={require('../Assets/sliderImages/slider5.jpg')} // Replace with your actual thumbnail URL
                      style={styles.thumbnail}
                      imageStyle={styles.imageBackground} // To apply styling to the background image
                    >
                      {/* Play button overlay */}
                      <View style={styles.playButtonContainer}>
                        <Text style={styles.playButton}>▶</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>

                  {/* Right side: Title, Description, Date */}
                  <View style={styles.VideotextContainer}>
                    <Text style={styles.videoTitle}>{video.title}</Text>
                    <Text style={styles.videoDescription}>
                      {video.description}
                    </Text>
                    <Text style={styles.videoDate}>{video.date}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.companyContainer}>
              <View style={styles.companysliderContainer}>
                <Text style={styles.title}>Life at Company</Text>
                <Swiper
                  style={styles.wrapper}
                  showsPagination={true} // Show pagination dots
                  autoplay={true} // Enable auto-play
                  loop={true} // Loop the images
                  paginationStyle={styles.paginationStyle} // Customize pagination position
                  dot={<View style={styles.dot} />} // Customize the inactive dot
                  activeDot={<View style={styles.activeDot} />} // Customize the active dot
                >
                  {images?.map((image, index) => (
                    <View key={index} style={styles.slide}>
                      <Image source={image} style={styles.sliderimage} />
                    </View>
                  ))}
                </Swiper>
              </View>
            </View>
            <View style={styles.testimonialmainContainer}>
              <View style={styles.testimonialMain}>
                {CompanyDetails?.company_leaders
                  ?.filter(leader => leader?.quote) // Filter out leaders without a quote
                  .map((leader, index) => (
                    <View key={index} style={styles.testimonialcard}>
                      <View style={styles.testimonialContainer}>
                        {/* Display the quote */}
                        <Text style={styles.testimonialText}>
                          "{leader?.quote}"
                        </Text>
                        <Text style={styles.name}>
                          {leader?.name || 'Unknown'}
                        </Text>
                        <Text style={styles.designation}>
                          {leader?.position || 'No position specified'}
                        </Text>
                      </View>

                      {/* Right side: Image */}
                      <Image
                        source={
                          leader?.image
                            ? {uri: BASE_URL + '/' + leader?.image}
                            : require('../Assets/companyImges/person.jpg') // Fallback image
                        }
                        style={styles.textimage}
                      />
                    </View>
                  ))}
              </View>
            </View>

            <View style={styles.keymainContainer}>
              <View style={styles.keyconatiner}>
                <Text style={styles.textkeyContainer}>Key Highlights</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CompanyDetails?.key_highlights?.map((highlight, index) => (
                  <View key={index} style={styles.keyCard}>
                  

                    <Image
                      source={
                        highlight?.icon
                          ? {uri: BASE_URL + highlight?.icon} // Use dynamic icon URI if provided
                          : require('../Assets/benifitsImages/paid_time.png') // Fallback image
                      }
                      style={styles.icon1}
                    />
                    <Text style={styles.keyText}>
                      {highlight?.name || 'No Title'}
                      {/* {console.log(highlight?.title)}; */}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.awardContainer}>
              <Text style={styles.awardHeading}>Awards</Text>
              <View style={styles.awardimageContainer}>
                <Image
                  source={require('../Assets/ApplyImages/awards.png')}
                  style={styles.awardImage}
                />
                <View style={styles.awardInfo}>
                  {/* Horizontal ScrollView for Timeline */}
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={{flex: 1, paddingVertical: 12}}>
                      <Timeline
                        data={CompanyDetails?.company_awards?.map(award => ({
                          ...award,
                          time: '', // Add an empty 'time' field to match Timeline data structure
                        }))}
                        circleSize={15} // Circle (dot) size
                        circleColor="#004466" // Circle (dot) color
                        lineColor="#acd2be" // Line color connecting circles
                        innerCircle={'dot'} // Use a simple dot for the inner circle
                        titleStyle={styles.cardTitle} // Title style
                        descriptionStyle={styles.cardDate} // Description style
                        renderTime={() => null} // Disable rendering of the time
                        renderDetail={rowData => (
                          <View style={styles.detailContainer}>
                            <Text style={styles.cardTitle}>
                              {rowData?.title || 'No Title'}
                            </Text>
                            <Text style={styles.cardDate}>
                              {rowData?.date
                                ? moment(new Date(rowData.date)).format(
                                    'MMMM D, YYYY',
                                  )
                                : 'No Date'}
                            </Text>
                          </View>
                        )}
                        options={{
                          style: {}, // Keep the default styling
                        }}
                        eventContainerStyle={{marginTop: -10}}
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        );

      case 'Jobs':
        return (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.jobchipContainer}>
              {chipLabels.map((label, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.jobchip,
                    selectedChip === label && styles.jobselectedChip, // Apply selected chip style
                  ]}
                  onPress={() => setSelectedChip(label)} // Update selected chip on press
                >
                  <Text
                    style={[
                      styles.chipjobText,
                      selectedChip === label && styles.selectedjobChipText, // Apply text color change if selected
                    ]}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* {relatedJobs && Object.keys(relatedJobs).length > 0 && (
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
            )} */}

            <View style={styles.review}>
              <ReviewPage />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Image
          source={
            CompanyDetails?.company_banner
              ? {uri: BASE_URL + CompanyDetails?.company_banner}
              : require('../Assets/companyImges/banerimage.jpg')
          } // Add your banner image here
          style={styles.bannerImage}
        />
      </View>

      {/* Company Info Section */}
      <View style={styles.companyInfo}>
        {/* Logo Container (Left side) */}
        <View style={styles.logoContainer}>
          <Image
            source={
              CompanyDetails?.logo
                ? {uri: BASE_URL + CompanyDetails?.logo} // Use URI if the logo is a valid URL or path
                : require('../Assets/CompanyLogo/Swatsan.png') // Fallback to a default image
            }
            style={styles.logo}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.companyName}>{CompanyDetails?.company_name}</Text>

          <View style={styles.locationContainer}>
            <View style={styles.location}>
              <Ionicons
                name="location" // Icon for location
                color={colors.primary} // Icon color
                size={16} // Icon size
                style={{padding: 0, marginLeft: -10, height: 20}} // Adjust the style
              />
              <Text style={styles.jobLocation}>
                {CompanyDetails?.headquarters}
              </Text>
            </View>

            <View style={styles.location}>
              <Ionicons
                name="person" // Icon for openings
                color={colors.primary} // Icon color
                size={18} // Icon size
                style={{padding: 0, marginLeft: -10, height: 20}} // Adjust the style
              />
              <Text style={styles.jobLocation}>
                {CompanyDetails?.company_size} employees
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.textInfo}>
        {/* Tagline Section */}
        <Text style={styles.tagLine}>{CompanyDetails?.company_tagline}</Text>

        {/* Services Section */}
        <View style={styles.servicesContainer}>
          {Array.isArray(CompanyDetails?.company_services) &&
          CompanyDetails?.company_services?.length > 0 ? (
            <>
              {/* Display the first two services */}
              {CompanyDetails?.company_services
                .slice(0, 2)
                .map((service, index) => (
                  <TouchableOpacity key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{service?.service_name}</Text>
                  </TouchableOpacity>
                ))}

              {/* Display the "See All" button as a chip */}
              {CompanyDetails?.company_services.length > 2 && (
                <TouchableOpacity
                  onPress={() => setShowAllServices(!showAllServices)}
                  style={styles.chip}>
                  <Text style={styles.chipText}>
                    {showAllServices ? 'See Less' : 'See All'}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Display all services if "See All" is clicked */}
              {showAllServices &&
                CompanyDetails?.company_services
                  .slice(2)
                  .map((service, index) => (
                    <TouchableOpacity key={index + 2} style={styles.chip}>
                      <Text style={styles.chipText}>
                        {service?.service_name}
                      </Text>
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
    marginTop: 12,
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
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // marginBottom:12,
    margin: 8,
    marginHorizontal: 8,
  },
  icon: {
    width: 84,
    height: 84,
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
    // color: colors.primary,
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
    // marginBottom: 12,
  },
  review: {
    // marginHorizontal:12,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  counterContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#e3f0e9',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 18,

    // marginVertical:12
  },
  counterTitle: {
    fontSize: 12,
    fontWeight: 'bold',

    color: '#004d3d',
  },
  counterSubconatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal:12,
    marginVertical: 12,
  },
  conterImage: {
    height: 150,
    width: 150,
  },
  counternumberContainer: {
    backgroundColor: '#e3f0e9',

    // height: 120,
    // width: 120,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // marginLeft: 12,
    // marginVertical: 18,
    // marginHorizontal:18
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00cc00',
    alignItems: 'center',
    justifyContent: 'center',
  },

  relatedjobcontainer: {
    margin: 12,
  },
  jobchipContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  jobchip: {
    backgroundColor: colors.whiteText,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobselectedChip: {
    backgroundColor: colors.lightgaryText, // Darker blue for selected chip
    color: colors.whiteText,
  },
  chipjobText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedjobChipText: {
    color: colors.blackText,
  },

  companymainContaner: {
    // padding: 12,
    borderRadius: 8,
  },
  videoContainer: {
    marginHorizontal: 12,
    // marginVertical:18
    marginBottom: 12,
  },
  videoCard: {
    flexDirection: 'row', // Arrange the children (image and text) in a row
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 5,
  },

  imageContainer: {
    width: 130, // Adjust based on the size you want for the thumbnail
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 15, // Space between image and text
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image covers the area without distortion
  },
  imageBackground: {
    // Additional styles to the image background if needed
    borderRadius: 10,
  },
  playButtonContainer: {
    position: 'absolute',
    top: '30%',
    // left: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    borderRadius: 30,
    // padding: 10,
  },
  playButton: {
    fontSize: 24,
    color: '#fff', // White play icon
    textAlign: 'center',
  },
  VideotextContainer: {
    flex: 1, // Take up the remaining space on the right
    // justifyContent: 'space-between', // Distribute content vertically
    margin: 4,
    justifyContent: 'center',
  },
  videoTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.blackText,
    alignItems: 'center',
  },
  videoDescription: {
    fontSize: 12,
    color: colors.blackText,
    // marginVertical: 5,
  },
  videoDate: {
    fontSize: 10,
    color: '#888',
    textAlign: 'right', // Align the date to the right end
    marginTop: 40,
  },
  companyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  companysliderContainer: {
    marginHorizontal: 18,
    // marginVertical: 24,
    marginBottom: 36,
    marginTop: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },

  wrapper: {
    height: 200, // Set the height of the swiper (you can adjust this)
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderimage: {
    width: '100%', // Makes the image cover the full width
    height: '100%', // Makes the image cover the full height
    resizeMode: 'cover', // Ensures the image is not distorted
    borderRadius: 8,
  },
  paginationStyle: {
    bottom: -20, // Adjust this value to change the position of the dots
  },
  dot: {
    backgroundColor: colors.lightgaryText, // Inactive dot color
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#004466', // Active dot color
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  testimonialmainContainer: {
    backgroundColor: '#e3f0e9',
  },
  testimonialMain: {
    marginHorizontal: 18,
    marginVertical: 18,
  },
  testimonialcard: {
    flexDirection: 'row', // Arrange children in a row

    // borderRadius: 10,
    // padding: 20,
    // marginVertical: 10,
  },
  testimonialContainer: {
    flex: 1, // Take remaining space
    justifyContent: 'center', // Center content vertically
    paddingRight: 12, // Space between text and image
  },
  testimonialText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    // marginBottom: 3,
  },
  designation: {
    fontSize: 12,
    color: '#777',
  },
  textimage: {
    width: 120,
    height: 130,
    borderRadius: 60, // Make the image circular
    alignSelf: 'center', // Center the image vertically
  },
  keymainContainer: {
    marginHorizontal: 12,
    // backgroundColor:'#fafafa'
  },
  keyconatiner: {
    marginHorizontal: 18,
    // marginVertical: 18,
    marginTop: 18,
    marginBottom: 4,
  },
  textkeyContainer: {
    fontSize: 16,
    color: colors.blackText,
    fontWeight: 'bold',
  },
  keyCard: {
    flexDirection: 'column', // Stack the icon below the name
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    width: 120,
    height: 150, // Increase height to give space for both icon and text
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 24,
    margin: 8,
    // marginHorizontal: 8,
  },
  icon1: {
    width: 84,
    height: 84,
    marginBottom: 5,
  },
  keyText: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.blackText,
  },
  awardContainer: {
    backgroundColor: '#e3f0e9',
    marginVertical: 18,
    // marginHorizontal:18
  },
  awardHeading: {
    color: colors.blackText,
    marginHorizontal: 18,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  awardimageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  awardImage: {
    height: 150,
    width: 150,
  },
  awardInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    // marginLeft: 20,
    flex: 1, // Take up the remaining space
    backgroundColor: '#fff',
    // padding: 8, // Padding inside the info section
    borderRadius: 10,

    justifyContent: 'center',
  },
  awardtext: {
    margin: 4,
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDate: {
    fontSize: 8,
    color: colors.blackText,
    // marginVertical: 5,
  },

  detailContainer: {
    flexDirection: 'column', // Stack the title and date vertically
    // paddingLeft: 10, // Space between timeline circle and content
    justifyContent: 'flex-start', // Align the content to the left
  },
});

export default CompanyOverviewScreen;
