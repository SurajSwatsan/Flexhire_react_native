import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {colors} from '../../Global_CSS/TheamColors';

const screenWidth = Dimensions.get('window').width;
const horizontalMargin = 12 * 2;
const effectiveWidth = screenWidth - horizontalMargin;

const CustomMultiSelectDrop = ({options, placeholder, onSelect}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = items => {
    setSelectedItems(items);
    onSelect(items); // Pass the selected items to the parent component
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        items={options}
        uniqueKey="value"
        onSelectedItemsChange={handleSelect}
        selectedItems={selectedItems}
        selectText={placeholder}
        searchInputPlaceholderText="Search..."
        tagRemoveIconColor={colors.primary}
        tagBorderColor={colors.primary}
        tagTextColor={colors.primary}
        selectedItemTextColor={colors.primary}
        selectedItemIconColor={colors.primary}
        itemTextColor="#000"
        displayKey="label"
        searchInputStyle={styles.searchInputStyle}
        submitButtonColor={colors.primary}
        submitButtonText="Select"
        styleDropdownMenu={styles.dropdownMenu}
        styleDropdownMenuSubsection={styles.dropdownMenuSubsection}
        styleInputGroup={styles.inputGroup}
        styleListContainer={styles.listContainer}
        styleSelectorContainer={styles.selectorContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  dropdownMenu: {
    width: effectiveWidth,
    height: 51,
    borderWidth: 1,
    borderColor: colors.lightgaryText,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dropdownMenuSubsection: {
    paddingHorizontal: 8,
  },
  searchInputStyle: {
    color: colors.blackText,
  },
  inputGroup: {
    borderBottomWidth: 0,
  },
  listContainer: {
    backgroundColor: '#fff',
  },
  selectorContainer: {
    marginTop: 5,
  },
});

export default CustomMultiSelectDrop;
