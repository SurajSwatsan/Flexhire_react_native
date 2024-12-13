import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this import is correct
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import JobViewController from '../../Redux/Action/jobViewController';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInvitesScreen = () => {
  const [id, setId] = useState();

  const dispatch = useDispatch();
  const {GetInvitation, ReadInvitation} = JobViewController();
  const {JobInvitation} = useSelector(state => state.job);
  const isFocus = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(id);
        dispatch(GetInvitation(id));

        console.log(id); // Log the value once it's retrieved
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
  }, [isFocus]);

  return (
    <View style={styles.inviteContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.inviteText}>Invites: Your invitation to apply</Text>
        <Text style={styles.contentText}>
          Recruiters have chosen you from a large pool of candidates to apply to
          these jobs.
        </Text>
      </View>

      <ScrollView style={styles.cardContainer}>
        {JobInvitation?.map((invite, index) => {
          // Directly access job properties using optional chaining
          const hasCompanyInfo =
            invite?.job?.company_name &&
            invite?.job?.logo &&
            invite?.job?.rating;

          return (
            <TouchableOpacity
              key={invite.id || `invite-${index}`} // Fallback to a unique key if invite.id is missing
              onPress={() => {
                if (!invite.is_read) {
                  dispatch(ReadInvitation(invite.id));
                }
                navigation.navigate('Invite', {inviteData: invite});
              }}
              style={[
                styles.card,
                {backgroundColor: invite.is_read ? '#fff' : '#cde4d8'}, // Conditional background color
              ]}>
              <View
                style={[
                  styles.cardContent,
                  {backgroundColor: invite.is_read ? '#fafafa' : '#deede5'}, // Conditional background color
                ]}>
                <View style={styles.groupsContainer}>
                  {invite?.job?.groups?.map((group, index) => (
                    <Text key={index} style={styles.cardTitle}>
                      {group?.name}
                    </Text>
                  ))}
                </View>

                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location"
                    color={colors.primary}
                    size={14}
                    style={{padding: 0}}
                  />
                  <Text style={styles.detailsText}>
                    {invite?.job?.job_location?.map(loc => loc.name).join(', ')}
                  </Text>
                </View>
                <View style={styles.detailsRow}>
                  <Ionicons name="briefcase" size={14} color={colors.primary} />
                  <Text style={styles.detailsText}>
                    {`${invite?.job?.experience_level?.minYear}-${invite?.job?.experience_level?.maxYear} Years`}
                  </Text>
                  <View style={styles.detailsalary}>
                    <Ionicons name="cash" size={14} color={colors.primary} />
                    <Text style={styles.detailsText}>
                      {`${invite?.job?.salary?.yearly?.min} - ${invite?.job?.salary?.yearly?.max} ${invite?.job?.salary?.yearly?.currency}`}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.innerCard}>
                {hasCompanyInfo ? (
                  <View style={styles.iconMain}>
                    <Image
                      source={
                        invite?.job?.company?.logo
                          ? {uri: invite?.job?.company?.logo}
                          : require('../../Assets/CompanyLogo/TCS_logo.png')
                      }
                      style={styles.logo}
                    />
                    <View style={styles.companyMaincontainer}>
                      <View style={styles.companyDetail}>
                        <Text style={styles.companyText}>
                          {invite?.job?.company_name}
                        </Text>
                        <View style={styles.icon}>
                          <Ionicons
                            name="star"
                            size={14}
                            color="#ffd700"
                            style={styles.ratingIcon}
                          />
                          <Text style={styles.companyReview}>
                            {invite?.job?.rating}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.companyDate}>
                        {moment(invite?.job?.created_at).format('MMM D')}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.iconContainer,
                      {backgroundColor: invite.is_read ? '#fff' : '#deede5'},
                    ]}>
                    <Ionicons
                      name="person"
                      size={14}
                      color={colors.primary}
                      style={styles.icon}
                    />
                  </View>
                )}

                {!hasCompanyInfo && (
                  <View style={styles.techContainer}>
                    <Text style={styles.companyText}>
                      Hiring for {invite?.job?.company_name}
                    </Text>
                    <Text style={styles.detailscompanytext}>
                      Posted by Swatsan Tech Private Limited
                    </Text>
                  </View>
                )}

                <Text style={styles.companyDate}>
                  {moment(invite?.job?.created_at).format('MMM D')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inviteContainer: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    width: '100%',
  },
  textContainer: {
    marginVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  inviteText: {
    fontSize: 24,
    color: colors.blackText,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  contentText: {
    fontSize: 14,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'gray',
  },
  cardContainer: {},
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 12,
    marginHorizontal: 12,
  },
  cardContent: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.blackText,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  detailsText: {
    fontSize: 12,
    color: colors.blackText,
    marginLeft: 6,
  },
  detailscompanytext: {
    fontSize: 10,
    color: colors.blackText,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsalary: {
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center',
  },
  innerCard: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 8,
    gap: 8,
    marginTop: 6,
  },
  iconContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMain: {
    flexDirection: 'row',
  },
  companyDetail: {
    flexDirection: 'column',
  },
  companyMaincontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
  },
  techContainer: {
    justifyContent: 'center',
  },
  companyText: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 2,
  },
  companyReview: {
    fontSize: 10,
    color: 'gray',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    marginRight: 4,
  },
  companyDate: {
    fontSize: 10,
    alignItems: 'center',
    color: 'gray',
  },
});

export default UserInvitesScreen;
