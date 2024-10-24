import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import Introduction from './Introduction';
import ProfileImage from './ProfileImage';
import Basicdetails from './Basicdetails';
import Profilesummary from './Profilesummary';
import Professionaldetails from './Professionaldetails';
import Keyskills from './Keyskills';
import Personaldetails from './Personaldetails';
import Languages from './Languages';

const Index = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={{marginVertical: 12}}>
        <ProfileImage />
      </View>
      <View style={{}}>
        <Introduction />
      </View>
      <View style={{}}>
        <Basicdetails />
      </View>
      <View style={{}}>
        <Profilesummary />
      </View>
      <View style={{}}>
        <Professionaldetails />
      </View>
      <View style={{}}>
        <Keyskills />
      </View>
      <View style={{}}>
        <Personaldetails />
      </View>
      <View style={{}}>
        <Languages />
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#004466',
  },
});
