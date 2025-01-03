import React, {useEffect, useMemo, useState} from 'react';
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
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import JobViewController from '../../Redux/Action/jobViewController';
import {colors} from '../../Global_CSS/TheamColors';
import {Checkbox, IconButton} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../Services/baseAPI';
import JobCardStyle from '../../Global_CSS/JobCardStyle';
import Slider from '@react-native-community/slider';
import CustomFormatAmount from '../../Constant/CustomFormatAmount';
const {width} = Dimensions.get('window'); // Get the screen width
const JobScreen = ({route}) => {
  const {searchQuery} = route?.params || '';
  const [id, setId] = useState(null);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]); // State to store search results
  const [searchoptions, setSearchoptions] = useState('');

  const navigation = useNavigation();
  //states related to filter
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('work_modes');
  const [selectedExperience, setSelectedExperience] = useState();

  const [selectedFilters, setSelectedFilters] = useState({
    work_modes: [],
    department: [],
    locations: [],
    skills: [],
    salary: [],
    company_types: [],
    industry_types: [],
    education: [],
    freshness: [],
  });

  const dispatch = useDispatch();
  const {
    GetJobList,
    GetSearchJobs,
    GetFilterdJobs,
    GetAggregatedData,
    SaveJob,
    GetSavedJobs,
  } = JobViewController();

  const {JobList, SearchJobList, FilterJobList, AggregatedData, SavedJobs} =
    useSelector(state => state.job);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_data');
        setId(userId);
        if (userId) {
          dispatch(GetJobList(userId));
          dispatch(GetSavedJobs(userId));
        }
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
    dispatch(GetAggregatedData());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchQuery]);

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
    // Normalize the search query: trim spaces and convert to lowercase
    const normalizedQuery = searchQuery?.trim().toLowerCase();

    if (normalizedQuery) {
      const queryParams = {
        job_title: normalizedQuery, // Use the normalized query
      };
      // Simulate fetching jobs with the action and updating the jobs state
      dispatch(GetSearchJobs(queryParams)).then(results => {
        setJobs(results); // Assume results are returned by the action
      });
    } else {
      setJobs([]); // Clear jobs if search query is empty
    }
  };
  useEffect(() => {
    fetchJobs(searchQuery);
  }, [searchQuery]);
  // search jobs code end

  // Function to create a lookup map from SavedJobs
  const createSavedJobsMap = () => {
    const map = {};

    // Check if SavedJobs is an object and contains the `saved_jobs` key
    if (SavedJobs && Array.isArray(SavedJobs.saved_jobs)) {
      SavedJobs.saved_jobs.forEach(savedJob => {
        if (savedJob?.job?.id !== undefined) {
          map[savedJob.job.id] = savedJob.job.is_saved;
        }
      });
    } else {
      console.warn(
        'SavedJobs does not have a valid saved_jobs array:',
        SavedJobs,
      );
    }

    return map;
  };

  const savedJobsMap = createSavedJobsMap(); // Create the map dynamically

  const toggleSaveJob = jobId => {
    const requestData = {job: jobId, user_id: id};

    const currentState = savedJobsMap[jobId]; // Use savedJobsMap for lookup

    // Optimistically update global SavedJobs state
    dispatch({
      type: 'UPDATE_SAVED_JOBS',
      payload: {
        jobId,
        isSaved: !currentState, // Toggle the saved state
      },
    });

    // Call the SaveJob API
    dispatch(SaveJob(requestData));
    // .then(() => console.log(`Job ${jobId} saved successfully.`))
    // .catch(error => {
    //   console.error(`Failed to update job ${jobId}:`, error);
    // });
  };

  const loadMoreJobs = () => {
    if (JobList?.next && !isLoading) {
      setIsLoading(true);
      dispatch(GetJobList(null, JobList.next)).finally(() =>
        setIsLoading(false),
      );
    }
  };

  const jobsToRender = query.trim()
    ? SearchJobList?.results || [] // Use an empty array as fallback
    : selectedFilters &&
      Object.keys(selectedFilters).length > 0 &&
      FilterJobList?.results?.length > 0 // Check if FilterJobList has results
    ? FilterJobList.results
    : JobList?.results || []; // Fallback to JobList results if no filters are applied
  // Debugging logs

  // console.log('FilterJobList from Redux:', FilterJobList);
  // console.log('Jobs to Render:', jobsToRender);

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

  const toggleFilter = (category, option) => {
    if (category === 'experience') {
      // Special handling for experience
      setSelectedExperience(option);
    } else {
      setSelectedFilters(prevState => {
        const currentSelections = prevState[category] || [];
        const isSelected = currentSelections.includes(option);

        // Toggle the selection
        const updatedSelections = isSelected
          ? currentSelections.filter(item => item !== option) // Remove if selected
          : [...currentSelections, option]; // Add if not selected

        return {
          ...prevState,
          [category]: updatedSelections,
        };
      });
    }
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setSelectedExperience();
  };

  const handleFilter = () => {
    try {
      // Include experience filter in query parameters
      const filteredEntries = Object.entries(selectedFilters).filter(
        ([, values]) => Array.isArray(values) && values.length > 0,
      );

      const queryParams = {
        ...Object.fromEntries(
          filteredEntries.map(([key, values]) => [
            key,
            values.length === 1 ? values[0] : values.join(','),
          ]),
        ),
        ...(selectedExperience !== undefined
          ? {experience: selectedExperience}
          : {}),
      };
      // const queryString = new URLSearchParams(queryParams).toString();
      // console.log('selected experience', queryString);
      console.log('Query Params Sent to Backend:', queryParams);
      // Dispatch action with queryParams
      dispatch(GetFilterdJobs(queryParams)).then(filteredResults => {
        setJobs(filteredResults); // Update the jobs state with filtered results
        closeFiltermodal(); // Close the modal after applying filters
        // console.log('Filtered results:', filteredResults?.results);
      });
    } catch (error) {
      console.error('Error in handleFilter:', error);
    }
  };

  const renderFilterOptions = filterCategory => {
    const categoryData = AggregatedData.find(
      item => item.filter === filterCategory,
    );
    // Filter options based on the search query
    const filteredData = categoryData
      ? categoryData.data.filter(
          item =>
            item?.name?.toLowerCase().includes(searchoptions.toLowerCase()) ||
            item?.industry_name ||
            item?.company_name
              ?.toLowerCase()
              .includes(searchoptions.toLowerCase()),
        )
      : [];

    return (
      <View style={[styles.optionsContainer]}>
        {/* Experience Filter */}
        {filterCategory === 'experience' ? (
          <View style={{marginVertical: 16, alignItems: 'center'}}>
            <Text
              style={{
                color: colors.secondary,
                fontSize: 18,
                marginVertical: 12,
                fontWeight: 'bold',
              }}>
              {selectedExperience} years
            </Text>
            <Text style={{color: '#000', fontSize: 14, marginBottom: 8}}>
              Select Experience Range (Years)
            </Text>
            <Slider
              // style={[styles.slider,{height:20}]}
              style={{width: width * 0.6, height: 70}}
              minimumValue={0}
              maximumValue={30}
              vertical={true}
              step={1}
              value={selectedExperience}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.secondary}
              thumbTintColor={colors.secondary}
              onValueChange={value => setSelectedExperience(value)}
            />
          </View>
        ) : null}

        {/* Dynamic Filter Options */}
        {categoryData && filterCategory !== 'experience' && (
          <>
            {['location', 'skills', 'companies', 'education'].includes(
              filterCategory,
            ) && (
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholderTextColor={'#000'}
                  placeholder={`Search ${filterCategory}`}
                  value={searchoptions}
                  onChangeText={text => setSearchoptions(text)}
                />
              </View>
            )}

            {filteredData.map(item => (
              <View
                key={item.name || item.industry_name || item?.company_name}
                style={styles.filterItem}>
                <Checkbox
                  status={
                    selectedFilters[filterCategory]?.includes(
                      item.name || item.industry_name || item?.company_name,
                    )
                      ? 'checked'
                      : 'unchecked'
                  }
                  color={colors.secondary}
                  onPress={() =>
                    toggleFilter(
                      filterCategory,
                      item.name || item.industry_name || item?.company_name,
                    )
                  }
                />
                <Text
                  style={{
                    color: selectedFilters[filterCategory]?.includes(
                      item.name || item.industry_name || item?.company_name,
                    )
                      ? colors.secondary
                      : '#000',
                    fontSize: 12,
                  }}>
                  {`${item.name || item.industry_name || item?.company_name} (${
                    item.count
                  })`}
                </Text>
              </View>
            ))}
          </>
        )}
      </View>
    );
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
        style={JobCardStyle.companyContainer}
        contentContainerStyle={{paddingBottom: 16}}
        onScrollEndDrag={loadMoreJobs}
        scrollEventThrottle={16}>
        {jobsToRender && jobsToRender.length > 0 ? (
          jobsToRender?.map(jobData => (
            <TouchableOpacity
              key={jobData.id}
              onPress={() => handleJobDetails(jobData)}>
              <View style={JobCardStyle.jobCard}>
                <View style={JobCardStyle.companyInfo}>
                  <View style={JobCardStyle.companylogo}>
                    <Image
                      source={
                        jobData?.company?.logo
                          ? {uri: BASE_URL + jobData?.company?.logo}
                          : require('../../Assets/CompanyLogo/Swatsan.png')
                      }
                      style={JobCardStyle.companyImage}
                    />
                    <View style={JobCardStyle.textName}>
                      <Text style={JobCardStyle.jobTitle}>
                        {jobData?.job_title?.title}
                      </Text>
                      <Text style={JobCardStyle.companyName}>
                        {jobData?.company_name}
                      </Text>
                    </View>
                  </View>

                  <IconButton
                    icon={
                      savedJobsMap[jobData.id] ? 'bookmark' : 'bookmark-outline'
                    }
                    iconColor="#004466"
                    size={24}
                    style={{padding: 0}}
                    onPress={() => toggleSaveJob(jobData?.id)}
                  />
                </View>
                <View style={JobCardStyle.workModeContainer}>
                  {jobData.work_modes &&
                    jobData.work_modes.map((mode, idx) => (
                      <View key={idx} style={JobCardStyle.workModeChip}>
                        <Text style={JobCardStyle.chipText}>{mode}</Text>
                      </View>
                    ))}
                </View>
                <View style={JobCardStyle.location}>
                  <IconButton
                    icon="map-marker"
                    iconColor={colors.primary}
                    size={18}
                    style={{padding: 0, marginLeft: -10, height: 20}}
                  />
                  {jobData.job_location.map((location, locIndex) => (
                    <Text key={locIndex} style={JobCardStyle.jobCardLocation}>
                      {location.name}
                      {locIndex < jobData.job_location.length - 1 && ', '}
                    </Text>
                  ))}
                </View>
                <View style={JobCardStyle.line} />
                <View style={JobCardStyle.jobFooter}>
                  {jobData?.salary && jobData.salary.yearly && (
                    <View style={JobCardStyle.experienceContainer}>
                      <Ionicons name="cash" size={14} color="#004466" />
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CustomFormatAmount
                          amount={jobData.salary?.yearly?.min}
                        />
                        <Text style={{color: colors.primary}}> - </Text>
                        <CustomFormatAmount
                          amount={jobData.salary?.yearly?.max}
                        />

                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: 'bold',
                            color: 'gray',
                          }}>
                          {' '}
                          {jobData.salary.yearly.currency}
                        </Text>
                      </View>
                    </View>
                  )}
                  <Text style={JobCardStyle.jobPostedDate}>
                    {moment(jobData?.created_at).fromNow()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={[JobCardStyle.noJobsContainer]}>
            <Image
              style={JobCardStyle.jobimage}
              source={require('../../Assets/invitesImages/Jobsearch.png')}
            />
            <Text style={[JobCardStyle.noJobsText]}>No jobs found.....</Text>
          </View>
        )}
        {isLoading && (
          <View style={JobCardStyle.loadingContainer}>
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
              <View style={{width: width * 0.35}}>
                {/* Filters Section */}
                <ScrollView style={[styles.categoriesContainer]}>
                  {[...AggregatedData, {filter: 'experience'}].map(
                    filterCategory => (
                      <TouchableOpacity
                        key={filterCategory.filter}
                        style={[
                          styles.categoryButton,
                          selectedCategory === filterCategory.filter && [
                            styles.selectedCategoryButton,
                            {
                              backgroundColor: '#e6f7ff',
                            },
                          ],
                        ]}
                        onPress={() =>
                          setSelectedCategory(filterCategory.filter)
                        }>
                        <Text
                          style={[
                            styles.categoryButtonText,
                            selectedCategory === filterCategory.filter && {
                              fontWeight: 'bold',
                            },
                          ]}>
                          {/* {filterCategory.filter.replace('_', ' ').toUpperCase()} */}
                          {
                            filterCategory.filter
                              .replace('_', ' ') // Replace underscores with spaces
                              .toLowerCase() // Convert the entire string to lowercase
                              .replace(/^\w/, c => c.toUpperCase()) // Capitalize the first letter
                          }
                        </Text>
                        <Text style={{color: 'grey', fontSize: 10}}>
                          {filterCategory.filter !== 'experience' &&
                            selectedFilters[filterCategory.filter]?.length >
                              0 &&
                            ` (${
                              selectedFilters[filterCategory.filter].length
                            })`}

                          {/* Show selected experience value */}
                          {filterCategory.filter === 'experience' &&
                            selectedExperience !== undefined &&
                            ` (${selectedExperience} Y)`}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </ScrollView>

                {/* Right-side options for the selected category */}
              </View>
              <View style={styles.optionsContainer}>
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
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => handleFilter()}>
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  optionsContainer: {
    flex: 1,
    marginTop: 12,
  },
  searchContainer: {alignSelf: 'center'},
  searchInput: {
    color: '#000',
    width: width * 0.6,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 18,
    paddingHorizontal: 8,
    backgroundColor: '#fafafa',
    borderColor: 'lightgray',
    borderWidth: 0.2,
    minHeight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButtonText: {color: colors.primary, fontSize: 13},
});
export default JobScreen;
