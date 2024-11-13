// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import {colors} from '../Global_CSS/theamColors';
// import {Button} from 'react-native-paper';
// import {useNavigation} from '@react-navigation/native';

// const UserApplies = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.applyContainer}>
//       <View style={styles.ImageContainer}>
//         <Image
//           source={require('../Assets/ApplyImages/apply.png')}
//           style={styles.Image}
//         />

//         <Text style={styles.textContainer}>You havn't applied yet!</Text>
//       </View>

//       <View style={styles.bottomTextContainer}>
//         <Text style={styles.bottomText}>
//           Search for jobs and start applying. You can track your applications
//           here!
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={styles.buttonContainer}
//         onPress={() => navigation.navigate('searchjob', {query: ''})}>
//         <Text style={styles.buttonText}>Start my job search</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default UserApplies;

// const styles = StyleSheet.create({
//   applyContainer: {
//     flex: 1,
//     backgroundColor: colors.bacground,
//     justifyContent: 'center',
//     width: '100%',
//     alignItems: 'center',
//   },
//   ImageContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 25,
//     textAlign: 'center',
//     padding: 5,
//     // margin: 10,
//   },
//   Image: {
//     height: 200,
//     width: 200,
//   },

//   textContainer: {
//     fontSize: 20,
//     color: colors.textPrimary,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   bottomTextContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 5,
//     padding: 5,
//   },
//   bottomText: {
//     fontSize: 14,
//     color: colors.textPrimary,
//     textAlign: 'center',
//     // paddingHorizontal: 10, // Optional: Add padding for text
//   },

//   buttonContainer: {
//     backgroundColor: colors.textSecondary,
//     borderRadius: 10,
//     padding: 10,
//     margin: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: colors.primary,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// // import React, { useEffect, useState } from 'react';
// // import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { colors } from '../Global_CSS/theamColors';

// // const UserApplies = () => {
// //   const [appliedJobs, setAppliedJobs] = useState([]); // State to store applied jobs
// //   const [loading, setLoading] = useState(true); // Loading state
// //   const navigation = useNavigation();

// //   useEffect(() => {
// //     const checkAppliedJobs = async () => {
// //       try {
// //         const storedAppliedJobs = await AsyncStorage.getItem('appliedJobs');
// //         if (storedAppliedJobs) {
// //           setAppliedJobs(JSON.parse(storedAppliedJobs)); // Set applied jobs from AsyncStorage
// //         } else {
// //           setAppliedJobs([]); // If no applied jobs, set an empty array
// //         }
// //       } catch (error) {
// //         console.error('Error loading applied jobs', error);
// //       } finally {
// //         setLoading(false); // Stop loading once the check is done
// //       }
// //     };

// //     checkAppliedJobs(); // Call the function on component mount
// //   }, []);

// //   // Check if there are applied jobs after loading the applied jobs
// //   useEffect(() => {
// //     if (!loading && appliedJobs.length > 0) {
// //       // If applied jobs exist, navigate to AppliedJobs screen
// //       navigation.navigate('AppliedJobs', { appliedJobs });
// //     }
// //   }, [appliedJobs, loading, navigation]); // Only run this effect when appliedJobs or loading state changes

// //   // If we're still loading, show a spinner
// //   if (loading) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <ActivityIndicator size="large" color={colors.primary} />
// //       </View>
// //     );
// //   }

// //   // If appliedJobs array is empty, show the "You haven't applied" message
// //   if (appliedJobs.length === 0) {
// //     return (
// //       <View style={styles.applyContainer}>
// //         <View style={styles.ImageContainer}>
// //           <Image
// //             source={require('../Assets/ApplyImages/apply.png')}
// //             style={styles.Image}
// //           />
// //           <Text style={styles.textContainer}>You haven't applied yet!</Text>
// //         </View>

// //         <View style={styles.bottomTextContainer}>
// //           <Text style={styles.bottomText}>
// //             Search for jobs and start applying. You can track your applications here!
// //           </Text>
// //         </View>
// //       </View>
// //     );
// //   }

// //   // Return null to prevent rendering the UI when navigation happens automatically
// //   return null;
// // };

// // const styles = StyleSheet.create({
// //   applyContainer: {
// //     flex: 1,
// //     backgroundColor: colors.bacground,
// //     justifyContent: 'center',
// //     width: '100%',
// //     alignItems: 'center',
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   ImageContainer: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingHorizontal: 25,
// //     textAlign: 'center',
// //     padding: 5,
// //   },
// //   Image: {
// //     height: 200,
// //     width: 200,
// //   },
// //   textContainer: {
// //     fontSize: 20,
// //     color: colors.textPrimary,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// //   bottomTextContainer: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     margin: 5,
// //     padding: 5,
// //   },
// //   bottomText: {
// //     fontSize: 14,
// //     color: colors.textPrimary,
// //     textAlign: 'center',
// //   },
// // });

// // export default UserApplies;


import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../Global_CSS/theamColors';
import { useNavigation } from '@react-navigation/native';

const UserApplies = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.applyContainer}>
      <View style={styles.ImageContainer}>
        <Image
          source={require('../Assets/ApplyImages/apply.png')}
          style={styles.Image}
        />
        <Text style={styles.textContainer}>You haven't applied yet!</Text>
      </View>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          Search for jobs and start applying. You can track your applications here!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('searchjob', { query: '' })}
      >
        <Text style={styles.buttonText}>Start my job search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  applyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    textAlign: 'center',
    padding: 5,
  },
  Image: {
    height: 200,
    width: 200,
  },
  textContainer: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 5,
  },
  bottomText: {
    fontSize: 14,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.textSecondary,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default UserApplies;
