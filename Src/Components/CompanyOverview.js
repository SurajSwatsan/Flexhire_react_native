import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this import is correct
import {IconButton} from 'react-native-paper';
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
import JobCardStyle from '../Global_CSS/JobCardStyle';
import CustomFormatAmount from '../Constant/CustomFormatAmount';
import WebView from 'react-native-webview';

const {width, height} = Dimensions.get('window'); // Get the screen width

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
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const dispatch = useDispatch();
  const {GetCompanyDetails, GetCompanyJobs} = JobViewController();
  const {CompanyDetails, CompanyJobs} = useSelector(state => state?.job);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
        dispatch(GetCompanyDetails(company_id, id));
        dispatch(GetCompanyJobs(company_id, id));

        console.log(id); // Log the value once it's retrieved
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [employeeCount] = useState(
    Number(CompanyDetails?.company_size) || 0, // Default to 0 if conversion fails
  );

  const truncatedLength = 50;

  const toggleServices = () => setShowAllServices(prev => !prev);

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

  const openVideo = url => {
    if (url) {
      setSelectedVideoUrl(url); // Set the URL to open the WebView
    } else {
      Alert.alert('No URL', 'This video does not have a valid URL.');
    }
  };

  const closeVideo = () => {
    setSelectedVideoUrl(null); // Close the WebView
  };

  const filteredJobs =
    CompanyJobs?.jobs_by_department?.find(
      department => department?.department_name == selectedDepartment,
    )?.jobs || [];

  const renderTabs = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <View style={styles.containermain}>
            {CompanyDetails?.about_us?.length > 0 && (
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
                    <TouchableOpacity
                      onPress={() => setIsExpanded(!isExpanded)}>
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
            )}

            {CompanyDetails?.company_benefits?.length > 0 && (
              <View style={styles.Container}>
                <Text style={styles.textcontainerheading}>Benefits</Text>

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
            )}

            {CompanyDetails?.recent_jobs && (
              <View style={styles.recentContainer}>
                <View style={{marginLeft: 16}}>
                  <View style={styles.displayContainer}>
                    <Text style={styles.contHead}>Recent Jobs</Text>
                  </View>
                  {CompanyDetails?.recent_jobs?.length > 0 && (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}>
                      {CompanyDetails.recent_jobs.map(jobData => (
                        <TouchableOpacity
                          key={jobData.id}
                          // onPress={() => handleCardPress(jobData)}
                          style={{marginRight: 12}}>
                          <View
                            style={[
                              JobCardStyle.jobCard,
                              {
                                backgroundColor: '#fff',
                                minWidth: width * 0.75,
                              },
                            ]}>
                            <View style={JobCardStyle.companyInfo}>
                              <View style={JobCardStyle.companylogo}>
                                {jobData.company.logo ? (
                                  <Image
                                    source={{
                                      uri: BASE_URL + jobData.company.logo,
                                    }}
                                    style={JobCardStyle.companyImage}
                                  />
                                ) : (
                                  <Ionicons
                                    name="business"
                                    size={36}
                                    color="gray"
                                    style={JobCardStyle.companyImage}
                                  />
                                )}
                                <View style={JobCardStyle.textName}>
                                  {jobData?.job_title?.title && (
                                    <Text style={JobCardStyle.jobTitle}>
                                      {jobData.job_title.title}
                                    </Text>
                                  )}
                                  {(jobData?.company_name ||
                                    jobData?.company?.company_name) && (
                                    <Text style={JobCardStyle.companyName}>
                                      {jobData.company?.company_name ||
                                        jobData.company_name}
                                    </Text>
                                  )}
                                </View>
                              </View>
                              {/* <View>
              <IconButton
                icon={
                  savedJobsMap[jobData.id] ? 'bookmark' : 'bookmark-outline'
                }
                iconColor={colors.primary}
                size={24}
                style={JobCardStyle.saveicon}
                onPress={() => toggleSaveJob(jobData.id)}
              />
            </View> */}
                            </View>
                            <View style={JobCardStyle.workModeContainer}>
                              {jobData.work_modes?.map((mode, idx) => (
                                <View
                                  key={idx}
                                  style={JobCardStyle.workModeChip}>
                                  <Text style={JobCardStyle.chipText}>
                                    {mode}
                                  </Text>
                                </View>
                              ))}
                            </View>

                            <View style={JobCardStyle.location}>
                              {jobData?.job_location && (
                                <>
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
                                  <Text style={JobCardStyle.jobCardLocation}>
                                    {jobData.job_location.join(', ')}
                                  </Text>
                                </>
                              )}
                            </View>

                            <View style={JobCardStyle.line}></View>

                            <View style={JobCardStyle.jobFooter}>
                              {jobData?.salary?.yearly && (
                                <View style={JobCardStyle.experienceContainer}>
                                  <Ionicons
                                    name="cash"
                                    size={14}
                                    color="#004466"
                                  />
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <CustomFormatAmount
                                      amount={jobData.salary.yearly.min}
                                    />
                                    <Text style={{color: colors.primary}}>
                                      {' '}
                                      -{' '}
                                    </Text>
                                    <CustomFormatAmount
                                      amount={jobData.salary.yearly.max}
                                    />
                                    {jobData.salary.yearly.currency && (
                                      <Text
                                        style={{
                                          fontSize: 10,
                                          fontWeight: 'bold',
                                          color: 'gray',
                                        }}>
                                        {jobData.salary.yearly.currency}
                                      </Text>
                                    )}
                                  </View>
                                </View>
                              )}
                              {jobData?.created_at && (
                                <Text style={JobCardStyle.jobPostedDate}>
                                  {moment(jobData.created_at).fromNow()}
                                </Text>
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>
              </View>
            )}

            {/* our team */}
            {CompanyDetails?.company_leaders?.length > 0 && (
              <View
                style={{
                  marginTop: 12,
                  marginBottom: 12,
                  flex: 1,
                  width: '100%',
                  backgroundColor: '#fff',
                }}>
                <CustomCarousel companyDetails={CompanyDetails} />
              </View>
            )}

            {CompanyDetails?.company_cultures.length > 0 && (
              <View style={styles.Container}>
                <Text style={styles.textcontainerheading}>Culture</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {Array.isArray(CompanyDetails?.company_cultures) &&
                    CompanyDetails?.company_cultures?.map((benefit, index) => (
                      <View key={index} style={styles.cultureCard}>
                        <Image
                          source={
                            benefit?.icon
                              ? {uri: BASE_URL + benefit?.icon}
                              : require('../Assets/benifitsImages/Health.png') // Default image
                          }
                          style={styles.cultureicon}
                        />
                        <Text style={styles.cultureText}>{benefit?.name}</Text>
                      </View>
                    ))}
                </ScrollView>
              </View>
            )}

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
              {CompanyDetails?.company_whyjoinus?.map((item, index) => (
                <View key={index} style={styles.videoCard}>
                  {/* Display WebView when selected */}
                  {selectedVideoUrl === item.url ? (
                    <View style={styles.webViewContainer}>
                      <WebView
                        source={{uri: selectedVideoUrl}}
                        style={styles.webView}
                        startInLoadingState={true}
                        javaScriptEnabled={true}
                        allowsFullscreenVideo={true} // Allow fullscreen for video content
                        mediaPlaybackRequiresUserAction={false} // Autoplay videos (if allowed)
                        onNavigationStateChange={navState => {
                          // Handle any navigation changes or fullscreen behavior
                        }}
                      />
                      {/* Cross sign for closing */}
                      <TouchableOpacity
                        onPress={closeVideo}
                        style={styles.crossButton}>
                        <Text style={styles.crossButtonText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={() => (item.url ? openVideo(item.url) : null)}>
                      {item.url ? (
                        <View
                          style={[styles.thumbnail, styles.videoPlaceholder]}>
                          <Text style={styles.playButton}>▶</Text>
                        </View>
                      ) : item.image ? (
                        <Image
                          source={{uri: BASE_URL + '/' + item.image}}
                          style={styles.thumbnail}
                        />
                      ) : (
                        <View style={[styles.thumbnail, styles.placeholder]}>
                          <Text style={styles.noContentText}>
                            No Content Available
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  )}

                  {/* Title, Description, and Date */}
                  {selectedVideoUrl !== item?.url && (
                    <View style={styles.VideotextContainer}>
                      {item?.title && (
                        <Text style={styles.videoTitle}>{item?.title}</Text>
                      )}
                      {item.description && (
                        <Text style={styles.videoDescription}>
                          {item?.description}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.companyContainer}>
              {CompanyDetails?.company_gallery?.length > 0 && (
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
                    {CompanyDetails?.company_gallery?.map((item, index) => (
                      <View key={index} style={styles.slide}>
                        <Image
                          source={{uri: BASE_URL + '/' + item.image}}
                          style={styles.sliderimage}
                        />
                      </View>
                    ))}
                  </Swiper>
                </View>
              )}
            </View>
            {CompanyDetails?.company_leaders.length > 0 && (
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
            )}

            {CompanyDetails?.key_highlights?.length > 0 && (
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
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {CompanyDetails?.company_awards?.length > 0 && (
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
            )}
          </View>
        );

      case 'Jobs':
        return (
          <View>
            <View style={{flex: 1, paddingVertical: 12}}>
              {/* Department Chips */}
              {CompanyJobs?.departments?.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollContainer}
                  contentContainerStyle={styles.jobchipContainer}>
                  {CompanyJobs?.departments?.map((department, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.jobchip,
                        selectedDepartment === department &&
                          styles.jobselectedChip,
                      ]}
                      onPress={() => setSelectedDepartment(department)}>
                      <Text
                        style={[
                          styles.chipjobText,
                          selectedDepartment === department &&
                            styles.selectedjobChipText,
                        ]}>
                        {department}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}

              {/* Job Cards */}
              <View style={{paddingTop: 18, marginLeft: 12}}>
                {filteredJobs?.length > 0 ? (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {filteredJobs?.map(jobData => (
                      <TouchableOpacity
                        key={jobData.id}
                        // onPress={() => handleCardPress(jobData)}
                        style={{marginRight: 12}}>
                        <View
                          style={[
                            JobCardStyle.jobCard,
                            {backgroundColor: '#fff', minWidth: width * 0.7},
                          ]}>
                          <View style={JobCardStyle.companyInfo}>
                            <View style={JobCardStyle.companylogo}>
                              {jobData.company.logo ? (
                                <Image
                                  source={{
                                    uri: BASE_URL + jobData.company.logo,
                                  }}
                                  style={JobCardStyle.companyImage}
                                />
                              ) : (
                                <Ionicons
                                  name="business" // Icon for the fallback
                                  size={36}
                                  color="gray"
                                  style={JobCardStyle.companyImage}
                                />
                              )}

                              <View style={JobCardStyle.textName}>
                                {jobData?.job_title?.title && (
                                  <Text style={JobCardStyle.jobTitle}>
                                    {jobData.job_title.title}
                                  </Text>
                                )}
                                {(jobData?.company_name ||
                                  jobData?.company?.company_name) && (
                                  <Text style={JobCardStyle.companyName}>
                                    {jobData.company?.company_name ||
                                      jobData.company_name}
                                  </Text>
                                )}
                              </View>
                            </View>
                            {/* <View>
              <IconButton
                icon={
                  savedJobsMap[jobData.id] ? 'bookmark' : 'bookmark-outline'
                }
                iconColor={colors.primary}
                size={24}
                style={JobCardStyle.saveicon}
                onPress={() => toggleSaveJob(jobData.id)}
              />
            </View> */}
                          </View>
                          <View style={JobCardStyle.workModeContainer}>
                            {jobData.work_modes?.map((mode, idx) => (
                              <View key={idx} style={JobCardStyle.workModeChip}>
                                <Text style={JobCardStyle.chipText}>
                                  {mode}
                                </Text>
                              </View>
                            ))}
                          </View>

                          <View style={JobCardStyle.location}>
                            {jobData?.job_location && (
                              <>
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
                                <Text style={JobCardStyle.jobCardLocation}>
                                  {jobData.job_location.join(', ')}
                                </Text>
                              </>
                            )}
                          </View>

                          <View style={JobCardStyle.line}></View>

                          <View style={JobCardStyle.jobFooter}>
                            {jobData?.salary?.yearly && (
                              <View style={JobCardStyle.experienceContainer}>
                                <Ionicons
                                  name="cash"
                                  size={14}
                                  color="#004466"
                                />
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <CustomFormatAmount
                                    amount={jobData.salary.yearly.min}
                                  />
                                  <Text style={{color: colors.primary}}>
                                    {' '}
                                    -{' '}
                                  </Text>
                                  <CustomFormatAmount
                                    amount={jobData.salary.yearly.max}
                                  />
                                  {jobData.salary.yearly.currency && (
                                    <Text
                                      style={{
                                        fontSize: 10,
                                        fontWeight: 'bold',
                                        color: 'gray',
                                      }}>
                                      {jobData.salary.yearly.currency}
                                    </Text>
                                  )}
                                </View>
                              </View>
                            )}
                            {jobData?.created_at && (
                              <Text style={JobCardStyle.jobPostedDate}>
                                {moment(jobData.created_at).fromNow()}
                              </Text>
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                ) : (
                  <View style={styles.noJobsContainer}>
                    <Text style={styles.noJobsText}>No jobs found.....</Text>
                  </View>
                )}
              </View>
            </View>

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

      <View style={styles.companyInfo}>
        <View style={styles.logoContainer}>
          {CompanyDetails?.logo ? (
            <Image
              source={{uri: BASE_URL + CompanyDetails?.logo}}
              style={styles.logo}
            />
          ) : (
            <Ionicons name="business" size={42} color="gray" />
          )}
        </View>

        <View style={styles.infoContainer}>
          {CompanyDetails?.company_name && (
            <Text style={styles.companyName}>
              {CompanyDetails?.company_name}
            </Text>
          )}

          <View style={styles.locationContainer}>
            {CompanyDetails?.headquarters && (
              <View style={styles.location}>
                <Ionicons
                  name="location"
                  color={colors.primary}
                  size={16}
                  style={{padding: 0, marginLeft: -10, height: 20}}
                />
                <Text style={styles.jobLocation}>
                  {CompanyDetails?.headquarters}
                </Text>
              </View>
            )}

            {CompanyDetails?.company_size && (
              <View style={styles.location}>
                <Ionicons
                  name="person"
                  color={colors.primary}
                  size={18}
                  style={{padding: 0, marginLeft: -10, height: 20}}
                  e
                />
                <Text style={styles.jobLocation}>
                  {CompanyDetails?.company_size} employees
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.textInfo}>
        {/* Tagline Section */}
        {CompanyDetails?.company_tagline && (
          <Text style={styles.tagLine}>{CompanyDetails?.company_tagline}</Text>
        )}
        {/* Services Section */}
        {CompanyDetails?.company_services?.length > 0 && (
          <View style={styles.servicesContainer}>
            {Array.isArray(CompanyDetails?.company_services) &&
            CompanyDetails?.company_services?.length > 0 ? (
              <>
                {/* Display the first two services */}
                {CompanyDetails?.company_services
                  .slice(0, 2)
                  .map((service, index) => (
                    <TouchableOpacity key={index} style={styles.chip}>
                      <Text style={styles.chipText}>
                        {service?.service_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
              </>
            ) : (
              <Text style={styles.noServices}>No services available</Text>
            )}
          </View>
        )}
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
    flexDirection: 'row',
    marginTop: -30,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    marginBottom: 10,
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
    paddingHorizontal: width / 12,
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
  Container: {
    marginTop: 18,
    padding: 12,
    marginBottom: 18,
    backgroundColor: '#FFF',
  },
  textcontainerheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.blackText,
    marginHorizontal: 12,
  },
  benefitCard: {
    flexDirection: 'column', // Stack the icon below the name
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
    width: 120,
    height: 150, // Increase height to give space for both icon and text
    justifyContent: 'center',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // marginBottom:12,
    backgroundColor: '#fafafa',
    margin: 8,
    marginHorizontal: 8,
  },
  cultureCard: {
    flexDirection: 'column', // Stack the icon below the name
    alignItems: 'center',
    borderRadius: 10,
    padding: 12,
    width: 'auto',
    maxWidth: 150,
    minHeight: 150,
    height: 'auto', // Increase height to give space for both icon and text
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    margin: 8,
    marginHorizontal: 8,
  },
  icon: {
    width: 84,
    height: 84,
    marginBottom: 8,
  },
  cultureicon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  cultureText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
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

  screen: {
    flex: 1,
    backgroundColor: colors.whiteText,
    borderRadius: 8,
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
    paddingHorizontal: 12,
  },
  jobchip: {
    backgroundColor: colors.whiteText,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.lightgaryText,
    borderWidth: 0.5,
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
    //
  },
  videoCard: {
    flexDirection: 'row', // Arrange the children (image and text) in a row
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
    height: 172,
    alignItems: 'center',
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
    // top: '30%',
    // left: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    // borderRadius: 30,
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

  videoPlaceholder: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContentText: {
    color: '#333',
    fontSize: 14,
  },

  webViewContainer: {
    width: '100%',
    height: 150,
  },
  webView: {
    flex: 1,
  },
  crossButton: {
    position: 'absolute', // Position on top of the WebView
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background
    borderRadius: 15,
    zIndex: 1, // Ensure it's above the WebView
  },
  crossButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CompanyOverviewScreen;
