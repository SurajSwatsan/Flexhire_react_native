import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import CustomHeader from './customHeader';
import GlobalStyle from '../Global_CSS/GlobalStyle';
import {Checkbox, Icon, IconButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import CompanyCard from '../GlobalFields/GlobalCard';

const Data = [
  {
    id: 1,
    company_name: 'Tech Innovations',
    about:
      'Tech Innovations is a leading software development company specializing in creating cutting-edge technology solutions.',
    logo: require('../Assets/companyImges/google_icon.png'),
    recruiter_name: 'John Doe',
    contact_email: 'john.doe@techinnovations.com',
    phone: '+1234567890',
    location: 'San Francisco, CA',
    industry: 'Information Technology',
    posted_jobs: [
      {
        id: 1,
        job_title: 'Software Engineer',
        // "company_name": "GreenWorld Corp.",
        rating: 4.5,
        reviews: 120,
        required_experience: '3-5 years',
        salary: '$70,000 - $90,000',
        work_modes: ['Hybrid', 'Remote'],
        location: 'San Francisco, CA',
        posted_date: '2024-11-01',
        openings: 3,
        applications: 75,
        industry_type: 'Information Technology',
        department: 'Engineering',
        employment_types: ['Full-time', 'Part-time'],
        role_category: 'Development',
        education: [
          "Bachelor's in Computer Science",
          "Master's in Software Engineering",
        ],
        job_description:
          'We are seeking a skilled Software Engineer to join our dynamic team. You will be responsible for developing, testing, and maintaining high-quality software applications. Our ideal candidate is proficient in modern programming languages and has experience with web technologies. You’ll collaborate closely with our product and design teams to create innovative solutions. Responsibilities include debugging, code review, and participating in team standups. The role also involves maintaining best practices in coding standards and agile methodologies. We value creativity, problem-solving skills, and a passion for technology.',
        key_skills: ['JavaScript', 'React', 'Node.js', 'Problem-solving'],
        posted_at: '2024-11-01',
        company_type: 'Private',
      },
    ],
    website: 'https://www.techinnovations.com',
  },
  {
    id: 2,
    company_name: 'Creative Solutions',

    about:
      "Creative Solutions provides innovative design and digital marketing strategies tailored to clients' needs.",
    logo: require('../Assets/companyImges/facebook.png'),
    recruiter_name: 'Jane Smith',
    contact_email: 'jane.smith@creativesolutions.com',
    phone: '+1987654321',
    location: 'New York, NY',
    industry: 'Marketing',
    posted_jobs: [
      // {
      //   job_title: 'Digital Marketing Specialist',
      //   job_description:
      //     'Design and implement comprehensive digital marketing strategies to enhance online presence. Analyze marketing data to derive insights for improvement. Collaborate with the design team to create engaging content across platforms. Conduct market research to identify new trends and target audiences. Manage social media accounts and campaigns to drive brand engagement.',
      //   experience_required: '2-4 years',
      //   salary_range: '$60,000 - $80,000',
      //   required_skills: [
      //     'SEO',
      //     'Content Marketing',
      //     'Social Media Management',
      //   ],
      //   positions_available: 5,
      //   job_type: 'Hybrid',
      // },
      {
        id: 1,
        job_title: 'Marketing Specialist',
        // "company_name": "GreenWorld Corp.",
        rating: 4.2,
        reviews: 85,
        required_experience: '2-4 years',
        salary: '$50,000 - $70,000',
        work_modes: ['Remote', 'Hybrid'],
        location: 'New York, NY',
        posted_date: '2024-10-25',
        openings: 1,
        applications: 45,
        industry_type: 'Marketing & Advertising',
        department: 'Marketing',
        employment_types: ['Contract', 'Freelance'],
        role_category: 'Digital Marketing',
        education: [
          "Bachelor's in Marketing",
          "Master's in Business Administration",
        ],
        job_description:
          'GreenWorld Corp. is looking for a Marketing Specialist to help drive brand engagement and sales through digital channels. The role involves planning and executing marketing campaigns, analyzing performance data, and managing social media accounts. You’ll work with a creative team to develop compelling content and advertising strategies. This role requires a proactive individual with a passion for marketing and strong analytical skills. You’ll collaborate with cross-functional teams to align marketing strategies with business goals. The role also requires effective communication with stakeholders and ongoing optimization of campaigns.',
        key_skills: ['SEO', 'Content Marketing', 'Social Media', 'Analytics'],
        posted_at: '2024-10-25',
        company_type: 'Public',
      },
    ],
    website: 'https://www.creativesolutions.com',
  },
  {
    id: 3,
    company_name: 'HealthTech Solutions',
about:
      'HealthTech Solutions aims to revolutionize the healthcare industry through innovative software applications.',
    logo: require('../Assets/companyImges/linkedin_icon.png'),
    recruiter_name: 'Michael Brown',
    contact_email: 'michael.brown@healthtechsolutions.com',
    phone: '+1122334455',
    location: 'Chicago, IL',
    industry: 'Healthcare',
    posted_jobs: [
      // {
      //   job_title: 'Health Data Analyst',
      //   job_description:
      //     'Analyze healthcare data to provide actionable insights for improving patient outcomes. Collaborate with medical professionals to understand data needs and develop analytical solutions. Create reports and visualizations to present findings to stakeholders. Ensure data integrity by implementing quality control measures. Stay informed about industry trends to align analytics strategies.',
      //   experience_required: '2-3 years',
      //   salary_range: '$70,000 - $90,000',
      //   required_skills: ['Data Analysis', 'Excel', 'SQL'],
      //   positions_available: 2,
      //   job_type: 'Remote',
      // },
      {
        // "id": 3,
        id: 1,
        job_title: 'Data Analyst',
        rating: 4.8,
        reviews: 150,
        required_experience: '1-3 years',
        salary: '$60,000 - $80,000',
        work_modes: ['On-site', 'Hybrid'],
        location: 'Chicago, IL',
        posted_date: '2024-10-20',
        openings: 2,
        applications: 60,
        industry_type: 'Data Science',
        department: 'Data Analytics',
        employment_types: ['Full-time', 'Temporary'],
        role_category: 'Analytics',
        education: ["Bachelor's in Statistics", "Master's in Data Science"],
        job_description:
          'As a Data Analyst at Insight Analytics, you’ll be responsible for interpreting complex datasets to generate insights that drive business decisions. You will clean, transform, and analyze data to extract meaningful patterns. The role involves building data visualizations, preparing reports, and providing data-driven recommendations. Collaboration with other teams to identify business challenges and develop solutions is key. You’ll help build predictive models and support other analysts. Attention to detail, accuracy, and proficiency with analytical tools are essential for success in this position.',
        key_skills: ['Python', 'SQL', 'Data Visualization', 'Machine Learning'],
        posted_at: '2024-10-20',
        company_type: 'Startup',
      },
    ],
    website: 'https://www.healthtechsolutions.com',
  },
  {
    id: 4,
    company_name: 'EcoFriendly Products',

    about:
      'EcoFriendly Products is dedicated to providing sustainable solutions for everyday needs.',
    logo: require('../Assets/companyImges/microsoft.png'),
    recruiter_name: 'Linda Green',
    contact_email: 'linda.green@ecofriendlyproducts.com',
    phone: '+2233445566',
    location: 'Austin, TX',
    industry: 'E-commerce',
    posted_jobs: [
      // {
      //   job_title: 'E-commerce Manager',
      //   job_description:
      //     "Oversee the online store's operations, ensuring a seamless customer experience. Develop and implement marketing strategies to drive traffic and sales. Analyze website performance metrics to identify areas for improvement. Collaborate with product teams to manage inventory and pricing. Manage customer service interactions to enhance customer satisfaction.",
      //   experience_required: '4-6 years',
      //   salary_range: '$80,000 - $100,000',
      //   required_skills: [
      //     'E-commerce Platforms',
      //     'Digital Marketing',
      //     'Analytics',
      //   ],
      //   positions_available: 1,
      //   job_type: 'Onsite',
      // },
      {
        // "id": 4,
        id: 1,
        job_title: 'Project Manager',
        // "company_name": "BuildRight Constructions",
        rating: 4.6,
        reviews: 200,
        required_experience: '5-8 years',
        salary: '$90,000 - $120,000',
        work_modes: ['On-site', 'Hybrid'],
        location: 'Austin, TX',
        posted_date: '2024-11-02',
        openings: 1,
        applications: 30,
        industry_type: 'Construction',
        department: 'Project Management',
        employment_types: ['Full-time', 'Contract'],
        role_category: 'Management',
        education: ["Bachelor's in Civil Engineering", 'PMP Certification'],
        job_description:
          'BuildRight Constructions is seeking an experienced Project Manager to oversee high-profile construction projects. This role involves managing budgets, schedules, and resources to ensure timely completion. The ideal candidate will have extensive experience in construction management, strong leadership skills, and an eye for detail. Responsibilities include coordinating with stakeholders, overseeing site operations, and ensuring compliance with safety regulations. The role demands excellent communication and problem-solving skills to manage unexpected challenges. You will work closely with engineers, architects, and contractors to deliver quality projects.',
        key_skills: [
          'Project Planning',
          'Risk Management',
          'Budgeting',
          'Team Leadership',
        ],
        posted_at: '2024-11-02',
        company_type: 'Private',
      },
    ],
    website: 'https://www.ecofriendlyproducts.com',
  },
  {
    id: 5,
    company_name: 'Smart Home Solutions',

    about:
      'Smart Home Solutions focuses on creating integrated technology for home automation.',
    logo: require('../Assets/companyImges/TCS_logo.png'),
    recruiter_name: 'David White',
    contact_email: 'david.white@smarthomesolutions.com',
    phone: '+3344556677',
    location: 'Los Angeles, CA',
    industry: 'Technology',
    posted_jobs: [
      // {
      //   job_title: 'IoT Developer',
      //   job_description:
      //     'Develop and implement Internet of Things (IoT) applications and solutions. Work on integrating various hardware components with cloud services. Collaborate with cross-functional teams to define project requirements and specifications. Test and debug systems to ensure functionality and reliability. Stay updated on emerging technologies and industry trends.',
      //   experience_required: '3-5 years',
      //   salary_range: '$90,000 - $110,000',
      //   required_skills: ['IoT', 'Embedded Systems', 'Python'],
      //   positions_available: 4,
      //   job_type: 'Remote',
      // },
      {
        // "id": 5,
        id: 1,
        job_title: 'Human Resources Manager',
        // "company_name": "PeopleFirst Solutions",
        rating: 4.9,
        reviews: 175,
        required_experience: '4-6 years',
        salary: '$80,000 - $100,000',
        work_modes: ['Hybrid', 'Remote'],
        location: 'Seattle, WA',
        posted_date: '2024-10-29',
        openings: 1,
        applications: 40,
        industry_type: 'Human Resources',
        department: 'Human Resources',
        employment_types: ['Full-time', 'Freelance'],
        role_category: 'HR Management',
        education: [
          "Bachelor's in Human Resources",
          "Master's in Business Administration",
        ],
        job_description:
          'PeopleFirst Solutions is hiring an HR Manager responsible for overseeing recruitment, employee relations, and HR strategy. You will ensure compliance with labor laws, manage HR policies, and contribute to a positive work culture. The role involves developing retention strategies, managing payroll, and handling employee grievances. You will collaborate with department heads to identify hiring needs and lead diversity initiatives. Excellent communication and organizational skills are essential, along with proficiency in HR software. This role offers a chance to make a meaningful impact on company culture and employee satisfaction.',
        key_skills: [
          'Recruitment',
          'Employee Relations',
          'Policy Development',
          'HR Analytics',
        ],
        posted_at: '2024-10-29',
        company_type: 'LLC',
      },
    ],
    website: 'https://www.smarthomesolutions.com',
  },
];

// const companyImages = {
//   'Tech Innovations': require('../Assets/companyImges/google_icon.png'),
//   'Creative Solutions': require('../Assets/companyImges/facebook.png'),
//   'HealthTech Solutions': require('../Assets/companyImges/linkedin_icon.png'),
//   'EcoFriendly Products': require('../Assets/companyImges/microsoft.png'),
//   'Smart Home Solutions': require('../Assets/companyImges/TCS_logo.png'),
// };

const SearchJobScreen = ({navigation, route}) => {
  const {isFocused} = useIsFocused();
  const {query} = route.params;
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState(Data);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  // Filter states
  const [filterJobType, setFilterJobType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');

  const [filterSalaryRange, setFilterSalaryRange] = useState({
    min: 0,
    max: 1000000,
  });

  // Save jobs to AsyncStorage
  const saveJobsToStorage = async jobs => {
    try {
      await AsyncStorage.setItem('savedJobs', JSON.stringify(jobs));
    } catch (error) {
      console.error('Failed to save jobs to AsyncStorage', error);
    }
  };

  // Toggle save job and update AsyncStorage
  const toggleSaveJob = job => {
    const isJobSaved = savedJobs.some(
      savedJob => savedJob.job_title === job.job_title,
    );

    let updatedSavedJobs;
    if (isJobSaved) {
      // Remove the job from saved jobs
      updatedSavedJobs = savedJobs.filter(
        savedJob => savedJob.job_title !== job.job_title,
      );
    } else {
      // Add the job to saved jobs
      updatedSavedJobs = [...savedJobs, job];
    }

    // Update the state and AsyncStorage
    setSavedJobs(updatedSavedJobs);
    saveJobsToStorage(updatedSavedJobs);
  };

  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        const savedJobsData = await AsyncStorage.getItem('savedJobs');
        if (savedJobsData) {
          setSavedJobs(JSON.parse(savedJobsData));
        }
      } catch (error) {
        console.error('Failed to load saved jobs', error);
      }
    };

    loadSavedJobs();
  }, [isFocused]);

  useEffect(() => {
    filterJobs(searchTerm);
  }, [searchTerm, filterJobType, filterLocation, filterIndustry]);

  const filterJobs = term => {
    setLoading(true);
    const filteredJobs = Data.filter(company => {
      const jobMatches =
        company.company_name.toLowerCase().includes(term.toLowerCase()) ||
        company.posted_jobs.some(job =>
          job.job_title.toLowerCase().includes(term.toLowerCase()),
        );

      const jobTypeMatches =
        filterJobType.length > 0
          ? company.posted_jobs.some(job =>
              filterJobType.includes(job.job_type),
            )
          : true;
      const locationMatches = filterLocation
        ? company.location.toLowerCase().includes(filterLocation.toLowerCase())
        : true;
      const industryMatches = filterIndustry
        ? company.industry.toLowerCase().includes(filterIndustry.toLowerCase())
        : true; // Check if salary range is within filter
      const salaryMatches = company.posted_jobs.some(job => {
        const jobSalary = job.salary_range
          ? job.salary_range.replace(/[^0-9.-]+/g, '') // Remove non-numeric characters
          : 0;
        const salary = parseInt(jobSalary, 10);

        return (
          salary >= filterSalaryRange.min && salary <= filterSalaryRange.max
        );
      });

      return (
        jobMatches &&
        jobTypeMatches &&
        locationMatches &&
        industryMatches &&
        salaryMatches
      );
    });
    setResults(filteredJobs);
    setLoading(false);
  };

  const openJobDetail = job => {
    navigation.navigate('JobDetailScreen', {job});
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedJob(null);
  };
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const applyFilters = () => {
    closeFilterModal(); // Close the filter modal after applying filters
    filterJobs(searchTerm); // Reapply filters with the current search term
  };

  // Handle checkbox toggle for job types
  const handleJobTypeChange = value => {
    if (filterJobType.includes(value)) {
      setFilterJobType(filterJobType.filter(item => item !== value));
    } else {
      setFilterJobType([...filterJobType, value]);
    }
  };

  const getUniqueLocations = () => {
    const locations = Data.map(company => company.location);
    return [...new Set(locations)]; // Remove duplicates
  };

  const getUniqueIndustries = () => {
    const industries = Data.map(company => company.industry);
    return [...new Set(industries)]; // Remove duplicates
  };

  const [locationsList, setLocationsList] = useState([]);
  const [industriesList, setIndustriesList] = useState([]);

  useEffect(() => {
    setLocationsList(getUniqueLocations());
    setIndustriesList(getUniqueIndustries());
  }, []);

  // return (
  //   <View style={styles.container}>
  //     <View style={GlobalStyle.headerStyle}>
  //       <CustomHeader />
  //       <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
  //         BookMark
  //       </Text>
  //       <IconButton
  //         icon="bookmark-outline"
  //         iconColor="#000"
  //         size={30}
  //         onPress={() => navigation.navigate('bookmark')}
  //       />
  //     </View>

  //     <ScrollView>
  //       <View style={styles.fixedSearchBar}>
  //         <TextInput
  //           style={styles.searchInput}
  //           placeholder="Search...."
  //           value={searchTerm}
  //           onChangeText={setSearchTerm}
  //         />
  //         <View style={styles.filterContainer}>
  //           <IconButton
  //             style={styles.filtericon}
  //             icon="filter"
  //             onPress={openFilterModal}
  //             iconColor="#000"
  //             size={30}
  //           />
  //         </View>
  //       </View>
  //       {loading ? (
  //         <Text style={styles.loadingText}>Loading...</Text>
  //       ) : results.length > 0 ? (
  //         results.map(company => (
  //           <View key={company.id} style={styles.companyContainer}>
  //             <View style={styles.companyHeader}>
  //               <View style={styles.companyInfo}>
  //               <Image
  //                 source={
  //                   companyImages[company.company_name] ||
  //                   require('../Assets/companyImges/facebook.png')
  //                 }
  //                 style={styles.companyImage} // Apply the style for the image
  //               />

  //               <Text style={styles.companyName}>{company.company_name}</Text>
  //               </View>

  //               {/* Save Job Button */}
  //               {company.posted_jobs.map(job => (
  //                 <IconButton
  //                   key={job.job_title}
  //                   style={styles.saveicon}
  //                   icon={
  //                     savedJobs.some(
  //                       savedJob => savedJob.job_title === job.job_title,
  //                     )
  //                       ? 'bookmark'
  //                       : 'bookmark-outline'
  //                   }
  //                   // iconColor="#004466"
  //                   iconColor={
  //                     savedJobs.some(
  //                       savedJob => savedJob.job_title === job.job_title,
  //                     )
  //                       ? '#000' // Color when saved (e.g., tomato red)
  //                       : 'gray' // Color when unsaved (default)
  //                   }
  //                   size={24}
  //                   onPress={() => toggleSaveJob(job)} // Toggle save/un-save on click
  //                 />
  //               ))}
  //             </View>
  //             {company.posted_jobs.map(job => (
  //               // Inside your TouchableOpacity component:
  //               <TouchableOpacity
  //                 key={job.job_title}
  //                 onPress={() => openJobDetail(job)}>
  //                 <View style={styles.jobContainer}>
  //                   <Text style={styles.jobTitle}>{job.job_title}</Text>
  //                   <Text style={styles.jobDetails}>
  //                     {job.job_type} | {job.experience_required} |{' '}
  //                     {job.salary_range}
  //                   </Text>
  //                   {/* Adding the location icon and date */}
  //                   <View style={styles.locationContainer}>
  //                     <View style={styles.location}>
  //                       <IconButton
  //                         icon="map-marker"
  //                         iconColor="#808080"
  //                         size={14}
  //                         style={{padding: 0, marginLeft: -10}} // Ensure no padding/margin on the icon
  //                       />
  //                       <Text style={styles.jobLocation}>
  //                         {company.location}
  //                       </Text>
  //                     </View>

  //                     <Text style={styles.jobPostedDate}>
  //                       {/* Check if job.date_posted exists and is valid */}
  //                       {job.date_posted
  //                         ? moment(job.date_posted).isValid()
  //                           ? moment(job.date_posted).format('MMMM D, YYYY')
  //                           : 'Invalid Date'
  //                         : 'January 2024'}
  //                     </Text>
  //                   </View>
  //                 </View>
  //               </TouchableOpacity>
  //             ))}
  //           </View>
  //         ))
  //       ) : (
  //         <Text style={styles.noResultsText}>No jobs found</Text>
  //       )}
  //     </ScrollView>

  //     <TouchableOpacity
  //       style={styles.savedJobsButton}
  //       onPress={() =>
  //         navigation.navigate('SavedJobsScreen', {savedJobs})
  //       }></TouchableOpacity>

  //     {/* Filter Modal */}
  //     <Modal
  //       transparent={true}
  //       animationType="slide"
  //       visible={filterModalVisible}
  //       onRequestClose={closeFilterModal}>
  //       <View style={styles.modalOverlay}>
  //         <View style={styles.modalContent}>
  //           <Text style={styles.modalTitle}>Filter Jobs</Text>

  //           <Text style={{color: 'black'}}>Job Type</Text>
  //           <View style={styles.checkboxContainer}>
  //             {['Onsite', 'Hybrid', 'Remote'].map(type => (
  //               <View key={type} style={styles.checkboxItem}>
  //                 <Checkbox
  //                   status={
  //                     filterJobType.includes(type) ? 'checked' : 'unchecked'
  //                   }
  //                   onPress={() => handleJobTypeChange(type)}
  //                 />
  //                 <Text style={styles.checkboxLabel}>{type}</Text>
  //               </View>
  //             ))}
  //           </View>

  //           <Text style={{color: 'black'}}>Salary Range</Text>
  //           <View style={styles.salaryRangeContainer}>
  //             <TextInput
  //               style={styles.salaryInput}
  //               keyboardType="numeric"
  //               placeholder="Min Salary"
  //               value={filterSalaryRange.min.toString()}
  //               onChangeText={text =>
  //                 setFilterSalaryRange(prev => ({
  //                   ...prev,
  //                   min: Number(text) || 0,
  //                 }))
  //               }
  //             />
  //             <Text style={{marginHorizontal: 10}}>to</Text>
  //             <TextInput
  //               style={styles.salaryInput}
  //               keyboardType="numeric"
  //               placeholder="Max Salary"
  //               value={filterSalaryRange.max.toString()}
  //               onChangeText={text =>
  //                 setFilterSalaryRange(prev => ({
  //                   ...prev,
  //                   max: Number(text) || 1000000,
  //                 }))
  //               }
  //             />
  //           </View>

  //           <Text style={{color: 'black'}}>Location</Text>
  //           <Picker
  //             selectedValue={filterLocation}
  //             onValueChange={itemValue => setFilterLocation(itemValue)}
  //             style={styles.picker}>
  //             <Picker.Item label="Select Location" value="" />
  //             {locationsList.map(location => (
  //               <Picker.Item key={location} label={location} value={location} />
  //             ))}
  //           </Picker>

  //           <Text style={{color: 'black'}}>Industry</Text>
  //           <Picker
  //             selectedValue={filterIndustry}
  //             onValueChange={itemValue => setFilterIndustry(itemValue)}
  //             style={styles.picker}>
  //             <Picker.Item label="Select Industry" value="" />
  //             {industriesList.map(industry => (
  //               <Picker.Item key={industry} label={industry} value={industry} />
  //             ))}
  //           </Picker>

  //           <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
  //             <Text style={styles.applyButtonText}>Apply Filters</Text>
  //           </TouchableOpacity>

  //           <TouchableOpacity
  //             style={styles.closeButton}
  //             onPress={closeFilterModal}>
  //             <Text style={styles.closeButtonText}>Close</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>

  //     {selectedJob && (
  //       <Modal
  //         transparent={true}
  //         animationType="slide"
  //         visible={modalVisible}
  //         onRequestClose={closeModal}>
  //         <View style={styles.modalOverlay}>
  //           <View style={styles.modalContent}>
  //             <Text style={styles.modalJobTitle}>{selectedJob.job_title}</Text>
  //             <Text style={styles.modalJobDescription}>
  //               {selectedJob.job_description}
  //             </Text>
  //             <Text style={styles.modalJobDetails}>
  //               Experience Required: {selectedJob.experience_required}
  //             </Text>
  //             <Text style={styles.modalJobDetails}>
  //               Salary Range: {selectedJob.salary_range}
  //             </Text>
  //             <Text style={styles.modalJobDetails}>
  //               Required Skills: {selectedJob.required_skills.join(', ')}
  //             </Text>
  //             <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
  //               <Text style={styles.closeButtonText}>Close</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </Modal>
  //     )}
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <View style={GlobalStyle.headerStyle}>
        <CustomHeader />
        {/* <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
          BookMark
        </Text>
        <IconButton
          icon="bookmark-outline"
          iconColor="#000"
          size={30}
          onPress={() => navigation.navigate('bookmark')}
        /> */}
      </View>

      <ScrollView>
        <View style={styles.fixedSearchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search...."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <View style={styles.filterContainer}>
            <IconButton
              style={styles.filtericon}
              icon="filter"
              onPress={openFilterModal}
              iconColor="#000"
              size={30}
            />
          </View>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : results.length > 0 ? (
          results.map(company => (
            <CompanyCard
              key={company.id}
              company={company}
              savedJobs={savedJobs}
              toggleSaveJob={toggleSaveJob}
              // openJobDetail={openJobDetail}
            />
          ))
        ) : (
          <Text style={styles.noResultsText}>No jobs found</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.savedJobsButton}
        onPress={() =>
          navigation.navigate('SavedJobsScreen', {savedJobs})
        }></TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={filterModalVisible}
        onRequestClose={closeFilterModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Jobs</Text>

            <Text style={{color: 'black'}}>Job Type</Text>
            <View style={styles.checkboxContainer}>
              {['Onsite', 'Hybrid', 'Remote'].map(type => (
                <View key={type} style={styles.checkboxItem}>
                  <Checkbox
                    status={
                      filterJobType.includes(type) ? 'checked' : 'unchecked'
                    }
                    onPress={() => handleJobTypeChange(type)}
                  />
                  <Text style={styles.checkboxLabel}>{type}</Text>
                </View>
              ))}
            </View>

            <Text style={{color: 'black'}}>Salary Range</Text>
            <View style={styles.salaryRangeContainer}>
              <TextInput
                style={styles.salaryInput}
                keyboardType="numeric"
                placeholder="Min Salary"
                value={filterSalaryRange.min.toString()}
                onChangeText={text =>
                  setFilterSalaryRange(prev => ({
                    ...prev,
                    min: Number(text) || 0,
                  }))
                }
              />
              <Text style={{marginHorizontal: 10}}>to</Text>
              <TextInput
                style={styles.salaryInput}
                keyboardType="numeric"
                placeholder="Max Salary"
                value={filterSalaryRange.max.toString()}
                onChangeText={text =>
                  setFilterSalaryRange(prev => ({
                    ...prev,
                    max: Number(text) || 1000000,
                  }))
                }
              />
            </View>
            
      
            <Text style={{color: 'black'}}>Location</Text>
            <Picker
              selectedValue={filterLocation}
              onValueChange={itemValue => setFilterLocation(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Location" value="" />
              {locationsList.map(location => (
                <Picker.Item key={location} label={location} value={location} />
              ))}
            </Picker>

            <Text style={{color: 'black'}}>Industry</Text>
            <Picker
              selectedValue={filterIndustry}
              onValueChange={itemValue => setFilterIndustry(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Industry" value="" />
              {industriesList.map(industry => (
                <Picker.Item key={industry} label={industry} value={industry} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeFilterModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {selectedJob && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalJobTitle}>{selectedJob.job_title}</Text>
              <Text style={styles.modalJobDescription}>
                {selectedJob.job_description}
              </Text>
              <Text style={styles.modalJobDetails}>
                Experience Required: {selectedJob.experience_required}
              </Text>
              <Text style={styles.modalJobDetails}>
                Salary Range: {selectedJob.salary_range}
              </Text>
              <Text style={styles.modalJobDetails}>
                Required Skills: {selectedJob.required_skills.join(', ')}
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 12,
    marginHorizontal:12,

    backgroundColor: '#f1f1f1',
  },
  searchInput: {
    height: 48,
    // borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20, // Added padding inside the input for better spacing
    color: '#000',
    // backgroundColor: '#fff',
    paddingLeft: 10, // Add left padding for better spacing between text and edge
    flex: 1,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 5,
    marginRight: 10, // Adds space between the input and the filter button
  },

  fixedSearchBar: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically

    // backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  filterContainer: {
    backgroundColor: '#fff',
    height: 48,
    width: 48, // Fixed width to match the height of the button
    alignSelf: 'center',
    borderRadius: 8,
    
    justifyContent: 'center',
    alignItems: 'center', // Ensure the filter icon is centered in the button
  },

  filtericon: {},
  loadingText: {
    fontSize: 18,
    color: 'black',
  },
  noResultsText: {
    fontSize: 18,
    color: 'red',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalJobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalJobDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalJobDetails: {
    fontSize: 14,
    marginBottom: 5,
  },

  applyButton: {
    backgroundColor: '#004466',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  applyButtonText: {
    color: '#fff',
    alignSelf: 'center',
  },
  closeButton: {
    backgroundColor: '#004466',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    alignSelf: 'center',
  },
  modalTitle: {
    color: '#000',
    fontSize: 16,
  },
  jobType: {
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'column',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#000',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
  },
  salaryRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  salaryInput: {
    width: '45%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    color: '#000',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default SearchJobScreen;
