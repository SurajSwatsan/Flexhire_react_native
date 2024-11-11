// // // // // import React from "react";
// // // // // import { Text, View } from "react-native";

// // // // // const ApplyJobScreen= () =>{
// // // // //     return(
// // // // // <View>
// // // // //     <Text>
// // // // //     Hello</Text></View>
// // // // //     );
// // // // // };
// // // // // // export default ApplyJobScreen;

// // // // import React, { useEffect, useState } from 'react';
// // // // import { View, Text } from 'react-native';
// // // // import AsyncStorage from '@react-native-async-storage/async-storage';

// // // // const AppliedJobScreen = () => {
// // // //   const [appliedJob, setAppliedJob] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchAppliedJob = async () => {
// // // //       try {
// // // //         const jobData = await AsyncStorage.getItem('appliedJob');
// // // //         if (jobData !== null) {
// // // //           setAppliedJob(JSON.parse(jobData));
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Error fetching data from AsyncStorage", error);
// // // //       }
// // // //     };

// // // //     fetchAppliedJob();
// // // //   }, []);

// // // //   if (!appliedJob) {
// // // //     return (
// // // //       <View>
// // // //         <Text>Loading...</Text>
// // // //       </View>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <View>
// // // //       <Text>Job Title: {appliedJob.jobTitle}</Text>
// // // //       <Text>Company: {appliedJob.companyName}</Text>
// // // //       <Text>Location: {appliedJob.location}</Text>
// // // //       <Text>Salary: {appliedJob.salary}</Text>
// // // //       <Text>Description: {appliedJob.jobDescription}</Text>
// // // //     </View>
// // // //   );
// // // // };

// // // // export default AppliedJobScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CompanyCard from '../GlobalFields/GlobalCard';
// import { colors } from '../Global_CSS/theamColors';

// const AppliedJobScreen = () => {
//   const [appliedJob, setAppliedJob] = useState(null);

//   useEffect(() => {
//     const fetchAppliedJob = async () => {
//       try {
//         // Fetching the applied job data from AsyncStorage
//         const jobDetails = await AsyncStorage.getItem('appliedJob');
//         if (jobDetails !== null) {
//           setAppliedJob(JSON.parse(jobDetails)); // Parse and set the applied job data
//         }
//       } catch (error) {
//         console.error('Error fetching data from AsyncStorage:', error);
//       }
//     };

//     fetchAppliedJob();
//   }, []);

//   if (!appliedJob) {
//     // Loading state
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   // If the applied job is a single object, make it an array for uniform handling
//   const appliedJobsArray = Array.isArray(appliedJob) ? appliedJob : [appliedJob];

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.innerContainer}>
//         {appliedJobsArray.length > 0 ? (
//           appliedJobsArray.map((job, index) => (
//             <CompanyCard
//               key={index}
//               company={{
//                 posted_jobs: [job], // Wrap job in an array as `posted_jobs`
//                 company_name: job.company_name,
//                 jobTitle: job.job_title,
//                 logo: job.logo, // Ensure fallback logo
//                 location: job.location,
//               }}
             
//             />
//           ))
//         ) : (
//           <Text style={styles.noJobsText}>No applied jobs</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: colors.background, // Use the correct background color from theme
//   },
//   loadingText: {
//     fontSize: 18,
//     color: colors.primary, // Use primary color for loading text
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   innerContainer: {
//     flexGrow: 1,
//     paddingBottom: 20, // Ensure there is padding at the bottom of the ScrollView
//   },
//   noJobsText: {
//     fontSize: 16,
//     color: '#808080',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default AppliedJobScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompanyCard from '../GlobalFields/GlobalCard';
import { colors } from '../Global_CSS/theamColors';

const AppliedJobScreen = () => {
  const [appliedJob, setAppliedJob] = useState(null);

  useEffect(() => {
    const fetchAppliedJob = async () => {
      try {
        // Fetching the applied job data from AsyncStorage
        const jobDetails = await AsyncStorage.getItem('appliedJob');
        if (jobDetails !== null) {
          const jobData = JSON.parse(jobDetails);
          console.log('Fetched Job Data:', jobData); // Log to check if company_name exists
          setAppliedJob(jobData); // Parse and set the applied job data
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };

    fetchAppliedJob();
  }, []);

  if (!appliedJob) {
    // Loading state
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If the applied job is a single object, make it an array for uniform handling
  const appliedJobsArray = Array.isArray(appliedJob) ? appliedJob : [appliedJob];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        {appliedJobsArray.length > 0 ? (
          appliedJobsArray.map((job, index) => (
            <CompanyCard
              key={index}
              company={{
                posted_jobs: [job], // Wrap job in an array as `posted_jobs`
                company_name: job.company_name, // Ensure `company_name` is passed correctly
                jobTitle: job.job_title,
                logo: job.logo || '',  // Fallback logo
                location: job.location,
              }}
            />
          ))
        ) : (
          <Text style={styles.noJobsText}>No applied jobs</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.background, // Use correct background color from theme
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



