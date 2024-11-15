import React from 'react';
import {TextInput} from 'react-native-paper';
import {useField} from 'formik';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const horizontalMargin = 12 * 2; // Total margin (left + right)

const effectiveWidth = screenWidth - horizontalMargin;
const ReusableTextInput = ({name, label, ...props}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <View style={styles.inputfieldContainer}>
        <TextInput
          label={label}
          style={styles.textarea}
          // mode="outlined"
          outlineColor="lightgrey"
          textColor="black"
          activeOutlineColor="lightgrey"
          value={field.value}
          onChangeText={text => helpers.setValue(text)}
          onBlur={() => helpers.setTouched(true)}
          error={meta.touched && meta.error}
          {...props}
        />
        {meta.touched && meta.error && (
          <Text style={styles.error}>{meta.error}</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputfieldContainer: {
    marginVertical: 12,
  },
  textarea: {
    backgroundColor: 'white',
    width: effectiveWidth,
    height: 48,
    borderColor: 'lightgrey',
  },
  error: {
    color: 'red',
    // marginTop: 4,
    fontSize: 11,
  },
});
export default ReusableTextInput;
