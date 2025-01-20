import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  FlatList,
  ActivityIndicator,
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
  const [filterQuery, setFilterQuery] = useState('');
  const [searchQueryData, setSearchQueryData] = useState('');

  const [data, setData] = useState([]); // State to store search results
  const [searchoptions, setSearchoptions] = useState('');
  const onFocus = useNavigation();
  const navigation = useNavigation();

  //states related to filter
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('work_modes');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [minSalary, setMinSalary] = useState();
  const [maxSalary, setMaxSalary] = useState();
  const [jobListToRender, setJobListToRender] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    work_modes: [],
    department: [],
    location: [],
    skills: [],
    salary: [],
    company_type: [],
    industry_type: [],
    education: [],
    posted_on: [],
  });

  const dispatch = useDispatch();
  const {
    GetJobList,
    GetSearchJobs,
    GetFilterdJobs,
    GetFiltermasterData,
    SaveJob,
  } = JobViewController();

  const {
    JobList,
    FilterJobList,
    FilterMasterData,
    SearchJobList,
    JobListPagination,
    isLoading,
  } = useSelector(state => state.job);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_data');
        setId(userId);

        if (userId) {
          if (JobList.length === 0) {
            dispatch(GetJobList(userId, 1));
          }
        }
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      } finally {
      }
    };

    getUserData();
    if (FilterMasterData?.length === 0) {
      dispatch(GetFiltermasterData());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFocus]);

  useEffect(() => {
    if (FilterJobList.length > 0) {
      setJobListToRender(FilterJobList);
    } else if (SearchJobList.length > 0) {
      setJobListToRender(SearchJobList);
    } else {
      setJobListToRender(JobList);
    }
  }, [JobList, FilterJobList, SearchJobList]);

  function formatAmount(value) {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(1) + ' Cr';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1) + ' Lac';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + ' K';
    } else {
      return value;
    }
  }
  useEffect(() => {
    if (searchQuery) {
      SearchJobs(searchQuery);
      setQuery(searchQuery);
    }
  }, [searchQuery]);

  const SearchJobs = searchText => {
    setFilterQuery('');
    // Normalize the search query: trim spaces and convert to lowercase
    const normalizedQuery = searchText?.trim().toLowerCase();

    if (normalizedQuery) {
      const queryParams = {
        job_title: normalizedQuery, // Use the normalized query
        page: 1,
      };
      setSearchQueryData(queryParams);
      dispatch(GetSearchJobs({user_id: id, ...queryParams}));
    }
  };

  // search jobs code end

  // Function to create a lookup map from SavedJobs

  const toggleSaveJob = jobId => {
    const requestData = {job: jobId, user_id: id};
    dispatch(SaveJob(requestData)); // Pass only the job ID
  };

  // Dependencies

  // Filter Jobs code Starts
  const openFiltermodal = () => {
    setQuery('');
    setSearchQueryData('');
    setFilterModalVisible(true);
  };

  const buildFilterParams = filters => {
    const params = new URLSearchParams();

    // Generic handler for direct filter categories
    const addDirectParams = (key, value) => {
      params.append(key, value?.join(',') || '');
    };

    // Add 'work_modes', 'department', 'location', and 'skills'
    addDirectParams('work_modes', filters.work_modes);

    addDirectParams('department', filters.department);
    addDirectParams('location', filters.location);
    addDirectParams('skills', filters.skills);

    // Handle 'education' filter with custom mapping
    const educationValues = filters.education
      ?.map(name => {
        const match = FilterMasterData?.find(
          filter => filter.filter === 'education',
        )?.data.find(item => item.course_name === name);
        return match?.course_name;
      })
      .filter(Boolean)
      .join(',');
    params.append('education', educationValues || '');

    // Handle 'posted_on' filter with custom mapping
    const postedOnValues = filters.posted_on
      ?.map(name => {
        const match = FilterMasterData?.find(
          filter => filter.filter === 'posted_on',
        )?.data.find(item => item.name === name);
        return match?.value;
      })
      .filter(Boolean)
      .join(',');
    params.append('posted_on', postedOnValues || '');

    // Handle 'industry_type' filter with custom mapping
    const industryTypeValues = filters.industry_type
      ?.map(name => {
        const match = FilterMasterData?.find(
          filter => filter.filter === 'industry_type',
        )?.data.find(item => item.industry_name === name);
        return match?.id;
      })
      .filter(Boolean)
      .join(',');
    params.append('industry_type', industryTypeValues || '');

    // Handle 'company_type' filter with custom mapping
    const companyTypeValues = filters.company_type
      ?.map(name => {
        const match = FilterMasterData?.find(
          filter => filter.filter === 'company_type',
        )?.data.find(item => item.name === name);
        return match?.id;
      })
      .filter(Boolean)
      .join(',');
    params.append('company_type', companyTypeValues || '');

    // Handle 'companies' filter with custom mapping
    const companyValues = filters.companies
      ?.map(name => {
        const match = FilterMasterData?.find(
          filter => filter.filter === 'companies',
        )?.data.find(item => item.company_name === name);
        return match?.id;
      })
      .filter(Boolean)
      .join(',');
    params.append('companies', companyValues || '');

    // Handle 'salary' filter for min and max
    params.append('salary_min', minSalary || '');
    params.append('salary_max', maxSalary || '');

    // Add 'experience_level_max'
    params.append('experience_level_max', selectedExperience || '');

    // Optional: Add default parameters (e.g., pagination)
    params.append('user_id', id);

    // Return the generated query string
    return params.toString();
  };

  const closeFiltermodal = () => {
    setFilterModalVisible(false);
  };

  const clearAllFilters = () => {
    // setSelectedFilters({});
    setSelectedExperience();
    setMinSalary();
    setMaxSalary();
    setFilters({});
    dispatch({type: 'CLEAR_JOB_LIST', payload: ''});
    setJobListToRender(JobList);
  };

  const handleApplyFilters = () => {
    const filterParams = buildFilterParams({
      ...filters,
      user_id: id, // Add user_id to the query params
    });

    // console.log('Query Params:', filterParams);

    // Dispatch the API call with filterParams as an object
    dispatch(GetFilterdJobs(filterParams));

    // Set the filter query (for UI state or debugging)
    setFilterQuery(filterParams);

    // Close the modal after applying filters
    closeFiltermodal();
  };

  const renderFilterOptions = filterCategory => {
    // const filters = {}; // Local filters object for storing selected options
    const categoryData = FilterMasterData?.find(
      item => item.filter === filterCategory,
    );

    const filterSearchResults = () => {
      if (!categoryData) return [];
      return categoryData.data.filter(item => {
        const searchText = searchoptions.toLowerCase();
        const itemName = item?.name?.toLowerCase() || '';
        const industryName = item?.industry_name?.toLowerCase() || '';
        const courseName = item?.course_name?.toLowerCase() || '';
        const companyName = item?.company_name?.toLowerCase() || '';
        return (
          itemName.includes(searchText) ||
          industryName.includes(searchText) ||
          courseName.includes(searchText) ||
          companyName.includes(searchText)
        );
      });
    };

    const toggleFilter = (category, option) => {
      setFilters(prevFilters => {
        // Initialize the category array if it doesn't exist
        const currentSelections = prevFilters[category] || [];

        // Toggle the option in the category array
        const updatedSelections = currentSelections.includes(option)
          ? currentSelections.filter(item => item !== option) // Remove if already selected
          : [...currentSelections, option]; // Add if not selected

        return {
          ...prevFilters,
          [category]: updatedSelections,
        };
      });
    };

    const filteredData = filterSearchResults();

    return (
      <View style={styles.optionsContainer}>
        {/* Experience Filter */}
        {filterCategory === 'experience' && (
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
              style={{width: '80%', height: 70}}
              minimumValue={0}
              maximumValue={30}
              step={1}
              value={selectedExperience}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.secondary}
              thumbTintColor={colors.secondary}
              onValueChange={value => setSelectedExperience(value)}
            />
          </View>
        )}

        {/* Salary Filter */}
        {filterCategory === 'salary' && (
          <View style={{marginVertical: 16, alignItems: 'center'}}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                marginBottom: 8,
                fontWeight: '600',
              }}>
              Enter Salary Range
            </Text>
            <Text
              style={{color: colors.secondary, fontSize: 14, marginBottom: 8}}>
              {formatAmount(minSalary)} - {formatAmount(maxSalary)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 8,
                  padding: 10,
                  width: '45%',
                  textAlign: 'center',
                  color: colors.primary,
                }}
                placeholder="Min Salary..."
                placeholderTextColor={colors.primary}
                keyboardType="numeric"
                value={minSalary}
                onChangeText={setMinSalary}
              />
              <Text style={{color: 'gray'}}>-</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 8,
                  padding: 10,
                  width: '45%',
                  textAlign: 'center',
                  color: colors.primary,
                }}
                placeholder="Max Salary..."
                placeholderTextColor={colors.primary}
                keyboardType="numeric"
                value={maxSalary}
                onChangeText={setMaxSalary}
              />
            </View>
          </View>
        )}

        {/* Dynamic Filter Options */}
        {categoryData &&
          filterCategory !== 'experience' &&
          filterCategory !== 'salary' && (
            <>
              {['location', 'skills', 'companies', 'education'].includes(
                filterCategory,
              ) && (
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder={`Search ${filterCategory}`}
                    placeholderTextColor="#000"
                    value={searchoptions}
                    onChangeText={setSearchoptions}
                  />
                </View>
              )}
              <ScrollView>
                {filteredData.map(item => {
                  const displayName =
                    item.name ||
                    item.industry_name ||
                    item.course_name ||
                    item.company_name ||
                    'Unknown';
                  const isChecked =
                    filters[filterCategory]?.includes(displayName);

                  return (
                    <View key={displayName} style={styles.filterItem}>
                      <Checkbox
                        status={isChecked ? 'checked' : 'unchecked'}
                        color={colors.secondary}
                        onPress={() =>
                          toggleFilter(filterCategory, displayName)
                        }
                      />
                      <TouchableOpacity
                        onPress={() =>
                          toggleFilter(filterCategory, displayName)
                        }>
                        <Text
                          style={{
                            color: isChecked ? colors.secondary : '#000',
                            fontSize: 12,
                            width: width * 0.55,
                          }}>
                          {`${displayName} (${item.count || 0})`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </>
          )}
      </View>
    );
  };

  const loadMoreJobs = () => {
    searchQueryData.page = JobListPagination.next_page_number;
    const filterParams = filterQuery
      ? `${filterQuery}&page=${JobListPagination.next_page_number}`
      : `page=${JobListPagination.next_page_number}`;

    if (!isLoading && id && JobListPagination.next_page_number != null) {
      if (searchQueryData) {
        dispatch(GetSearchJobs({user_id: id, ...searchQueryData}));
      } else if (filterQuery) {
        dispatch(GetFilterdJobs(filterParams));
      } else {
        dispatch(GetJobList(id, JobListPagination.next_page_number)); // Dispatch the action to load more jobs
      }
    }
  };
  return (
    <View style={styles.bodycontainer}>
      <View style={styles.container}>
        <View style={styles.searchbarContainer}>
          <TextInput
            placeholder="Search"
            // onChangeText={setQuery}
            onChangeText={text => {
              if (text.length === 0) {
                setJobListToRender(JobList);
              }
              setQuery(text); // Update query state
              // SearchJobs(text); // Trigger dynamic search
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
            onPress={() => SearchJobs(query)}
          />
        </View>
        <TouchableOpacity
          style={styles.filterIconContainer}
          onPress={openFiltermodal}>
          <Ionicons name="filter-outline" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <>
        {/* isLoading ? (
          <Spinner
            visible={isLoading}
            textContent={'Believe in the journey – we’re here for you!'}
            textStyle={styles.spinnerTextStyle}
            overlayColor="rgba(0, 0, 0, 0.5)"
            animation="fade"
            size="large"
            customIndicator={
              <Image
                source={require('../../Assets/CompanyLogo/Swatsan.png')}
                style={GlobalStyle.loaderimage}
                resizeMode="center"
              />
            }
          />
        ) : */}
        {jobListToRender?.length > 0 ? (
          <FlatList
            data={jobListToRender}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item?.id}
                onPress={() => {
                  setQuery('');
                  setFilterQuery('');
                  setSearchQueryData('');
                  navigation.navigate('JobDetailScreen', {
                    job_id: item?.id,
                  });
                }}
                style={{marginHorizontal: 12}}>
                <View style={JobCardStyle.jobCard}>
                  <View style={JobCardStyle.companyInfo}>
                    <View style={JobCardStyle.companylogo}>
                      {item?.company?.logo ? (
                        <Image
                          source={{uri: BASE_URL + item?.company?.logo}}
                          style={JobCardStyle.companyImage}
                        />
                      ) : (
                        <Ionicons
                          name="business" // Icon for the fallback
                          size={42}
                          color="gray"
                        />
                      )}

                      <View style={JobCardStyle.textName}>
                        <Text style={JobCardStyle.jobTitle}>
                          {item?.job_title?.title}
                        </Text>
                        {/* <Text style={JobCardStyle.companyName}>
                      {jobData?.company_name}
                    </Text> */}
                        {(item?.company_name ||
                          item?.company?.company_name) && (
                          <Text style={JobCardStyle.companyName}>
                            {item?.company?.company_name
                              ? item?.company?.company_name
                              : item?.company_name}
                          </Text>
                        )}
                      </View>
                    </View>

                    <IconButton
                      icon={item?.is_saved ? 'bookmark' : 'bookmark-outline'}
                      iconColor="#004466"
                      size={24}
                      style={{padding: 0}}
                      onPress={() => toggleSaveJob(item?.id)}
                    />
                  </View>
                  <View style={JobCardStyle.workModeContainer}>
                    {item?.work_modes &&
                      item?.work_modes?.map((mode, idx) => (
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
                    {item?.job_location?.map((location, locIndex) => (
                      <Text key={locIndex} style={JobCardStyle.jobCardLocation}>
                        {location}
                        {locIndex < item?.job_location?.length - 1 && ',  '}
                      </Text>
                    ))}
                  </View>
                  <View style={JobCardStyle.line} />
                  <View style={JobCardStyle.jobFooter}>
                    {item?.salary && item?.salary?.yearly && (
                      <View style={JobCardStyle.experienceContainer}>
                        <Ionicons name="cash" size={14} color="#004466" />
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <CustomFormatAmount
                            amount={item.salary?.yearly?.min}
                          />
                          <Text style={{color: colors.primary}}> - </Text>
                          <CustomFormatAmount
                            amount={item.salary?.yearly?.max}
                          />
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 'bold',
                              color: 'gray',
                            }}>
                            {item?.salary?.yearly?.currency}
                          </Text>
                        </View>
                      </View>
                    )}
                    <Text style={JobCardStyle.jobPostedDate}>
                      {moment(item?.created_at).fromNow()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            onEndReached={loadMoreJobs} // Trigger when the end of the list is reached
            onEndReachedThreshold={0.5} // When half of the list is visible
            ListFooterComponent={
              isLoading ? <ActivityIndicator size="large" /> : null
            }
          />
        ) : (
          // <ScrollView
          //   style={JobCardStyle.companyContainer}
          //   contentContainerStyle={{paddingBottom: 16}}
          //   scrollEventThrottle={16}>
          //   {jobListToRender?.map(jobData => (
          //     <TouchableOpacity
          //       key={jobData.id}
          //       onPress={() => {
          //         setQuery('');
          //         navigation.navigate('JobDetailScreen', {
          //           job_id: jobData.id,
          //         });
          //       }}>
          //       <View style={JobCardStyle.jobCard}>
          //         <View style={JobCardStyle.companyInfo}>
          //           <View style={JobCardStyle.companylogo}>
          //             {jobData?.company?.logo ? (
          //               <Image
          //                 source={{uri: BASE_URL + jobData?.company?.logo}}
          //                 style={JobCardStyle.companyImage}
          //               />
          //             ) : (
          //               <Ionicons
          //                 name="business" // Icon for the fallback
          //                 size={42}
          //                 color="gray"
          //               />
          //             )}

          //             <View style={JobCardStyle.textName}>
          //               <Text style={JobCardStyle.jobTitle}>
          //                 {jobData?.job_title?.title}
          //               </Text>
          //               {/* <Text style={JobCardStyle.companyName}>
          //                 {jobData?.company_name}
          //               </Text> */}
          //               {(jobData?.company_name ||
          //                 jobData?.company?.company_name) && (
          //                 <Text style={JobCardStyle.companyName}>
          //                   {jobData?.company?.company_name
          //                     ? jobData?.company?.company_name
          //                     : jobData?.company_name}
          //                 </Text>
          //               )}
          //             </View>
          //           </View>

          //           <IconButton
          //             icon={jobData?.is_saved ? 'bookmark' : 'bookmark-outline'}
          //             iconColor="#004466"
          //             size={24}
          //             style={{padding: 0}}
          //             onPress={() => toggleSaveJob(jobData?.id)}
          //           />
          //         </View>
          //         <View style={JobCardStyle.workModeContainer}>
          //           {jobData.work_modes &&
          //             jobData.work_modes.map((mode, idx) => (
          //               <View key={idx} style={JobCardStyle.workModeChip}>
          //                 <Text style={JobCardStyle.chipText}>{mode}</Text>
          //               </View>
          //             ))}
          //         </View>
          //         <View style={JobCardStyle.location}>
          //           <IconButton
          //             icon="map-marker"
          //             iconColor={colors.primary}
          //             size={18}
          //             style={{padding: 0, marginLeft: -10, height: 20}}
          //           />
          //           {jobData.job_location.map((location, locIndex) => (
          //             <Text key={locIndex} style={JobCardStyle.jobCardLocation}>
          //               {location}
          //               {locIndex < jobData.job_location.length - 1 && ',  '}
          //             </Text>
          //           ))}
          //         </View>
          //         <View style={JobCardStyle.line} />
          //         <View style={JobCardStyle.jobFooter}>
          //           {jobData?.salary && jobData.salary.yearly && (
          //             <View style={JobCardStyle.experienceContainer}>
          //               <Ionicons name="cash" size={14} color="#004466" />
          //               <View
          //                 style={{
          //                   flexDirection: 'row',
          //                   alignItems: 'center',
          //                 }}>
          //                 <CustomFormatAmount
          //                   amount={jobData.salary?.yearly?.min}
          //                 />
          //                 <Text style={{color: colors.primary}}> - </Text>
          //                 <CustomFormatAmount
          //                   amount={jobData.salary?.yearly?.max}
          //                 />
          //                 <Text
          //                   style={{
          //                     fontSize: 10,
          //                     fontWeight: 'bold',
          //                     color: 'gray',
          //                   }}>
          //                   {jobData.salary.yearly.currency}
          //                 </Text>
          //               </View>
          //             </View>
          //           )}
          //           <Text style={JobCardStyle.jobPostedDate}>
          //             {moment(jobData?.created_at).fromNow()}
          //           </Text>
          //         </View>
          //       </View>
          //     </TouchableOpacity>
          //   ))}
          // </ScrollView>
          <View style={[JobCardStyle.noJobsContainer]}>
            <Image
              style={JobCardStyle.jobimage}
              source={require('../../Assets/invitesImages/Jobsearch.png')}
            />
            <Text style={[JobCardStyle.noJobsText]}>
              No jobs found..... Keep exploring!
            </Text>
          </View>
        )}
      </>

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
                  {[...FilterMasterData, {filter: 'experience'}].map(
                    filterCategory => (
                      <TouchableOpacity
                        key={filterCategory.filter}
                        style={[
                          styles.categoryButton,
                          selectedCategory === filterCategory.filter && [
                            styles.selectedCategoryButton,
                            {backgroundColor: '#e6f7ff'},
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
                          {filterCategory.filter
                            .replace('_', ' ')
                            .toLowerCase()
                            .replace(/^\w/, c => c.toUpperCase())}
                        </Text>
                        {/* Display the selected count */}
                        <Text style={{color: 'grey', fontSize: 10}}>
                          {/* Show count for non-experience and non-salary filters */}
                          {filterCategory.filter !== 'experience' &&
                            filterCategory.filter !== 'salary' &&
                            filters[filterCategory.filter]?.length > 0 &&
                            ` (${filters[filterCategory.filter].length})`}

                          {/* Show experience only if selectedExperience > 0 */}
                          {filterCategory.filter === 'experience' &&
                            selectedExperience > 0 &&
                            ` (${selectedExperience} Y)`}

                          {/* Show salary range only if minSalary and maxSalary are defined */}
                          {filterCategory.filter === 'salary' &&
                            minSalary &&
                            maxSalary &&
                            ` • (${minSalary} - ${maxSalary})`}
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
                onPress={() => handleApplyFilters()}>
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
    marginBottom: 12,
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobsText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
export default JobScreen;
