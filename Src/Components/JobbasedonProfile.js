import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CompanyCard from '../GlobalFields/GlobalCard';
import {jobPost} from '../Redux/Action/JobAction';

const JobbasedonProfile = () => {
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
  console.log(company);

  return (
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
  );
};

const styles = StyleSheet.create({
  scrollContainer: {},
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default JobbasedonProfile;
