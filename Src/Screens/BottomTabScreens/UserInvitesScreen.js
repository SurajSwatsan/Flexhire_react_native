import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';

const UserInvitesScreen = () => {
  return (
    <View style={styles.inviteContainer}>
      <View style={styles.textContainer}>
        <Image source={require('../../Assets/invitesImages/Invite.png')}
         style={styles.image}
        />
        <Text style={styles.inviteText}>Nvites:Your invitation to apply</Text>
        <Text style={styles.contentText}>
          Recruiters have chosen you from a large pool of candidates to apply to
          these jobs.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inviteContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
    flex: 1,
  },
  textContainer: {
    // marginVertical:12
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    height:100,
    width:100
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
  },
});

export default UserInvitesScreen;
