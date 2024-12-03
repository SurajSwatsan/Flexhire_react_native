import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../Global_CSS/TheamColors';
import moment from 'moment';
import CustomHeader from '../../../Constant/CustomBackIcon';
import {useNavigation} from '@react-navigation/native';

const userInterviews = [
  {
    id: 1,
    company: 'Insight Analytics',
    position: 'Software Engineer',
    interviewDate: '2024-12-10',
    status: 'COMPLETED',
    interviewerName: 'John Doe',
    location: 'New York',
    Description:
      'Insight Analytics is a leading provider of AI-powered analytics and data solutions for Fortune 500 companies.',
  },
  {
    id: 2,
    company: 'Tech Innovations',
    position: 'Product Manager',
    interviewDate: '2024-12-12',
    status: 'IN-PROGRESS',
    interviewerName: 'Jane Smith',
    location: 'Remote',
    Description:
      'Tech Innovations is a startup focusing on revolutionizing the tech industry with cutting-edge products in machine learning and blockchain.',
  },
  {
    id: 3,
    company: 'Creative Solutions',
    position: 'UX Designer',
    interviewDate: '2024-12-15',
    status: 'CANCELED',
    interviewerName: '',
    location: 'San Francisco',
    Description:
      'Creative Solutions is a leading design agency known for creating innovative and user-friendly designs for the digital world.',
  },
];

const MyInterviewPage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [currentInterview, setCurrentInterview] = useState(null); // To hold the currently selected interview data

  const openModal = interview => {
    setCurrentInterview(interview); // Set the selected interview
    setModalVisible(true); // Open modal
  };

  const closeModal = () => {
    setModalVisible(false); // Close modal
    setCurrentInterview(null); // Clear selected interview
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader />
        <Text style={styles.headerText}>Interview Details</Text>
      </View>

      {userInterviews.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => openModal(item)} // Pass the whole interview object
            activeOpacity={0.7}>
            <View style={styles.cardHeader}>
              <Text style={styles.companyName}>{item.company}</Text>
              <View
                style={[
                  styles.statusContainer,
                  {
                    backgroundColor:
                      item.status === 'COMPLETED'
                        ? 'rgb(230, 255, 238)'
                        : item.status === 'IN-PROGRESS'
                        ? '#fff9e6'
                        : '#ffe6e6',
                  },
                ]}>
                <Text
                  style={[
                    styles.status,
                    {
                      color:
                        item.status === 'COMPLETED'
                          ? 'green'
                          : item.status === 'IN-PROGRESS'
                          ? '#ffc400'
                          : '#ff0000',
                    },
                  ]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.position}>{item.position}</Text>
            <Text style={styles.date}>
              Interview Date: {moment(item.interviewDate).format('D MMM YYYY')}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Modal for displaying detailed information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Cross icon to close the modal */}
            <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Interview Details</Text>
            {currentInterview && (
              <>
                <Text style={styles.modalCompanyText}>
                  {currentInterview.company}
                </Text>

                {/* Status after company name */}
                <View
                  style={[
                    styles.ModalstatusContainer,
                    {
                      backgroundColor:
                        currentInterview.status === 'COMPLETED'
                          ? 'rgb(230, 255, 238)'
                          : currentInterview.status === 'IN-PROGRESS'
                          ? '#fff9e6'
                          : '#ffe6e6',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.status,
                      {
                        color:
                          currentInterview.status === 'COMPLETED'
                            ? 'green'
                            : currentInterview.status === 'IN-PROGRESS'
                            ? '#ffc400'
                            : '#ff0000',
                      },
                    ]}>
                    {currentInterview.status}
                  </Text>
                </View>

                <Text style={styles.modalPositionText}>
                  {currentInterview.position}
                </Text>

                <View style={styles.locationContainer}>
                  <Text style={styles.modalText}>
                    <Ionicons name="location" size={12} />
                    {currentInterview.location}
                  </Text>
                  <View style={styles.dateText}>
                    <Text style={styles.modalText}>
                      <Ionicons name="calendar" size={12} />
                      {moment(currentInterview.interviewDate).format(
                        'D MMM YYYY',
                      )}
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalText}>
                  {currentInterview.Description}
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.Jobbutton} onPress={''}>
                    <Text style={styles.buttonText}>Job Overview</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={''}>
                    <Text style={styles.buttonText}>Company Overview</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 18,
    backgroundColor: colors.background,
  },
  headerContainer: {
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: colors.blackText,
    marginLeft: 30,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  statusContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
  },
  position: {
    fontSize: 14,
    color: 'gray',
  },
  date: {
    fontSize: 12,
    color: colors.blackText,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  ModalstatusContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,  
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'auto', 
    width: 'auto',    
    alignSelf: 'flex-start',  
},

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.blackText,
  },
  modalCompanyText: {
    fontSize: 14,
    marginBottom: 6,
    color: colors.blackText,
  },
  modalPositionText: {
    fontSize: 12,
    marginBottom: 6,
    color: colors.blackText,
    marginTop: 6,
  },
  modalText: {
    fontSize: 12,
    marginBottom: 6,
    color: colors.blackText,
  },
  locationContainer: {
    flexDirection: 'row',
  },
  dateText: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2, // Spacing between buttons
    backgroundColor: '#ff8000',
  },
  Jobbutton:{
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2, // Spacing between buttons
    backgroundColor: '#ffa31a',

  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default MyInterviewPage;
