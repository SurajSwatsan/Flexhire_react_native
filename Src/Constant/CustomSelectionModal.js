import React, {useState} from 'react';
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
  data,
  selectedItems,
  setSelectedItems,
  placeholder,
  isMultiSelect = false,
  maxSelectionLimit, // No default value, should be passed if required
  onSubmit,
  onCancel,
  onDelete, // Assuming you still want to keep delete functionality as an option
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selected, setSelected] = useState(selectedItems || []);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [validationError, setValidationError] = useState(null); // Validation error state

  const toggleSelection = item => {
    if (isMultiSelect) {
      // Check if selection limit is passed and is reached, do nothing if the limit is reached
      if (
        maxSelectionLimit &&
        selected.length >= maxSelectionLimit &&
        !selected.includes(item)
      ) {
        return; // Do nothing if the limit is reached
      } else {
        setSelected(prev =>
          prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
        );
      }
    } else {
      setSelected([item]);
    }
  };

  const applySelection = () => {
    if (selected.length === 0) {
      setValidationError('Please select at least one item');
      return; // Do not submit if no items are selected
    }

    // Reset validation error when a valid selection is made
    setValidationError(null);

    setSelectedItems(isMultiSelect ? selected : selected[0] || null);
    setModalVisible(false); // Close the modal
    onSubmit && onSubmit(selected);
  };
  const onRemoveChip = value => {
    const updatedSelected = selected.filter(item => item.value !== value);
    setSelected(updatedSelected);
    setSelectedItems(updatedSelected); // Update parent state
  };
  const handleSearch = text => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(data); // Show full list when search is cleared
    } else {
      setFilteredData(
        data.filter(item =>
          item.label.toLowerCase().includes(text.toLowerCase()),
        ),
      );
    }
  };

  const resetModal = () => {
    setModalVisible(false); // Close the modal
    setSelected([]); // Reset selected items
    setSearchText(''); // Reset search input
    setFilteredData(data); // Reset data
    setValidationError(null); // Reset validation error
    onCancel && onCancel(); // Trigger the cancel callback if provided
  };

  return (
    <View>
      {/* Input box to open the modal */}

      <View>
        {/* TouchableOpacity for selection */}
        <TouchableOpacity
          style={[Styles.inputBox, Styles.inputContainer]}
          onPress={() => setModalVisible(true)}>
          <Text style={Styles.inputBoxText}>{placeholder}</Text>
          <Ionicons
            name="add-circle-outline"
            size={24}
            style={Styles.iconstyle}
          />
        </TouchableOpacity>

        {/* Display selected items as chips */}
        {selected.length > 0 && (
          <View style={Styles.chipContainer}>
            {selected.map(item => (
              <View key={item.value} style={Styles.chip}>
                <Text style={Styles.chipText}>{item.label}</Text>
                <TouchableOpacity onPress={() => onRemoveChip(item.value)}>
                  <Ionicons
                    name="close-circle-outline"
                    size={16}
                    style={Styles.closeIcon}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Modal */}
      <Modal animationType="slide" transparent visible={isModalVisible}>
        <View style={profileStyle.modalContainer}>
          <View style={Styles.modalHeader}>
            <Text style={profileStyle.formHeading}>{title}</Text>
          </View>

          {/* Conditionally render the note */}
          {maxSelectionLimit && (
            <Text style={Styles.note}>
              Note: You can select a maximum of {maxSelectionLimit} {title}
            </Text>
          )}

          <TextInput
            style={profileStyle.textarea}
            label="Search.."
            mode="outlined"
            outlineColor="lightgrey"
            textColor="black"
            activeOutlineColor="lightgrey"
            value={searchText}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredData} // Use filteredData for the list
            keyExtractor={item => item.value}
            renderItem={({item}) => (
              <View key={item.value} style={[profileStyle.itemContainer]}>
                <View
                  style={[
                    Styles.SkillListContainer,
                    maxSelectionLimit &&
                    selected.length >= maxSelectionLimit &&
                    !selected.includes(item)
                      ? Styles.disabledItem // Disable item if the limit is reached
                      : null,
                  ]}
                  onTouchEnd={() => toggleSelection(item)}>
                  <Text
                    style={[
                      Styles.itemText,
                      selected.includes(item) && Styles.selectedItemText,
                    ]}>
                    {item.label}
                  </Text>
                  {selected.includes(item) && (
                    <Ionicons
                      name="checkmark-sharp"
                      size={18}
                      style={Styles.iconStyle}
                    />
                  )}
                </View>
              </View>
            )}
          />

          {/* Validation Error */}
          {validationError && (
            <Text style={Styles.validationError}>{validationError}</Text>
          )}

          {/* ModalFooter with actions */}
          <ModalFooter
            onPress={applySelection}
            onCancel={resetModal} // Reset modal on cancel
          />
        </View>
      </Modal>
    </View>
  );
};

const Styles = StyleSheet.create({
  modalHeader: {},
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputBoxText: {
    fontSize: 16,
    color: '#000',
  },
  inputBox: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 48,

    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderRadius: 5,
    // borderColor: '#ccc',
    paddingHorizontal: 8,
    marginVertical: 12,
  },
  note: {
    fontSize: 12,
    color: 'black',
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
  SkillListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
  },
  disabledItem: {
    opacity: 0.5, // Make it look disabled
  },
  validationError: {
    color: 'red',
    fontSize: 14,
    paddingTop: 10,
  },
  iconstyle: {
    color: colors.primary,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: {
    color: '#000',
    marginRight: 8,
  },
  closeIcon: {
    color: colors.primary,
  },
});

export default CustomSelectionModal;
