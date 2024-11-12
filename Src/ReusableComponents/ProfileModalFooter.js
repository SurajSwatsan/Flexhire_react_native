import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import GlobalStyle from '../Global_CSS/GlobalStyle';

const ModalFooter = ({
  onPress,
  onCancel,
  onDelete,
  showDelete = false,
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
}) => (
  <View style={styles.modalFooter}>
    <View style={styles.modalButtonContainer}>
      <Button onPress={onPress} labelStyle={GlobalStyle.savelabelStyle}>
        {saveLabel}
      </Button>
      <Button onPress={onCancel} labelStyle={GlobalStyle.closelabelStyle}>
        {cancelLabel}
      </Button>
    </View>
    {showDelete && (
      <IconButton
        icon="delete"
        iconColor="#ff0000"
        size={24}
        onPress={onDelete}
        style={styles.iconButtonStyle}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  modalFooter: {
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16, // Added horizontal padding for better spacing
  },
  modalButtonContainer: {
    flexDirection: 'row-reverse',
    gap: 8,
    flex: 1, // Ensure it fills available space to prevent cramping
  },
  iconButtonStyle: {
    marginLeft: 8,
  },
});

export default ModalFooter;
