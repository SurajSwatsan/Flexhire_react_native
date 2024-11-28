import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const companies = [
  {
    id: 1,
    company_name: 'Insight Analytics',
    job_title: 'Software Engineer',
    about:
      'Insight Analytics provides advanced data solutions for businesses to enhance decision-making and strategic growth.',
    logo: 'https://cdn-icons-png.freepik.com/256/15465/15465679.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
    contact_email: 'alex.johnson@insightanalytics.com',
    phone: '+1234567899',
    location: 'Chicago, IL',
    industry: 'Data Science',
    website: 'https://www.insightanalytics.com',
    rating: '4.5',
    tagline: "Make the world's information accessible and useful",
    services: [
      'Data Analysis',
      'Predictive Analytics',
      'Business Intelligence',
      'Machine Learning Solutions',
    ],
    employee: 100,
    experience: '2-4 years',
    salary: '$70,000 - $90,000',
    posted_date: '2024-11-15',
    work_modes: 'On-site',
    job_description:
      'As a Data Analyst at Insight Analytics, you’ll be responsible for interpreting complex datasets to generate insights that drive business decisions. You will clean, transform, and analyze data to extract meaningful patterns. The role involves building data visualizations, preparing reports, and providing data-driven recommendations. Collaboration with other teams to identify business challenges and develop solutions is key. You’ll help build predictive models and support other analysts. Attention to detail, accuracy, and proficiency with analytical tools are essential for success in this position.',
    job_info:
      'any fresh graduate or post graduate with 0-1 years of work experience',
  },
  {
    id: 2,
    company_name: 'DataPro Solutions',
    job_title: 'Data Analyst',
    job_description:
      'DataPro Solutions specializes in transforming business data into actionable insights to improve operations and optimize decision-making.',
    about:
      'DataPro Solutions specializes in transforming business data into actionable insights to improve operations and optimize decision-making.',
    logo: 'https://cdn-icons-png.freepik.com/256/15465/15465679.png?uid=R161939522&ga=GA1.1.583681322.1710754192',
    contact_email: 'contact@datapro.com',
    phone: '+9876543210',
    location: 'San Francisco, CA',
    industry: 'Data Analytics',
    website: 'https://www.datapro.com',
    rating: '4.8',
    tagline: 'Turning data into success',
    services: [
      'Big Data Analytics',
      'Cloud Computing',
      'Business Intelligence',
      'Data Visualization',
    ],
    employee: 150,
    experience: '3-5 years',
    salary: '$80,000 - $100,000',
    posted_date: '2024-10-15',
    work_modes: 'On-site',
    job_info:
      'any fresh graduate or post graduate with 0-1 years of work experience',
  },
];
const SavedJobScreen = () => {
  const navigation = useNavigation();
  const [bookmarked, setBookmarked] = useState({});

  const toggleBookmark = (id) => {
    setBookmarked(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardContainer}>
        {companies.map(company => {
          const hasCompanyInfo =
            company.company_name && company.logo && company.rating;

          return (
            <TouchableOpacity
              key={company.id}
              onPress={() =>
                navigation.navigate('Invite', {companyId: company.id})
              }
              style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.jobTitleContainer}>
                  <Text style={styles.cardTitle}>{company.job_title}</Text>
                  <TouchableOpacity
                    onPress={() => toggleBookmark(company.id)}
                    style={styles.bookmarkIconContainer}>
                    <Ionicons
                      name={bookmarked[company.id] ? 'bookmark' : 'bookmark-outline'}
                      size={22}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location" // Icon for location
                    color={colors.primary} // Icon color
                    size={14} // Icon size
                    style={{padding: 0}} // Adjust the style
                  />
                  <Text style={styles.detailsText}> {company.location}</Text>
                </View>
                <View style={styles.detailsRow}>
                  <Ionicons name="briefcase" size={14} color={colors.primary} />
                  <Text style={styles.detailsText}> {company.experience}</Text>
                  <View style={styles.detailsalary}>
                    <Ionicons name="cash" size={14} color={colors.primary} />
                    <Text style={styles.detailsText}> {company.salary}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.innerCard}>
                {/* Conditional Rendering */}
                {hasCompanyInfo ? (
                  // If Company Name, Logo, and Rating are available, show this section
                  <View style={styles.iconMain}>
                    <Image
                      source={
                        company.logo
                          ? {uri: company.logo} // Use URI if the logo is a valid URL or path
                          : require('../../Assets/CompanyLogo/TCS_logo.png') // Fallback to a default image
                      }
                      style={styles.logo}
                    />
                    <View style={styles.companyMaincontainer}>
                      <View style={styles.companyDetail}>
                        <Text style={styles.companyText}>
                          {company.company_name}
                        </Text>
                        <View style={styles.icon}>
                          <Ionicons
                            name="star"
                            size={14}
                            color="#ffd700"
                            style={styles.ratingIcon}
                          />
                          <Text style={styles.companyReview}>
                            {company.rating}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  // If the Company Info is missing, show this section (fallback view)
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name="person"
                      size={14}
                      color={colors.primary}
                      style={styles.icon}
                    />
                  </View>
                )}

                {/* Text for Hiring position */}
                {!hasCompanyInfo && (
                  <View style={styles.techContainer}>
                    <Text style={styles.companyText}>
                      Hiring for {company.job_title} position
                    </Text>
                    <Text style={styles.detailscompanytext}>
                      Posted by Swatsan Tech Private Limited
                    </Text>
                  </View>
                )}

                <Text style={styles.companyDate}>
                  {moment(company.posted_date).format('MMM D')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    padding: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 12,
    // marginHorizontal: 12,
  },

  cardContent: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
  },
  jobTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensures title and bookmark are on opposite sides
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.blackText,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
  },

  detailsText: {
    fontSize: 12,
    color: colors.blackText,
  },
  detailscompanytext: {
    fontSize: 10,
    color: colors.blackText,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsalary: {
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center',
  },
  innerCard: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 8,
    gap: 8,
    // alignItems: 'center',
    marginTop: 6,
  },
  iconContainer: {
    backgroundColor: '#fafafa', // Set the background color for the icon
    borderRadius: 4, // Make the background circular (adjust size as needed)
    padding: 8, // Add some padding around the icon
    // marginRight: 10,             // Add some space between icon and text
    borderWidth: 1, // Add border to the background
    borderColor: '#ddd', // Set the color of the border
    justifyContent: 'center', // Center the icon inside the background
    alignItems: 'center', // Center the icon horizontally
    // marginTop:8
  },
  iconMain: {
    flexDirection: 'row',
  },
  companyDetail: {
    flexDirection: 'column',
  },
  companyMaincontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain', // Adjusts the image to cover the container uniformly
    marginRight: 8,
  },
  techContainer: {
    //  alignItems:'center'
    justifyContent: 'center',
  },
  companyText: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 2,
  },
  companyReview: {
    fontSize: 10,
    color: 'gray',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    marginRight: 4,
  },
  companyDate: {
    fontSize: 10,
    alignItems: 'center',
    color: 'gray',

    // textAlign:'right',
  },
});

export default SavedJobScreen;
