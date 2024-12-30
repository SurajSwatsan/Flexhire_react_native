import React, {useEffect, useState} from 'react';
import {
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {IconButton} from 'react-native-paper';
import profileStyle from '../../ProfileStyle';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {colors} from '../../../../Global_CSS/TheamColors';
import GlobalStyle from '../../../../Global_CSS/GlobalStyle';
import {Toast, useToast} from 'react-native-toast-notifications';

const AvailabilityOptions = [
  {id: 1, label: 'Full Time', value: 'Full Time'},
  {id: 2, label: 'Part Time', value: 'Part Time'},
];

const showValidationToast = (toast, message) => {
  toast.show(message, {
    type: 'warning',
    duration: 4000,
    animationType: 'slide-in',
  });
};

const isNineHourDifference = (startTime, endTime) => {
  if (!startTime || !endTime) return true;
  const start = moment(startTime, 'hh:mm A');
  const end = moment(endTime, 'hh:mm A');
  return end.diff(start, 'hours') === 9;
};

const Availability = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(null);
  const [currentEditIndex, setCurrentEditIndex] = useState(null); // To track which record is being edited
  const [availabilities, setAvailabilities] = useState([]);
  const toast = useToast();

  const openModal = (data, index = null) => {
    setCurrentEditIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentEditIndex(null);
  };

  let formikRef = null;

  const showValidationToast = (toast, message) => {
    toast.show(message, {
      type: 'warning',
      duration: 4000,
      animationType: 'slide-in',
    });
  };

  const validationSchema = () => {
    return Yup.object().shape({
      mode: Yup.string().required('Availability mode is required'),
      slots: Yup.array()
        .of(
          Yup.object().shape({
            start_time: Yup.string()
              .required('Start time is required')
              .test(
                'valid-time',
                'Start time must be earlier than end time',
                function (value) {
                  const {end_time} = this.parent;
                  if (!value || !end_time) return true;
                  const isValid = moment(value, 'hh:mm A').isBefore(
                    moment(end_time, 'hh:mm A'),
                  );
                  if (!isValid)
                    showValidationToast(
                      toast,
                      'Start time must be earlier than end time',
                    );
                  return isValid;
                },
              ),
            end_time: Yup.string()
              .required('End time is required')
              .test(
                'valid-time',
                'End time must be after start time',
                function (value) {
                  const {start_time} = this.parent;
                  if (!value || !start_time) return true;
                  const isValid = moment(value, 'hh:mm A').isAfter(
                    moment(start_time, 'hh:mm A'),
                  );
                  if (!isValid)
                    showValidationToast(
                      toast,
                      'End time must be after start time',
                    );
                  return isValid;
                },
              )
              .test(
                'nine-hours',
                'Start and End time difference must be exactly 9 hours for Full Time',
                function (value) {
                  const {start_time} = this.parent;
                  const {mode} = this.options.context;
                  if (mode === 'Full Time') {
                    const isValid = isNineHourDifference(start_time, value);
                    if (!isValid)
                      showValidationToast(
                        toast,
                        'Start and End time difference must be exactly 9 hours for Full Time',
                      );
                    return isValid;
                  }
                  return true;
                },
              ),
          }),
        )
        .required('At least one slot is required')
        .min(1, 'At least one slot is required')
        .test(
          'no-overlap',
          'Each slot must have start time after the previous slot’s end time',
          function (slots) {
            if (!slots || slots.length < 2) return true;
            for (let i = 1; i < slots.length; i++) {
              const prevSlot = slots[i - 1];
              const currentSlot = slots[i];
              const isValid = moment(currentSlot.start_time, 'hh:mm A').isAfter(
                moment(prevSlot.end_time, 'hh:mm A'),
              );
              if (!isValid) {
                showValidationToast(
                  toast,
                  'Each slot must have start time after the previous slot’s end time',
                );
                return false;
              }
            }
            return true;
          },
        ),
    });
  };

  useEffect(() => {
    toast.show('Component mounted successfully', {type: 'success'});
  }, []);

  const handleFormSubmit = values => {
    const existingIndex = availabilities.findIndex(
      availability => availability.mode === values.mode,
    );

    if (existingIndex !== -1) {
      // If the mode already exists, update the existing availability
      const updatedAvailabilities = [...availabilities];
      updatedAvailabilities[existingIndex] = values;
      setAvailabilities(updatedAvailabilities);
    } else {
      // If the mode does not exist, add a new availability
      setAvailabilities([...availabilities, values]);
    }

    closeModal();
  };

  console.log('Availabilities:', JSON.stringify(availabilities, null, 2));

  const deleteSlot = (index, values, setFieldValue) => {
    const updatedSlots = values.slots.filter((_, i) => i !== index);
    setFieldValue('slots', updatedSlots);
  };

  const addNewSlot = (values, setFieldValue) => {
    const lastSlot = values.slots[values.slots.length - 1];
    if (lastSlot && !lastSlot.end_time) {
      Toast.show('Complete the current slot before adding a new one', {
        type: 'warning',
      });
      return;
    }
    const newSlotStartTime = lastSlot?.end_time || '';
    setFieldValue('slots', [
      ...values.slots,
      {start_time: newSlotStartTime, end_time: ''},
    ]);
  };

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>AVAILABILITY INFORMATION</Text>
        <IconButton
          icon="plus-circle-outline"
          size={20}
          onPress={() =>
            openModal({mode: '', slots: [{start_time: '', end_time: ''}]})
          }
          iconColor="#000"
        />
      </View>
      <View>
        {availabilities.map((availability, index) => (
          <View key={index} style={styles.dataContainer}>
            <View>
              <Text style={styles.dataLabel}>{availability.mode}</Text>
              {availability.slots?.map((slot, slotIndex) => (
                <View key={slotIndex} style={styles.slotDataContainer}>
                  <Text style={styles.dataLabel}>Slot {slotIndex + 1}: </Text>
                  <Text style={styles.dataValue}>
                    {slot.start_time &&
                    moment(slot.start_time, 'hh:mm A', true).isValid()
                      ? moment(slot.start_time, 'hh:mm A').format('hh:mm A')
                      : 'Invalid Start Time'}{' '}
                    -{' '}
                    {slot.end_time &&
                    moment(slot.end_time, 'hh:mm A', true).isValid()
                      ? moment(slot.end_time, 'hh:mm A').format('hh:mm A')
                      : 'Invalid End Time'}
                  </Text>
                </View>
              ))}
            </View>
            <IconButton
              icon="pencil-outline"
              size={20}
              iconColor="#000"
              onPress={() => openModal(availability, index)}
            />
          </View>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalContainer}>
          <FlatList
            data={[{key: 'form'}]}
            renderItem={() => (
              <Formik
                initialValues={
                  currentEditIndex !== null
                    ? availabilities[currentEditIndex]
                    : {
                        mode: 'Full Time',
                        slots: [{start_time: '', end_time: ''}],
                      }
                }
                innerRef={ref => (formikRef = ref)}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}>
                {({handleSubmit, values, setFieldValue, errors, touched}) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>
                      Availability Information
                    </Text>
                    <Text style={profileStyle.formSubHeading}>
                      This information is important for employers to know you
                      better
                    </Text>

                    <Text style={profileStyle.label}>Availability *</Text>
                    <View style={profileStyle.TabContainer}>
                      {AvailabilityOptions.map(option => (
                        <TouchableOpacity
                          key={option.id}
                          style={[
                            profileStyle.tabBtnStyle,
                            values.mode === option.value &&
                              profileStyle.selectedTab,
                          ]}
                          onPress={() => setFieldValue('mode', option.value)}>
                          <Text
                            style={[
                              profileStyle.tabBtnText,
                              values.mode === option.value &&
                                profileStyle.selectedTabText,
                            ]}>
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    {/* {touched.mode && errors.mode && (
                      <Text style={profileStyle.errorText}>{errors.mode}</Text>
                    )} */}

                    {values.mode === 'Full Time' && (
                      <View style={styles.slotContainer}>
                        <View style={{flexDirection: 'row', gap: 8}}>
                          {/* Start Time */}
                          <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => {
                              setCurrentSlotIndex(0);
                              setShowStartTimePicker(true);
                            }}>
                            <TextInput
                              label="Start Time"
                              mode="outlined"
                              value={values.slots[0]?.start_time || ''}
                              editable={false}
                              style={styles.inputBox}
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                            />
                            {touched.slots && errors.slots?.[0]?.start_time && (
                              <Text style={profileStyle.error}>
                                {errors.slots[0].start_time}
                              </Text>
                            )}
                          </TouchableOpacity>
                          {showStartTimePicker && currentSlotIndex === 0 && (
                            <DateTimePicker
                              value={
                                values.slots[0]?.start_time
                                  ? moment(
                                      values.slots[0].start_time,
                                      'hh:mm A',
                                    ).toDate()
                                  : new Date()
                              }
                              mode="time"
                              display="default"
                              onChange={(event, selectedDate) => {
                                setShowStartTimePicker(false);
                                if (selectedDate) {
                                  const updatedSlots = [...values.slots];
                                  updatedSlots[0].start_time =
                                    moment(selectedDate).format('hh:mm A'); // Format time directly
                                  setFieldValue('slots', updatedSlots);
                                }
                              }}
                            />
                          )}

                          {/* End Time */}
                          <TouchableOpacity
                            style={{flex: 1}}
                            onPress={() => {
                              setCurrentSlotIndex(0);
                              setShowEndTimePicker(true);
                            }}>
                            <TextInput
                              label="End Time"
                              mode="outlined"
                              value={values.slots[0]?.end_time || ''}
                              editable={false}
                              style={styles.inputBox}
                              textColor="#333"
                              outlineColor="lightgray"
                              activeOutlineColor="gray"
                            />
                            {touched.slots && errors.slots?.[0]?.end_time && (
                              <Text style={profileStyle.error}>
                                {errors.slots[0].end_time}
                              </Text>
                            )}
                          </TouchableOpacity>
                          {showEndTimePicker && currentSlotIndex === 0 && (
                            <DateTimePicker
                              value={
                                values.slots[0]?.end_time
                                  ? moment(
                                      values.slots[0].end_time,
                                      'hh:mm A',
                                    ).toDate()
                                  : new Date()
                              }
                              mode="time"
                              display="default"
                              onChange={(event, selectedDate) => {
                                setShowEndTimePicker(false);
                                if (selectedDate) {
                                  const updatedSlots = [...values.slots];
                                  updatedSlots[0].end_time =
                                    moment(selectedDate).format('hh:mm A'); // Format time directly
                                  setFieldValue('slots', updatedSlots);
                                }
                              }}
                            />
                          )}
                        </View>
                      </View>
                    )}

                    {values.mode === 'Part Time' && (
                      <>
                        <FlatList
                          data={values.slots}
                          renderItem={({item, index}) => (
                            <View
                              key={index}
                              style={profileStyle.slotContainer}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text style={styles.slotLabel}>
                                  Slot {index + 1}
                                </Text>
                                <IconButton
                                  icon="delete"
                                  size={20}
                                  iconColor={colors.primary}
                                  onPress={() =>
                                    deleteSlot(index, values, setFieldValue)
                                  }
                                />
                              </View>
                              <View style={{flexDirection: 'row', gap: 8}}>
                                {/* Start Time */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    setCurrentSlotIndex(index);
                                    setShowStartTimePicker(true);
                                  }}>
                                  <TextInput
                                    label="Start Time"
                                    mode="outlined"
                                    value={item.start_time || ''}
                                    editable={false}
                                    style={styles.inputBox}
                                    textColor="#333"
                                    outlineColor="lightgray"
                                    activeOutlineColor="gray"
                                  />
                                  {touched.slots &&
                                    errors.slots?.[index]?.start_time && (
                                      <Text style={profileStyle.error}>
                                        {errors.slots[index].start_time}
                                      </Text>
                                    )}
                                </TouchableOpacity>
                                {showStartTimePicker &&
                                  currentSlotIndex === index && (
                                    <DateTimePicker
                                      value={
                                        item.start_time
                                          ? moment(
                                              item.start_time,
                                              'hh:mm A',
                                            ).toDate()
                                          : new Date()
                                      }
                                      mode="time"
                                      display="default"
                                      onChange={(event, selectedDate) => {
                                        setShowStartTimePicker(false);
                                        if (selectedDate) {
                                          const updatedSlots = [
                                            ...values.slots,
                                          ];
                                          updatedSlots[index].start_time =
                                            moment(selectedDate).format(
                                              'hh:mm A',
                                            ); // Store in hh:mm A format
                                          setFieldValue('slots', updatedSlots);
                                        }
                                      }}
                                    />
                                  )}

                                {/* End Time */}
                                <TouchableOpacity
                                  style={{flex: 1}}
                                  onPress={() => {
                                    setCurrentSlotIndex(index);
                                    setShowEndTimePicker(true);
                                  }}>
                                  <TextInput
                                    label="End Time"
                                    mode="outlined"
                                    value={item.end_time || ''}
                                    editable={false}
                                    style={styles.inputBox}
                                    textColor="#333"
                                    outlineColor="lightgray"
                                    activeOutlineColor="gray"
                                  />
                                  {touched.slots &&
                                    errors.slots?.[index]?.end_time && (
                                      <Text style={profileStyle.error}>
                                        {errors.slots[index].end_time}
                                      </Text>
                                    )}
                                </TouchableOpacity>
                                {showEndTimePicker &&
                                  currentSlotIndex === index && (
                                    <DateTimePicker
                                      value={
                                        item.end_time
                                          ? moment(
                                              item.end_time,
                                              'hh:mm A',
                                            ).toDate()
                                          : new Date()
                                      }
                                      mode="time"
                                      display="default"
                                      onChange={(event, selectedDate) => {
                                        setShowEndTimePicker(false);
                                        if (selectedDate) {
                                          const updatedSlots = [
                                            ...values.slots,
                                          ];
                                          updatedSlots[index].end_time =
                                            moment(selectedDate).format(
                                              'hh:mm A',
                                            ); // Store in hh:mm A format
                                          setFieldValue('slots', updatedSlots);
                                        }
                                      }}
                                    />
                                  )}
                              </View>
                            </View>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                        {values.slots.length < 3 && (
                          <Button
                            onPress={() => addNewSlot(values, setFieldValue)}
                            labelStyle={GlobalStyle.labelStyle}>
                            Add New Slot
                          </Button>
                        )}
                      </>
                    )}
                  </View>
                )}
              </Formik>
            )}
            keyExtractor={item => item.key}
          />
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={closeModal}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  slotContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  deleteButtonText: {
    fontSize: 14,
    color: 'red',
  },
  inputBox: {
    backgroundColor: '#fff',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  slotDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  dataValue: {
    fontSize: 14,
    color: colors.blackText,
  },
});

export default Availability;
