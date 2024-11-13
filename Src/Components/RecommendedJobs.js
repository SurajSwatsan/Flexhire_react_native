import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CompanyCard from '../Constant/CustomJobCard';
import {jobPost} from '../Redux/Action/JobAction';
import {colors} from '../Global_CSS/TheamColors';

const RecommendedJobs = () => {
  const dispatch = useDispatch();

  // Load jobs data into the Redux store when the component mounts
  useEffect(() => {
    dispatch(jobPost());
  }, [dispatch]);

  // Access jobs data from the Redux store
  const jobs = useSelector(state => state.Jobs.jobsData); // Ensure path matches the key in combineReducers

  if (!jobs || jobs.length === 0) {
    return <Text style={styles.noCompanyText}>No jobs to display.</Text>;
  }
  console.log(jobs);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.subTitle}>Recommended jobs</Text>
        <Text style={styles.sectionTitle}>view all</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        {jobs.map((jobdata, index) => (
          <View key={index} style={{minWidth: 300, maxWidth: 300}}>
            <CompanyCard key={index} company={jobdata} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 12,
  },
  subTitle: {
    fontSize: 16,
    color: colors.blackText,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.blackText,
  },
  scrollContainer: {},
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RecommendedJobs;
