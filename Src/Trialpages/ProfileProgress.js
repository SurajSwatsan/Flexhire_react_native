import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
const data = [
  {
    id: '1',
    numbers: '77%',
    name: 'User Profile',
    days: 'updated 8d ago',
    details: '3 mising details',
  },
  {
    id: '2',
    numbers: 524,
    name: 'Search appearance',
    days: 'Last 90 days',
    details: 'View All',
  },
  {
    id: '3',
    numbers: 40,
    name: 'Recruiter actions',
    days: 'Last 90 days',
    details: 'View all',
  },
];
const ProfileProgress = () => {
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.numberContainer}>
        <Text style={styles.itemnumber}>{item.numbers}</Text>
      </View>
      <View>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemdays}>{item.days}</Text>
        <Text style={styles.itemdetails}>{item.details}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  flatListContent: {
    // paddingHorizontal: 10, // Padding for the list
  },
  itemContainer: {
    flexDirection: 'row',
    marginRight: 12,
    alignItems: 'center',
    backgroundColor: '#002233',
    // backgroundColor: '#666363',
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 250,
  },

  itemText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  itemdays: {
    fontSize: 14,
    color: '#ffffff',
  },
  itemdetails: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
  numberContainer: {
    width: 60,
    height: 60,
    marginHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: '#FF6F26',
  },
  itemnumber: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent', // Transparent background color for text to be visible
  },
});

export default ProfileProgress;
