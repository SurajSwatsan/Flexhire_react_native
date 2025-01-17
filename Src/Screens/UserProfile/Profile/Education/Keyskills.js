import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {IconButton, TextInput} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import profileStyle from '../../ProfileStyle';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {colors} from '../../../../Global_CSS/TheamColors';
import {useDispatch, useSelector} from 'react-redux';
import MasterViewController from '../../../../Redux/Action/MasterViewController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import {ProfileContext} from '../../ProfileContext';

const Keyskills = profileDetails => {
  const {isUpdatedProfile, toggleIsUpdatedProfile} = useContext(ProfileContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [skillsMasters, setkillsMasters] = useState([]);

  const dispatch = useDispatch();
  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();
  const [id, setId] = useState();

  const {GetKeyskills} = MasterViewController();
  const {keyskills} = useSelector(state => state.master);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_data');
        setId(id);
      } catch (error) {
        console.error('Error reading id from AsyncStorage', error);
      }
    };

    getUserData();

    setSelectedSkills(profileDetails?.profileDetails?.key_skills);
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
    }));
    setkillsMasters(keyskills_data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyskills]);

  const saveSkillsData = () => {
    const payload = {
      id: profileDetails?.profileDetails?.id
        ? profileDetails?.profileDetails?.id
        : '',
      user_id: id,
      key_skills: selectedSkills,
    };

    if (profileDetails?.profileDetails?.id) {
      dispatch(updateProfileDetails(payload));
    } else {
      dispatch(addProfileDetails(payload));
    }
    toggleIsUpdatedProfile();
    // dispatch(updateProfileDetails(payload));
    closeModal();
  };
  const deleteSkill = skill => {
    setSelectedSkills(prevSkills => {
      const updatedSkills = prevSkills.filter(s => s !== skill);
      return updatedSkills;
    });
    const updatedSkills = selectedSkills.filter(s => s !== skill);

    const payload = {
      id: profileDetails?.profileDetails?.id,
      key_skills: updatedSkills,
    };

    dispatch(updateProfileDetails(payload));
    toggleIsUpdatedProfile();
  };

  const toggleSkillSelection = skillLabel => {
    setSelectedSkills(
      prevSkills =>
        prevSkills.includes(skillLabel)
          ? prevSkills.filter(value => value !== skillLabel) // Remove skill
          : [...prevSkills, skillLabel], // Add skill
    );
  };
  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setSearchText('');
    setModalVisible(false);
  };
  const filteredSkills = skillsMasters.filter(skill =>
    skill.value.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>KEY SKILLS</Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor="black"
          size={20}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>

      <View style={profileStyle.outputData}>
        {Array.isArray(selectedSkills) && selectedSkills.length > 0 ? (
          <View style={profileStyle.chipContainer}>
            {selectedSkills.map((skill, index) => (
              <TouchableOpacity
                key={index}
                style={profileStyle.chip}
                onPress={() => {
                  deleteSkill(skill); // Remove the skill
                }}>
                <Text style={profileStyle.chipText}>{skill}</Text>
                <Ionicons
                  name="close-circle-outline"
                  size={16}
                  style={{
                    color: colors.primary,
                    marginLeft: 4,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={profileStyle.optionalData}>
            Selecting your key skills will increase your chances of being
            contacted for job opportunities.
          </Text>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={profileStyle.modalBackground}>
          <View style={profileStyle.modalContainer}>
            <ScrollView contentContainerStyle={profileStyle.modalContent}>
              <Text style={profileStyle.formHeading}>Key Skills</Text>
              <TextInput
                style={profileStyle.textarea}
                value="Search"
                mode="outlined"
                outlineColor="lightgrey"
                textColor="black"
                activeOutlineColor="lightgrey"
                id={searchText}
                onChangeText={text => setSearchText(text)}
              />
              <View style={profileStyle.skillsContainer}>
                {filteredSkills.map(skill => (
                  <TouchableOpacity
                    key={skill.id}
                    style={styles.skillListContainer}
                    onPress={() => toggleSkillSelection(skill.value)}>
                    <Text
                      style={[
                        styles.skillList,
                        skillsMasters.includes(skill.value) &&
                          styles.selectedSkill,
                      ]}>
                      {skill.value}
                    </Text>
                    {Array.isArray(selectedSkills) &&
                      selectedSkills.includes(skill.value) && (
                        <Ionicons
                          name="checkmark-sharp"
                          size={18}
                          style={styles.iconStyle}
                        />
                      )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <ModalFooter onPress={saveSkillsData} onCancel={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  skillList: {
    flex: 1,
    color: 'black',
    fontSize: 13,
  },
  selectedSkill: {
    fontWeight: 'bold',
    color: '#009900',
  },
  iconStyle: {
    color: '#009900',
  },
  skillListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
  },
  iconstyle: {
    color: colors.primary,
  },
});

export default Keyskills;
