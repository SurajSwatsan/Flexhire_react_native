import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {jobPost} from '../../Redux/Action/JobAction';
import CustomJobCard from '../../Constant/CustomJobCard';
import {colors} from '../../Global_CSS/TheamColors';
import CustomCompanyCard from '../../Constant/CustomCompanyCard';
 
const HomeComponent = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
 
  // Load jobs data into the Redux store when the component mounts
  useEffect(() => {
    dispatch(jobPost());
  }, [dispatch]);
 
  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (navigation.isFocused()) {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {text: 'No', onPress: () => null, style: 'cancel'},
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        } else {
          return false;
        }
      };
 
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
 
      return () => backHandler.remove(); // Cleanup listener on unmount
    }, [navigation]),
  );
 
  const handleSearch = () => {
    navigation.navigate('searchjob', {query});
  };
 
  // Access jobs data from the Redux store
  const jobs = useSelector(state => state.Jobs.jobsData);
 
  if (!jobs || jobs.length === 0) {
    return <Text style={styles.noCompanyText}>No jobs to display.</Text>;
  }
 
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
      </View>
 
      <ScrollView style={{flex: 1}}>
        <View style={styles.JobsContainer}>

            {/* Recommended Jobs */}
          <View style={{marginVertical: 12, marginLeft: 12}}>
            <View style={styles.displayContainer}>
              <Text style={styles.contHead}>Recommended Jobs</Text>
              <Text style={styles.seeAll}>View All</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.contentContainer}>
              {jobs.map((jobdata, index) => (
                <View
                  key={jobdata.id || index}
                  style={{minWidth: 300, maxWidth: 300}}>
                  <CustomJobCard jobData={jobdata} />
                </View>
              ))}
            </ScrollView>
          </View>
       
             {/* Basedon Profile Jobs */}
          <View style={{marginVertical: 12, marginLeft: 12}}>
            <View style={styles.displayContainer}>
              <Text style={styles.contHead}>Based on profile</Text>
              <Text style={styles.seeAll}>View All</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.contentContainer}>
              {jobs.map((jobdata, index) => (
                <View
                  key={jobdata.id || index}
                  style={{minWidth: 300, maxWidth: 300}}>
                  <CustomJobCard jobData={jobdata} />
                </View>
              ))}
            </ScrollView>
          </View>

           {/* Top companys */}
          <View style={{marginVertical: 12, marginLeft: 12}}>
            <View style={styles.displayContainer}>
              <Text style={styles.contHead}>Top Companys</Text>
              <Text style={styles.seeAll}>View All</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
              contentContainerStyle={styles.contentContainer}>
              {jobs.map((jobdata, index) => (
                <View
                  key={jobdata.id || index}
                  style={{minWidth: 170, maxWidth: 170}}>
                  <CustomCompanyCard jobData={jobdata} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  bodycontainer: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    backgroundColor: colors.primary,
    height: 90,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  searchbarContainer: {
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
  JobsContainer: {
    marginTop: 12,
  },
  displayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  seeAll: {
    fontSize: 14,
    color: colors.blackText,
    marginRight: 8,
    textDecorationLine:'underline'
  },
  noCompanyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
 
export default HomeComponent;