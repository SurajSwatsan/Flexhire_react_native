import React, {useState} from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import JobbasedonPreferences from '../../Components/JobbasedonPreferences';
// import {colors} from '../../Global_CSS/TheamColors';
import RecommendedJobs from '../../Components/RecommendedJobs';
import {colors} from '../../Global_CSS/TheamColors';
import JobCard from '../../Constant/CustomJobCard';
import CompanyCard from '../../Constant/CustomJobCard';
import CustomJobCard from '../../Constant/CustomJobCard';

const Recommendedjobs = [
  {
    id: 1,
    job_title: 'Data Analyst',
    job_description:
      'As a Data Analyst at Insight Analytics, you’ll be responsible for interpreting complex datasets to generate insights that drive business decisions. You will clean, transform, and analyze data to extract meaningful patterns. The role involves building data visualizations, preparing reports, and providing data-driven recommendations. Collaboration with other teams to identify business challenges and develop solutions is key. You’ll help build predictive models and support other analysts. Attention to detail, accuracy, and proficiency with analytical tools are essential for success in this position.',
    experience: '1-3 years',
    salary_min: '$60,000',
    salary_max: '$90,000',
    key_skills: ['Python', 'SQL', 'Data Visualization', 'Machine Learning'],
    job_location: 'Insight Analytics Office, Chicago, IL',
    openings: 2,
    work_modes: ['On-site', 'Hybrid'],
    employment_types: ['Full-time', 'Part-time'],
    location: 'Chicago, IL',
    posted_date: '2024-10-20',
    applications: 60,
    education: ["Bachelor's in Statistics", "Master's in Data Science"],
    department: 'Data Analytics',
    industry_type: 'Data Science & Analytics',
    role: 'Junior Data Analyst',
    role_category: 'Analytics',
    company: {
      id: 1,
      company_name: 'Insight Analytics',
      about:
        'Insight Analytics provides advanced data solutions for businesses to enhance decision-making and strategic growth.',
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465679.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      contact_email: 'alex.johnson@insightanalytics.com',
      phone: '+1234567899',
      location: 'Chicago, IL',
      industry: 'Data Science',
      website: 'https://www.insightanalytics.com',
      rating: '4.5',
    },
  },
  {
    id: 2,
    job_title: 'Software Engineer',
    job_description:
      'Develop high-quality software solutions by collaborating with cross-functional teams. Participate in code reviews, debugging, and performance tuning to optimize applications. Stay updated with emerging technologies to ensure the implementation of best practices. Contribute to architecture discussions and design processes. Ensure the integrity of the codebase by adhering to coding standards.',
    experience: '3-5 years',
    salary_min: '$80,000',
    salary_max: '$100,000',
    job_location: 'Tech Innovations HQ, San Francisco, CA',
    key_skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
    openings: 3,
    work_modes: ['Onsite'],
    employment_types: ['Full-time', 'Part-time'],
    location: 'San Francisco, CA',
    posted_date: '2024-10-20',
    applications: 45,
    education: [
      "Bachelor's in Computer Science",
      "Master's in Software Engineering",
    ],
    department: 'Engineering',
    industry_type: 'Information Technology',
    role: 'Full Stack Software Engineer',
    role_category: 'Development',
    company: {
      id: 2,
      company_name: 'Tech Innovations',
      about:
        'Tech Innovations is a leading software development company specializing in creating cutting-edge technology solutions.',
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465599.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      recruiter_name: 'John Doe',
      contact_email: 'john.doe@techinnovations.com',
      phone: '+1234567890',
      location: 'San Francisco, CA',
      industry: 'Information Technology',
      website: 'https://www.techinnovations.com',
      rating: '4.7',
    },
  },
  {
    id: 3,
    job_title: 'Digital Marketing Specialist',
    job_description:
      'Design and implement comprehensive digital marketing strategies to enhance online presence. Analyze marketing data to derive insights for improvement. Collaborate with the design team to create engaging content across platforms. Conduct market research to identify new trends and target audiences. Manage social media accounts and campaigns to drive brand engagement.',
    experience: '2-4 years',
    salary_min: '$70,000',
    salary_max: '$90,000',
    job_location: 'Creative Solutions Office, New York, NY',
    key_skills: ['SEO', 'Content Marketing', 'Social Media Management'],
    openings: 5,
    work_modes: ['Hybrid'],
    employment_types: ['Full-time'],
    location: 'New York, NY',
    posted_date: '2024-10-18',
    applications: 30,
    education: ["Bachelor's in Marketing", 'MBA in Digital Marketing'],
    department: 'Marketing',
    industry_type: 'Marketing & Advertising',
    role: 'Digital Marketing Specialist',
    role_category: 'Specialist',
    company: {
      id: 3,
      company_name: 'Creative Solutions',
      about:
        "Creative Solutions provides innovative design and digital marketing strategies tailored to clients' needs.",
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465572.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      recruiter_name: 'Jane Smith',
      contact_email: 'jane.smith@creativesolutions.com',
      phone: '+1987654321',
      location: 'New York, NY',
      industry: 'Marketing',
      website: 'https://www.creativesolutions.com',
      rating: '4.3',
    },
  },
  {
    id: 4,
    job_title: 'Health Data Analyst',
    job_description:
      'Analyze healthcare data to provide actionable insights for improving patient outcomes. Collaborate with medical professionals to understand data needs and develop analytical solutions. Create reports and visualizations to present findings to stakeholders. Ensure data integrity by implementing quality control measures. Stay informed about industry trends to align analytics strategies.',
    experience: '2-3 years',
    salary_min: '$70,000',
    salary_max: '$90,000',
    job_location: 'HealthTech Solutions Office, Chicago, IL',
    key_skills: ['Data Analysis', 'Excel', 'SQL'],
    openings: 2,
    work_modes: ['Remote'],
    employment_types: ['Full-time'],
    location: 'Chicago, IL',
    posted_date: '2024-10-19',
    applications: 40,
    education: ["Bachelor's in Health Informatics", "Master's in Data Science"],
    department: 'Healthcare Analytics',
    industry_type: 'Healthcare',
    role: 'Health Data Analyst',
    role_category: 'Analytics',
    company: {
      id: 4,
      company_name: 'HealthTech Solutions',
      about:
        'HealthTech Solutions aims to revolutionize the healthcare industry through innovative software applications.',
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465746.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      recruiter_name: 'Michael Brown',
      contact_email: 'michael.brown@healthtechsolutions.com',
      phone: '+1122334455',
      location: 'Chicago, IL',
      industry: 'Healthcare',
      website: 'https://www.healthtechsolutions.com',
      rating: '4.6',
    },
  },
  {
    id: 5,
    job_title: 'E-commerce Manager',
    job_description:
      "Oversee the online store's operations, ensuring a seamless customer experience. Develop and implement marketing strategies to drive traffic and sales. Analyze website performance metrics to identify areas for improvement. Collaborate with product teams to manage inventory and pricing. Manage customer service interactions to enhance customer satisfaction.",
    experience: '4-6 years',
    salary_min: '$80,000',
    salary_max: '$100,000',
    job_location: 'EcoFriendly Products Office, Austin, TX',
    key_skills: ['E-commerce Platforms', 'Digital Marketing', 'Analytics'],
    openings: 1,
    work_modes: ['Onsite'],
    employment_types: ['Full-time', 'Remote'],
    location: 'Austin, TX',
    posted_date: '2024-10-17',
    applications: 20,
    education: ["Bachelor's in Business Administration", 'MBA in Marketing'],
    department: 'Sales & Marketing',
    industry_type: 'E-commerce',
    role_category: 'Management',
    role: 'E-commerce Manager',
    company: {
      id: 5,
      company_name: 'EcoFriendly Products',
      about:
        'EcoFriendly Products offers a range of sustainable and eco-friendly products designed to promote green living.',
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465495.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      recruiter_name: 'Sarah Green',
      contact_email: 'sarah.green@ecofriendlyproducts.com',
      phone: '+1223344556',
      location: 'Austin, TX',
      industry: 'Retail',
      website: 'https://www.ecofriendlyproducts.com',
      rating: '4.4',
    },
  },
];

const JobBasedProfile = [
  {
    id: 1,
    job_title: 'Data Analyst',
    job_description:
      'As a Data Analyst at Insight Analytics, you’ll be responsible for interpreting complex datasets to generate insights that drive business decisions. You will clean, transform, and analyze data to extract meaningful patterns. The role involves building data visualizations, preparing reports, and providing data-driven recommendations. Collaboration with other teams to identify business challenges and develop solutions is key. You’ll help build predictive models and support other analysts. Attention to detail, accuracy, and proficiency with analytical tools are essential for success in this position.',
    experience: '1-3 years',
    salary_min: '$60,000',
    salary_max: '$90,000',
    key_skills: ['Python', 'SQL', 'Data Visualization', 'Machine Learning'],
    job_location: 'Insight Analytics Office, Chicago, IL',
    openings: 2,
    work_modes: ['On-site', 'Hybrid'],
    employment_types: ['Full-time', 'Part-time'],
    location: 'Chicago, IL',
    posted_date: '2024-10-20',
    applications: 60,
    education: ["Bachelor's in Statistics", "Master's in Data Science"],
    department: 'Data Analytics',
    industry_type: 'Data Science & Analytics',
    role: 'Junior Data Analyst',
    role_category: 'Analytics',
    company: {
      id: 1,
      company_name: 'Insight Analytics',
      about:
        'Insight Analytics provides advanced data solutions for businesses to enhance decision-making and strategic growth.',
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465679.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      contact_email: 'alex.johnson@insightanalytics.com',
      phone: '+1234567899',
      location: 'Chicago, IL',
      industry: 'Data Science',
      website: 'https://www.insightanalytics.com',
      rating: '4.5',
    },
  },
  {
    id: 2,
    job_title: 'Software Engineer',
    job_description:
      'Develop high-quality software solutions by collaborating with cross-functional teams. Participate in code reviews, debugging, and performance tuning to optimize applications. Stay updated with emerging technologies to ensure the implementation of best practices. Contribute to architecture discussions and design processes. Ensure the integrity of the codebase by adhering to coding standards.',
    experience: '3-5 years',
    salary_min: '$80,000',
    salary_max: '$100,000',
    job_location: 'Tech Innovations HQ, San Francisco, CA',
    key_skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
    openings: 3,
    work_modes: ['Onsite'],
    employment_types: ['Full-time', 'Part-time'],
    location: 'San Francisco, CA',
    posted_date: '2024-10-20',
    applications: 45,
    education: [
      "Bachelor's in Computer Science",
      "Master's in Software Engineering",
    ],
    department: 'Engineering',
    industry_type: 'Information Technology',
    role: 'Full Stack Software Engineer',
    role_category: 'Development',
    company: {
      id: 2,
      company_name: 'Tech Innovations',
      about:
        'Tech Innovations is a leading software development company specializing in creating cutting-edge technology solutions.',
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465599.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      recruiter_name: 'John Doe',
      contact_email: 'john.doe@techinnovations.com',
      phone: '+1234567890',
      location: 'San Francisco, CA',
      industry: 'Information Technology',
      website: 'https://www.techinnovations.com',
      rating: '4.7',
    },
  },
  {
    id: 3,
    job_title: 'Digital Marketing Specialist',
    job_description:
      'Design and implement comprehensive digital marketing strategies to enhance online presence. Analyze marketing data to derive insights for improvement. Collaborate with the design team to create engaging content across platforms. Conduct market research to identify new trends and target audiences. Manage social media accounts and campaigns to drive brand engagement.',
    experience: '2-4 years',
    salary_min: '$70,000',
    salary_max: '$90,000',
    job_location: 'Creative Solutions Office, New York, NY',
    key_skills: ['SEO', 'Content Marketing', 'Social Media Management'],
    openings: 5,
    work_modes: ['Hybrid'],
    employment_types: ['Full-time'],
    location: 'New York, NY',
    posted_date: '2024-10-18',
    applications: 30,
    education: ["Bachelor's in Marketing", 'MBA in Digital Marketing'],
    department: 'Marketing',
    industry_type: 'Marketing & Advertising',
    role: 'Digital Marketing Specialist',
    role_category: 'Specialist',
    company: {
      id: 3,
      company_name: 'Creative Solutions',
      about:
        "Creative Solutions provides innovative design and digital marketing strategies tailored to clients' needs.",
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465572.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      recruiter_name: 'Jane Smith',
      contact_email: 'jane.smith@creativesolutions.com',
      phone: '+1987654321',
      location: 'New York, NY',
      industry: 'Marketing',
      website: 'https://www.creativesolutions.com',
      rating: '4.3',
    },
  },
  {
    id: 4,
    job_title: 'Health Data Analyst',
    job_description:
      'Analyze healthcare data to provide actionable insights for improving patient outcomes. Collaborate with medical professionals to understand data needs and develop analytical solutions. Create reports and visualizations to present findings to stakeholders. Ensure data integrity by implementing quality control measures. Stay informed about industry trends to align analytics strategies.',
    experience: '2-3 years',
    salary_min: '$70,000',
    salary_max: '$90,000',
    job_location: 'HealthTech Solutions Office, Chicago, IL',
    key_skills: ['Data Analysis', 'Excel', 'SQL'],
    openings: 2,
    work_modes: ['Remote'],
    employment_types: ['Full-time'],
    location: 'Chicago, IL',
    posted_date: '2024-10-19',
    applications: 40,
    education: ["Bachelor's in Health Informatics", "Master's in Data Science"],
    department: 'Healthcare Analytics',
    industry_type: 'Healthcare',
    role: 'Health Data Analyst',
    role_category: 'Analytics',
    company: {
      id: 4,
      company_name: 'HealthTech Solutions',
      about:
        'HealthTech Solutions aims to revolutionize the healthcare industry through innovative software applications.',
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465746.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      recruiter_name: 'Michael Brown',
      contact_email: 'michael.brown@healthtechsolutions.com',
      phone: '+1122334455',
      location: 'Chicago, IL',
      industry: 'Healthcare',
      website: 'https://www.healthtechsolutions.com',
      rating: '4.6',
    },
  },
  {
    id: 5,
    job_title: 'E-commerce Manager',
    job_description:
      "Oversee the online store's operations, ensuring a seamless customer experience. Develop and implement marketing strategies to drive traffic and sales. Analyze website performance metrics to identify areas for improvement. Collaborate with product teams to manage inventory and pricing. Manage customer service interactions to enhance customer satisfaction.",
    experience: '4-6 years',
    salary_min: '$80,000',
    salary_max: '$100,000',
    job_location: 'EcoFriendly Products Office, Austin, TX',
    key_skills: ['E-commerce Platforms', 'Digital Marketing', 'Analytics'],
    openings: 1,
    work_modes: ['Onsite'],
    employment_types: ['Full-time', 'Remote'],
    location: 'Austin, TX',
    posted_date: '2024-10-17',
    applications: 20,
    education: ["Bachelor's in Business Administration", 'MBA in Marketing'],
    department: 'Sales & Marketing',
    industry_type: 'E-commerce',
    role_category: 'Management',
    role: 'E-commerce Manager',
    company: {
      id: 5,
      company_name: 'EcoFriendly Products',
      about:
        'EcoFriendly Products offers a range of sustainable and eco-friendly products designed to promote green living.',
      logo: 'https://cdn-icons-png.freepik.com/256/15465/15465495.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
      recruiter_name: 'Sarah Green',
      contact_email: 'sarah.green@ecofriendlyproducts.com',
      phone: '+1223344556',
      location: 'Austin, TX',
      industry: 'Retail',
      website: 'https://www.ecofriendlyproducts.com',
      rating: '4.4',
    },
  },
];

const HomeComponent = ({jobsData}) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (navigation.isFocused()) {
          Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
            {
              text: 'No',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => BackHandler.exitApp(),
            },
          ]);
          return true;
        } else {
          return false;
        }
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup listener on unmount
    }, [navigation]),
  );

  const handleSearch = () => {
    navigation.navigate('searchjob', {query});
  };

  return (
    <View style={styles.bodycontainer}>
      <View style={styles.container}>
        <View style={styles.searchbarContainer}>
          <TextInput
            placeholder="Search"
            onChangeText={setQuery}
            value={query}
            style={styles.searchbar}
            placeholderTextColor="#000"
          />
          <IconButton
            style={styles.searchIcon}
            icon="magnify"
            iconColor="#004466"
            size={26}
            onPress={handleSearch}
          />
        </View>
      </View>
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <View style={styles.TextContainer}>
          <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>
            Recommended Jobs
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}>
            View all
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          {Recommendedjobs.map((jobs, index) => (
            <View key={index} style={{minWidth: 300, maxWidth: 300}}>
              <CompanyCard key={index} jobData={jobs} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{marginHorizontal: 10, marginVertical: 10}}>
        <View style={styles.TextContainer}>
          <Text style={{fontSize: 14, color: '#000', fontWeight: 'bold'}}>
            Basedon Jobs Profile
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#000',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
            }}>
            View all
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          {JobBasedProfile.map((jobs, index) => (
            <View key={index} style={{minWidth: 300, maxWidth: 300}}>
              <CompanyCard key={index} jobData={jobs} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodycontainer: {
    backgroundColor: colors.bacground,
    flex: 1,
    width: '100%',
  },
  TextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:10,
    marginVertical:4
  },
  container: {
    backgroundColor: colors.primary,
    height: 90,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  searchbarContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',
    marginVertical: 18,
    backgroundColor: colors.cardBgcolor,
    borderRadius: 8,
    height: 48,
  },
  searchbar: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginRight: 10,
    backgroundColor: '#fff',
  },
  contentContainer: {},
  JobsContainer: {},
});

export default HomeComponent;
