import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {companies} from '../Screens/BottomTabScreens/UserInvitesScreen';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from './CustomBackIcon';

const CustomInviteScreen = ({route}) => {
  const {companyId} = route.params;

  const company = companies.find(company => company.id === companyId);

  // console.log(company);
  if (!company) {
    return (
      <View style={styles.container}>
        <Text>Company not found</Text>
      </View>
    );
  }

  const [buttonStatus, setButtonStatus] = useState('Apply');
  const [applyButtonColor, setApplyButtonColor] = useState(colors.primary);

  const handleApplyPress = () => {
    setButtonStatus('Applied'); // Change text to 'Applied' when button is clicked
    setApplyButtonColor('green');
    console.log('Apply Pressed');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.headerContainer}>
          <CustomHeader />
          <Text style={styles.companyHeaderName}>{company.company_name}</Text>
          <TouchableOpacity>
            <Ionicons
              name="trash" // Icon for location
              color={colors.primary} // Icon color
              size={26} // Icon size
              style={{padding: 5}} // Adjust the style
            />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {/* <Text style={styles.companyName}>{company.company_name}</Text> */}

          <Text style={styles.jobTitle}>{company.job_title}</Text>
          <View style={styles.locationContainer}>
            <Ionicons
              name="location" // Icon for location
              color={colors.primary} // Icon color
              size={14} // Icon size
              style={{padding: 0}} // Adjust the style
            />
            <Text style={styles.detailsText}> {company.location}</Text>
          </View>
          <View style={styles.experienceContainer}>
            <Ionicons name="briefcase" size={14} color={colors.primary} />
            <Text style={styles.detailsText}> {company.experience}</Text>
          </View>
          <View style={styles.experienceContainer}>
            <Ionicons name="cash" size={14} color={colors.primary} />
            <Text style={styles.detailsText}> {company.salary}</Text>
          </View>
          <View style={styles.experienceContainer}>
            <Ionicons name="pin" size={14} color={colors.primary} />
            <Text style={styles.detailsText}>{company.work_modes}</Text>
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>Job Description</Text>
          <Text style={styles.description}>{company.job_description}</Text>

          {company.role_responsibilities ? (
            <>
              <Text style={styles.subdescriptionText}>
                Role & responsibilities
              </Text>
              <Text style={styles.description}>
                {company.role_responsibilities}
              </Text>
            </>
          ) : null}

          <Text style={styles.ProfileText}>Preffered candidate profile</Text>
          <Text style={styles.description}>{company.job_info}</Text>
        </View>

        <View style={styles.Industryname}>
          <Text style={styles.industryText}>Industry Type</Text>
          <Text style={styles.detailsText}>{company.industry}</Text>
        </View>

        <View style={styles.Industryname}>
          <Text style={styles.industryText}> Role</Text>
          <Text style={styles.detailsText}>{company.job_title}</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.applyButton, {backgroundColor: applyButtonColor}]} // Dynamically change the background color
          onPress={handleApplyPress}>
          <Text style={styles.applybuttonText}>{buttonStatus}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notInterestedButton}
          onPress={() => console.log('Not Interested Pressed')}>
          <Text style={styles.notInterestedButtonText}>Not Interested</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginHorizontal: 18,
    // marginVertical: 18,
  },
  companyHeaderName: {
    color: colors.blackText,
    fontSize: 16,
  },
  headerContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 18,
    marginVertical: 12,
  },
  companyName: {
    fontSize: 16,
    color: colors.blackText,
    // marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    color: colors.blackText,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  detailsText: {
    fontSize: 12,
    color:'gray',
    marginTop:4
  },
  Industryname: {
    // color:colors.blackText
    marginHorizontal: 18,
    marginTop: 14,
  },
  industryText: {
    color: colors.blackText,
    fontSize: 12,
  },
  experienceContainer: {
    flexDirection: 'row',
  },
  descriptionContainer: {
    // marginTop: 8,
    marginHorizontal: 18,
  },
  descriptionText: {
    color: colors.blackText,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop:8
  },
  subdescriptionText: {
    color: colors.blackText,
    fontSize: 16,
    marginTop: 4,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    marginTop: 4,
    color:'gray',

  },
  ProfileText: {
    color: colors.blackText,
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
  },

  buttonsContainer: {
    position: 'absolute', // Fixed position at the bottom
    bottom: 0, // Adjust the distance from the bottom of the screen
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#f1f1f1', // Added background color for the buttons container
    paddingVertical: 12, // Optional: To add some padding around the buttons
    // borderTopWidth: 2, // Optional: Add a top border to the container for better distinction
    // borderTopColor: colors.lightgaryText, // Optional: Color of the top border
    backgroundColor: colors.whiteText,
    padding: 10,
  },
  notInterestedButton: {
    backgroundColor: '#fff', // Red for Not Interested button
    paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1, // Equal size with the other button
    marginLeft: 10, // Adds space between buttons
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.lightgaryText,
    borderWidth: 1,
  },
  applyButton: {
    // backgroundColor: colors.primary,

    borderRadius: 8,
    flex: 1, // Ensures buttons are equal in size
    marginHorizontal: 5, // Adds space between the buttons
    justifyContent: 'center',
    alignItems: 'center',
  },

  applybuttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notInterestedButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomInviteScreen;
