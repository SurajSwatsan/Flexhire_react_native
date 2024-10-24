import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {IconButton} from 'react-native-paper';

const ProfileImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePicker = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        setSelectedImage(response.assets[0].uri);
        setModalVisible(false); // Close the modal after selecting the image
      }
    } catch (error) {
      console.error('Image picker failed: ', error);
    }
  };

  // Function to remove the selected image
  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {!selectedImage ? (
          <View style={styles.iconContainer}>
            <IconButton
              icon="camera-plus"
              iconColor="#ffffff"
              size={40}
              style={styles.iconButton}
            />
          </View>
        ) : (
          <Image source={{uri: selectedImage}} style={styles.image} />
        )}
      </TouchableOpacity>

      {/* Modal for selecting or removing image */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalTitle}>Profile picture</Text>
              <Text style={styles.modalText}>
                Profile with photo has 40% higher chances of getting noticed by
                recruiters
              </Text>
            </View>
            <TouchableOpacity
              style={styles.Addbutton}
              onPress={handleImagePicker}>
              {!selectedImage ? (
                <View style={styles.selectediconContainer}>
                  <IconButton
                    icon="camera-plus"
                    iconColor="#fff"
                    size={100}
                    style={styles.iconButton}
                  />
                </View>
              ) : (
                <Image
                  source={{uri: selectedImage}}
                  style={styles.modalimage}
                />
              )}
            </TouchableOpacity>
            <View>
              <View style={styles.horizontalline} />
              <View style={styles.buttonContainer}>
                {!selectedImage ? (
                  <TouchableOpacity
                    style={styles.Cancelbutton}
                    onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={removeImage}>
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.updatebutton}
                  onPress={handleImagePicker}>
                  <Text style={styles.buttonText}>
                    {selectedImage ? 'Update Image' : 'Choose Image'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    //
  },
  selectediconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#808080',
    borderRadius: 100,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContent: {
    width: 'auto',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    left: 10,
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  modalText: {
    left: 10,
    color: '#808080',
    fontSize: 14,
  },
  Addbutton: {
    padding: 10,
  },
  modalimage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  horizontalline: {
    height: 1,
    width: '100%',
    backgroundColor: '#000', // Make the line black for better contrast
    marginVertical: 10, // Add margin to create space above and below the line
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  Cancelbutton: {
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    width: '200',
  },
  updatebutton: {
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: '#5e8776',
    borderRadius: 5,
    width: '200',
  },
  removeButton: {
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileImage;
