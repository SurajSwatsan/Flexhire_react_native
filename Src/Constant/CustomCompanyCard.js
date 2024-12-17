import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons for stars
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Global_CSS/TheamColors';

const CustomCompanyCard = ({companyData}) => {
  const navigation = useNavigation();

  if (!companyData || typeof companyData !== 'object') {
    return <Text style={styles.errorText}>Invalid job data</Text>;
  }

  // Function to render stars based on rating
  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-border'}
          size={16}
          color="#FFD700"
        />,
      );
    }
    return stars;
  };

  return (
    <View style={styles.companyContainer}>
      <TouchableOpacity
        style={{marginHorizontal: 8}}
        onPress={() => {
          // Navigate to 'CompanyOverview' without passing any data
          // navigation.navigate('CompanyOverview', {
          //   companyData:companyData
          // });
        }}>
        <Image
          source={
            companyData?.top_companies?.company?.logo
              ? {uri: companyData?.company?.logo}
              : require('../Assets/CompanyLogo/Swatsan.png')
          }
          style={styles.companyImage}
        />
        <View>
          <Text style={styles.companyName}>{companyData?.company_name}</Text>
        </View>

        {/* Display Company Rating as Stars */}
        <View style={styles.ratingContainer}>
          {renderStars(Math.round(companyData?.top_companies?.company.rating))}
        </View>

        <Text style={styles.mnctext}>Foreign MNC</Text>

        <Text style={{color: 'blue', textAlign: 'center'}}>View jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  companyContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
  },
  companyImage: {
    width: 38,
    height: 38,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'center',
  },
  companyName: {
    textAlign: 'center',
    fontSize: 12,
    color: 'gray',
    alignSelf: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignSelf: 'center',
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
