import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {Button, IconButton} from 'react-native-paper';
import GlobalStyle from '../../Global_CSS/GlobalStyle';

const UserResume = () => {
  const [fileName, setFileName] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'This app needs access to your storage to pick files.',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const pickFile = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (res && res.length > 0) {
        setFileName(res[0].name);
        setFileUri(res[0].uri);
        setIsAddModalVisible(false); // Close add modal on file selection
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error picking the file:', err);
      }
    }
  };

  const openAddModal = () => {
    setIsAddModalVisible(true);
  };

  const openUpdateModal = () => {
    if (fileName) setIsUpdateModalVisible(true);
  };

  const deleteResume = () => {
    setFileName('');
    setFileUri('');
    setIsUpdateModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headercontainer}>
        <Text style={styles.header}>Resume</Text>
        {!fileName ? (
          <TouchableOpacity onPress={openAddModal}>
            <Text style={styles.upladbtn}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openUpdateModal}>
            <Text style={styles.upladbtn}>Update</Text>
          </TouchableOpacity>
        )}
      </View>

      {fileName ? (
        <TouchableOpacity onPress={openAddModal} style={styles.uploadfile}>
          <Image
            style={{
              height: 80,
              width: 80,
              alignSelf: 'center',
              marginVertical: 8,
            }}
            source={require('../../Assets/Images/Folder.png')}
          />
          {/* <IconButton icon="file-plus" iconColor="#f2f2f2" size={50} /> */}
          <Text style={styles.textContent}>
            {/* Selected File {'\n'} */}
            {fileName}
          </Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity onPress={openAddModal} style={styles.uploadfile}>
            <Image
              style={{
                height: 80,
                width: 80,
                alignSelf: 'center',
                marginVertical: 8,
              }}
              source={require('../../Assets/Images/Add_Documents2.png')}
            />
            {/* <IconButton icon="file-plus" iconColor="#f2f2f2" size={50} /> */}
            <Text style={styles.upresumetext}>Upload Resume</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add Modal for selecting storage type */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isAddModalVisible}
        onRequestClose={() => setIsAddModalVisible(false)}>
        <View style={styles.addmodalContainer}>
          <View style={styles.addmodalContent}>
            <Text style={styles.addmodalHeading}>Upload Resume</Text>
            <Text style={styles.addmodalDescription}>
              70% of recruiters discover candidates through their resume
            </Text>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconContainer} onPress={pickFile}>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    alignSelf: 'center',
                    marginVertical: 8,
                  }}
                  source={require('../../Assets/Images/device_folder.png')}
                />

                <Text style={styles.iconname}>Mobile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    alignSelf: 'center',
                    marginVertical: 8,
                  }}
                  source={require('../../Assets/Images/google-drive.png')}
                />
                <Text style={styles.iconname}>Drive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer} onPress={() => {}}>
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    alignSelf: 'center',
                    marginVertical: 8,
                  }}
                  source={require('../../Assets/Images/mail.png')}
                />
                <Text style={styles.iconname}>Email</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.formatText}>
              Format: DOC, DOCx, PDF, RTF | maximum file size: 2 MB
            </Text>
            <Button
              onPress={() => setIsAddModalVisible(false)}
              labelStyle={GlobalStyle.labelStyle}>
              Close
            </Button>
          </View>
        </View>
      </Modal>

      {/* Update Modal for showing resume preview with Update and Delete buttons */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isUpdateModalVisible}
        onRequestClose={() => setIsUpdateModalVisible(false)}>
        <View style={styles.updatemodalContainer}>
          <View style={styles.updatemodalContent}>
            <View style={styles.modalheadingContainer}>
              <Text style={styles.updatemodalHeading}>Update Resume</Text>
              <Text style={styles.updatemodalDescription}>
                70% of recruiters discover candidates through their resume
              </Text>
            </View>
            <View style={styles.filepreviewContainer}>
              <TouchableOpacity onPress={pickFile}>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                    alignSelf: 'center',
                    marginVertical: 8,
                  }}
                  source={require('../../Assets/Images/Update_Documents.png')}
                />
                <Text style={styles.updatetextContent}>
                  {/* Selected File {'\n'} */}
                  {fileName}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ButtonContainer}>
              <View>
                <IconButton
                  icon="delete-circle"
                  iconColor="red"
                  size={36}
                  onPress={deleteResume} // Call deleteSkill function here
                  style={styles.iconButtonStyle} // Define style in styles object
                />
                {/* <Button
                  labelStyle={GlobalStyle.labelStyle}
                  onPress={deleteResume}>
                  Delete
                </Button> */}
              </View>
              <View style={{flexDirection: 'row-reverse'}}>
                <Button
                  onPress={pickFile}
                  labelStyle={GlobalStyle.savelabelStyle}>
                  Update
                </Button>
                <Button
                  onPress={() => setIsUpdateModalVisible(false)}
                  labelStyle={GlobalStyle.closelabelStyle}>
                  Cancel
                </Button>
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
    backgroundColor: '#00334d',
    flex: 1,
    margin: 12,
    borderRadius: 8,
  },
  headercontainer: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  upladbtn: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContent: {
    color: '#000',
    marginBottom: 12,
  },
  uploadfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 18,
    borderWidth: 1,
    borderColor: '#808080',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  upresumetext: {
    fontSize: 12,
    marginVertical: 12,
    color: '#000000',
  },
  addmodalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  addmodalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    // alignItems: 'center',
  },
  addmodalHeading: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addmodalDescription: {
    fontSize: 14,
    marginBottom: 12,
    color: '#555',
  },
  updatemodalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  updatemodalContent: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  updatemodalHeading: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updatemodalDescription: {
    fontSize: 14,
    // textAlign: 'center',
    marginBottom: 12,
    color: '#555',
  },
  iconRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconname: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconContainer: {
    height: 80,
    width: 80,
    marginRight: 12,
    // padding: 12,
    borderRadius: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formatText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 20,
  },
  previewText: {
    fontSize: 14,
    marginVertical: 15,
    color: '#555',
  },
  filepreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,

    borderRadius: 8,
    overflow: 'hidden',
  },
  updatetextContent: {
    color: '#000',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 12,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    alignItems: 'center',
  },
});

export default UserResume;
