import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../Global_CSS/TheamColors';
import moment from 'moment';

const applicationStatus = [
  {
    name: 'Applied',
    icon: 'document-text',
  },
  {
    name: 'APPLICATION VIEWED',
    icon: 'eye',
  },
  {
    name: 'Accepted',
    icon: 'checkmark-circle',
  },
  {
    name: 'Rejected',
    icon: 'close-circle',
  },
  {
    name: 'Interview Scheduled',
    icon: 'calendar',
  },
  {
    name: 'Hired',
    icon: 'person',
  },
];

const CustomTimelineScreen = ({res}) => {
  const isAcceptedPresent = res.some(entry => entry.name === 'Accepted');
  const isRejectedPresent = res.some(entry => entry.name === 'Rejected');

  const isStatusPresent = status => {
    return res.some(entry => entry.name === status);
  };
  const isStatusCompleted = name => {
    const status = res.find(entry => entry.name === name);
    return status.is_completed;
  };

  return (
    <View style={styles.container}>
      {/* Map over applicationStatus array to render each item */}
      {applicationStatus
        .filter(item => {
          if (isRejectedPresent) {
            const rejectedIndex = applicationStatus.findIndex(
              entry => entry.name === 'Rejected',
            );
            const itemIndex = applicationStatus.findIndex(
              entry => entry.name === item.name,
            );
            return itemIndex <= rejectedIndex && item.name !== 'Accepted';
          }

          if (isAcceptedPresent) {
            return item.name !== 'Rejected';
          }

          return true; // Otherwise, show the item
        })
        .map((item, index) => {
          // Find the corresponding entry from `res` using the name
          const statusData = res.find(entry => entry.name === item.name);

          // Get date and message (description) from the `res` data
          const date = statusData
            ? moment(statusData.date).format('D MMM YYYY')
            : '';
          const message = statusData ? statusData.message : '';

          return (
            <View style={styles.itemContainer} key={item.name}>
              {index > 0 && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor:
                        isStatusPresent(item.name) &&
                        isStatusCompleted(item.name)
                          ? 'green'
                          : isStatusPresent(item.name) &&
                            !isStatusCompleted(item.name)
                          ? 'orange'
                          : 'gray',
                    },
                  ]}
                />
              )}

              <View style={styles.iconContainer}>
                <View
                  style={[
                    styles.circle,
                    {
                      borderColor:
                        isStatusPresent(item.name) &&
                        isStatusCompleted(item.name)
                          ? 'green'
                          : isStatusPresent(item.name) &&
                            !isStatusCompleted(item.name)
                          ? 'orange'
                          : 'gray',
                    },
                  ]}>
                  <Ionicons
                    name={item.icon}
                    size={14}
                    color={
                      isStatusPresent(item.name) && isStatusCompleted(item.name)
                        ? 'green'
                        : isStatusPresent(item.name) &&
                          !isStatusCompleted(item.name)
                        ? 'orange'
                        : 'gray'
                    }
                  />
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={[
                    styles.cardTitle,
                    {
                      color:
                        isStatusPresent(item.name) &&
                        isStatusCompleted(item.name)
                          ? 'green'
                          : isStatusPresent(item.name) &&
                            !isStatusCompleted(item.name)
                          ? 'orange'
                          : 'gray',
                    },
                  ]}>
                  {item.name}
                </Text>

                <Text
                  style={[
                    styles.cardDate,
                    {
                      color:
                        isStatusPresent(item.name) &&
                        isStatusCompleted(item.name)
                          ? 'green'
                          : isStatusPresent(item.name) &&
                            !isStatusCompleted(item.name)
                          ? 'orange'
                          : 'gray',
                    },
                  ]}>
                  {date}
                </Text>

                {/* Display message/description */}
                <Text
                  style={[
                    styles.description,
                    {
                      color:
                        isStatusPresent(item.name) &&
                        isStatusCompleted(item.name)
                          ? 'green'
                          : isStatusPresent(item.name) &&
                            !isStatusCompleted(item.name)
                          ? 'orange'
                          : 'gray',
                    },
                  ]}>
                  {message}
                </Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    marginVertical: 14,
    borderRadius: 8,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 11,
    color: 'gray',
  },
  description: {
    fontSize: 11,
    color: 'gray',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 20,
  },
  line: {
    width: 2,
    height: '140%',
    left: 21,
    top: -34,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    top: -12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
});

export default CustomTimelineScreen;
