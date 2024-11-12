import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReusableDatePicker = ({label, value, onChange}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false); // Close picker after date selection
    if (selectedDate) {
      onChange(selectedDate); // Call parent onChange function with the selected date
    }
  };

  return (
    <View style={styles.dateContainer}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.inputBox}
          label={label}
          mode="outlined"
          textColor="#333"
          outlineColor="lightgray"
          activeOutlineColor="gray"
          value={value.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
          editable={false} // Makes the input box non-editable
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flex: 1,
    marginVertical: 8,
  },
  inputBox: {
    backgroundColor: '#fff',
  },
});

export default ReusableDatePicker;
