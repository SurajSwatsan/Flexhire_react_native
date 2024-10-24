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
// import JobcategoriesScrollComponent from '../Components/JobcategoriesScrollComponent';
import {useNavigation} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import JobbasedonProfile from '../Components/JobbasedonProfile';
import JobbasedonPreferences from '../Components/JobbasedonPreferences';
import CompanysList from '../Components/CompanysList';

const HomeComponent = ({jobsData}) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()}, // Use your desired navigation logic here
      ]);
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup listener on unmount
  }, []);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setQuery(query);
    console.log(query);
    navigation.navigate('searchjob', {query});
  };

  return (
    <View style={styles.bodycontainer}>
      <ScrollView>
        <View style={styles.container}>
          {/* <View style={styles.ProfileProgressContainer}>
            <ProfileProgress />
          </View> */}
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
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Let's Find a Job</Text>
            <Text style={styles.heading}>With Flexhire</Text>
          </View>

          <View style={styles.JobsContainer}>
            <View style={{marginVertical: 18, marginLeft: 18}}>
              <JobbasedonProfile />
              <JobbasedonPreferences />
            </View>
          </View>
          <View style={styles.companylistContainer}>
            <CompanysList />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bodycontainer: {
    flex: 1,
    // backgroundColor: '#c2d6d6',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headingContainer: {
    marginVertical: 12,
  },
  heading: {
    fontFamily: 'futura lt',
    fontSize: 32,
    marginHorizontal: 18,
    color: '#004466',
    fontWeight: 'bold',
  },
  searchbarContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',

    marginVertical: 18,
    // backgroundColor: '#f0f5f5',
    backgroundColor: '#f2f2f2',
    // backgroundColor: '#004466',
    // borderWidth: 0.2,
    // borderColor: 'lightgray',
    borderRadius: 8,
    height: 56,
  },

  searchbar: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 12,
    fontSize: 16,
    color: '#000',
    // textAlign: 'center',
  },
  searchIcon: {
    marginRight: 10,
    backgroundColor: '#fff',
  },
  ProfileProgressContainer: {
    marginTop: -40,
  },
  JobsContainer: {
    backgroundColor: '#e0e0e0',
    // backgroundColor: '#a3c6d4',
    // backgroundColor: '#f8f8f0',
    // backgroundColor: '#a4c8e1',
    // backgroundColor: '#E3F0E9',
    // backgroundColor: '#00334d',
  },
});

export default HomeComponent;
