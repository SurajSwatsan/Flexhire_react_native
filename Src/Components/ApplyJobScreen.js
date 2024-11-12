// // import React, {useEffect, useState} from 'react';
// // import {View, Text, ScrollView, StyleSheet} from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import CompanyCard from '../GlobalFields/GlobalCard';
// // import {colors} from '../Global_CSS/theamColors';
// // import { useNavigation } from '@react-navigation/native';

// // const AppliedJobScreen = () => {
// //  const navigation = useNavigation();
// //   const [companyData, setCompanyData] = useState(null);

// //   // If the applied job is a single object, make it an array for uniform handling

// //   useEffect(() => {
// //     // Fetch data from AsyncStorage when the component is mounted
// //     const fetchCompanyData = async () => {
// //       try {
// //         const data = await AsyncStorage.getItem('companyJobData');
// //         if (data !== null) {
// //           // Parse the string back into an object
// //           setCompanyData(JSON.parse(data));
// //         }
// //       } catch (error) {
// //         console.error(
// //           'Error retrieving company and job data from AsyncStorage:',
// //           error,
// //         );
// //       }
// //     };

// //     fetchCompanyData();
// //   }, []);

// //   // Show a loading screen if data is still being retrieved
// //   if (!companyData) {
// //     return <Text>Loading...</Text>;
// //   }

// //   // Destructure company and job data from the stored object
// //   const {company, job} = companyData;

// //   const handleCardPress = () => {
// //     // Navigate to the JobDetailScreen and pass the job and company data as params
// //     navigation.navigate('JobDetailScreen', { company });
// //   };

// //  console.log(companyData);

// //   return (
// //     <View style={styles.container}>
// //       <ScrollView contentContainerStyle={styles.innerContainer}>
// //         {company && job ? (
// //           <CompanyCard
// //             company={{
// //               posted_jobs: [job], // Wrap job in an array as `posted_jobs`
// //               company_name: company.company_name,
// //               logo: company.logo || require('../Assets/Logo/TCS_logo.png'),
// //               location: company.location,

// //             }}
// //             onPress={handleCardPress}
// //             showBookmarkIcon= {false}
// //             isa

// //           />
// //         ) : (
// //           <Text style={styles.noJobsText}>No applied jobs available</Text>
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 15,
// //     backgroundColor: colors.bacground, // Use correct background color from theme
// //   },
// //   loadingText: {
// //     fontSize: 18,
// //     color: colors.primary, // Use primary color for loading text
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// //   innerContainer: {
// //     flexGrow: 1,
// //     paddingBottom: 20, // Ensure padding at the bottom of the ScrollView
// //   },
// //   noJobsText: {
// //     fontSize: 16,
// //     color: '#808080',
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// //   companyName: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: colors.primary, // Ensure good visibility
// //   },
// // });

// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CompanyCard from '../GlobalFields/GlobalCard';
// import { colors } from '../Global_CSS/theamColors';
// import { useNavigation } from '@react-navigation/native';

// const AppliedJobScreen = () => {
//   const navigation = useNavigation();
//   const [companyData, setCompanyData] = useState(null);
//   const [appliedJobs, setAppliedJobs] = useState([]); // State to store applied jobs

//   // Fetch company and job data from AsyncStorage
//   useEffect(() => {
//     const fetchCompanyData = async () => {
//       try {
//         const data = await AsyncStorage.getItem('companyJobData');
//         if (data !== null) {
//           setCompanyData(JSON.parse(data)); // Set company data from AsyncStorage
//         }
//       } catch (error) {
//         console.error('Error retrieving company data:', error);
//       }
//     };

//     // Fetch applied jobs from AsyncStorage
//     const fetchAppliedJobs = async () => {
//       try {
//         const appliedData = await AsyncStorage.getItem('appliedJobs');
//         if (appliedData !== null) {
//           setAppliedJobs(JSON.parse(appliedData)); // Set applied jobs from AsyncStorage
//         }
//       } catch (error) {
//         console.error('Error retrieving applied jobs:', error);
//       }
//     };

//     fetchCompanyData();
//     fetchAppliedJobs();
//   }, []);

//   // Show a loading screen while fetching data
//   if (!companyData || appliedJobs.length === 0) {
//     return <Text>Loading...</Text>;
//   }

//   // Destructure company and job data from the companyData object
//   const { company, job } = companyData;

//   // Function to handle navigation when a card is clicked
//   const handleCardPress = () => {
//     navigation.navigate('JobDetailScreen', { company });
//   };

//   // Check if the current job is in the applied jobs list
//   const isJobApplied = appliedJobs.some(appliedJob => appliedJob.job_title === job.job_title);

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.innerContainer}>

//         {company && job ? (
//           <CompanyCard
//             company={{
//               posted_jobs: [job], // Wrap job in an array for uniform handling in CompanyCard
//               company_name: company.company_name,
//               logo: company.logo || require('../Assets/Logo/TCS_logo.png'),
//               location: company.location,
//             }}
//             onPress={handleCardPress}
//             showBookmarkIcon={false} // This is set to false because we are using isJobApplied to decide the icon
//             isJobApplied={isJobApplied} // Pass the applied status to the CompanyCard
//           />
//         ) : (
//           <Text style={styles.noJobsText}>No applied jobs available</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: colors.background, // Ensure background color from theme
//   },
//   loadingText: {
//     fontSize: 18,
//     color: colors.primary, // Use primary color for loading text
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   innerContainer: {
//     flexGrow: 1,
//     paddingBottom: 20, // Ensure padding at the bottom of the ScrollView
//   },
//   noJobsText: {
//     fontSize: 16,
//     color: '#808080',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   companyName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.primary, // Ensure good visibility
//   },
// });

// export default AppliedJobScreen;

import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompanyCard from '../ReusableComponents/ReusableJobCard';
import {colors} from '../Global_CSS/theamColors';
import {useNavigation} from '@react-navigation/native';

const AppliedJobScreen = () => {
  const navigation = useNavigation();
  const [companyData, setCompanyData] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]); // State to store applied jobs

  // Fetch company and job data from AsyncStorage
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await AsyncStorage.getItem('companyJobData');
        if (data !== null) {
          setCompanyData(JSON.parse(data)); // Set company data from AsyncStorage
        }
      } catch (error) {
        console.error('Error retrieving company data:', error);
      }
    };

    // Fetch applied jobs from AsyncStorage
    const fetchAppliedJobs = async () => {
      try {
        const appliedData = await AsyncStorage.getItem('appliedJobs');
        if (appliedData !== null) {
          setAppliedJobs(JSON.parse(appliedData)); // Set applied jobs from AsyncStorage
        }
      } catch (error) {
        console.error('Error retrieving applied jobs:', error);
      }
    };

    fetchCompanyData();
    fetchAppliedJobs();
  }, []);

  // Show a loading screen while fetching data
  if (!companyData || appliedJobs.length === 0) {
    return <Text>Loading...</Text>;
  }

  // Function to handle navigation when a card is clicked
  const handleCardPress = (companyData, appliedJob) => {
    // Pass the entire companyData and the appliedJob to the JobDetailScreen
    navigation.navigate('JobDetailScreen', {
      company: companyData,
      job: appliedJob,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((appliedJob, index) => {
            const {company_name, logo, location} = companyData.company; // Destructure company data

            // Check if job has been applied
            const isJobApplied = appliedJob.job_title === appliedJob.job_title;

            return (
              <CompanyCard
                key={index}
                company={{
                  posted_jobs: [appliedJob], // Wrap each applied job in an array for uniform handling
                  company_name,
                  logo: logo || require('../Assets/Logo/TCS_logo.png'),
                  location,
                }}
                onPress={() => handleCardPress(companyData.company)} // Pass company data to navigate to details
                showBookmarkIcon={false}
                isJobApplied={isJobApplied} // Pass the applied status to CompanyCard
              />
            );
          })
        ) : (
          <Text style={styles.noJobsText}>No applied jobs available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.background, // Ensure background color from theme
  },
  loadingText: {
    fontSize: 18,
    color: colors.primary, // Use primary color for loading text
    textAlign: 'center',
    marginTop: 20,
  },
  innerContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Ensure padding at the bottom of the ScrollView
  },
  noJobsText: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginTop: 20,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary, // Ensure good visibility
  },
});

export default AppliedJobScreen;
