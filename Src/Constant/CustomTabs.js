import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import profileStyle from '../Screens/UserProfile/ProfileStyle';

const CustomTabs = ({
  label,
  options, // Options like NOTICEPERIOD_OPTIONS or GENDER_OPTIONS
  selectedValue,
  setFieldValue,
  fieldName,
  error, // Validation error from Formik
  touched, // Touched state from Formik
}) => {
  return (
    <View>
      <Text style={profileStyle.label}>{label}</Text>
      <View style={profileStyle.TabContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              profileStyle.tabBtnStyle,
              selectedValue === option.value
                ? profileStyle.selectedTab
                : profileStyle.unselectedTab,
            ]}
            onPress={() => setFieldValue(fieldName, option.value)}>
            <Text
              style={[
                profileStyle.tabBtnText,
                selectedValue === option.value
                  ? profileStyle.selectedTabText
                  : profileStyle.unselectedTabText,
              ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {touched && error && <Text style={profileStyle.error}>{error}</Text>}
    </View>
  );
};

export default CustomTabs;
