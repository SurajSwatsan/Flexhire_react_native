import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const applicationStatus = [
  {
    name: 'APPLIED',
    icon: 'document-text',
  },
  {
    name: 'APPLICATION VIEWED',
    icon: 'eye',
  },
  {
    name: 'ACCEPTED',
    icon: 'checkmark-circle',
  },
  {
    name: 'REJECTED',
    icon: 'close-circle',
  },
  {
    name: 'INTERVIEW SCHEDULE',
    icon: 'calendar',
  },
  {
    name: 'HIRED',
    icon: 'person',
  },
];

const CustomTimelineScreen = ({res}) => {
  const isAcceptedPresent = res.some(entry => entry.name === 'ACCEPTED');
  const isRejectedPresent = res.some(entry => entry.name === 'REJECTED');
  // console.log(isAcceptedPresent, isRejectedPresent);

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
              entry => entry.name === 'REJECTED',
            );
            const itemIndex = applicationStatus.findIndex(
              entry => entry.name === item.name,
            );
            return itemIndex <= rejectedIndex && item.name !== 'ACCEPTED';
          }

          if (isAcceptedPresent) {
            return item.name !== 'REJECTED';
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
                        isRejectedPresent && item.name == 'REJECTED'
                          ? 'red'
                          : isStatusPresent(item.name) &&
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
                        isRejectedPresent && item.name == 'REJECTED'
                          ? 'red'
                          : isStatusPresent(item.name) &&
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
                      isRejectedPresent && item.name == 'REJECTED'
                        ? 'red'
                        : isStatusPresent(item.name) &&
                          isStatusCompleted(item.name)
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
                        isRejectedPresent && item.name == 'REJECTED'
                          ? 'red'
                          : isStatusPresent(item.name) &&
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
                        isRejectedPresent && item.name == 'REJECTED'
                          ? 'red'
                          : isStatusPresent(item.name) &&
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
                        isRejectedPresent && item.name == 'REJECTED'
                          ? 'red'
                          : isStatusPresent(item.name) &&
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
