import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import moment from 'moment'; // Import moment

const reviewsData = [
  {
    id: '1',
    reviewerName: 'John Doe',
    rating: 4.7,
    reviewText: 'Great product, highly recommend!',
    date: '2024-11-10',
    imageUrl: require('../Assets/Images/Userimage.png'), // Local image for John
  },
  {
    id: '2',
    reviewerName: 'Jane Smith',
    rating: 4.5,
    reviewText: 'Amazing quality and fast delivery.',
    date: '2024-11-08',
    imageUrl: require('../Assets/Images/Userimage.png'), // Local image for Jane
  },
  // Add more reviews as needed
];

const ReviewPage = () => {
  // Calculate average rating
  const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);  // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;  // Check if there should be a half star
    const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons
          key={`full-${i}`}
          name="star"
          size={18}
          color="#FFD700"
        />
      );
    }

    // Add half star if needed
    if (halfStar) {
      stars.push(
        <Ionicons
          key="half"
          name="star-half"
          size={18}
          color="#FFD700"
        />
      );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={18}
          color="#FFD700"
        />
      );
    }

    return stars;
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Average Rating Section */}
      <View style={styles.averageRatingContainer}>
        <Text style={styles.averageRatingText}>Average Rating</Text>
        <View style={styles.starsContainer}>
          {renderStars(Math.round(averageRating))}
          <Text style={styles.averageRatingValue}> ({averageRating.toFixed(1)})</Text>
        </View>
      </View>

      {/* List of Reviews */}
      {reviewsData.map((item) => (
        <View key={item.id} style={styles.reviewContainer}>
          {/* Reviewer Image, Name, and Date */}
          <View style={styles.reviewerInfo}>
            <Image source={item.imageUrl} style={styles.reviewerImage} />
            <View style={styles.reviewerDetails}>
              <View style={styles.reviewerNameDateContainer}>
                <Text style={styles.reviewerName}>{item.reviewerName}</Text>
                <Text style={styles.reviewDate}>
                  {moment(item.date).format('D MMM YYYY')}
                </Text>
              </View>
              {/* Review Rating (Stars and Rating Value) */}
              <View style={styles.starsContainer}>
                {renderStars(item.rating)}
                <Text style={styles.ratingValue}> ({item.rating.toFixed(1)})</Text>
              </View>
            </View>
          </View>

          {/* Review Comment */}
          <Text style={styles.reviewText}>{item.reviewText}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // padding: 20,
  },
  averageRatingContainer: {
    marginBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  averageRatingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  averageRatingValue: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 0.5,
    borderColor: '#e6e6e6',
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewerDetails: {
    flexDirection: 'column',
    flex: 1,
  },
  reviewerNameDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  reviewText: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  ratingValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ReviewPage;


