import {
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import profileStyle from '../../ProfileStyle';
import {colors} from '../../../../Global_CSS/TheamColors';
import ReusableTextInput from '../../../../Constant/CustomTextInput';
import ReusableDropdown from '../../../../Constant/CustomDropdown';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import MasterViewController from '../../../../Redux/Action/MasterViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';

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
  {length: new Date().getFullYear() - 1940 + 1},
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
});

// Initial Values Helper
const getInitialValues = (editingIndex, itSkillList) => {
  if (editingIndex !== null && itSkillList[editingIndex]) {
    const skill = itSkillList[editingIndex];
    return {
      name: skill.name || '', // Set to 'other' for custom skills
      othername: skill.othername || '', // Store custom skill name in othername
      version: skill.version || '',
      years: skill.years || '',
      months: skill.months || '',
      last_used: skill.last_used || '',
    };
  }
  return {
    name: '',
    othername: '',
    version: '',
    years: '',
    months: '',
    last_used: '',
  };
};

const Itskills = profileDetails => {
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
        console.log(id); // Log the id once it's retrieved
      } catch (error) {
        console.error('Error reading id from AsyncStorage', error);
      }
    };

    getUserData();
    console.log(
      '================================',
      profileDetails?.profileDetails?.it_skills,
    );
    setSkillList(profileDetails?.profileDetails?.it_skills);
    // dispatch(GetProfileAnalytic('e')); // Dispatch the action when the component mounts
  }, [profileDetails]);

  useEffect(() => {
    const get_keyskills = () => {
      dispatch(GetKeyskills());
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
        name: values.name === 'other' ? values.othername : values.name,
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
      console.log(values);

      dispatch(updateProfileDetails(payload));

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
            name: values.name === 'other' ? values.othername : values.name,
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

    // // Reset state and close modal
    setSelectedItem(null);
    closeModal();
  };
  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>IT Skills</Text>
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
        {profileDetails?.profileDetails?.it_skills.length > 0 ? (
          <FlatList
            horizontal
            data={profileDetails?.profileDetails?.it_skills}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[profileStyle.userDataContainer, styles.listContainer]}
                onPress={() => openModal(item)}>
                {/* Display skill name or "Other" skill name */}
                <View style={styles.userData}>
                  <Text style={profileStyle.optionalData}>
                    {item.name === 'other' ? item.othername : item.name} -{' '}
                    {item.version || '-'}
                  </Text>
                  {/* Display experience in years and months */}
                  <Text style={profileStyle.optionalData}>
                    {item?.exp?.years || item?.exp?.months
                      ? `${
                          item?.exp?.years ? `${item?.exp?.years} Years` : ''
                        } ${
                          item?.exp?.months ? `${item?.exp?.months} Months` : ''
                        }`.trim()
                      : '-'}
                  </Text>
                  {/* Display last used year */}
                  <Text style={profileStyle.optionalData}>
                    {item.last_used || '-'}
                  </Text>
                </View>
                <IconButton
                  icon="pencil-outline"
                  iconColor={'black'}
                  size={20}
                  onPress={() => openModal(item)}
                />
              </TouchableOpacity>
            )}
          />
        ) : (
          // Show optional text when no data is available
          <View style={styles.noDataContainer}>
            <Text style={profileStyle.optionalData}>
              Mention skills like programming languages (Java, Python),
              softwares (Microsoft Word, Excel) and more, to show your technical
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
                {({handleChange, handleSubmit, values, setFieldValue}) => (
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
                      selectedValue={values.name} // This must match a `value` in the options array
                      onSelect={selected =>
                        setFieldValue('name', selected.value)
                      }
                    />
                    {values.name === 'other' && (
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
                    <Text style={{color: '#000'}}>Experiance</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}>
                      <ReusableDropdown
                        options={Years}
                        placeholder="Years*"
                        selectedValue={values.years}
                        onSelect={selected =>
                          setFieldValue('years', selected.value)
                        }
                      />
                      <ReusableDropdown
                        options={Months}
                        placeholder="Months*"
                        selectedValue={values.months}
                        onSelect={selected =>
                          setFieldValue('months', selected.value)
                        }
                      />
                    </View>
                    <ReusableDropdown
                      options={LastUsedYears}
                      placeholder="Last Used*"
                      selectedValue={values.last_used}
                      onSelect={selected =>
                        setFieldValue('last_used', selected.value)
                      }
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
    padding: 12,
    backgroundColor: colors.background,
    marginRight: 12,
    borderRadius: 8,
  },
  userData: {
    flex: 1,
  },
});
export default Itskills;
