import {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../Global_CSS/TheamColors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BASE_URL} from '../Services/baseAPI';
// import { Icon } from 'react-native-paper';

const {width} = Dimensions.get('window'); // Get the screen width

const CustomCarousel = ({companyDetails = {}}) => {
  // Use a fallback for company_leaders to avoid errors
  const company_leaders = companyDetails?.company_leaders || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Handle case when no data is available
  if (!company_leaders.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No leaders available to display.</Text>
      </View>
    );
  }

  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const goToNext = () => {
    if (currentIndex < company_leaders.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={
          item.image
            ? {uri: BASE_URL + item.image}
            : require('../Assets/CompanyLogo/Swatsan.png') // Fallback image
        }
        style={styles.avatar}
      />
      <View style={styles.card_content}>
        <Text style={styles.name}>{item.name || 'Unknown'}</Text>
        <Text style={styles.role}>{item.position || 'No role specified'}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={goToPrev}
          disabled={currentIndex === 0}
          style={styles.navButtonLeft}>
          <Ionicons name="chevron-back-outline" size={30} color="#000" />
        </TouchableOpacity>

        <View style={{width: width * 0.7, paddingHorizontal: 18}}>
          <FlatList
            data={company_leaders}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id || index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            snapToInterval={width * 0.7}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 50}}
            contentContainerStyle={styles.flatlistContainer}
          />
        </View>

        <TouchableOpacity
          onPress={goToNext}
          disabled={currentIndex === company_leaders.length - 1}
          style={styles.navButtonRight}>
          <Ionicons name="chevron-forward-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.indicatorContainer}>
        {company_leaders.map((_, index) => (
          <Text
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}>
            ●
          </Text>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'relative',
    width: '100%', // Full width of the screen
    justifyContent: 'space-between', // Center the FlatList container between the arrows
    paddingHorizontal: 8,
    // backgroundColor: 'grey',
  },
  card: {
    width: width * 0.6, // Card width is 60% of the screen width
    backgroundColor: 'white',
    borderRadius: 8,

    marginRight: 20, // Ensures spacing between cards
    minHeight: 200,
    // marginBottom: 8,
    marginTop: 12,
  },
  card_content: {
    padding: 12,
    paddingBottom: 18,
  },
  avatar: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.blackText,
    paddingBottom: 4,
  },
  role: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  flatlistContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Ensures the cards are centered horizontally
  },
  navButton: {
    fontSize: 24, // Adjust size to make the arrows bigger
    color: colors.primary,
    fontWeight: 'bold',
  },
  disabledButton: {
    color: 'gray',
  },
  navButtonLeft: {
    // position: 'absolute',
    left: 10,
    zIndex: 1, // Ensure it's on top of the list
    backgroundColor: '#fff',
    borderRadius: 100,
    color: '#fff',
    padding: 4,
  },
  navButtonRight: {
    // position: 'absolute',
    right: 10,
    zIndex: 1, // Ensure it's on top of the list
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 10,
  },
  indicator: {
    fontSize: 20,
    color: 'lightgray',
    margin: 3,
  },
  activeIndicator: {
    color: colors.primary, // Active indicator color
  },
});

export default CustomCarousel;
