
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { colors } from '../../Global_CSS/TheamColors';

// const UserApplies = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.applyContainer}>
//       <View style={styles.ImageContainer}>
//         <Image
//           source={require('../../Assets/ApplyImages/apply.png')}
//           style={styles.Image}
//         />
//         <Text style={styles.textContainer}>You haven't applied yet!</Text>
//       </View>

//       <View style={styles.bottomTextContainer}>
//         <Text style={styles.bottomText}>
//           Search for jobs and start applying. You can track your applications here!
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={styles.buttonContainer}
//         onPress={() => navigation.navigate('searchjob', { query: '' })}
//       >
//         <Text style={styles.buttonText}>Start my job search</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   applyContainer: {
//     flex: 1,
//     backgroundColor: colors.background,
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
//   },
//   Image: {
//     height: 200,
//     width: 200,
//   },
//   textContainer: {
//     fontSize: 20,
//     color: colors.blackText,
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
//     color: colors.blackText,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     backgroundColor: colors.lightgaryText,
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

// export default UserApplies;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { colors } from '../../Global_CSS/TheamColors';
// import CustomJobCard from '../../Constant/CustomJobCard'; // Assuming CustomJobCard is a component for displaying job cards

// const UserApplies = () => {
//   const navigation = useNavigation();
//   const [appliedJobs, setAppliedJobs] = useState([]);

//   // Fetch applied jobs from AsyncStorage
//   useEffect(() => {
//     const getAppliedJobs = async () => {
//       try {
//         const appliedJobsData = await AsyncStorage.getItem('appliedJobs');
//         if (appliedJobsData) {
//           setAppliedJobs(JSON.parse(appliedJobsData)); // Parse and set applied jobs
//         } else {
//           setAppliedJobs([]); // Set empty array if no data is found
//         }
//       } catch (error) {
//         console.log('Error fetching applied jobs:', error);
//       }
//     };

//     getAppliedJobs();
//   }, []); // Run once when component mounts

//   // Navigate to job search page
//   const handleStartSearch = () => {
//     navigation.navigate('searchjob', { query: '' });
//   };

//   return (
//     <View style={styles.applyContainer}>
//       {appliedJobs.length === 0 ? (
//         // Show message if no jobs have been applied
//         <View style={styles.ImageContainer}>
//           <Image
//             source={require('../../Assets/ApplyImages/apply.png')}
//             style={styles.Image}
//           />
//           <Text style={styles.textContainer}>You haven't applied yet!</Text>
//         </View>
//       ) : (
//         // Show applied jobs if there are any
//         <ScrollView style={styles.jobsListContainer}>
//           <Text style={styles.textContainer}>Your Applied Jobs</Text>
//           {appliedJobs.map((job, index) => (
//             <View key={index} style={styles.jobCardContainer}>
//               <CustomJobCard jobData={job} /> {/* Display applied job details using CustomJobCard */}
//             </View>
//           ))}
//         </ScrollView>
//       )}

//       <View style={styles.bottomTextContainer}>
//         <Text style={styles.bottomText}>
//           {appliedJobs.length === 0
//             ? 'Search for jobs and start applying. You can track your applications here!'
//             : 'You can view and manage your applications here!'}
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={styles.buttonContainer}
//         onPress={handleStartSearch}
//       >
//         <Text style={styles.buttonText}>Start my job search</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   applyContainer: {
//     flex: 1,
//     backgroundColor: colors.background,
//     justifyContent: 'center',
//     width: '100%',
//     alignItems: 'center',
//     padding: 16,
//   },
//   ImageContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 25,
//     textAlign: 'center',
//     padding: 5,
//   },
//   Image: {
//     height: 200,
//     width: 200,
//   },
//   textContainer: {
//     fontSize: 20,
//     color: colors.blackText,
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
//     color: colors.blackText,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     backgroundColor: colors.lightgaryText,
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
//   jobsListContainer: {
//     width: '100%',
//     paddingTop: 16,
//   },
//   jobCardContainer: {
//     marginBottom: 12,
//   },
// });

// export default UserApplies;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../Global_CSS/TheamColors';
import CustomJobCard from '../../Constant/CustomJobCard'; // Assuming CustomJobCard is a component for displaying job cards

const UserApplies = () => {
  const navigation = useNavigation();
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch applied jobs from AsyncStorage
  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const appliedJobsData = await AsyncStorage.getItem('appliedJobs');
        if (appliedJobsData) {
          setAppliedJobs(JSON.parse(appliedJobsData)); // Parse and set applied jobs
        } else {
          setAppliedJobs([]); // Set empty array if no data is found
        }
      } catch (error) {
        console.log('Error fetching applied jobs:', error);
      }
    };

    getAppliedJobs();
  }, []); // Run once when component mounts

  // Navigate to job search page
  const handleStartSearch = () => {
    navigation.navigate('searchjob', { query: '' });
  };

  return (
    <View style={styles.applyContainer}>
      {appliedJobs.length === 0 ? (
        // Show message if no jobs have been applied
        <View style={styles.ImageContainer}>
          <Image
            source={require('../../Assets/ApplyImages/apply.png')}
            style={styles.Image}
          />
          <Text style={styles.textContainer}>You haven't applied yet!</Text>
        </View>
      ) : (
        // Show applied jobs if there are any
        <ScrollView style={styles.jobsListContainer}>
          <Text style={styles.textContainer}>Your Applied Jobs</Text>
          {appliedJobs.map((job, index) => (
            <View key={index} style={styles.jobCardContainer}>
              <CustomJobCard jobData={job} /> {/* Display applied job details using CustomJobCard */}
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          {appliedJobs.length === 0
            ? 'Search for jobs and start applying. You can track your applications here!'
            : 'You can view and manage your applications here!'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleStartSearch}
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
    padding: 16,
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
    color: colors.blackText,
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
    color: colors.blackText,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.lightgaryText,
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
  jobsListContainer: {
    width: '100%',
    paddingTop: 16,
  },
  jobCardContainer: {
    marginBottom: 12,
  },
});

export default UserApplies;


