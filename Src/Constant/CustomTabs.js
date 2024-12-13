import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import profileStyle from '../Screens/UserProfile/ProfileStyle';
import {colors} from '../Global_CSS/TheamColors';

const CustomTabs = ({
  label,
  options, // Options like GENDER_OPTIONS
  selectedValue,
  setFieldValue,
  fieldName,
  error, // Validation error from Formik
  touched, // Touched state from Formik
}) => {console.log(setFieldValue);

  return (
    <View style={profileStyle.CustomTabContainer}>
      <Text
        style={[
          styles.label, // Base label style
          touched && error ? styles.errorLabel : null, // Apply error styling conditionally
        ]}>
        {label} {/* Always show the label */}
      </Text>
      <View style={profileStyle.TabContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option.id} // Use the `id` as the unique key
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
              {option.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = {
  label: {
    fontSize: 12,
    color: colors.secondary,
  },
  errorLabel: {
    color: 'red',
  },
};
export default CustomTabs;
