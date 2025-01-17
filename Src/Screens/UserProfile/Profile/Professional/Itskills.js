import {
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import profileStyle from '../../ProfileStyle';
import {colors} from '../../../../Global_CSS/TheamColors';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ReusableDropdown from '../../../../Constant/CustomDropdown';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import MasterViewController from '../../../../Redux/Action/MasterViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import {ProfileContext} from '../../ProfileContext';

// Dropdown Options
const Years = Array.from({length: 31}, (_, i) => ({
  label: `${i} Years`,
  value: i,
}));

const Months = Array.from({length: 12}, (_, i) => ({
  label: `${i} Months`,
  value: i,
}));

const LastUsedYears = Array.from(
  {length: new Date().getFullYear() - 1990 + 1},
  (_, i) => ({
    label: `${new Date().getFullYear() - i}`,
    value: new Date().getFullYear() - i,
  }),
);

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Skill / Software name is required')
    .min(2, 'Must be at least 2 characters')
    .max(50, 'Must be at most 50 characters'),
  othername: Yup.string().test('othername-required', function (value) {
    const {name} = this.parent; // Access the value of `name`
    if (name === 'Other') {
      return value && value.length >= 2 && value.length <= 50;
    }
    return true; // If `name` is not "Other", validation passes
  }),
  years: Yup.number()
    .min(0, 'Years must be 0 or more')
    .required('Years is required'),
  months: Yup.number()
    .min(0, 'Months must be 0 or more')
    .required('Months is required'),
  last_used: Yup.number().required('Last Used is required'),
});

// Initial Values Helper

const Itskills = profileDetails => {
  const {isUpdatedProfile, toggleIsUpdatedProfile} = useContext(ProfileContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [keyskillsMasters, setKeyskillsMasters] = useState([]);

  const dispatch = useDispatch();
  const [id, setId] = useState();
  const isFocus = useIsFocused();

  const {GetKeyskills} = MasterViewController();
  const {keyskills} = useSelector(state => state.master);
  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data'); // Wait for the id to be retrieved
        setId(id);
      } catch (error) {
        console.error('Error reading id from AsyncStorage', error);
      }
    };

    getUserData();
    // console.log(
    //   '================================',
    //   profileDetails?.profileDetails?.it_skills,
    // );
    setSkillList(profileDetails?.profileDetails?.it_skills);
    // dispatch(GetProfileAnalytic('e')); // Dispatch the action when the component mounts
  }, [profileDetails]);

  useEffect(() => {
    const get_keyskills = () => {
      if (!keyskills) {
        dispatch(GetKeyskills());
      }
    };

    get_keyskills();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keyskills_data = keyskills?.map(skill => ({
      id: skill.id,
      value: skill.name,
      label: skill.name,
    }));
    setKeyskillsMasters(keyskills_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyskills]);

  const handleFormSubmit = values => {
    if (selectedItem) {
      const updateOrAddObject = (array, obj) => {
        const index = array.findIndex(item => item.name === selectedItem.name);

        if (index !== -1) {
          // Update the existing object
          array[index] = {...array[index], ...obj};
        } else {
          // Add the new object if not found
          array.push(obj);
        }
      };

      updateOrAddObject(skillList, {
        name: values.name,
        othername: values.othername,
        version: values.version,
        last_used: values.last_used,
        exp: {
          years: values.years,
          months: values.months,
        },
      });
      const payload = {
        id: profileDetails?.profileDetails?.id,
        it_skills: skillList,
      };
      // console.log(values);

      dispatch(updateProfileDetails(payload));
      toggleIsUpdatedProfile();
      setSkillList(skillList);
      setModalVisible(false);
      setSelectedItem(null);
    } else {
      const formattedValues = {
        id: profileDetails?.profileDetails?.id
          ? profileDetails?.profileDetails?.id
          : '',
        user_id: id,
        it_skills: [
          ...(profileDetails?.profileDetails?.it_skills || []), // Include existing entries

          {
            name: values.name,
            othername: values.othername,
            version: values.version,
            last_used: values.last_used,
            exp: {
              years: values.years,
              months: values.months,
            },
          },
        ],
      };

      setSkillList(prev => {
        if (selectedItem !== null) {
          const updatedList = [...prev];
          updatedList[selectedItem] = formattedValues;
          return updatedList;
        }
        return [...prev, formattedValues];
      });

      // console.log(formattedValues, values);

      if (profileDetails.profileDetails.id) {
        dispatch(updateProfileDetails(formattedValues));
      } else {
        dispatch(addProfileDetails(formattedValues));
      }
      // dispatch(updateProfileDetails(formattedValues));
      toggleIsUpdatedProfile();

      closeModal();
    }
  };

  let formikRef = null;

  const openModal = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    if (formikRef) {
      formikRef.resetForm(); // Reset the form when closing the modal
    }
  };

  const deleteSkill = () => {
    const filteredArray = skillList.filter(
      item => item.name !== selectedItem.name,
    );
    setSkillList(filteredArray);
    const payload = {
      id: profileDetails?.profileDetails?.id,
      it_skills: filteredArray,
    };

    dispatch(updateProfileDetails(payload));
    toggleIsUpdatedProfile();

    // // Reset state and close modal
    setSelectedItem(null);
    closeModal();
  };
  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>IT SKILLS</Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor={colors.blackText}
          size={20}
          onPress={() => openModal(null)}
          style={profileStyle.editButton}
        />
      </View>

      {/* Display IT Skills List */}
      <View>
        {Array.isArray(profileDetails?.profileDetails?.it_skills) &&
        profileDetails.profileDetails.it_skills.length > 0 ? (
          <FlatList
            horizontal
            data={profileDetails.profileDetails.it_skills}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[profileStyle.userDataContainer, styles.listContainer]}
                onPress={() => openModal(item)}>
                <View style={styles.userData}>
                  <Ionicons name="laptop-outline" size={42} color="gray" />
                  <View>
                    <Text style={styles.name}>
                      {item.name === 'Other' ? item.othername : item.name}
                    </Text>
                    <Text style={styles.date}>
                      {item?.exp?.years || item?.exp?.months
                        ? `${
                            item?.exp?.years ? `${item?.exp?.years} Years` : ''
                          } ${
                            item?.exp?.months
                              ? `${item?.exp?.months} Months`
                              : ''
                          }`.trim()
                        : '-'}
                    </Text>
                    <Text style={styles.optionalData}>
                      Last used: {item.last_used || '-'}
                    </Text>
                  </View>
                </View>
                <IconButton
                  icon="pencil-outline"
                  iconColor="black"
                  size={20}
                  onPress={() => openModal(item)}
                  style={styles.editButton}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={profileStyle.optionalData}>
              Mention skills like programming languages (Java, Python), software
              (Microsoft Word, Excel), and more, to show your technical
              expertise.
            </Text>
          </View>
        )}
      </View>

      {/* Modal for Adding or Editing IT Skills */}
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
                initialValues={{
                  name: selectedItem?.name || '',
                  othername: selectedItem?.othername || '',
                  version: selectedItem?.version || '',
                  years: selectedItem?.exp?.years || '',
                  months: selectedItem?.exp?.months || '',
                  last_used: selectedItem?.last_used || '',
                }}
                validationSchema={validationSchema}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>IT SKILLS</Text>
                    <Text style={profileStyle.formSubHeading}>
                      Mention skills like programming languages (Java, Python),
                      softwares (Microsoft Word, Excel) and more, to show your
                      technical expertise.
                    </Text>

                    <ReusableDropdown
                      options={keyskillsMasters} // Ensure the options array matches the structure
                      placeholder="Select Skill / Software Name*"
                      selectedValue={values?.name} // This must match a `value` in the options array
                      onSelect={selected => {
                        setFieldValue('name', selected?.value);
                        setFieldValue('othername', '');
                      }}
                      error={errors.name}
                      touched={touched.name}
                    />
                    {values?.name === 'Other' && (
                      <ReusableTextInput
                        name="othername"
                        label=" Other Skill/ Software Name*"
                        value={values.othername}
                        onChangeText={text => setFieldValue('othername', text)}
                      />
                    )}

                    <ReusableTextInput
                      name="version"
                      label="Software Version"
                      value={values.version}
                      onChangeText={handleChange('version')}
                    />
                    <Text style={{color: colors.secondary, fontSize: 12}}>
                      Experiance *
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}>
                      <ReusableDropdown
                        options={Years}
                        placeholder="Years*"
                        selectedValue={values?.years || 0} // Fallback to 0 if null or blank
                        onSelect={selected =>
                          setFieldValue('years', selected?.value)
                        }
                        error={errors.years}
                        touched={touched.years}
                      />
                      <ReusableDropdown
                        options={Months}
                        placeholder="Months*"
                        selectedValue={values.months || 0}
                        onSelect={selected =>
                          setFieldValue('months', selected.value)
                        }
                        error={errors.months}
                        touched={touched.months}
                      />
                    </View>
                    <Text style={{color: colors.secondary, fontSize: 12}}>
                      Last Used*
                    </Text>
                    <ReusableDropdown
                      options={LastUsedYears}
                      placeholder="Last Used*"
                      selectedValue={values.last_used}
                      onSelect={selected =>
                        setFieldValue('last_used', selected.value)
                      }
                      error={errors.last_used}
                      touched={touched.last_used}
                    />
                  </View>
                )}
              </Formik>
            )}
            keyExtractor={item => item.key}
          />
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={closeModal}
            showDelete={selectedItem !== null} // Show delete only if editing
            onDelete={() => {
              if (selectedItem !== null) {
                deleteSkill(selectedItem); // Call deleteLanguage with the current index
                closeModal(); // Close the modal after deletion
              }
            }}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 'auto',
    backgroundColor: '#fafafa',
    marginRight: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  date: {
    fontSize: 12,
    color: colors.primary,
  },
  optionalData: {
    fontSize: 11,
    color: 'gray',
  },
  editButton: {
    alignSelf: 'flex-start',
  },

  userData: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    alignItems: 'center',
  },
});
export default Itskills;
