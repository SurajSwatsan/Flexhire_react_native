// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {TextInput} from 'react-native-paper';

// const Education = () => {
//   const [projectStatus, setProjectStatus] = useState('inProgress');
//   const [workedFrom, setWorkedFrom] = useState(new Date());
//   const [workedTill, setWorkedTill] = useState(new Date());
//   const [showWorkedFromPicker, setShowWorkedFromPicker] = useState(false);
//   const [showWorkedTillPicker, setShowWorkedTillPicker] = useState(false);

//   const handleStatusChange = status => {
//     setProjectStatus(status);
//   };
//   const saveDates = () => {
//     // Logic to save the dates, e.g., API call or local storage
//     console.log('Worked From:', workedFrom);
//     console.log('Worked Till:', workedTill);
//   };
//   // Format the date to a readable string
//   const formatDate = date => {
//     if (!date) return '';
//     return date.toLocaleDateString(); // Convert Date object to a string
//   };
//   // Handle date changes for Worked From
//   const handleWorkedFromChange = (event, date) => {
//     setShowWorkedFromPicker(false);
//     if (date) {
//       setWorkedFrom(date);
//     }
//   };
//   // Handle date changes for Worked Till with validation
//   const handleWorkedTillChange = (event, date) => {
//     setShowWorkedTillPicker(false);
//     if (date) {
//       if (date <= workedFrom) {
//         Alert.alert(
//           'Invalid Date',
//           'Worked Till must be greater than Worked From.',
//         );
//       } else {
//         setWorkedTill(date);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Project Status</Text>

//       <Button
//         title="In Progress"
//         onPress={() => handleStatusChange('inProgress')}
//         color={projectStatus === 'inProgress' ? 'blue' : 'gray'}
//       />
//       <Button
//         title="Finished"
//         onPress={() => handleStatusChange('finished')}
//         color={projectStatus === 'finished' ? 'blue' : 'gray'}
//       />

//       {/* Show Worked From and Worked Till Date Pickers */}
//       <View>
//         <TouchableOpacity onPress={() => setShowWorkedFromPicker(true)}>
//           <TextInput
//             style={styles.inputBox}
//             label="Worked from*"
//             mode="outlined"
//             textColor="#333"
//             outlineColor="lightgray"
//             activeOutlineColor="gray"
//             value={workedFrom.toLocaleString('default', {
//               month: 'long',
//               year: 'numeric',
//             })}
//             editable={false} // Makes the input box non-editable
//           />
//         </TouchableOpacity>
//         {showWorkedFromPicker && (
//           <DateTimePicker
//             value={workedFrom}
//             mode="date"
//             display="default"
//             onChange={handleWorkedFromChange}
//           />
//         )}
//         <Text style={styles.selectedDate}>{formatDate(workedFrom)}</Text>

//         {projectStatus === 'finished' && (
//           <>
//             <TouchableOpacity onPress={() => setShowWorkedTillPicker(true)}>
//               <TextInput
//                 style={styles.inputBox}
//                 label="Worked till*"
//                 mode="outlined"
//                 textColor="#333"
//                 outlineColor="lightgray"
//                 activeOutlineColor="gray"
//                 value={workedTill.toLocaleString('default', {
//                   month: 'long',
//                   year: 'numeric',
//                 })}
//                 editable={false} // Makes the input box non-editable
//               />
//             </TouchableOpacity>
//             {showWorkedTillPicker && (
//               <DateTimePicker
//                 value={workedTill}
//                 mode="date"
//                 display="default"
//                 onChange={handleWorkedTillChange}
//               />
//             )}
//             <Text style={styles.selectedDate}>{formatDate(workedTill)}</Text>
//           </>
//         )}
//       </View>

//       <Button title="Save Dates" onPress={saveDates} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     marginTop: 10,
//   },
//   selectedDate: {
//     marginTop: 10,
//     fontSize: 16,
//     color: 'gray',
//   },
// });



// export default Education;
