import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons for stars
import {colors} from '../Global_CSS/TheamColors';
import {useNavigation} from '@react-navigation/native';

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

        <Text>Foreign MNC</Text>
        <Text>View jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  companyContainer: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 8,
  },
  companyImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 10,
  },
  companyName: {
    fontSize: 12,
    color: 'gray',
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
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CustomCompanyCard;
