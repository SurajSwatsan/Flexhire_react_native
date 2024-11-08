import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {colors} from '../Global_CSS/theamColors';
import {useDispatch, useSelector} from 'react-redux';
import {jobPost} from '../Redux/Action/JobAction';
import CompanyCard from '../GlobalFields/GlobalCard';

const JobbasedonPreferences = () => {
  const dispatch = useDispatch();

  // Load company data into the Redux store when the component mounts
  useEffect(() => {
    dispatch(jobPost());
  }, [dispatch]);

  // Access jobs data from the Redux store
  const company = useSelector(state => state.Jobs.jobsData); // Ensure path matches the key in combineReducers

  if (!company || company.length === 0) {
    return <Text style={styles.noCompanyText}>No company to display.</Text>;
  }

  return (
    <View style={styles.MainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Job based on your Preferences ({company.length})
        </Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      {/* {isLoading ? ( // Optional loading indicator
        <ActivityIndicator size="large" color="#0000ff" />
      ) : ( */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        {company.map((companyItem, index) => (
          <View key={index} style={{minWidth: 300, maxWidth: 300}}>
            <CompanyCard
              company={companyItem}
              // Uncomment and use these if needed
              // savedJobs={Array.isArray(savedJobs) ? savedJobs : []}
              // toggleSaveJob={toggleSaveJob}
            />
          </View>
        ))}
      </ScrollView>
      {/* )}  */}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    marginBottom: 18,
  },
  companyLocation: {
    color: colors.textprimary,
    fontSize: 12,
  },

  companyContainer: {
    flexDirection: 'column',
    marginHorizontal: 14,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: 12,
    marginVertical: 12,
  },
  title: {
    maxWidth: 200,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a0a0a',
  },
  viewAll: {
    fontSize: 15,
    color: colors.textprimary,
    fontWeight: 'bold',
  },
  itemText: {
    color: '#333',
  },
  itemLogo: {
    padding: 10,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyName: {
    color: colors.textprimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginRight: 14,
    maxWidth: 300,
    maxHeight: 250,
    borderRadius: 8,
    backgroundColor: colors.cardcolor,
  },

  jobTitleText: {
    color: colors.textprimary,
    fontSize: 15,
  },
  experienceText: {
    color: colors.textprimary,
    fontSize: 12,
  },
});

export default JobbasedonPreferences;
