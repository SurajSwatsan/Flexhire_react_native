import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import JobViewController from '../../Redux/Action/jobViewController';
import {colors} from '../../Global_CSS/TheamColors';
import {Checkbox, IconButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import MasterViewController from '../../Redux/Action/MasterViewController';

const JobScreen = () => {
  const [id, setId] = useState(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterData, setFilterData] = useState({});

  // Separate states for each section
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedWorkMode, setSelectedWorkMode] = useState([]);
  const [selectedCompanyType, setSelectedCompanyType] = useState([]);
  const [activeSection, setActiveSection] = useState('Industry');
  const [selectedExperience, setSelectedExperience] = useState([0, 10]); // Min to Max years
  const [selectedEmploymentType, setSelectedEmploymentType] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 1000000]); // Min to Max salary in INR
  const navigation = useNavigation();

  const [industryMaster, setIndustryMaster] = useState([]);
  

  const dispatch = useDispatch();
  const {GetJobList} = JobViewController();
  const {JobList} = useSelector(state => state.job);
  const {GetCity, GetIndustry, GetDepartment, GetRoles, GetCourses} =
    MasterViewController();
  const {departments, cities, industries, roles, courses} = useSelector(
    state => state.master,
  );

  const handleSearch = () => {
    navigation.navigate('searchjob', {query});
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_data');
        setId(userId);
        if (userId) {
          dispatch(GetJobList(userId));
        }
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const get_city = () => {
      dispatch(GetCity());
    };
    const get_course = () => {
      dispatch(GetCourses());
    };
    const get_department = () => {
      dispatch(GetDepartment());
    };
    const get_industry = () => {
      dispatch(GetIndustry());
    };
    const get_roles = () => {
      dispatch(GetRoles());
    };
    get_city();
    get_course();
    get_department();
    get_roles();
    get_industry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const city_data = cities?.map(ci => ({
      id: ci.id,
      value: ci.name,
    }));

    const department_data = departments?.map(de => ({
      id: de.id,
      value: de.name,
    }));

    const industries_data = industries?.map(ind => ({
      id: ind.id,
      value: ind.industry_name,
    }));
    const course_data = courses?.map(cor => ({
      id: cor.id,
      value: cor.name,
    }));
    const role_data = roles?.map(ro => ({
      id: ro.id,
      value: ro.title,
    }));
    console.log('industries_data', industries_data);
setIndustryMaster(industries_data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cities, courses, departments, roles, industries]);

  useEffect(() => {
    const data = {
      Industry: industryMaster
        .slice(0, 4) // Example logic for splitting
        .map(item => item.value),
      CompanyType: ['All Types', 'StartUp', 'Enterprise', 'Non-Profit'],
      Location: ['Mumbai', 'Pune', 'Delhi', 'Bangalore'],
      WorkMode: ['Remote', 'On-Site', 'Hybrid'],
    };
    setFilterData(data);
  }, [industryMaster]);

  const handleBookmark = jobId => {
    Alert.alert('Bookmark Clicked', `You bookmarked job ID: ${jobId}`);
  };

  const loadMoreJobs = () => {
    if (JobList?.next && !isLoading) {
      setIsLoading(true);
      dispatch(GetJobList(null, JobList.next)).finally(() => {
        setIsLoading(false);
      });
    }
  };

  if (!JobList || !JobList.results) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  const handleJobDetails = jobData => {
    navigation.navigate('JobDetailScreen', {
      job_id: jobData.id,
    });
  };
  const openFiltermodal = () => {
    setFilterModalVisible(true);
  };
  const closeFiltermodal = () => {
    setFilterModalVisible(false);
  };

  const toggleFilterSelection = (section, option) => {
    switch (section) {
      case 'Industry':
        setSelectedIndustry(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option],
        );
        break;
      case 'CompanyType':
        setSelectedCompanyType(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option],
        );
        break;
      case 'Location':
        setSelectedLocation(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option],
        );
        break;
      case 'WorkMode':
        setSelectedWorkMode(prev =>
          prev.includes(option)
            ? prev.filter(item => item !== option)
            : [...prev, option],
        );
        break;
      default:
        break;
    }
  };
  const clearAllFilters = () => {
    setSelectedIndustry([]);
    setSelectedCompanyType([]);
    setSelectedLocation([]);
    setSelectedWorkMode([]);
  };

  // Render filter options dynamically based on the active section
  const renderFilterOptions = () => {
    const options = filterData[activeSection] || [];
    return options.map((option, index) => {
      let isChecked;
      switch (activeSection) {
        case 'Industry':
          isChecked = selectedIndustry.includes(option);
          break;
        case 'CompanyType':
          isChecked = selectedCompanyType.includes(option);
          break;
        case 'Location':
          isChecked = selectedLocation.includes(option);
          break;
        case 'WorkMode':
          isChecked = selectedWorkMode.includes(option);
          break;
        default:
          isChecked = false;
      }

      return (
        <View key={index} style={styles.checkboxContainer}>
          <Checkbox.Item
            // label={option}
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => toggleFilterSelection(activeSection, option)}
            color={colors.secondary}
          />
          <Text style={styles.checkboxLabel}>{option}</Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.bodycontainer}>
      <View style={styles.container}>
        <View style={styles.searchbarContainer}>
          <TextInput
            placeholder="Search"
            onChangeText={setQuery}
            value={query}
            style={styles.searchbar}
            placeholderTextColor="#000"
          />
          <IconButton
            style={styles.searchIcon}
            icon="magnify"
            iconColor="#004466"
            size={26}
            onPress={handleSearch}
          />
        </View>
        <TouchableOpacity
          style={styles.filterIconContainer}
          onPress={openFiltermodal}>
          <Ionicons name="filter-outline" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.companyContainer}
        contentContainerStyle={{paddingBottom: 16}}
        onScrollEndDrag={loadMoreJobs} // Trigger loadMoreJobs on scroll end
        scrollEventThrottle={16}>
        {JobList.results.map(jobData => (
          <TouchableOpacity
            key={jobData.id}
            onPress={() => handleJobDetails(jobData)}>
            <View style={styles.jobCard}>
              {/* Job Card Header (Title and Company Name) */}
              <View style={styles.companyInfo}>
                <View style={styles.companylogo}>
                  <Image
                    source={
                      jobData.company.logo
                        ? {uri: jobData?.company?.logo}
                        : require('../../Assets/CompanyLogo/Swatsan.png')
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
                <View>
                  <IconButton
                    icon="bookmark-outline"
                    iconColor={colors.primary}
                    size={24}
                    style={styles.saveicon}
                    onPress={() => handleBookmark(jobData.id)}
                  />
                </View>
              </View>

              {/* Work Modes */}
              <View style={styles.workModeContainer}>
                {jobData.work_modes &&
                  jobData.work_modes.map((mode, idx) => (
                    <View key={idx} style={styles.workModeChip}>
                      <Text style={styles.chipText}>{mode}</Text>
                    </View>
                  ))}
              </View>

              {/* Job Locations */}
              <View style={styles.location}>
                <IconButton
                  icon="map-marker"
                  iconColor={colors.primary}
                  size={18}
                  style={{padding: 0, marginLeft: -10, height: 20}}
                />
                {jobData.job_location.map((location, locIndex) => (
                  <Text key={locIndex} style={styles.jobCardLocation}>
                    {location.name}
                    {locIndex < jobData.job_location.length - 1 && ', '}
                  </Text>
                ))}
              </View>

              {/* Divider */}
              <View style={styles.line} />

              {/* Footer (Salary and Post Date) */}
              <View style={styles.jobFooter}>
                {jobData?.salary && jobData.salary.yearly && (
                  <View style={styles.experienceContainer}>
                    <Ionicons name="cash" size={14} color="#004466" />
                    <Text style={styles.jobDetailsalary}>
                      ₹{jobData.salary.yearly.min.toLocaleString()} - ₹
                      {jobData.salary.yearly.max.toLocaleString()} INR
                    </Text>
                  </View>
                )}
                <Text style={styles.jobPostedDate}>
                  {moment(jobData.reviews[0]?.review_date).fromNow()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0000ff" />
            <Text>Loading more jobs...</Text>
          </View>
        )}
      </ScrollView>
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.headerTitle}>Filters</Text>
              <TouchableOpacity onPress={closeFiltermodal}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Filter Sections */}
            <View style={styles.filterSections}>
              {/* Left Section: Titles */}
              <View style={styles.sectionTitles}>
                {Object.keys(filterData).map((section, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.sectionTitleButton,
                      activeSection === section && styles.activeSectionTitle,
                    ]}
                    onPress={() => setActiveSection(section)}>
                    <Text style={styles.sectionTitleText}>{section}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Right Section: Options */}
              <ScrollView style={styles.filterOptions}>
                {renderFilterOptions()}
              </ScrollView>
            </View>

            {/* Apply Filters Button */}
            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearAllFilters}>
                <Text style={styles.clearButtonText}>Clear All Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  console.log('Selected Industry:', selectedIndustry);
                  console.log('Selected CompanyType:', selectedCompanyType);
                  console.log('Selected Location:', selectedLocation);
                  console.log('Selected WorkMode:', selectedWorkMode);
                  closeFiltermodal();
                }}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  bodycontainer: {
    backgroundColor: colors.background,
    flex: 1,
    width: '100%',
  },
  container: {
    flexDirection: 'row',

    backgroundColor: colors.primary,
    height: 70,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchbarContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.cardBgcolor,
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
  },
  searchbar: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginRight: 10,
    backgroundColor: '#fff',
  },
  filterIconContainer: {
    backgroundColor: '#fff',
    padding: 8,
    height: 48,
    borderRadius: 8,
  },
  companyContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    paddingBottom: 16,
  },
  jobCard: {
    backgroundColor: colors.whiteText,
    borderRadius: 8,
    marginRight: 12,
    padding: 12,
    width: '100%',
    marginBottom: 20,
  },
  companylogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 8,
    justifyContent: 'space-between',
  },
  textName: {
    flexDirection: 'column,',
  },
  companyName: {
    fontSize: 12,
    color: 'gray',
  },
  companyImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  workModeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  workModeChip: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveicon: {
    alignSelf: 'center',
    right: -14,
    top: -6,
  },

  salaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },

  jobLocation: {
    fontSize: 12,
    color: '#808080',
    // marginLeft: -12,
  },
  experienceContainer: {
    flexDirection: 'row',
    marginRight: 8,
    gap: 6,
  },
  jobFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobDetailsalary: {
    fontSize: 10,
    color: 'gray',
    fontWeight: 'bold',
  },
  jobCardLocation: {
    fontSize: 11,
    color: '#555',
    marginLeft: -4,
  },
  jobPostedDate: {
    fontSize: 12,
    color: '#808080',
    // textAlign: 'right',
  },
  line: {
    height: 1,
    backgroundColor: '#f1f1f1',
  },
  modalContainer: {
    height: '100%',
    backgroundColor: '#fff',
  },
  modalHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterSections: {
    // backgroundColor: colors.background,
    // paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionTitles: {
    backgroundColor: colors.background,
  },
  activeSectionTitle: {
    borderLeftWidth: 4,
    borderColor: colors.secondary,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  sectionTitleText: {
    padding: 12,
    fontSize: 14,
    color: '#000',
  },
  sectionTitleButton: {
    borderWidth: 0.2,
    borderColor: 'lightgray',
    padding: 12,
    fontSize: 14,
    color: colors.primary,
  },

  filterOptions: {
    color: colors.primary,
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxLabel: {
    color: '#333',
    fontSize: 14,
  },

  noOptionsText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  showResultsButton: {
    backgroundColor: '#004466',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showResultsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categorySection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterSection: {
    marginVertical: 8,
  },
  filterItem: {
    fontSize: 14,
    marginVertical: 4,
    color: '#333',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
export default JobScreen;
