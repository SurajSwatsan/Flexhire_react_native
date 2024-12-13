// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Image,
//   TextInput,
//   Button,
//   TouchableOpacity,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import moment from 'moment'; // Import moment
// import {colors} from '../Global_CSS/TheamColors'; // Import colors for theme

// // Initial review data
// const reviewsData = [
//   {
//     id: '1',
//     reviewerName: 'John Doe',
//     rating: 4.7,
//     reviewText: 'Great product, highly recommend!',
//     date: '2024-11-10',
//     imageUrl: require('../Assets/Images/Userimage.png'), // Local image for John
//   },
//   {
//     id: '2',
//     reviewerName: 'Jane Smith',
//     rating: 4.5,
//     reviewText: 'Amazing quality and fast delivery.',
//     date: '2024-11-08',
//     imageUrl: require('../Assets/Images/Userimage.png'), // Local image for Jane
//   },
 
// ];


// const userName = 'Alex Doe'; // Default user name (for demonstration)
// const userProfileImage = require('../Assets/Images/Userimage.png'); // Default profile image (can be dynamic)

// const ReviewPage = ({jobData}) => {
// //   const {jobData} = route.params;
// console.log('#############################',jobData);
//   const [newComment, setNewComment] = useState('');
//   const [reviews, setReviews] = useState(reviewsData);
//   const [userRating, setUserRating] = useState(5); 
 
//   const averageRating =
//   reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;



//   // Render stars for rating
//   const renderStars = rating => {
//     const stars = [];
//     const fullStars = Math.floor(rating); 
//     const halfStar = rating % 1 >= 0.5 ? 1 : 0; 
//     const emptyStars = 5 - fullStars - halfStar; 

//     // Add full stars
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(
//         <Ionicons key={`full-${i}`} name="star" size={18} color="#FFD700" />,
//       );
//     }

//     // Add half star if needed
//     if (halfStar) {
//       stars.push(
//         <Ionicons key="half" name="star-half" size={18} color="#FFD700" />,
//       );
//     }

//     // Add empty stars
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <Ionicons
//           key={`empty-${i}`}
//           name="star-outline"
//           size={18}
//           color="#FFD700"
//         />,
//       );
//     }

//     return stars;
//   };

//   const handleAddComment = () => {
//     if (newComment && userRating) {
//       const newReview = {
//         id: (reviews.length + 1).toString(), 
//         reviewerName: userName,
//         rating: userRating,
//         reviewText: newComment,
//         date: moment().format('YYYY-MM-DD'), 
//         imageUrl: userProfileImage, 
//       };

//       const updatedReviews = [newReview, ...reviews];
//       setReviews(updatedReviews);
//       // setReviews([newReview, ...reviews]);
//       setNewComment(''); 
//       setUserRating(5); 
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.contentContainer}>
//       <View style={styles.averageRatingContainer}>
//         <Text style={styles.averageRatingText}>Average Rating</Text>
//         <View style={styles.starsContainer}>
//           {renderStars(Math.round(averageRating))}
//           <Text style={styles.averageRatingValue}>
//             {' '}
//             ({averageRating.toFixed(1)})
//           </Text>
//         </View>
//       </View>

//       <View style={styles.commentBoxContainer}>
//         <TextInput
//           style={styles.commentInput}
//           placeholder="Add your comment..."
//           value={newComment}
//           onChangeText={setNewComment}
//           multiline
//         />

//         <View style={styles.ratingContainer}>
//           <View style={styles.starContainer}>
//             {[1, 2, 3, 4, 5].map(starValue => (
//               <Ionicons
//                 key={starValue}
//                 name={starValue <= userRating ? 'star' : 'star-outline'}
//                 size={20}
//                 color="#FFD700"
//                 onPress={() => setUserRating(starValue)}
//               />
//             ))}
//           </View>
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleAddComment}>
//           <Text style={styles.buttonText}>Add Comment</Text>
//         </TouchableOpacity>
//       </View>

//       {reviews.map(
//         (
//           item, // Loop through the reviews state (not reviewsData)
//         ) => (
//           <View key={item.id} style={styles.reviewContainer}>
//             <View style={styles.reviewerInfo}>
//               <Image source={item.imageUrl} style={styles.reviewerImage} />
//               <View style={styles.reviewerDetails}>
//                 <View style={styles.reviewerNameDateContainer}>
//                   <Text style={styles.reviewerName}>{item.reviewerName}</Text>
//                   <Text style={styles.reviewDate}>
//                     {moment(item.date).format('D MMM YYYY')}
//                   </Text>
//                 </View>

//                 <View style={styles.starsContainer}>
//                   {renderStars(item.rating)}
//                   <Text style={styles.ratingValue}>
//                     {' '}
//                     ({item.rating.toFixed(1)})
//                   </Text>
//                 </View>
//               </View>
//             </View>

//             <Text style={styles.reviewText}>{item.reviewText}</Text>
//           </View>
//         ),
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     // padding: 20,
//   },
//   averageRatingContainer: {
//     marginBottom: 8,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   averageRatingText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   starsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//   },
//   averageRatingValue: {
//     fontSize: 14,
//     color: '#555',
//     marginLeft: 5,
//   },
//   reviewContainer: {
//     backgroundColor: 'white',
//     padding: 12,
//     marginBottom: 12,
//     borderRadius: 8,
//     shadowOffset: {width: 0, height: 2},
//     borderWidth: 0.5,
//     borderColor: '#e6e6e6',
//   },
//   reviewerInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   reviewerImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 12,
//   },
//   reviewerDetails: {
//     flexDirection: 'column',
//     flex: 1,
//   },
//   reviewerNameDateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   reviewerName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   reviewDate: {
//     fontSize: 12,
//     color: '#888',
//   },
//   reviewText: {
//     fontSize: 14,
//     color: '#444',
//     marginTop: 5,
//   },
//   ratingValue: {
//     fontSize: 12,
//     color: '#333',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
//   commentBoxContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     borderWidth: 0.5,
//     borderColor: '#e6e6e6',
//     shadowOffset: {width: 0, height: 2},
//   },
//   commentInput: {
//     height: 48,
//     borderColor: '#e6e6e6',
//     borderWidth: 1,
//     padding: 8,
//     borderRadius: 12,
//     marginBottom: 10,
//   },
//   starContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: colors.primary,
//     borderRadius: 5,
//     alignItems: 'center',
//     alignSelf: 'flex-end',
//     justifyContent: 'center',
//     // marginVertical: 4,
//     width: 100,
//     height: 36,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });

// export default ReviewPage;

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { colors } from '../Global_CSS/TheamColors';

const ReviewPage = ({ JobDetails }) => {
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(5);

  // Calculate the average rating if multiple reviews exist
  const averageRating =
  JobDetails.reduce((acc, review) => acc + review.rating, 0) / JobDetails.length;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={`full-${i}`} name="star" size={18} color="#FFD700" />);
    }
    if (halfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={18} color="#FFD700" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={18} color="#FFD700" />);
    }

    return stars;
  };

  const handleAddComment = () => {
    if (newComment && userRating) {
      // Logic to handle adding new comments (e.g., call an API to save)
      setNewComment('');
      setUserRating(5);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Average Rating */}
      <View style={styles.averageRatingContainer}>
        <Text style={styles.averageRatingText}>Average Rating</Text>
        <View style={styles.starsContainer}>
          {renderStars(Math.round(averageRating))}
          <Text style={styles.averageRatingValue}> ({averageRating.toFixed(1)})</Text>
        </View>
      </View>

      {/* Add Comment Section */}
      <View style={styles.commentBoxContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add your comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <View style={styles.ratingContainer}>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Ionicons
                key={starValue}
                name={starValue <= userRating ? 'star' : 'star-outline'}
                size={20}
                color="#FFD700"
                onPress={() => setUserRating(starValue)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
          <Text style={styles.buttonText}>Add Comment</Text>
        </TouchableOpacity>
      </View>

      {/* Map Over Reviews */}
      {JobDetails.map((item) => (
        <View key={item.id} style={styles.reviewContainer}>
          <View style={styles.reviewerInfo}>
            <Image
              source={require('../Assets/Images/Userimage.png')} // Placeholder image, update accordingly
              style={styles.reviewerImage}
            />
            <View style={styles.reviewerDetails}>
              <View style={styles.reviewerNameDateContainer}>
                <Text style={styles.reviewerName}>{item.is_anonymous ? 'Anonymous' : 'John Doe'}</Text>
                <Text style={styles.reviewDate}>
                  {moment(item.review_date).format('D MMM YYYY')}
                </Text>
              </View>
              <View style={styles.starsContainer}>
                {renderStars(item.rating)}
                <Text style={styles.ratingValue}> ({item.rating.toFixed(1)})</Text>
              </View>
            </View>
          </View>

          <Text style={styles.reviewTitle}>{item.review_title}</Text>

          {/* Optional sections for pros and cons */}
          <View style={styles.prosConsContainer}>
            <Text style={styles.prosConsTitle}>Pros:</Text>
            <Text style={styles.prosConsText}>{item.pros}</Text>
            <Text style={styles.prosConsTitle}>Cons:</Text>
            <Text style={styles.prosConsText}>{item.cons}</Text>
          </View>
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
    marginBottom: 8,
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
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  ratingValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  prosConsContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
  prosConsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  prosConsText: {
    fontSize: 12,
    color: '#555',
  },
  commentBoxContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: '#e6e6e6',
    shadowOffset: { width: 0, height: 2 },
  },
  commentInput: {
    height: 48,
    borderColor: '#e6e6e6',
    borderWidth: 1,
    padding: 8,
    borderRadius: 12,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    width: 100,
    height: 36,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ReviewPage;
