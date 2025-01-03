import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {IconButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileViewController from '../../../Redux/Action/UserProfileViewController';
import {colors} from '../../../Global_CSS/TheamColors';

const ProfileImage = ({onImageSelect, selectedImage, profileDetails}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [id, setId] = useState();
  const dispatch = useDispatch();

  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data');
        setId(id);
      } catch (error) {
        console.error('Error reading value from AsyncStorage', error);
      }
    };

    getUserData();
    setImage(profileDetails?.profile_photo);
  }, [profileDetails]);

  // console.log(
  //   'profileDetails id',
  //   JSON.stringify(profileDetails, null, 2),
  // );

  const handleImagePicker = async () => {
    try {
      const response = await launchImageLibrary({mediaType: 'photo'});
      console.log('Image picker response: ', response);
      
      if (response.assets) {
        const uri = response.assets[0].uri;
        onImageSelect(uri);
        setImage(uri); // Update local state
      }
    } catch (error) {
      console.error('Image picker failed: ', error);
    }
  };

  const handleSubmit = async () => {

    const formattedValues = {
      id: profileDetails?.id
        ? profileDetails?.id
        : '',
      user_id: id,
      profile_photo: image, // Pass the selected image URI
    };

    // if (profileDetails?.id) {
    //   dispatch(updateProfileDetails(updatedData));
    // } else {
    //   dispatch(addProfileDetails(updatedData));
    // }
    console.log('updatedData', formattedValues);

    setModalVisible(false);
  };

  const removeImage = () => {
    onImageSelect(null);
    setImage(''); // Reset local state
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {!selectedImage ? (
          <View style={styles.iconContainer}>
            <IconButton
              icon="camera-plus"
              iconColor="#333"
              size={40}
              style={styles.iconButton}
            />
          </View>
        ) : (
          <Image source={{uri: selectedImage}} style={styles.image} />
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profile Picture</Text>
            <Text style={styles.modalText}>
              Profile with a photo has 40% higher chances of getting noticed by
              recruiters
            </Text>
            <TouchableOpacity
              style={styles.Addbutton}
              onPress={handleImagePicker}>
              {!image ? (
                <View style={styles.selectediconContainer}>
                  <IconButton
                    icon="camera-plus"
                    iconColor="#fff"
                    size={100}
                    style={styles.iconButton}
                  />
                </View>
              ) : (
                <Image source={{uri: image}} style={styles.modalimage} />
              )}
            </TouchableOpacity>
            <View style={styles.horizontalline} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.Cancelbutton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={removeImage}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.updatebutton}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                  {image ? 'Update Image' : 'Submit'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: colors.cardBgcolor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: colors.cardBgcolor,
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
    backgroundColor: '#000',
    marginVertical: 10,
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
  },
  updatebutton: {
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: '#5e8776',
    borderRadius: 5,
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
