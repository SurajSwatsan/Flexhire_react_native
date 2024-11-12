import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../Global_CSS/theamColors';
const screenWidth = Dimensions.get('window').width;
const horizontalMargin = 12 * 2; // Total margin (left + right)

const effectiveWidth = screenWidth - horizontalMargin;
const ReusableDropdown = ({options, placeholder, onSelect}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleSelect = item => {
    setSelectedItem(item);
    onSelect(item);
    setIsFocus(false);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'gray'}]}
        data={options}
        labelField="label"
        valueField="value"
        search
        searchPlaceholder="Search..."
        inputSearchStyle={styles.inputSearchStyle}
        placeholder={placeholder}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={{color: '#000'}}
        value={selectedItem?.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => handleSelect(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    // padding: 12,
  },
  dropdown: {
    width: effectiveWidth,
    height: 51,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#888',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  inputSearchStyle: {
    color: colors.textPrimary,
  },
});

export default ReusableDropdown;
