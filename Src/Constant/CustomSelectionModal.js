import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import profileStyle from '../Screens/UserProfile/ProfileStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalFooter from './ProfileModalFooter';
import {colors} from '../Global_CSS/TheamColors';

const CustomSelectionModal = ({
  title,
  data, // Array of objects like [{id: 1, value: 'India'}, {id: 2, value: 'United States'}]
  selectedItems,
  setSelectedItems,
  placeholder,
  isMultiSelect = false,
  maxSelectionLimit,
  onSubmit,
  onCancel,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [validationError, setValidationError] = useState(null);

  // Sync state when `selectedItems` changes
  useEffect(() => {
    if (Array.isArray(selectedItems)) {
      setSelected(selectedItems);
    } else if (selectedItems) {
      setSelected([selectedItems]);
    } else {
      setSelected([]);
    }
  }, [selectedItems]);

  const toggleSelection = item => {
    if (isMultiSelect) {
      // Prevent adding new items if the limit is reached
      if (
        maxSelectionLimit &&
        selected.length >= maxSelectionLimit &&
        !selected.some(selectedItem => selectedItem.id === item.id)
      ) {
        console.log('Selection limit reached'); // Optional: Log limit breach
        return;
      }

      // Add or remove the item
      setSelected(
        prev =>
          prev.some(selectedItem => selectedItem.id === item.id)
            ? prev.filter(selectedItem => selectedItem.id !== item.id) // Remove
            : [...prev, item], // Add
      );
    } else {
      // Replace current selection for single-select
      setSelected([item]);
    }
  };

  const applySelection = () => {
    if (selected.length === 0) {
      setValidationError('Please select at least one item');
      return;
    }
    setValidationError(null);
    setSelectedItems(isMultiSelect ? selected : selected[0] || null);
    setModalVisible(false);
    onSubmit && onSubmit(selected);
  };

  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter(item =>
          item.value.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };

  const resetModal = () => {
    setModalVisible(false);
    setSearchText('');
    setFilteredData(data);
    setValidationError(null);
    onCancel && onCancel();
  };

  const removeChip = id => {
    const updatedSelected = selected.filter(item => item.id !== id);
    setSelected(updatedSelected);
    setSelectedItems(updatedSelected);
  };

  return (
    <View style={Styles.Container}>
      <TouchableOpacity
        style={[Styles.inputBox, Styles.inputContainer]}
        onPress={() => setModalVisible(true)}>
        <Text style={Styles.inputBoxText}>{placeholder}</Text>
        <Ionicons
          name="chevron-down-outline"
          size={24}
          style={Styles.iconstyle}
        />
      </TouchableOpacity>

      {selected.length > 0 && (
        <View style={profileStyle.chipContainer}>
          {selected.map((item, index) => (
            <View key={index} style={profileStyle.chip}>
              <Text style={profileStyle.chipText}>{item.value}</Text>
              <TouchableOpacity onPress={() => removeChip(item.id)}>
                <Ionicons
                  name="close-circle-outline"
                  size={16}
                  style={Styles.iconstyle}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <Modal animationType="slide" transparent visible={isModalVisible}>
        <View style={profileStyle.modalContainer}>
          <View style={Styles.modalHeader}>
            <Text style={profileStyle.formHeading}>{title}</Text>
          </View>
          <TextInput
            style={profileStyle.textarea}
            label="Search..."
            mode="outlined"
            outlineColor="lightgrey"
            textColor="black"
            activeOutlineColor="lightgrey"
            value={searchText}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View key={item.id} style={[profileStyle.itemContainer]}>
                <TouchableOpacity
                  style={[
                    Styles.ItemListContainer,
                    maxSelectionLimit &&
                    selected.length >= maxSelectionLimit &&
                    !selected.some(selectedItem => selectedItem.id === item.id)
                      ? Styles.disabledItem
                      : null,
                  ]}
                  onPress={() => toggleSelection(item)}>
                  <Text
                    style={[
                      Styles.itemText,
                      selected.some(
                        selectedItem => selectedItem.id === item.id,
                      ) && Styles.selectedItemText,
                    ]}>
                    {item.value}
                  </Text>
                  {selected.some(
                    selectedItem => selectedItem.id === item.id,
                  ) && (
                    <Ionicons
                      name="checkmark-sharp"
                      size={18}
                      style={Styles.iconStyle}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
          />
          {validationError && (
            <Text style={Styles.validationError}>{validationError}</Text>
          )}
          <ModalFooter onPress={applySelection} onCancel={resetModal} />
        </View>
      </Modal>
    </View>
  );
};

const Styles = StyleSheet.create({
  Container: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
    paddingBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputBoxText: {
    fontSize: 14,
    color: colors.secodary,
  },
  inputBox: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 36,
    // backgroundColor: '#e29494',
    // paddingHorizontal: 8,
    // marginTop: 12,
  },
  itemText: {
    fontSize: 13,
    color: 'black',
  },
  selectedItemText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#009900',
  },
  iconStyle: {
    color: '#009900',
  },
  ItemListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
  },
  disabledItem: {
    opacity: 0.5,
  },
  validationError: {
    color: 'red',
    fontSize: 14,
    paddingTop: 10,
  },
  iconstyle: {
    color: colors.primary,
  },
});

export default CustomSelectionModal;
