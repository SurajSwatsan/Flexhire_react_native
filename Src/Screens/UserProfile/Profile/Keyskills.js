import {Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {IconButton, TextInput} from 'react-native-paper';
import profileStyle from '../ProfileStyle';
import ModalFooter from '../../../Constant/ProfileModalFooter';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Skills = [
  {label: 'JavaScript', value: '1'},
  {label: 'Python', value: '2'},
  {label: 'Java', value: '3'},
  {label: 'C#', value: '4'},
  {label: 'PHP', value: '5'},
  {label: 'Ruby', value: '6'},
  {label: 'HTML/CSS', value: '7'},
  {label: 'React', value: '8'},
  {label: 'Angular', value: '9'},
  {label: 'Vue.js', value: '10'},
  {label: 'Node.js', value: '11'},
  {label: 'SQL', value: '12'},
  {label: 'MongoDB', value: '13'},
  {label: 'Docker', value: '14'},
  {label: 'Kubernetes', value: '15'},
  {label: 'AWS', value: '16'},
  {label: 'Azure', value: '17'},
  {label: 'Machine Learning', value: '18'},
  {label: 'Data Science', value: '19'},
  {label: 'Cybersecurity', value: '20'},
  {label: 'DevOps', value: '21'},
  {label: 'Swift', value: '22'},
  {label: 'Objective-C', value: '23'},
  {label: 'React Native', value: '24'},
  {label: 'Flutter', value: '25'},
  {label: 'Ruby on Rails', value: '26'},
  {label: 'Laravel', value: '27'},
  {label: 'Django', value: '28'},
  {label: 'Spring Boot', value: '29'},
  {label: 'ASP.NET', value: '30'},
  {label: 'TensorFlow', value: '31'},
  {label: 'PyTorch', value: '32'},
  {label: 'R', value: '33'},
  {label: 'Scala', value: '34'},
  {label: 'Elixir', value: '35'},
  {label: 'Go', value: '36'},
  {label: 'C++', value: '37'},
  {label: 'C', value: '38'},
  {label: 'Android Development', value: '39'},
  {label: 'iOS Development', value: '40'},
  {label: 'UX/UI Design', value: '41'},
  {label: 'Figma', value: '42'},
  {label: 'Photoshop', value: '43'},
  {label: 'Illustrator', value: '44'},
  {label: 'Git', value: '45'},
  {label: 'GitHub', value: '46'},
  {label: 'Bitbucket', value: '47'},
  {label: 'Jenkins', value: '48'},
  {label: 'CircleCI', value: '49'},
  {label: 'Terraform', value: '50'},
  {label: 'Ansible', value: '51'},
  {label: 'Chef', value: '52'},
  {label: 'Puppet', value: '53'},
  {label: 'Jira', value: '54'},
  {label: 'Trello', value: '55'},
  {label: 'Slack', value: '56'},
  {label: 'Salesforce', value: '57'},
  {label: 'Tableau', value: '58'},
  {label: 'Power BI', value: '59'},
  {label: 'Excel', value: '60'},
  {label: 'Hadoop', value: '61'},
  {label: 'Spark', value: '62'},
  {label: 'Redis', value: '63'},
  {label: 'RabbitMQ', value: '64'},
  {label: 'Elasticsearch', value: '65'},
  {label: 'Apache Kafka', value: '66'},
  {label: 'Solr', value: '67'},
  {label: 'GraphQL', value: '68'},
  {label: 'RESTful APIs', value: '69'},
  {label: 'WebSockets', value: '70'},
  {label: 'OAuth', value: '71'},
  {label: 'JWT', value: '72'},
  {label: 'HTML5', value: '73'},
  {label: 'CSS3', value: '74'},
  {label: 'SASS', value: '75'},
  {label: 'LESS', value: '76'},
  {label: 'Bootstrap', value: '77'},
  {label: 'Tailwind CSS', value: '78'},
  {label: 'Material UI', value: '79'},
  {label: 'Ant Design', value: '80'},
  {label: 'Gatsby', value: '81'},
  {label: 'Next.js', value: '82'},
  {label: 'Vuex', value: '83'},
  {label: 'Redux', value: '84'},
  {label: 'MobX', value: '85'},
  {label: 'Socket.IO', value: '86'},
  {label: 'TypeScript', value: '87'},
  {label: 'Jest', value: '88'},
  {label: 'Mocha', value: '89'},
  {label: 'Chai', value: '90'},
  {label: 'Cypress', value: '91'},
  {label: 'Selenium', value: '92'},
  {label: 'Appium', value: '93'},
  {label: 'TestCafe', value: '94'},
  {label: 'Postman', value: '95'},
  {label: 'Swagger', value: '96'},
  {label: 'JUnit', value: '97'},
  {label: 'Katalon Studio', value: '98'},
  {label: 'WebDriverIO', value: '99'},
  {label: 'Firebase', value: '100'},
];
const Keyskills = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedSkills, setSubmittedSkills] = useState([]);
  const [searchText, setSearchText] = useState('');

  const openModal = () => setModalVisible(true);

  const closeModal = () => {
    setSearchText('');
    setModalVisible(false);
  };

  const toggleSkillSelection = skill => {
    if (submittedSkills.includes(skill)) {
      // Remove skill if already in the list
      setSubmittedSkills(prevSkills => prevSkills.filter(s => s !== skill));
    } else {
      // Add skill if not in the list
      setSubmittedSkills(prevSkills => [...prevSkills, skill]);
    }
  };

  const filteredSkills = Skills.filter(skill =>
    skill.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <View style={profileStyle.displayContainer}>
          <Text style={profileStyle.heading}>KEY SKILLS</Text>
        </View>
        <IconButton
          icon="plus-circle-outline"
          iconColor="black"
          size={20}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>
      <View style={profileStyle.outputData}>
        {submittedSkills.length > 0 ? (
          <View style={profileStyle.chipContainer}>
            {submittedSkills.map((skill, index) => (
              <View key={index} style={profileStyle.chip}>
                <Text style={profileStyle.chipText}>{skill}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={profileStyle.optionalData}>
            Selecting your key skills, will increase your chances of being
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
              <Text style={profileStyle.formHeading}>Key skills</Text>
              {/* <Text style={profileStyle.subText1}>Search for your skills</Text> */}
              <TextInput
                style={profileStyle.textarea}
                label="Search"
                mode="outlined"
                outlineColor="lightgrey"
                textColor="black"
                activeOutlineColor="lightgrey"
                value={searchText}
                onChangeText={text => setSearchText(text)}
              />
              <View style={profileStyle.skillsContainer}>
                {filteredSkills.map(skill => (
                  <View key={skill.value} style={[styles.skillListContainer]}>
                    <View
                      style={styles.SkillListContainer}
                      onTouchEnd={() => toggleSkillSelection(skill.label)}>
                      <Text
                        style={[
                          styles.skillList,
                          submittedSkills.includes(skill.label) &&
                            styles.selectedSkill,
                        ]}>
                        {skill.label}
                      </Text>
                      {submittedSkills.includes(skill.label) ? (
                        <Ionicons
                          name="checkmark-sharp"
                          size={18}
                          style={styles.iconStyle}
                        />
                      ) : null}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            <ModalFooter onPress={closeModal} onCancel={closeModal} />
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
  SkillListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
  },
});

export default Keyskills;
