import React, { useEffect, useState } from 'react';
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
import { Checkbox, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CompanyCard from '../GlobalFields/GlobalCard';
import { jobPost } from '../Redux/Action/JobAction';

const SearchJobScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const { query } = route.params;
  const [searchTerm, setSearchTerm] = useState(query || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterJobType, setFilterJobType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterSalaryRange, setFilterSalaryRange] = useState({
    min: 0,
    max: 1000000,
  });

  const dispatch = useDispatch();

  // Load company data into the Redux store when the component mounts
  useEffect(() => {
    dispatch(jobPost());
  }, [dispatch]);

  // Access jobs data from the Redux store
  const company = useSelector((state) => state.Jobs.jobsData);

  useEffect(() => {
    setResults(company);
  }, [company]);

  useEffect(() => {
    filterJobs(searchTerm);
  }, [searchTerm, filterJobType, filterLocation, filterIndustry, company]);

  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        const savedJobsData = await AsyncStorage.getItem('savedJobs');
        if (savedJobsData) {
          setSavedJobs(JSON.parse(savedJobsData));
        }
      } catch (error) {
        console.error('Failed to load saved jobs', error);
      }
    };

    loadSavedJobs();
  }, [isFocused]);

  const filterJobs = (term) => {
    if (!company || company.length === 0) return;

    setLoading(true);
    const filteredJobs = company.filter((comp) => {
      const jobMatches =
        comp.company_name.toLowerCase().includes(term.toLowerCase()) ||
        comp.posted_jobs.some((job) =>
          job.job_title.toLowerCase().includes(term.toLowerCase())
        );

      const jobTypeMatches =
        filterJobType.length > 0
          ? comp.posted_jobs.some((job) =>
              filterJobType.includes(job.job_type)
            )
          : true;

      const locationMatches = filterLocation
        ? comp.location.toLowerCase().includes(filterLocation.toLowerCase())
        : true;

      const industryMatches = filterIndustry
        ? comp.industry.toLowerCase().includes(filterIndustry.toLowerCase())
        : true;

      const salaryMatches = comp.posted_jobs.some((job) => {
        const jobSalary = job.salary_range
          ? job.salary_range.replace(/[^0-9.-]+/g, '') // Remove non-numeric characters
          : 0;
        const salary = parseInt(jobSalary, 10);

        return salary >= filterSalaryRange.min && salary <= filterSalaryRange.max;
      });

      return (
        jobMatches && jobTypeMatches && locationMatches && industryMatches && salaryMatches
      );
    });

    setResults(filteredJobs);
    setLoading(false);
  };

  const toggleSaveJob = (job) => {
    const isJobSaved = savedJobs.some(
      (savedJob) => savedJob.job_title === job.job_title
    );

    let updatedSavedJobs;
    if (isJobSaved) {
      updatedSavedJobs = savedJobs.filter(
        (savedJob) => savedJob.job_title !== job.job_title
      );
    } else {
      updatedSavedJobs = [...savedJobs, job];
    }

    setSavedJobs(updatedSavedJobs);
    saveJobsToStorage(updatedSavedJobs);
  };

  const saveJobsToStorage = async (jobs) => {
    try {
      await AsyncStorage.setItem('savedJobs', JSON.stringify(jobs));
    } catch (error) {
      console.error('Failed to save jobs to AsyncStorage', error);
    }
  };

  const getUniqueLocations = () => {
    return company ? [...new Set(company.map((comp) => comp.location))] : [];
  };

  const getUniqueIndustries = () => {
    return company ? [...new Set(company.map((comp) => comp.industry))] : [];
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
          results.map((comp) => (
            <CompanyCard
              key={comp.id}
              company={comp}
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
            />
          ))
        ) : (
          <Text style={styles.noResultsText}>No jobs found</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.savedJobsButton}
        onPress={() => navigation.navigate('SavedJobsScreen', { savedJobs })}
      ></TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Jobs</Text>
            {/* Add your filter logic here */}
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setFilterModalVisible(false);
                filterJobs(searchTerm);
              }}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFilterModalVisible(false)}
            >
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
  applyButton: {
    backgroundColor: '#004466',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    alignSelf: 'center',
  },
  closeButton: {
    backgroundColor: '#004466',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    alignSelf: 'center',
  },
  modalTitle: {
    color: '#000',
    fontSize: 16,
  },
});

export default SearchJobScreen;
