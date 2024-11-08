import React, {useState} from 'react';
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
import JobbasedonPreferences from '../Components/JobbasedonPreferences';
import CompanysList from '../Components/CompanysList';
import {colors} from '../Global_CSS/theamColors';
import RecommendedJobs from '../Components/RecommendedJobs';

const HomeComponent = ({jobsData}) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (navigation.isFocused()) {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {
              text: 'No',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => BackHandler.exitApp(),
            },
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
          <View style={{marginVertical: 18, marginLeft: 18}}>
            <RecommendedJobs />
            <JobbasedonPreferences />
          </View>
        </View>
        <View style={styles.companylistContainer}>
          <CompanysList />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bodycontainer: {
    backgroundColor: colors.bacground,
  },
  container: {
    backgroundColor: colors.primary,
    height: 90,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  searchbarContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',
    marginVertical: 18,
    backgroundColor: colors.cardcolor,
    borderRadius: 8,
    height: 56,
  },
  searchbar: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginRight: 10,
    backgroundColor: '#fff',
  },
  JobsContainer: {},
});

export default HomeComponent;
