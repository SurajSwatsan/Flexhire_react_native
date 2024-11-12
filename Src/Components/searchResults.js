import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomHeader from './customHeader';
import GlobalStyle from '../Global_CSS/GlobalStyle';
import {Checkbox, IconButton} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CompanyCard from '../ReusableComponents/ReusableJobCard';
import {jobPost} from '../Redux/Action/JobAction';
import {Dropdown} from 'react-native-element-dropdown';
 
const SearchJobScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {query} = route.params;
  const [searchTerm, setSearchTerm] = useState(query || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
 
  // Filter states
  const [filterJobType, setFilterJobType] = useState([]);
  const [filterLocation, setFilterLocation] = useState([]);
  const [filterIndustry, setFilterIndustry] = useState([]);
  const [filterSalaryRange, setFilterSalaryRange] = useState({
    min: 0,
    max: 1000000,
  });
  const [locationOptions, setLocationOptions] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
 
  const dispatch = useDispatch();
 
  // Load company data into the Redux store when the component mounts
  useEffect(() => {
    dispatch(jobPost());
  }, [dispatch]);
 
  // Access jobs data from the Redux store
  const company = useSelector(state => state.Jobs.jobsData);
 
  useEffect(() => {
    setResults(company);
    setLocationOptions(
      company
        ? company.map(comp => ({label: comp.location, value: comp.location}))
        : [],
    );
    setIndustryOptions(
      company
        ? company.map(comp => ({label: comp.industry, value: comp.industry}))
        : [],
    );
  }, [company]);
 
  useEffect(() => {
    filterJobs(searchTerm);
  }, [searchTerm, filterJobType, filterLocation, filterIndustry, company]);
 
  const filterJobs = term => {
    if (!company || company.length === 0) return;
 
    setLoading(true);
    const filteredJobs = company.filter(comp => {
      const jobMatches =
        comp.company_name.toLowerCase().includes(term.toLowerCase()) ||
        comp.posted_jobs.some(job =>
          job.job_title.toLowerCase().includes(term.toLowerCase()),
        );
 
      const jobTypeMatches =
        filterJobType.length > 0
          ? comp.posted_jobs.some(job => filterJobType.includes(job.job_type))
          : true;
 
      const locationMatches =
        filterLocation.length > 0
          ? filterLocation.includes(comp.location)
          : true;
 
      const industryMatches =
        filterIndustry.length > 0
          ? filterIndustry.includes(comp.industry)
          : true;
 
      const salaryMatches = comp.posted_jobs.some(job => {
        const jobSalary = job.salary_range
          ? job.salary_range.replace(/[^0-9.-]+/g, '') // Remove non-numeric characters
          : 0;
        const salary = parseInt(jobSalary, 10);
 
        return (
          salary >= filterSalaryRange.min && salary <= filterSalaryRange.max
        );
      });
 
      return (
        jobMatches &&
        jobTypeMatches &&
        locationMatches &&
        industryMatches &&
        salaryMatches
      );
    });
 
    setResults(filteredJobs);
    setLoading(false);
  };
 
  const handleFilterChange = (value, filterSetter, currentFilter) => {
    if (currentFilter.includes(value)) {
      filterSetter(currentFilter.filter(item => item !== value));
    } else {
      filterSetter([...currentFilter, value]);
    }
  };
 
  return (
    <View style={styles.container}>
      <View style={GlobalStyle.headerStyle}>
        <CustomHeader />
      </View>
 
      <ScrollView>
        <View style={styles.fixedSearchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search...."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <View style={styles.filterContainer}>
            <IconButton
              style={styles.filtericon}
              icon="filter"
              onPress={() => setFilterModalVisible(true)}
              iconColor="#000"
              size={30}
            />
          </View>
        </View>
 
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : results.length > 0 ? (
          results.map(comp => (
            <CompanyCard
              key={comp.id}
              company={comp}
              savedJobs={savedJobs}
              toggleSaveJob={() => {}}
            />
          ))
        ) : (
          <View>
            <Image
              style={styles.noDataimage}
              source={require('../Assets/ApplyImages/No-data.png')}
            />
          </View>
        )}
      </ScrollView>
 
      <Modal
        transparent={true}
        animationType="slide"
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Jobs</Text>
 
            <Text style={{color: 'black'}}>Job Type</Text>
            <View style={styles.checkboxContainer}>
              {['Onsite', 'Remote', 'Hybrid'].map(type => (
                <View key={type} style={styles.checkboxItem}>
                  <Checkbox
                    status={
                      filterJobType.includes(type) ? 'checked' : 'unchecked'
                    }
                    onPress={() =>
                      handleFilterChange(type, setFilterJobType, filterJobType)
                    }
                  />
                  <Text style={styles.checkboxLabel}>{type}</Text>
                </View>
              ))}
            </View>
            <View style={{marginVertical: 8}}>
              <Text style={{color: 'black'}}>Location</Text>
              <Dropdown
                style={styles.dropdown}
                placeholder="Select Location"
                data={locationOptions}
                labelField="label"
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{color: '#000'}}
                valueField="value"
                value={filterLocation}
                onChange={item => setFilterLocation(item.value)}
                multiple={true}
              />
            </View>
            <Text style={{color: 'black'}}>Industry</Text>
            <Dropdown
              style={styles.dropdown}
              placeholder="Select Industry"
              data={industryOptions}
              labelField="label"
              valueField="value"
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{color: '#000'}}
              value={filterIndustry}
              onChange={item => setFilterIndustry(item.value)}
              multiple={true}
            />
 
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setFilterModalVisible(false);
                filterJobs(searchTerm);
              }}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    backgroundColor: '#f1f1f1',
  },
  searchInput: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    color: '#000',
    flex: 1,
    marginRight: 10,
  },
  fixedSearchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  filterContainer: {
    backgroundColor: '#fff',
    height: 48,
    width: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'black',
  },
  noResultsText: {
    fontSize: 18,
    color: 'red',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxLabel: {
    color: '#000',
  },
  applyButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#666',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdown: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  noDataimage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
});
 
export default SearchJobScreen;