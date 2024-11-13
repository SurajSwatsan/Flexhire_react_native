// // // import React, {useEffect, useState} from 'react';
// // // import {View, Text, ScrollView, StyleSheet} from 'react-native';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import CompanyCard from '../ReusableComponents/ReusableJobCard';
// // // import {colors} from '../Global_CSS/theamColors';
// // // import {useNavigation} from '@react-navigation/native';

// // // const AppliedJobScreen = () => {
// // //   const navigation = useNavigation();
// // //   const [companyData, setCompanyData] = useState(null);
// // //   const [appliedJobs, setAppliedJobs] = useState([]); // State to store applied jobs

// // //   // Fetch company and job data from AsyncStorage
// // //   useEffect(() => {
// // //     const fetchCompanyData = async () => {
// // //       try {
// // //         const data = await AsyncStorage.getItem('companyJobData');
// // //         if (data !== null) {
// // //           setCompanyData(JSON.parse(data)); // Set company data from AsyncStorage
// // //         }
// // //       } catch (error) {
// // //         console.error('Error retrieving company data:', error);
// // //       }
// // //     };

// // //     // Fetch applied jobs from AsyncStorage
// // //     const fetchAppliedJobs = async () => {
// // //       try {
// // //         const appliedData = await AsyncStorage.getItem('appliedJobs');
// // //         if (appliedData !== null) {
// // //           setAppliedJobs(JSON.parse(appliedData)); // Set applied jobs from AsyncStorage
// // //         }
// // //       } catch (error) {
// // //         console.error('Error retrieving applied jobs:', error);
// // //       }
// // //     };

// // //     fetchCompanyData();
// // //     fetchAppliedJobs();
// // //   }, []);

// // //   // Show a loading screen while fetching data
// // //   if (!companyData || appliedJobs.length === 0) {
// // //     return <Text>Loading...</Text>;
// // //   }

// // //   // Function to handle navigation when a card is clicked
// // //   const handleCardPress = (companyData, appliedJob) => {
// // //     // Pass the entire companyData and the appliedJob to the JobDetailScreen
// // //     navigation.navigate('JobDetailScreen', {
// // //       company: companyData,
// // //       job: appliedJob,
// // //     });
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <ScrollView contentContainerStyle={styles.innerContainer}>
// // //         {appliedJobs.length > 0 ? (
// // //           appliedJobs.map((appliedJob, index) => {
// // //             const {company_name, logo, location} = companyData.company; // Destructure company data

// // //             // Check if job has been applied
// // //             const isJobApplied = appliedJob.job_title === appliedJob.job_title;

// // //             return (
// // //               <CompanyCard
// // //                 key={index}
// // //                 company={{
// // //                   posted_jobs: [appliedJob], // Wrap each applied job in an array for uniform handling
// // //                   company_name,
// // //                   logo: logo || require('../Assets/Logo/TCS_logo.png'),
// // //                   location,
// // //                 }}
// // //                 onPress={() => handleCardPress(companyData.company)} // Pass company data to navigate to details
// // //                 showBookmarkIcon={false}
// // //                 isJobApplied={isJobApplied} // Pass the applied status to CompanyCard
// // //               />
// // //             );
// // //           })
// // //         ) : (
// // //           <Text style={styles.noJobsText}>No applied jobs available</Text>
// // //         )}
// // //       </ScrollView>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 15,
// // //     backgroundColor: colors.background, // Ensure background color from theme
// // //   },
// // //   loadingText: {
// // //     fontSize: 18,
// // //     color: colors.primary, // Use primary color for loading text
// // //     textAlign: 'center',
// // //     marginTop: 20,
// // //   },
// // //   innerContainer: {
// // //     flexGrow: 1,
// // //     paddingBottom: 20, // Ensure padding at the bottom of the ScrollView
// // //   },
// // //   noJobsText: {
// // //     fontSize: 16,
// // //     color: '#808080',
// // //     textAlign: 'center',
// // //     marginTop: 20,
// // //   },
// // //   companyName: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: colors.primary, // Ensure good visibility
// // //   },
// // // });

// // // export default AppliedJobScreen;

// // import React, { useState, useEffect } from 'react';
// // import { View, Text, ScrollView, StyleSheet } from 'react-native';
// // import { useRoute } from '@react-navigation/native';
// // import CompanyCard from '../ReusableComponents/ReusableJobCard';
// // import { colors } from '../Global_CSS/theamColors';

// // const AppliedJobsScreen = () => {
// //   const route = useRoute();
// //   const { company } = route.params; // Get company data passed from the previous screen

// //   // Debugging: Log the company data to ensure it's passed correctly
// //   console.log("Company data:", company);

// //   // Check if company data is available and if posted_jobs is a valid array
// //   if (!company) {
// //     return (
// //       <Text style={styles.errorText}>
// //         Company data is missing.
// //       </Text>
// //     );
// //   }

// //   if (!Array.isArray(company.posted_jobs)) {
// //     return (
// //       <Text style={styles.errorText}>
// //         Posted jobs data is invalid.
// //       </Text>
// //     );
// //   }

// //   if (company.posted_jobs.length === 0) {
// //     return (
// //       <Text style={styles.errorText}>
// //         No jobs available.
// //       </Text>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       <ScrollView contentContainerStyle={styles.scrollContainer}>
// //         {/* Map over all posted jobs in the company and pass them to CompanyCard */}
// //         {company.posted_jobs.map((job, index) => (
// //           <CompanyCard
// //             key={index}
// //             company={company}
// //             job={job} // Pass each job individually
// //             isJobApplied={true} // Mark jobs as applied (if needed)
// //             showBookmarkIcon={false} // Optionally hide the bookmark icon on applied jobs
// //           />
// //         ))}
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: colors.backgroundColor,
// //   },
// //   scrollContainer: {
// //     paddingBottom: 20,
// //   },
// //   errorText: {
// //     color: 'red',
// //     textAlign: 'center',
// //     marginVertical: 10,
// //   },
// // });

// // export default AppliedJobsScreen;

// // // import React, { useState, useEffect } from 'react';
// // // import { View, Text, ScrollView, StyleSheet } from 'react-native';
// // // import { useRoute } from '@react-navigation/native';
// // // import CompanyCard from '../ReusableComponents/ReusableJobCard';
// // // import { colors } from '../Global_CSS/theamColors';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // const AppliedJobsScreen = () => {
// // //   const [appliedJobs, setAppliedJobs] = useState([]);

// // //   useEffect(() => {
// // //     const loadAppliedJobs = async () => {
// // //       try {
// // //         // Fetch the applied jobs from AsyncStorage
// // //         const storedJobs = await AsyncStorage.getItem('appliedJobs');
// // //         if (storedJobs) {
// // //           // Parse and set the applied jobs state
// // //           setAppliedJobs(JSON.parse(storedJobs));
// // //         }
// // //       } catch (error) {
// // //         console.error('Error loading applied jobs', error);
// // //       }
// // //     };

// // //     loadAppliedJobs();
// // //   }, []); // Empty dependency array ensures it only runs on mount

// // //   // If there are no applied jobs, show an error message
// // //   if (appliedJobs.length === 0) {
// // //     return (
// // //       <Text style={styles.errorText}>No jobs applied yet.</Text>
// // //     );
// // //   }

// // //   return (
// // //     <View style={styles.container}>
// // //       <ScrollView contentContainerStyle={styles.scrollContainer}>
// // //         {/* Map over all applied jobs and pass them to CompanyCard */}
// // //         {appliedJobs.map((job, index) => (
// // //           <CompanyCard
// // //             key={index}
// // //             company={{ company_name: job.company, logo: job.companyLogo }} // Pass company data if needed
// // //             job={{ job_title: job.job_title, job_description: job.job_description }} // Pass job details
// // //             isJobApplied={true} // Mark jobs as applied
// // //             showBookmarkIcon={false} // Optionally hide the bookmark icon on applied jobs
// // //           />
// // //         ))}
// // //       </ScrollView>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: colors.backgroundColor,
// // //   },
// // //   scrollContainer: {
// // //     paddingBottom: 20,
// // //   },
// // //   errorText: {
// // //     color: 'red',
// // //     textAlign: 'center',
// // //     marginVertical: 10,
// // //   },
// // // });

// // // export default AppliedJobsScreen;

// // import React, { useState, useEffect } from 'react';
// // import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { useRoute, useNavigation } from '@react-navigation/native';
// // import CompanyCard from '../ReusableComponents/ReusableJobCard';  // Assuming you have this component to display each job card.
// // import { colors } from '../Global_CSS/theamColors';

// // const AppliedJobsScreen = () => {
// //   const route = useRoute();
// //   const navigation = useNavigation();
// //   const { company } = route.params; // Get company data passed from the previous screen
// //   const [appliedJobs, setAppliedJobs] = useState([]);

// //   // Debugging: Log the company data to ensure it's passed correctly
// //   console.log("Company data:", company);

// //   // Check if company data is available and if posted_jobs is a valid array
// //   if (!company) {
// //     return (
// //       <Text style={styles.errorText}>
// //         Company data is missing.
// //       </Text>
// //     );
// //   }

// //   if (!Array.isArray(company.posted_jobs)) {
// //     return (
// //       <Text style={styles.errorText}>
// //         Posted jobs data is invalid.
// //       </Text>
// //     );
// //   }

// //   if (company.posted_jobs.length === 0) {
// //     return (
// //       <Text style={styles.errorText}>
// //         No jobs available.
// //       </Text>
// //     );
// //   }

// //   // Load applied jobs from AsyncStorage
// //   useEffect(() => {
// //     const loadAppliedJobs = async () => {
// //       try {
// //         const storedAppliedJobs = await AsyncStorage.getItem('appliedJobs');
// //         if (storedAppliedJobs) {
// //           setAppliedJobs(JSON.parse(storedAppliedJobs));
// //         }
// //       } catch (error) {
// //         console.error('Failed to load applied jobs from AsyncStorage', error);
// //       }
// //     };

// //     loadAppliedJobs();
// //   }, []);

// //   // Remove job from applied jobs list
// //   const removeJobFromApplied = async (jobToRemove) => {
// //     const updatedAppliedJobs = appliedJobs.filter(
// //       (job) => job.job_title !== jobToRemove.job_title
// //     );
// //     setAppliedJobs(updatedAppliedJobs);

// //     try {
// //       await AsyncStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
// //     } catch (error) {
// //       console.error('Failed to remove job from AsyncStorage', error);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <ScrollView contentContainerStyle={styles.scrollContainer}>
// //         {appliedJobs.length > 0 ? (
// //           appliedJobs.map((job, index) => (
// //             <View key={index} style={styles.jobCard}>
// //               <CompanyCard
// //                 company={company}
// //                 job={job}
// //                 isJobApplied={true} // Indicate that this job is applied
// //                 showBookmarkIcon={false} // Optionally hide bookmark icon on applied jobs
// //               />
// //               {/* Remove button for each job */}
// //               <TouchableOpacity
// //                 style={styles.removeButton}
// //                 onPress={() => removeJobFromApplied(job)}
// //               >
// //                 <Text style={styles.removeButtonText}>Remove from Applied</Text>
// //               </TouchableOpacity>
// //             </View>
// //           ))
// //         ) : (
// //           <Text style={styles.noJobsText}>No applied jobs yet.</Text>
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const AppliedJobsScreen = ({ route, navigation }) => {
// //   const { companyData } = route.params; // Receive the complete company data passed from JobDetailScreen
// //   const [appliedJobs, setAppliedJobs] = useState([]);

// //   console.log(companyData);

// //   useEffect(() => {
// //     const loadAppliedJobs = async () => {
// //       try {
// //         // Get the applied jobs list from AsyncStorage
// //         const storedAppliedJobs = await AsyncStorage.getItem('appliedJobs');
// //         if (storedAppliedJobs) {
// //           setAppliedJobs(JSON.parse(storedAppliedJobs)); // Set applied jobs data
// //         }
// //       } catch (error) {
// //         console.error('Error loading applied jobs', error);
// //       }
// //     };

// //     loadAppliedJobs();
// //   }, []);

// //   return (
// //         <View style={styles.container}>
// //           <ScrollView contentContainerStyle={styles.scrollContainer}>

// //             {companyData.length > 0 ? (
// //               appliedJobs.map((job, index) => (
// //                 <View key={index} style={styles.jobCard}>
// //                   <CompanyCard
// //                     company={company}
// //                     job={job}
// //                     isJobApplied={true} // Indicate that this job is applied
// //                     showBookmarkIcon={false} // Optionally hide bookmark icon on applied jobs
// //                   />
// //                   {/* Remove button for each job */}
// //                   <TouchableOpacity
// //                     style={styles.removeButton}
// //                     onPress={() => removeJobFromApplied(job)}
// //                   >
// //                     <Text style={styles.removeButtonText}>Remove from Applied</Text>
// //                   </TouchableOpacity>
// //                 </View>
// //               ))
// //             ) : (
// //               <Text style={styles.noJobsText}>No applied jobs yet.</Text>
// //             )}
// //           </ScrollView>
// //         </View>
// //       );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: colors.backgroundColor,
// //     padding: 10,
// //   },
// //   scrollContainer: {
// //     paddingBottom: 20,
// //   },
// //   jobCard: {
// //     backgroundColor: colors.white,
// //     padding: 15,
// //     marginBottom: 20,
// //     borderRadius: 8,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 5,
// //   },
// //   removeButton: {
// //     marginTop: 10,
// //     backgroundColor: colors.danger, // Red background for removal button
// //     paddingVertical: 10,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //   },
// //   removeButtonText: {
// //     color: 'white',
// //     fontSize: 14,
// //   },
// //   noJobsText: {
// //     fontSize: 16,
// //     color: colors.text,
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// //   errorText: {
// //     color: 'red',
// //     textAlign: 'center',
// //     marginVertical: 10,
// //   },
// // });

// // export default AppliedJobsScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { colors } from '../Global_CSS/theamColors';  // Make sure your color scheme is defined
// import CompanyCard from '../ReusableComponents/ReusableJobCard'; // Assuming the path to the card

// const AppliedJobsScreen = ({ route, navigation }) => {
//   const { companyData } = route.params; // Receive the complete company data passed from JobDetailScreen
//   const [appliedJobs, setAppliedJobs] = useState([]);

//   console.log(companyData); // Ensure companyData is properly received

//   // Load applied jobs from AsyncStorage
//   useEffect(() => {
//     const loadAppliedJobs = async () => {
//       try {
//         const storedAppliedJobs = await AsyncStorage.getItem('appliedJobs');
//         if (storedAppliedJobs) {
//           setAppliedJobs(JSON.parse(storedAppliedJobs)); // Set applied jobs data
//         }
//       } catch (error) {
//         console.error('Error loading applied jobs', error);
//       }
//     };

//     loadAppliedJobs();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {appliedJobs.length > 0 ? (
//           appliedJobs.map((job, index) => (
//             <View key={index} >
//               <CompanyCard
//                 company={companyData}  // Pass the complete company data to the CompanyCard
//                 job={job}               // Pass the job data
//                 isJobApplied={true}     // Indicate that this job is applied
//                 showBookmarkIcon={false} // Optionally hide bookmark icon on applied jobs
//               />
//             </View>
//           ))
//         ) : (
//           <Text style={styles.noJobsText}>No applied jobs yet.</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.backgroundColor,
//     padding: 10,
//   },
//   scrollContainer: {
//     paddingBottom: 20,
//   },
//   jobCard: {
//     backgroundColor: colors.white,
//     padding: 15,
//     marginBottom: 20,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   removeButton: {
//     marginTop: 10,
//     backgroundColor: colors.danger, // Red background for removal button
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   removeButtonText: {
//     color: 'white',
//     fontSize: 14,
//   },
//   noJobsText: {
//     fontSize: 16,
//     color: colors.text,
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginVertical: 10,
//   },
// });

// export default AppliedJobsScreen;

import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompanyCard from '../ReusableComponents/ReusableJobCard';
import {colors} from '../Global_CSS/theamColors';
import UserApplies from '../Common/UserApplies';
// import CompanyCard from '../components/CompanyCard'; // Make sure this component is properly imported
// import UserApplies from './UserApplies'; // Import the UserApplies component
// import { colors } from '../Global_CSS/theamColors'; // Assuming the colors are from your theme

const AppliedJobsScreen = ({route, navigation}) => {
  const {companyData, appliedJobs} = route.params; // Receive the complete company data passed from JobDetailScreen
  // const [appliedJobs, setAppliedJobs] = useState([]);
  // const [loading, setLoading] = useState(true);

  console.log('Applied Job:', appliedJobs);
  console.log('Company Data:', companyData);


  // Load applied jobs from AsyncStorage
  // useEffect(() => {
  //   const loadAppliedJobs = async () => {
  //     try {
  //       const storedAppliedJobs = await AsyncStorage.getItem('appliedJobs');
  //       if (storedAppliedJobs) {
  //         setAppliedJobs(JSON.parse(storedAppliedJobs)); // Set applied jobs data
  //       }
  //     } catch (error) {
  //       console.error('Error loading applied jobs', error);
  //     } finally {
  //       setLoading(false); // Stop loading after checking applied jobs
  //     }
  //   };

  //   loadAppliedJobs();
  // }, []);

  // // Apply for job and store it in AsyncStorage
  // const applyForJob = async job => {
  //   try {
  //     const updatedAppliedJobs = [...appliedJobs, job]; // Add the new job to the list
  //     await AsyncStorage.setItem(
  //       'appliedJobs',
  //       JSON.stringify(updatedAppliedJobs),
  //     ); // Save to AsyncStorage
  //     setAppliedJobs(updatedAppliedJobs); // Update the state
  //   } catch (error) {
  //     console.error('Error saving applied job', error);
  //   }
  // };

  // // If loading, show a spinner or something else
  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }
  // console.log(appliedJobs);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job, index) => (
            <CompanyCard
              key={index}
              company={companyData} // Pass the complete company data to the CompanyCard
              job={job} // Pass the job data
              isJobApplied={true} // Indicate that this job is applied
              showBookmarkIcon={false} 
              showCheckmarkIcon={true}// Optionally hide bookmark icon on applied jobs
            />
          ))
        ) : (
          <UserApplies navigation={navigation} /> // Show UserApplies component if no jobs applied
        )}
      </ScrollView>
    </View>
  );
};

// Apply button style for applying for a job
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default AppliedJobsScreen;
