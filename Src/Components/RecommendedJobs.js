import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CompanyCard from '../GlobalFields/GlobalCard';
import {jobPost} from '../Redux/Action/JobAction';
import {colors} from '../Global_CSS/theamColors';

const RecommendedJobs = () => {
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
  // console.log(company);

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
    color: colors.textprimary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.textprimary,
  },
  scrollContainer: {},
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RecommendedJobs;
