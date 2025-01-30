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
import {BASE_URL} from '../../Services/baseAPI';
import useCustomFormatAmount from '../../CustomHooks/CustomFormatAmount';
import JobListLoader from '../../Loaders/JobListLoader';

const UserInvitesScreen = () => {
  const [id, setId] = useState();

  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All'); // State to manage the toggle
  const {GetInvitation, ReadInvitation} = JobViewController();
  const {JobInvitation, isLoading} = useSelector(state => state.job);
  const isFocus = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user_id = await AsyncStorage.getItem('user_data'); // Wait for the value to be retrieved
        setId(user_id);
        if (
          user_id ||
          (Array.isArray(JobInvitation) && JobInvitation.length === 0)
        ) {
          dispatch(GetInvitation(user_id));
          console.log('====== 1st Api call');
        }
        console.log(user_id); // Log the value once it's retrieved
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
  }, [isFocus]);

  const filteredInvites =
    filter === 'All'
      ? JobInvitation
      : JobInvitation?.filter(invite => !invite.is_read);
  if (isLoading || !JobInvitation) {
    return (
      <View style={{backgroundColor: '#f1f1f1', flex: 1}}>
        <View style={styles.textContainer}>
          <Text style={styles.inviteText}>
            Invites: Your invitation to apply
          </Text>
          <Text style={styles.contentText}>
            Recruiters have chosen you from a large pool of candidates to apply
            to these jobs.
          </Text>
        </View>
        <View style={[styles.toggleContainer]}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {backgroundColor: filter === 'All' ? colors.primary : '#f1f1f1'},
            ]}
            onPress={() => setFilter('All')}>
            <Text
              style={{
                color: filter === 'All' ? '#fff' : colors.primary,
                fontSize: 12,
              }}>
              All ({JobInvitation?.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              {
                backgroundColor:
                  filter === 'Unread' ? colors.primary : '#f1f1f1',
              },
            ]}
            onPress={() => setFilter('Unread')}>
            <Text
              style={{
                color: filter === 'Unread' ? '#fff' : colors.primary,
                fontSize: 12,
              }}>
              Unread ({JobInvitation?.filter(invite => !invite.is_read).length})
            </Text>
          </TouchableOpacity>
        </View>
        <JobListLoader />
      </View>
    );
  }
  console.log('JobInvitation', JobInvitation);

  return (
    <View style={styles.inviteContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.inviteText}>Invites: Your invitation to apply</Text>
        <Text style={styles.contentText}>
          Recruiters have chosen you from a large pool of candidates to apply to
          these jobs.
        </Text>
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            {backgroundColor: filter === 'All' ? colors.primary : '#f1f1f1'},
          ]}
          onPress={() => setFilter('All')}>
          <Text
            style={{
              color: filter === 'All' ? '#fff' : colors.primary,
              fontSize: 12,
            }}>
            All ({JobInvitation?.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            {backgroundColor: filter === 'Unread' ? colors.primary : '#f1f1f1'},
          ]}
          onPress={() => setFilter('Unread')}>
          <Text
            style={{
              color: filter === 'Unread' ? '#fff' : colors.primary,
              fontSize: 12,
            }}>
            Unread ({JobInvitation?.filter(invite => !invite.is_read).length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.cardContainer}>
        {filteredInvites?.map((invite, index) => {
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
                  <Text key={index} style={styles.cardTitle}>
                    {invite?.job?.job_title?.title}
                  </Text>
                </View>

                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location"
                    color={colors.primary}
                    size={14}
                    style={{padding: 0}}
                  />
                  <Text style={styles.detailsText}>
                    {invite?.job?.job_location?.join(', ')}
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
                      {`${
                        invite?.job?.salary?.yearly?.currency
                      }  ${useCustomFormatAmount(
                        Number(invite?.job?.salary?.yearly?.min),
                      )} - ${useCustomFormatAmount(
                        Number(invite?.job?.salary?.yearly?.max),
                      )} `}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.innerCard}>
                <View style={styles.iconMain}>
                  <Image
                    source={
                      invite?.job?.company?.logo
                        ? {uri: BASE_URL + invite?.job?.company?.logo}
                        : require('../../Assets/CompanyLogo/Swatsan.png')
                    }
                    style={styles.logo}
                  />
                  <View style={styles.companyMaincontainer}>
                    <View style={styles.companyDetail}>
                      <Text style={styles.companyText}>
                        {invite?.job?.company_name
                          ? invite?.job?.company_name
                          : 'Swatsan Tech'}
                      </Text>
                      <Text style={styles.detailscompanytext}>
                        Posted by{' '}
                        {invite?.job?.company_name
                          ? invite?.job?.company_name
                          : 'Swatsan Tech Private Limited'}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.companyDate}>
                  {moment(invite?.date_of_invitation).format('MMM D')}
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
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: 12,
    gap: 12,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  toggleButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
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
    fontSize: 11,
    color: colors.primary,
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
    justifyContent: 'space-between',
  },

  iconMain: {
    flexDirection: 'row',
  },
  companyDetail: {
    flexDirection: 'column',
  },
  companyMaincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 38,
    height: 38,
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
