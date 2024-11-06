import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can use any icon library

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
   
    // backgroundColor: '#808080', // You can customize the background color
  },

  iconContainer: {
    padding: 8,
    marginLeft:10,           
    
    borderRadius: 30,       // Makes the container circular
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,             // Border width
    borderColor: 'black',
  },
});

export default CustomHeader;