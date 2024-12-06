import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../Global_CSS/TheamColors';
import CustomHeader from '../../../Constant/CustomBackIcon';
import moment from 'moment'; // Import Moment.js
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PieChart} from 'react-native-chart-kit';

const AnalyticsPage = () => {
  // Get current date and day using Moment.js
  const formattedDate = moment().format('dddd, MMM D YYYY');
  const startOfWeek = moment().startOf('week');
  const endOfWeek = moment().endOf('week');

  const weekDateRange = `${startOfWeek.format('MMM D')} - ${endOfWeek.format(
    'MMM D',
  )}`;

  const profileViews = 12;
  const Invitations = 5;
  const Applies = 10;
  const searchAppearances = 15;

  const completedActions = 2;
  const totalActions = 3;
  const actionPercentage = (completedActions / totalActions) * 100;

  const commentCount = 0;

  const totalValue = profileViews + Invitations + Applies + searchAppearances;

  const getColorByRank = (percentage, rank) => {
    if (rank === 1) {
      return colors.primary;
    } else if (rank === 2) {
      return colors.secondary;
    } else if (rank === 3) {
      return '#006699';
    } else {
      return '#99ddff';
    }
  };

  const profileViewsPercentage = (profileViews / totalValue) * 100;
  const invitationsPercentage = (Invitations / totalValue) * 100;
  const appliesPercentage = (Applies / totalValue) * 100;
  const searchAppearancesPercentage = (searchAppearances / totalValue) * 100;

  const data = [
    {
      name: 'ProfileViews',
      value: profileViews,
      percentage: profileViewsPercentage,
    },
    {
      name: 'Invitations',
      value: Invitations,
      percentage: invitationsPercentage,
    },
    {
      name: 'Applies',
      value: Applies,
      percentage: appliesPercentage,
    },
    {
      name: 'SearchAppearance',
      value: searchAppearances,
      percentage: searchAppearancesPercentage,
    },
  ];

  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);

  const chartData = sortedData.map((item, index) => ({
    name: item.name,
    population: item.value,
    color: getColorByRank(item.percentage, index + 1),
    legendFontColor: '#7F7F7F',
    legendFontSize: 10,
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader />
      </View>
      <View style={styles.imageContainer}>
        <View>
          <Text style={styles.containerText}>Analytics & tools</Text>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <Image
          source={require('../../../Assets/Images/Userimage.png')}
          style={styles.userimage}
        />
      </View>

      {/* <View style={styles.analyticContainer}>
       
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profileViews}</Text>
            <Text style={styles.statLabel}>Profile Views</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Invitations}</Text>
            <Text style={styles.statLabel}>Invitations</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Applies}</Text>
            <Text style={styles.statLabel}>Applies</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{searchAppearances}</Text>
            <Text style={styles.statLabel}>Search Appearances (Last Week)</Text>
          </View>
        </View>
      </View> */}
      <View style={styles.chartContainer}>
        <View style={styles.iconConatiner}>
          <Text style={styles.analyticText}>Weekly Analytics</Text>
          <Ionicons
            name="analytics-outline"
            size={18}
            style={styles.iconStyles}
          />
        </View>
        <PieChart
          data={chartData}
          width={320}
          height={180}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 12,
            },
          }}
          accessor={'population'}
          backgroundColor="transparent"
        />
      </View>

      <View style={styles.trackerContainer}>
        <Text style={styles.trackerTextContainer}>Weekly Sharing Tracker</Text>
        <Text style={styles.tracterDescriptiontext}>
          Increase your visibility by posting or commenting. We suggest taking
          <Text style={styles.boldText}> 3 actions every week.</Text>
        </Text>

        <View style={styles.horizontalLine} />

        <View style={styles.progressRow}>
          <View style={styles.imageContainerProgress}>
            <Image
              source={require('../../../Assets/ApplyImages/Notebook1.png')}
              style={styles.trackerImage}
            />
          </View>

          <View style={styles.progressBarContainer}>
            <Text style={styles.dateactionText}>{weekDateRange}</Text>
            <Text style={styles.progressText}>
              {completedActions} of {totalActions} actions completed
            </Text>
            <View style={styles.progressContainer}>
              <View
                style={[styles.progressBar, {width: `${actionPercentage}%`}]}
              />
            </View>
            <Text style={styles.actionText}>
              Take 3 actions to achieve the weekly sharing goal.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardCount}>{commentCount} Comments</Text>
          <Text style={styles.cardTitle}>Job Comments</Text>
          <Text style={styles.cardText}>
            Members who comment once per week on average see up to 3x more
            profile views.
          </Text>
          <TouchableOpacity>
            <Text style={styles.cardsecondaryText}>Commment on feed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    // marginVertical: 18,
    marginTop: 18,
  },
  headerContainer: {
    marginHorizontal: 12,
  },
  containerText: {
    fontSize: 16,
    color: colors.blackText,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },

  dateText: {
    fontSize: 12,
    color: colors.blackText,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  userimage: {
    width: 56,
    height: 56,
  },
  analyticContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
  },
  analyticText: {
    color: colors.blackText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconStyles: {
    color: colors.blackText,
    marginLeft: 4,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 18,
    marginVertical: 8,
    width: '48%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.blackText,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.blackText,
    marginBottom: 10,
  },
  trackerContainer: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 12,
  },
  trackerTextContainer: {
    color: colors.blackText,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tracterDescriptiontext: {
    fontSize: 12,
    color: 'gray',
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.blackText,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightgaryText,
    marginVertical: 8,
  },
  trackerImage: {
    height: 72,
    width: 72,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 50,
    marginTop: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  imageContainerProgress: {
    marginRight: 16,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  dateactionText: {
    fontSize: 11,
    color: 'gray',
  },
  progressText: {
    fontSize: 12,
    color: colors.blackText,
    marginTop: 2,
  },
  actionText: {
    fontSize: 11,
    color: 'gray',
  },

  card: {
    backgroundColor: '#fff',
    borderColor: colors.lightgaryText,
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginTop: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.blackText,
  },
  cardCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cardText: {
    fontSize: 11,
    color: 'gray',
  },
  cardsecondaryText: {
    fontSize: 12,
    color: 'blue',
    marginTop: 6,
  },
});

export default AnalyticsPage;
