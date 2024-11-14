import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons for stars
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Global_CSS/TheamColors';

const CustomCompanyCard = ({jobData}) => {
  const navigation = useNavigation();

  if (!jobData || typeof jobData !== 'object') {
    return <Text style={styles.errorText}>Invalid job data</Text>;
  }

  // Function to render stars based on rating
  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-border'} // Filled star or empty star
          size={16}
          color="#FFD700" // Gold color for stars
        />,
      );
    }
    return stars;
  };

  return (
    <View style={styles.companyContainer}>
      <TouchableOpacity
        style={{marginHorizontal: 8}}
        onPress={() => navigation.navigate('JobDetailScreen', {jobData})}>
        <Image
          source={
            jobData.company.logo
              ? {uri: jobData.company.logo}
              : require('../Assets/CompanyLogo/TCS_logo.png')
          }
          style={styles.companyImage}
        />
        <View>
          <Text style={styles.companyName}>{jobData.company.company_name}</Text>
        </View>

        {/* Display Company Rating as Stars */}
        <View style={styles.ratingContainer}>
          {renderStars(Math.round(jobData.company.rating))}
        </View>
<<<<<<< HEAD
          {/* <View> */}
        <Text style={styles.mnctext}>Foreign MNC</Text>
        {/* </View> */}
        <Text style={{color:'blue',textAlign:'center'}}>View jobs</Text>
=======

        <Text style={styles.mnctext}>Foreign MNC</Text>

        <Text style={{color: 'blue', textAlign: 'center'}}>View jobs</Text>
>>>>>>> a4255f9c613925c72ef8cdbfbe63b7a06d91de10
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  companyContainer: {
<<<<<<< HEAD
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
  //  alignContent:'center',
  justifyContent:'center',
  // alignSelf:'center',
    // borderWidth: 1,            // Set border width
    // borderColor: '#ccc',   


=======
    width:'100%',
    // maxWidth:
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    // marginRight: ,
    //  alignContent:'center',
    justifyContent: 'center',
    // alignSelf:'center',
    // borderWidth: 1, 
    // borderColor: '#ccc',
>>>>>>> a4255f9c613925c72ef8cdbfbe63b7a06d91de10
  },
  companyImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 10,
    // marginLeft:20,
<<<<<<< HEAD
    margin:10,
    alignSelf:'center'
    
=======
    margin: 10,
    alignSelf: 'center',
>>>>>>> a4255f9c613925c72ef8cdbfbe63b7a06d91de10
  },
  companyName: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
<<<<<<< HEAD
    alignSelf:'center'
=======
    alignSelf: 'center',
>>>>>>> a4255f9c613925c72ef8cdbfbe63b7a06d91de10
  },
  location: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  jobLocation: {
    fontSize: 12,
    color: '#808080',
    marginLeft: -12,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 4,
<<<<<<< HEAD
    alignSelf:'center'
=======
    alignSelf: 'center',
>>>>>>> a4255f9c613925c72ef8cdbfbe63b7a06d91de10
  },

  mnctext: {
    backgroundColor: colors.background,
    color: colors.blackText,
    fontSize: 12,
    margin: 5,
    padding: 5,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  mnctext: {
    backgroundColor: colors.background,
    color: colors.blackText,
    fontSize: 12,
    margin: 5,
    padding: 5,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default CustomCompanyCard;
