import React, {useCallback, useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import profileStyle from '../../ProfileStyle';
import {colors} from '../../../../Global_CSS/TheamColors';
import CustomSelectionModal from '../../../../Constant/CustomSelectionModal';
import CustomTabs from '../../../../Constant/CustomTabs';
import ModalFooter from '../../../../Constant/ProfileModalFooter';
import {useDispatch, useSelector} from 'react-redux';
import UserProfileViewController from '../../../../Redux/Action/UserProfileViewController';
import MasterViewController from '../../../../Redux/Action/MasterViewController';

const PROFICIENCY_OPTIONS = [
  {id: 1, value: 'Beginner'},
  {id: 2, value: 'Medium'},
  {id: 3, value: 'Expert'},
];

const validationSchema = Yup.object().shape({
  language: Yup.string().required('Language is required'),
  proficiency: Yup.string().required('Proficiency is required'),
  comfortablein: Yup.array().min(1, 'At least one option must be selected'),
});

const getInitialValues = (
  name = '',
  proficiency = '',
  comfortable_in = [],
) => ({
  language: name,
  proficiency,
  comfortablein: comfortable_in,
});

const Languages = profileDetails => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editObject, setEditObject] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [id, setId] = useState();

  let formikRef = null;

  const dispatch = useDispatch();
  const {GetLaguages} = MasterViewController();
  const {languageList} = useSelector(state => state.master);
  // console.log('-------------------', languageList);

  const {updateProfileDetails, addProfileDetails} = UserProfileViewController();
  useEffect(() => {
    if (profileDetails?.profileDetails?.languages) {
      setLanguages(profileDetails?.profileDetails?.languages);
    }
  }, [profileDetails]);

  useEffect(() => {
    const get_languages = () => {
      dispatch(GetLaguages());
    };

    get_languages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const languages_data = languageList?.map(lg => ({
      id: lg.id,
      value: lg.name,
    }));

    setLanguageData(languages_data);

    // console.log('laguages data ===', languageData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageList]);

  const handleFormSubmit = values => {
    // console.log(values);
    // Update or Add Logic
    const existingIndex = languages.findIndex(
      language => language.name === values.language,
    );

    if (existingIndex !== -1) {
      // Update existing language
      languages[existingIndex] = {
        ...languages[existingIndex],
        comfortable_in: values.comfortablein,
        proficiency: values.proficiency,
      };
    } else {
      // Add new language
      languages.push({
        name: values.language,
        proficiency: values.proficiency,
        comfortable_in: values.comfortablein,
      });
    }
    // console.log('Updated Data:', languages);

    const payload = {
      id: profileDetails?.profileDetails?.id
        ? profileDetails?.profileDetails?.id
        : '',
      user_id: id,
      languages: languages,
    };

    // console.log('Languages:', JSON.stringify(payload, null, 2));

    if (profileDetails.profileDetails.id) {
      dispatch(updateProfileDetails(payload));
    } else {
      dispatch(addProfileDetails(payload));
    }

    // dispatch(updateProfileDetails(payload));

    setEditObject(null);
    setModalVisible(false);
  };

  const deleteLanguage = index => {
    const filteredArray = languages.filter(
      item => item.name !== editObject.name,
    );
    setLanguages(filteredArray);
    const payload = {
      id: profileDetails?.profileDetails?.id,
      languages: filteredArray,
    };

    dispatch(updateProfileDetails(payload));
    setModalVisible(false);
  };

  const openModal = useCallback((index = null) => {
    setEditObject(index);
    setModalVisible(true);
  }, []);

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>LANGUAGE</Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor={colors.blackText}
          size={20}
          onPress={() => openModal()}
          style={profileStyle.editButton}
        />
      </View>

      <View>
        {profileDetails?.profileDetails?.languages.length > 0 ? (
          profileDetails?.profileDetails?.languages.map((item, index) => (
            <View key={`language-${index}`}>
              <TouchableOpacity onPress={() => openModal(item)}>
                <View style={styles.outpurtData}>
                  <View style={styles.languageDetails}>
                    <Text style={styles.displayText}>{item.name}</Text>
                    <View style={styles.iconsContainer}>
                      <IconButton
                        icon="pencil-outline"
                        iconColor={colors.blackText}
                        size={18}
                        onPress={() => openModal(item)}
                        style={styles.iconButton}
                      />
                    </View>
                  </View>

                  <View style={styles.iconTextContainer}>
                    {(item.comfortable_in || []).map((option, optionIndex) => (
                      <View
                        key={`language-comfortable-${index}-${optionIndex}`}
                        style={profileStyle.chip}>
                        <Ionicons
                          name={
                            option === 'Read'
                              ? 'book-outline'
                              : option === 'Writing'
                              ? 'pencil-outline'
                              : 'mic-outline'
                          }
                          size={16}
                          color="#333"
                          style={{marginRight: 4}}
                        />
                        <Text style={profileStyle.chipText}>{option}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
              {profileDetails?.profileDetails?.languages.length > 1 &&
                index <
                  profileDetails?.profileDetails?.languages.length - 1 && (
                  <View style={styles.horizontalLine} />
                )}
            </View>
          ))
        ) : (
          <Text style={profileStyle.optionalData}>
            Add languages to showcase your proficiency and comfort in
            communication.
          </Text>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={profileStyle.modalContainer}>
          <FlatList
            data={[{key: 'form'}]}
            renderItem={() => (
              <Formik
                initialValues={
                  editObject
                    ? getInitialValues(
                        editObject?.name,
                        editObject?.proficiency,
                        editObject?.comfortable_in,
                      )
                    : getInitialValues()
                }
                validationSchema={validationSchema}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({handleSubmit, setFieldValue, values, errors, touched}) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>
                      Add or Edit Language
                    </Text>
                    <CustomSelectionModal
                      title="Language"
                      data={languageData}
                      selectedItems={
                        languageData.find(
                          item => item.value === values.language,
                        ) || null
                      }
                      setSelectedItems={item =>
                        setFieldValue('language', item?.value || '')
                      }
                      placeholder="Select a language"
                    />
                    {errors.language && touched.language && (
                      <Text style={styles.error}>{errors.language}</Text>
                    )}

                    <CustomTabs
                      label="Proficiency"
                      options={PROFICIENCY_OPTIONS}
                      selectedValue={values.proficiency}
                      setFieldValue={setFieldValue}
                      fieldName="proficiency"
                      error={errors.proficiency}
                      touched={touched.proficiency}
                    />

                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.secondary,
                        marginTop: 12,
                      }}>
                      Comfortable In
                    </Text>
                    <View style={styles.comfortableinContainer}>
                      {['Read', 'Writing', 'Speaking'].map(option => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.statusButton,
                            values.comfortablein.includes(option)
                              ? styles.selectedButton
                              : styles.unselectedButton,
                          ]}
                          onPress={() =>
                            setFieldValue(
                              'comfortablein',
                              values.comfortablein.includes(option)
                                ? values.comfortablein.filter(
                                    item => item !== option,
                                  ) // Remove option if already present
                                : [...values.comfortablein, option], // Add option if not present
                            )
                          }>
                          <Ionicons
                            name={
                              option === 'Read'
                                ? 'book-outline'
                                : option === 'Writing'
                                ? 'pencil-outline'
                                : 'mic-outline'
                            }
                            size={18}
                            color={
                              values.comfortablein.includes(option)
                                ? '#fff'
                                : '#333'
                            }
                          />
                          <Text
                            style={
                              values.comfortablein.includes(option)
                                ? styles.selectedText
                                : styles.unselectedText
                            }>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    {errors.comfortablein && touched.comfortablein && (
                      <Text style={styles.error}>{errors.comfortablein}</Text>
                    )}
                  </View>
                )}
              </Formik>
            )}
            keyExtractor={item => item.key}
          />
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={() => setModalVisible(false)}
            showDelete={editObject !== null}
            onDelete={() => deleteLanguage(editObject)}
          />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  error: {
    color: 'red',
    marginVertical: 6,
  },
  displayContainer: {
    marginTop: 12,
  },
  Languages: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  outpurtData: {
    borderRadius: 8,
    justifyContent: 'space-between',
    flexDirection: 'column',
    // borderBottomColor: colors.lightgaryText,
    // borderBottomWidth: 1,
  },
  languageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  displayText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.primary,
  },
  displayText1: {
    color: '#000',
  },
  displayText2: {
    color: '#000',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
  },
  proficiencyStatusContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  comfortableinContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedButton: {
    backgroundColor: colors.primary,
    fontWeight: '600',
  },
  unselectedButton: {
    backgroundColor: '#f0f0f0',
  },
  statusText: {
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#333',
  },
  horizontalLine: {
    borderBottomColor: colors.lightgaryText,
    borderBottomWidth: 0.5,
    marginVertical: 10,
  },
});

export default Languages;
