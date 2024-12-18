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

const filterData = [
  {
    filter: 'work_modes',
    data: [
      {
        name: 'Remote',
        count: 6,
      },
      {
        name: 'Onsite',
        count: 7,
      },
      {
        name: 'Hybrid',
        count: 2,
      },
    ],
  },
  {
    filter: 'departments',
    data: [
      {
        name: 'Sales and Marketing',
        count: 6,
      },
      {
        name: 'Operations',
        count: 0,
      },
      {
        name: 'Information Technology',
        count: 2,
      },
      {
        name: 'Engineering',
        count: 2,
      },
      {
        name: 'Finance',
        count: 0,
      },
      {
        name: 'Customer Service',
        count: 5,
      },
      {
        name: 'Human Resources',
        count: 0,
      },
      {
        name: 'Administration',
        count: 1,
      },
    ],
  },
  {
    filter: 'locations',
    data: [
      {
        name: 'Delhi, India',
        count: 1,
      },
      {
        name: 'Mumbai, India',
        count: 2,
      },
      {
        name: 'Pune, India',
        count: 7,
      },
      {
        name: 'Chennai, India',
        count: 1,
      },
      {
        name: 'Nagpur, India',
        count: 5,
      },
      {
        name: 'Bengaluru, India',
        count: 7,
      },
      {
        name: 'Hyderabad, India',
        count: 1,
      },
    ],
  },
  {
    filter: 'salary',
    data: [
      {
        name: '0-3 Lakhs',
        count: 8,
      },
      {
        name: '3-6 Lakhs',
        count: 0,
      },
      {
        name: '6-10 Lakhs',
        count: 0,
      },
      {
        name: '10-15 Lakhs',
        count: 0,
      },
      {
        name: '15-25 Lakhs',
        count: 0,
      },
      {
        name: '25-50 Lakhs',
        count: 0,
      },
      {
        name: '50-75 Lakhs',
        count: 0,
      },
      {
        name: '75-100 Lakhs',
        count: 0,
      },
      {
        name: '1-5 Cr',
        count: 0,
      },
      {
        name: '5+ Cr',
        count: 0,
      },
    ],
  },
  {
    filter: 'company_types',
    data: [
      {
        name: 'Freelance',
        count: 0,
      },
      {
        name: 'Government',
        count: 0,
      },
      {
        name: 'Foregin MNC',
        count: 0,
      },
      {
        name: 'Others',
        count: 6,
      },
      {
        name: 'MNC',
        count: 1,
      },
      {
        name: 'Startup',
        count: 1,
      },
    ],
  },
  {
    filter: 'industry_types',
    data: [
      {
        name: 'Finance',
        count: 0,
      },
      {
        name: 'Retail',
        count: 6,
      },
      {
        name: 'Education',
        count: 0,
      },
      {
        name: 'Healthcare',
        count: 0,
      },
      {
        name: 'Technology',
        count: 2,
      },
    ],
  },
  {
    filter: 'education',
    data: [
      {
        name: 'M.Tech',
        count: 8,
      },
      {
        name: 'B.Tech',
        count: 8,
      },
    ],
  },
  {
    filter: 'freshness',
    data: [
      {
        name: 'Last 1 day',
        count: 0,
      },
      {
        name: 'Last 3 days',
        count: 0,
      },
      {
        name: 'Last 7 days',
        count: 0,
      },
      {
        name: 'Last 15 days',
        count: 0,
      },
      {
        name: 'Last 30 days',
        count: 5,
      },
    ],
  },
];

const JobScreen = () => {
  const [id, setId] = useState(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]); // State to store search results
  const navigation = useNavigation();

  //states related to filter
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [selectedFilters, setSelectedFilters] = useState({}); // Track selected filter values

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

  const dispatch = useDispatch();
  const {GetJobList, GetSearchJobs, GetFilterdJobs} = JobViewController();
  const {JobList, SearchJobList, FilterJobList} = useSelector(
    state => state.job,
  );
  console.log('SearchJobList', SearchJobList);
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

  // search jobs code start

  // const handleSearch = () => {
  //   if (query.trim()) {
  //     const queryParams = {
  //       job_title: query.trim(), // Directly assign the query as job title
  //     };

  //     console.log('Parsed Query Parameters:', queryParams); // Debugging
  //     dispatch(GetSearchJobs(queryParams)); // Dispatch action with query params
  //   } else {
  //     alert('Please enter a search term.');
  //   }
  // };

  const fetchJobs = searchQuery => {
    if (searchQuery.trim()) {
      const queryParams = {
        job_title: searchQuery.trim(), // Dynamically pass the search query
      };

      // console.log('Fetching jobs with Query Parameters:', queryParams); // Debugging

      // Simulate fetching jobs with the action and updating the jobs state
      dispatch(GetSearchJobs(queryParams)).then(results => {
        setJobs(results); // Assume results are returned by the action
      });
    } else {
      setJobs([]); // Clear jobs if search query is empty
    }
  };
  // search jobs code end

  const handleBookmark = jobId => {
    Alert.alert('Bookmark Clicked', `You bookmarked job ID: ${jobId}`);
  };

  const loadMoreJobs = () => {
    if (JobList?.next && !isLoading) {
      setIsLoading(true);
      dispatch(GetJobList(null, JobList.next)).finally(() =>
        setIsLoading(false),
      );
    }
  };
  // console.log('SearchJobList', JSON.stringify(SearchJobList, null, 2));

  const jobsToRender = query.trim() ? SearchJobList : JobList?.results;

  const handleJobDetails = jobData => {
    navigation.navigate('JobDetailScreen', {
      job_id: jobData.id,
    });
  };

  // Filter Jobs code Starts
  const openFiltermodal = () => {
    setFilterModalVisible(true);
  };
  const closeFiltermodal = () => {
    setFilterModalVisible(false);
  };

  const toggleFilter = (filterCategory, filterValue) => {
    setSelectedFilters(prev => {
      const currentSelection = prev[filterCategory] || [];
      if (currentSelection.includes(filterValue)) {
        return {
          ...prev,
          [filterCategory]: currentSelection.filter(
            item => item !== filterValue,
          ),
        };
      } else {
        return {
          ...prev,
          [filterCategory]: [...currentSelection, filterValue],
        };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedIndustry([]);
    setSelectedCompanyType([]);
    setSelectedLocation([]);
    setSelectedWorkMode([]);
  };

  // Filter the job list
  const filteredJobs = JobList.results.filter(job => {
    return Object.entries(selectedFilters).every(([category, values]) => {
      if (values.length === 0) return true;
      if (category === 'work_modes')
        return values.some(v => job[category].includes(v));
      if (category === 'locations')
        return job.job_location.some(loc => values.includes(loc));
      if (category === 'departments') return values.includes(job.department);
      if (category === 'salary') return values.includes(job.salary);
      return true;
    });
  });

  // Render filter options dynamically
  const renderFilterOptions = filterCategory => {
    const categoryData = filterData.find(
      item => item.filter === filterCategory,
    );

    return categoryData ? (
      <View style={[styles.optionsContainer, {marginLeft: -24, marginTop: 12}]}>
        {categoryData.data.map(item => (
          <View key={item.name} style={styles.filterItem}>
            <Checkbox
              status={
                selectedFilters[filterCategory]?.includes(item.name)
                  ? 'checked'
                  : 'unchecked'
              }
              color={colors.secondary}
              onPress={() => toggleFilter(filterCategory, item.name)}
            />
            <Text
              style={{
                color: selectedFilters[filterCategory]?.includes(item.name)
                  ? colors.secondary
                  : '#000',
                fontSize: 12,
              }}>
              {`${item.name} (${item.count})`}
            </Text>
          </View>
        ))}
      </View>
    ) : null;
  };

  return (
    <View style={styles.bodycontainer}>
      <View style={styles.container}>
        <View style={styles.searchbarContainer}>
          <TextInput
            placeholder="Search"
            // onChangeText={setQuery}
            onChangeText={text => {
              setQuery(text); // Update query state
              fetchJobs(text); // Trigger dynamic search
            }}
            value={query}
            style={styles.searchbar}
            placeholderTextColor="#000"
          />
          <IconButton
            style={styles.searchIcon}
            icon="magnify"
            iconColor="#004466"
            size={26}
            // onPress={handleSearch}
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
        onScrollEndDrag={loadMoreJobs}
        scrollEventThrottle={16}>
        {jobsToRender && jobsToRender.length > 0 ? (
          jobsToRender.map(jobData => (
            <TouchableOpacity
              key={jobData.id}
              onPress={() => handleJobDetails(jobData)}>
              <View style={styles.jobCard}>
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
                  <IconButton
                    icon="bookmark-outline"
                    iconColor={colors.primary}
                    size={24}
                    style={styles.saveicon}
                    onPress={() => handleBookmark(jobData.id)}
                  />
                </View>
                <View style={styles.workModeContainer}>
                  {jobData.work_modes &&
                    jobData.work_modes.map((mode, idx) => (
                      <View key={idx} style={styles.workModeChip}>
                        <Text style={styles.chipText}>{mode}</Text>
                      </View>
                    ))}
                </View>
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
                <View style={styles.line} />
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
          ))
        ) : (
          <View style={[styles.noJobsContainer]}>
            <Image
              style={styles.jobimage}
              source={require('../../Assets/invitesImages/Jobsearch.png')}
            />
            <Text style={[styles.noJobsText]}>No jobs found.....</Text>
          </View>
        )}
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

            <View style={{flexDirection: 'row', flex: 1}}>
              {/* Filters Section */}
              <ScrollView style={[styles.categoriesContainer, {flex: 1}]}>
                {filterData.map(filterCategory => (
                  <TouchableOpacity
                    key={filterCategory.filter}
                    style={[
                      styles.categoryButton,
                      {
                        padding: 12,
                        backgroundColor: '#fafafa',
                        borderColor: 'lightgray',
                        borderWidth: 0.2,
                        maxWidth: 160,
                        minWidth: 160,
                        minHeight: 50,
                      },
                      selectedCategory === filterCategory.filter && [
                        styles.selectedCategoryButton,
                        {
                          backgroundColor: '#e6f7ff',
                          // borderColor: colors.secondary,
                          // borderLeftWidth: 7,
                          // borderWidth: 1,
                        },
                      ],
                    ]}
                    onPress={() =>
                      setSelectedCategory(
                        filterCategory.filter === selectedCategory
                          ? null
                          : filterCategory.filter,
                      )
                    }>
                    <Text
                      style={[
                        styles.categoryButtonText,
                        {color: colors.primary},
                        selectedCategory === filterCategory.filter && {
                          fontWeight: 'bold', // Ensure selected text uses a different color
                        },
                      ]}>
                      {filterCategory.filter.replace('_', ' ').toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Right-side options for the selected category */}
              <View style={[styles.optionsContainer, {flex: 1}]}>
                {selectedCategory && renderFilterOptions(selectedCategory)}
              </View>
            </View>

            {/* Footer Buttons */}
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearAllFilters}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton}>
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
  noJobsContainer: {alignItems: 'center'},
  jobimage: {
    width: 200,
    height: 200,
    marginTop: 24,
    // alignSelf: 'center',
    // alignContent: 'center',
  },
  noJobsText: {
    alignSelf: 'center',
    color: colors.primary,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#f1f1f1',
  },
  //Modal Styles
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

  footer: {
    padding: 12,
    // backgroundColor: colors.background,
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'flex-end',
    gap: 12,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
  },
  clearButton: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#000',
  },
  applyButtonText: {
    color: '#fff',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
});
export default JobScreen;
