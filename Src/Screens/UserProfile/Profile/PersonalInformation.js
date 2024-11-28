import {Modal, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ReusableTextInput from '../../../Constant/CustomTextInput';
import ModalFooter from '../../../Constant/ProfileModalFooter';
import profileStyle from '../ProfileStyle';
import {colors} from '../../../Global_CSS/TheamColors';
import CustomSelectionModal from '../../../Constant/CustomSelectionModal';
import CustomTabs from '../../../Constant/CustomTabs';

const Cities = [
  {id: 1, value: 'Bangalore'},
  {id: 2, value: 'Hyderabad'},
  {id: 3, value: 'Chennai'},
  {id: 4, value: 'Pune'},
  {id: 5, value: 'Gurgaon'},
  {id: 6, value: 'Noida'},
  {id: 7, value: 'Kolkata'},
  {id: 8, value: 'Mumbai'},
  {id: 9, value: 'Delhi'},
  {id: 10, value: 'Ahmedabad'},
  {id: 11, value: 'Chandigarh'},
  {id: 12, value: 'Coimbatore'},
  {id: 13, value: 'Jaipur'},
  {id: 14, value: 'Indore'},
  {id: 15, value: 'Bhubaneswar'},
  {id: 16, value: 'Mysuru'},
  {id: 17, value: 'Visakhapatnam'},
  {id: 18, value: 'Surat'},
  {id: 19, value: 'Kochi'},
  {id: 20, value: 'Nagpur'},
];

const Industries = [
  {id: 1, value: 'BPM'},
  {id: 2, value: 'Analytics / KPO / Research'},
  {id: 3, value: 'BPM / BPO'},
  {id: 4, value: 'IT Services'},
  {id: 5, value: 'IT Services & Consulting'},
  {id: 6, value: 'Technology'},
  {id: 7, value: 'Electronic Components / Semiconductors'},
  {id: 8, value: 'Electronics Manufacturing'},
  {id: 9, value: 'Electronic Manufacturing Services (EMS)'},
  {id: 10, value: 'Emerging Technologies'},
  {id: 11, value: '3D Printing'},
  {id: 12, value: 'AI/ML'},
  {id: 13, value: 'AR/VR'},
  {id: 14, value: 'Blockchain'},
  {id: 15, value: 'Cloud'},
  {id: 16, value: 'Cybersecurity'},
  {id: 17, value: 'Drones/Robotics'},
  {id: 18, value: 'IoT'},
  {id: 19, value: 'Nanotechnology'},
  {id: 20, value: 'Hardware & Networking'},
  {id: 21, value: 'Internet'},
  {id: 22, value: 'E-Commerce'},
  {id: 23, value: 'OTT'},
  {id: 24, value: 'Software Product'},
  {id: 25, value: 'BFSI'},
  {id: 26, value: 'Banking'},
  {id: 27, value: 'Financial Services'},
  {id: 28, value: 'Asset Management'},
  {id: 29, value: 'Broking'},
  {id: 30, value: 'FinTech / Payments'},
  {id: 31, value: 'Insurance'},
  {id: 32, value: 'Investment Banking / Venture Capital / Private Equity'},
  {id: 33, value: 'NBFC'},
  {id: 34, value: 'Micro Finance'},
  {id: 35, value: 'Education'},
  {id: 36, value: 'Education / Training'},
  {id: 37, value: 'E-Learning / EdTech'},
  {id: 38, value: 'Manufacturing & Production'},
  {id: 39, value: 'Auto Components'},
  {id: 40, value: 'Tyre'},
  {id: 41, value: 'Automobile'},
  {id: 42, value: 'Automobile Dealers'},
  {id: 43, value: 'Electric Vehicle (EV)'},
  {id: 44, value: 'Building Material'},
  {id: 45, value: 'Cement'},
  {id: 46, value: 'Ceramic'},
  {id: 47, value: 'Glass'},
  {id: 48, value: 'Chemicals'},
  {id: 49, value: 'Paints'},
  {id: 50, value: 'Defence & Aerospace'},
  {id: 51, value: 'Electrical Equipment'},
  {id: 52, value: 'Fertilizers / Pesticides / Agro chemicals'},
  {id: 53, value: 'Industrial Automation'},
  {id: 54, value: 'Industrial Equipment / Machinery'},
  {id: 55, value: 'Construction Equipment'},
  {id: 56, value: 'Machine Tools'},
  {id: 57, value: 'Iron & Steel'},
  {id: 58, value: 'Metals & Mining'},
  {id: 59, value: 'Packaging & Containers'},
  {id: 60, value: 'Petrochemical / Plastics / Rubber'},
  {id: 61, value: 'Pulp & Paper'},
  {id: 62, value: 'Infrastructure, Transport & Real Estate'},
  {id: 63, value: 'Aviation'},
  {id: 64, value: 'Courier / Logistics'},
  {id: 65, value: 'Logistics Tech'},
  {id: 66, value: 'Engineering & Construction'},
  {id: 67, value: 'Oil & Gas'},
  {id: 68, value: 'Ports & Shipping'},
  {id: 69, value: 'Shipbuilding'},
  {id: 70, value: 'Power'},
  {id: 71, value: 'Hydro'},
  {id: 72, value: 'Nuclear'},
  {id: 73, value: 'Solar'},
  {id: 74, value: 'Wind'},
  {id: 75, value: 'Railways'},
  {id: 76, value: 'Real Estate'},
  {id: 77, value: 'Co-working'},
  {id: 78, value: 'Urban Transport'},
  {id: 79, value: 'Water Treatment / Waste Management'},
  {id: 80, value: 'Consumer, Retail & Hospitality'},
  {id: 81, value: 'Beauty & Personal Care'},
  {id: 82, value: 'Beverage'},
  {id: 83, value: 'Brewery / Distillery'},
  {id: 84, value: 'Consumer Electronics & Appliances'},
  {id: 85, value: 'Fitness & Wellness'},
  {id: 86, value: 'FMCG'},
  {id: 87, value: 'Tobacco'},
  {id: 88, value: 'Food Processing'},
  {id: 89, value: 'Dairy'},
  {id: 90, value: 'Meat / Poultry'},
  {id: 91, value: 'Sugar'},
  {id: 92, value: 'Furniture & Furnishing'},
  {id: 93, value: 'Gems & Jewellery'},
  {id: 94, value: 'Hotels & Restaurants'},
  {id: 95, value: 'Leather'},
  {id: 96, value: 'Retail'},
  {id: 97, value: 'Textile & Apparel'},
  {id: 98, value: 'Fashion'},
  {id: 99, value: 'Handicraft'},
  {id: 100, value: 'Home Textile'},
  {id: 101, value: 'Technical Textile'},
  {id: 102, value: 'Yarn & Fabric'},
  {id: 103, value: 'Travel & Tourism'},
  {id: 104, value: 'Healthcare & Life Sciences'},
  {id: 105, value: 'Biotechnology'},
  {id: 106, value: 'Clinical Research / Contract Research'},
  {id: 107, value: 'Medical Devices & Equipment'},
  {id: 108, value: 'Medical Services / Hospital'},
  {id: 109, value: 'Diagnostics'},
  {id: 110, value: 'Pharmaceutical & Life Sciences'},
  {id: 111, value: 'Media, Entertainment & Telecom'},
  {id: 112, value: 'Advertising & Marketing'},
  {id: 113, value: 'Digital Marketing'},
  {id: 114, value: 'Public Relations'},
  {id: 115, value: 'Animation & VFX'},
  {id: 116, value: 'Events / Live Entertainment'},
  {id: 117, value: 'Film / Music / Entertainment'},
  {id: 118, value: 'Gaming'},
  {id: 119, value: 'Printing & Publishing'},
  {id: 120, value: 'Sports / Leisure & Recreation'},
  {id: 121, value: 'Telecom / ISP'},
  {id: 122, value: 'TV / Radio'},
  {id: 123, value: 'Professional Services'},
  {id: 124, value: 'Accounting / Auditing'},
  {id: 125, value: 'Architecture / Interior Design'},
  {id: 126, value: 'Content Development / Language'},
  {id: 127, value: 'Design'},
  {id: 128, value: 'Facility Management Services'},
  {id: 129, value: 'Law Enforcement / Security Services'},
  {id: 130, value: 'Legal'},
  {id: 131, value: 'Management Consulting'},
  {id: 132, value: 'Recruitment / Staffing'},
  {id: 133, value: 'Miscellaneous'},
  {id: 134, value: 'Agriculture / Forestry / Fishing'},
  {id: 135, value: 'Agri-tech'},
  {id: 136, value: 'Government / Public Administration'},
  {id: 137, value: 'Import & Export'},
  {id: 138, value: 'NGO / Social Services / Industry Associations'},
];

const Department = [
  {id: 1, value: 'BFSI, Investments & Trading'},
  {id: 2, value: 'Customer Success, Service & Operations'},
  {id: 3, value: 'Data Science & Analytics'},
  {id: 4, value: 'Engineering - Hardware & Networks'},
  {id: 5, value: 'Engineering - Software & QA'},
  {id: 6, value: 'Finance & Accounting'},
  {id: 7, value: 'Human Resources'},
  {id: 8, value: 'IT & Information Security'},
  {id: 9, value: 'Marketing & Communication'},
  {id: 10, value: 'Product Management'},
  {id: 11, value: 'Production, Manufacturing & Engineering'},
  {id: 12, value: 'Project & Program Management'},
  {id: 13, value: 'Quality Assurance'},
  {id: 14, value: 'Sales & Business Development'},
  {id: 15, value: 'UX, Design & Architecture'},
  {id: 16, value: 'Administration & Facilities'},
  {id: 17, value: 'Aviation & Aerospace'},
  {id: 18, value: 'Construction & Site Engineering'},
  {id: 19, value: 'Consulting'},
  {id: 20, value: 'Content, Editorial & Journalism'},
  {id: 21, value: 'CSR & Social Service'},
  {id: 22, value: 'Energy & Mining'},
  {id: 23, value: 'Environment Health & Safety'},
  {id: 24, value: 'Food, Beverage & Hospitality'},
  {id: 25, value: 'Healthcare & Life Sciences'},
  {id: 26, value: 'Legal & Regulatory'},
  {id: 27, value: 'Media Production & Entertainment'},
  {id: 28, value: 'Merchandising, Retail & eCommerce'},
  {id: 29, value: 'Procurement & Supply Chain'},
  {id: 30, value: 'Research & Development'},
  {id: 31, value: 'Risk Management & Compliance'},
  {id: 32, value: 'Security Services'},
  {id: 33, value: 'Shipping & Maritime'},
  {id: 34, value: 'Sports, Fitness & Personal Care'},
  {id: 35, value: 'Strategic & Top Management'},
  {id: 36, value: 'Teaching & Training'},
  {id: 37, value: 'Other'},
];

const RoleCategory = [
  {id: 1, value: 'DBA / Data warehousing'},
  {id: 2, value: 'DevOps'},
  {id: 3, value: 'Quality Assurance and Testing'},
  {id: 4, value: 'Software Development'},
];
const JobRole = [
  {id: 1, value: 'Automation Architect'},
  {id: 2, value: 'Automation Developer'},
  {id: 3, value: 'Back End Developer'},
  {id: 4, value: 'Big Data Engineer'},
  {id: 5, value: 'CRM Architect'},
  {id: 6, value: 'Data Engineer'},
  {id: 7, value: 'Data Platform Engineer'},
  {id: 8, value: 'Embedded Systems Engineer'},
  {id: 9, value: 'Engineering Manager'},
  {id: 10, value: 'ERP Architect'},
  {id: 11, value: 'ERP Developer'},
  {id: 12, value: 'Front End Developer'},
  {id: 13, value: 'Full Stack Developer'},
  {id: 14, value: 'Game Developer / Programmer'},
  {id: 15, value: 'Head - Engineering'},
  {id: 16, value: 'Mobile / App Developer'},
  {id: 17, value: 'Practice Manager / Head'},
  {id: 18, value: 'Search Engineer'},
  {id: 19, value: 'Solution Architect'},
  {id: 20, value: 'Technical Architect'},
  {id: 21, value: 'Technical Lead'},
  {id: 22, value: 'Webmaster'},
  {id: 23, value: 'Software Development - Other'},
];

const NOTICEPERIOD_OPTIONS = [
  {id: 1, value: 'Immediate'},
  {id: 2, value: '15 days'},
  {id: 3, value: '1 month'},
  {id: 4, value: '2 months'},
  {id: 5, value: '3 months'},
  {id: 6, value: 'more than 3 months'},
];

const validationSchema = Yup.object().shape({
  currentLocation: Yup.string().required('Current Location is required'),
  noticePeriod: Yup.string()
    .oneOf(
      NOTICEPERIOD_OPTIONS.map(option => option.value.toString()),
      'Invalid notice period selected',
    )
    .required('Notice Period is required'),
  experience: Yup.string().required('Experience is required'),
  annualSalary: Yup.string().required('Annual Salary is required'),
  expectedSalary: Yup.string().required('Expected Salary is required'),
});

const getInitialValues = (editingIndex, submittedData) => {
  if (editingIndex !== null && submittedData) {
    return {
      currentLocation: submittedData.currentLocation || '',
      selectedLocations: submittedData.selectedLocations || [],
      industry: submittedData.industry || '',
      department: submittedData.department || '',
      roleCategory: submittedData.roleCategory || '',
      jobRole: submittedData.jobRole || '',
      noticePeriod: submittedData.noticePeriod || '',
      experience: submittedData.experience || '',
      annualSalary: submittedData.annualSalary || '',
      expectedSalary: submittedData.expectedSalary || '',
    };
  }

  return {
    currentLocation: '',
    selectedLocations: [],
    industry: '',
    department: '',
    roleCategory: '',
    jobRole: '',
    noticePeriod: '',
    experience: '',
    annualSalary: '',
    expectedSalary: '',
  };
};

const PersonalInformation = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // Single entry handling
  const [editingIndex, setEditingIndex] = useState(null);
  let formikRef = null;
  const handleFormSubmit = values => {
    const formattedValues = {
      ...values,
      selectedLocations: values.selectedLocations.map(location =>
        typeof location === 'string'
          ? location // If already a string, use it directly
          : Cities.find(city => city.value === location?.value)?.value ||
            location?.value ||
            '',
      ),
      industry:
        Industries.find(industry => industry.value === values.industry)
          ?.value || '',
      department:
        Department.find(department => department.value === values.department)
          ?.value || '',
      roleCategory:
        RoleCategory.find(category => category.value === values.roleCategory)
          ?.value || '',
      jobRole: JobRole.find(job => job.value === values.jobRole)?.value || '',
      noticePeriod:
        NOTICEPERIOD_OPTIONS.find(
          option => option.value === values.noticePeriod,
        )?.value || '',
    };
    console.log('Selected Locations:', values.selectedLocations);

    setSubmittedData(formattedValues);
    setModalVisible(false);
    console.log('Form Submitted:', formattedValues);
  };

  const openModal = () => {
    setEditingIndex(submittedData ? 0 : null); // Set editingIndex based on existing data
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>PERSONAL INFORMATION</Text>
        <IconButton
          icon={submittedData ? 'pencil-outline' : 'plus-circle-outline'}
          iconColor={colors.blackText}
          size={20}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>

      {submittedData ? (
        <View style={profileStyle.userDataContainer}>
          <TouchableOpacity onPress={openModal}>
            {[
              {
                label: 'Industry',
                value: submittedData.industry || 'Not provided',
              },
              {
                label: 'Department',
                value: submittedData.department || 'Not provided',
              },
              {
                label: 'Role Category',
                value: submittedData.roleCategory || 'Not provided',
              },
              {
                label: 'Job Role',
                value: submittedData.jobRole || 'Not provided',
              },
              {
                label: 'Experience',
                value:
                  `${submittedData.experience || ''} Years` || 'Not provided',
              },
              {
                label: 'Annual Salary',
                value:
                  `${submittedData.annualSalary || ''} LPA` || 'Not provided',
              },
              {
                label: 'Expected Salary',
                value:
                  `${submittedData.expectedSalary || ''} LPA` || 'Not provided',
              },
              {
                label: 'Current Location',
                value: submittedData.currentLocation || 'Not provided',
              },
              {
                label: 'Preferred Locations',
                value:
                  Array.isArray(submittedData.selectedLocations) &&
                  submittedData.selectedLocations.length > 0
                    ? submittedData.selectedLocations.join(', ')
                    : 'Not provided',
              },
            ].map((field, index) => (
              <View key={index} style={{flexDirection: 'row', marginBottom: 5}}>
                <Text
                  style={{
                    color: '#000',
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}>
                  {field.label}
                </Text>
                <Text
                  style={{
                    color: '#000',
                    flex: 1,
                    textAlign: 'left',
                    fontSize: 13,
                  }}>
                  {field.value}
                </Text>
              </View>
            ))}
          </TouchableOpacity>
        </View>
      ) : (
        <View style={profileStyle.userDataContainer}>
          <Text style={profileStyle.optionalData}>This information is important for employers to know you better.</Text>
        </View>
      )}

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
                initialValues={getInitialValues(editingIndex, submittedData)}
                validationSchema={validationSchema}
                innerRef={ref => (formikRef = ref)}
                onSubmit={handleFormSubmit}>
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  setFieldValue,
                  errors,
                  touched,
                }) => (
                  <View style={profileStyle.formContainer}>
                    <Text style={profileStyle.formHeading}>
                      PERSONAL INFORMATION
                    </Text>

                    <ReusableTextInput
                      name="currentLocation"
                      label="Current Location*"
                      value={values.currentLocation}
                      onChangeText={handleChange('currentLocation')}
                    />

                    <CustomSelectionModal
                      title="Preferred Locations"
                      data={Cities}
                      selectedItems={values.selectedLocations.map(
                        location =>
                          Cities.find(city => city.value === location) || {
                            id: null,
                            value: location,
                          },
                      )}
                      setSelectedItems={items =>
                        setFieldValue(
                          'selectedLocations',
                          items.map(item => item?.value || ''),
                        )
                      }
                      placeholder="Select Preferred Locations"
                      isMultiSelect
                      maxSelectionLimit={9}
                    />

                    <CustomSelectionModal
                      title="Industry"
                      data={Industries}
                      selectedItems={
                        Industries.find(
                          item => item.value === values.industry,
                        ) || null
                      }
                      setSelectedItems={item =>
                        setFieldValue('industry', item?.value || '')
                      }
                      placeholder="Select Current Industry"
                      isMultiSelect={false}
                    />

                    <CustomSelectionModal
                      title="Department"
                      data={Department}
                      selectedItems={
                        Department.find(
                          item => item.value === values.department,
                        ) || null
                      }
                      setSelectedItems={item =>
                        setFieldValue('department', item?.value || '')
                      }
                      placeholder="Select Current Department"
                      isMultiSelect={false}
                    />

                    <CustomSelectionModal
                      title="Role Category"
                      data={RoleCategory}
                      selectedItems={
                        RoleCategory.find(
                          item => item.value === values.roleCategory,
                        ) || null
                      }
                      setSelectedItems={item =>
                        setFieldValue('roleCategory', item?.value || '')
                      }
                      placeholder="Select Role Category"
                      isMultiSelect={false}
                    />

                    <CustomSelectionModal
                      title="Job Role"
                      data={JobRole}
                      selectedItems={
                        JobRole.find(item => item.value === values.jobRole) ||
                        null
                      }
                      setSelectedItems={item =>
                        setFieldValue('jobRole', item?.value || '')
                      }
                      placeholder="Select Current Job Role"
                      isMultiSelect={false}
                    />

                    <ReusableTextInput
                      name="experience"
                      label="Experience*"
                      value={values.experience}
                      keyboardType="numeric"
                      onChangeText={handleChange('experience')}
                    />
                    <ReusableTextInput
                      name="annualSalary"
                      label="Annual Salary*"
                      value={values.annualSalary}
                      keyboardType="numeric"
                      onChangeText={handleChange('annualSalary')}
                    />
                    <ReusableTextInput
                      name="expectedSalary"
                      label="Expected Salary*"
                      value={values.expectedSalary}
                      keyboardType="numeric"
                      onChangeText={handleChange('expectedSalary')}
                    />
                    <CustomTabs
                      label="Notice Period*"
                      options={NOTICEPERIOD_OPTIONS}
                      selectedValue={values.noticePeriod}
                      setFieldValue={setFieldValue}
                      fieldName="noticePeriod"
                      error={errors.noticePeriod}
                      touched={touched.noticePeriod}
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
          />
        </View>
      </Modal>
    </View>
  );
};

export default PersonalInformation;
