import {Modal, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ReusableTextInput from '../../../Constant/CustomTextInput';
import ModalFooter from '../../../Constant/ProfileModalFooter';
import profileStyle from '../ProfileStyle';
import {colors} from '../../../Global_CSS/TheamColors';
import ReusableDatePicker from '../../../Constant/CustomDatePicker';
import CustomSelectionModal from '../../../Constant/CustomSelectionModal';
import CustomTabs from '../../../Constant/CustomTabs';
import moment from 'moment';

const GENDER_OPTIONS = [
  {value: '1', label: 'Male'},
  {value: '2', label: 'Female'},
  {value: '3', label: 'Other'},
];

const Citys = [
  {label: 'Bangalore', value: '1'},
  {label: 'Hyderabad', value: '2'},
  {label: 'Chennai', value: '3'},
  {label: 'Pune', value: '4'},
  {label: 'Gurgaon', value: '5'},
  {label: 'Noida', value: '6'},
  {label: 'Kolkata', value: '7'},
  {label: 'Mumbai', value: '8'},
  {label: 'Delhi', value: '9'},
  {label: 'Ahmedabad', value: '10'},
  {label: 'Chandigarh', value: '11'},
  {label: 'Coimbatore', value: '12'},
  {label: 'Jaipur', value: '13'},
  {label: 'Indore', value: '14'},
  {label: 'Bhubaneswar', value: '15'},
  {label: 'Mysuru', value: '16'},
  {label: 'Visakhapatnam', value: '17'},
  {label: 'Surat', value: '18'},
  {label: 'Kochi', value: '19'},
  {label: 'Nagpur', value: '20'},
];
const IndiaStates = [
  {label: 'Andhra Pradesh', value: '1'},
  {label: 'Arunachal Pradesh', value: '2'},
  {label: 'Assam', value: '3'},
  {label: 'Bihar', value: '4'},
  {label: 'Chhattisgarh', value: '5'},
  {label: 'Goa', value: '6'},
  {label: 'Gujarat', value: '7'},
  {label: 'Haryana', value: '8'},
  {label: 'Himachal Pradesh', value: '9'},
  {label: 'Jharkhand', value: '10'},
  {label: 'Karnataka', value: '11'},
  {label: 'Kerala', value: '12'},
  {label: 'Madhya Pradesh', value: '13'},
  {label: 'Maharashtra', value: '14'},
  {label: 'Manipur', value: '15'},
  {label: 'Meghalaya', value: '16'},
  {label: 'Mizoram', value: '17'},
  {label: 'Nagaland', value: '18'},
  {label: 'Odisha', value: '19'},
  {label: 'Punjab', value: '20'},
  {label: 'Rajasthan', value: '21'},
  {label: 'Sikkim', value: '22'},
  {label: 'Tamil Nadu', value: '23'},
  {label: 'Telangana', value: '24'},
  {label: 'Tripura', value: '25'},
  {label: 'Uttar Pradesh', value: '26'},
  {label: 'Uttarakhand', value: '27'},
  {label: 'West Bengal', value: '28'},
  {label: 'Andaman and Nicobar Islands', value: '29'},
  {label: 'Chandigarh', value: '30'},
  {label: 'Dadra and Nagar Haveli and Daman and Diu', value: '31'},
  {label: 'Lakshadweep', value: '32'},
  {label: 'Delhi', value: '33'},
  {label: 'Puducherry', value: '34'},
  {label: 'Jammu & Kashmir', value: '35'}, // Union Territory
  {label: 'Ladakh', value: '36'}, // Union Territory
];
const MaharashtraCities = [
  {label: 'Mumbai', value: '1'},
  {label: 'Pune', value: '2'},
  {label: 'Nagpur', value: '3'},
  {label: 'Nashik', value: '4'},
  {label: 'Thane', value: '5'},
  {label: 'Aurangabad', value: '6'},
  {label: 'Solapur', value: '7'},
  {label: 'Satara', value: '8'},
  {label: 'Kolhapur', value: '9'},
  {label: 'Navi Mumbai', value: '10'},
  {label: 'Kalyan-Dombivli', value: '11'},
  {label: 'Chandrapur', value: '12'},
  {label: 'Jalgaon', value: '13'},
  {label: 'Ulhasnagar', value: '14'},
  {label: 'Ahmednagar', value: '15'},
  {label: 'Ratnagiri', value: '16'},
  {label: 'Wardha', value: '17'},
  {label: 'Beed', value: '18'},
  {label: 'Shirdi', value: '19'},
  {label: 'Ichalkaranji', value: '20'},
  {label: 'Amravati', value: '21'},
  {label: 'Bhusawal', value: '22'},
  {label: 'Bhandara', value: '23'},
  {label: 'Chinchwad', value: '24'},
  {label: 'Dombivli', value: '25'},
  {label: 'Ghatkopar', value: '26'},
  {label: 'Ichalkaranji', value: '27'},
  {label: 'Jalna', value: '28'},
  {label: 'Khamgaon', value: '29'},
  {label: 'Latur', value: '30'},
  {label: 'Malegaon', value: '31'},
  {label: 'Matheran', value: '32'},
  {label: 'Miraj', value: '33'},
  {label: 'Nagothane', value: '34'},
  {label: 'Osmanabad', value: '35'},
  {label: 'Parbhani', value: '36'},
  {label: 'Raigad', value: '37'},
  {label: 'Ratnagiri', value: '38'},
  {label: 'Sangli', value: '39'},
  {label: 'Satara', value: '40'},
  {label: 'Shivajinagar', value: '41'},
  {label: 'Solapur', value: '42'},
  {label: 'Talegaon', value: '43'},
  {label: 'Tirora', value: '44'},
  {label: 'Vadgaon', value: '45'},
  {label: 'Vasai-Virar', value: '46'},
  {label: 'Wai', value: '47'},
  {label: 'Worli', value: '48'},
  {label: 'Yavatmal', value: '49'},
  {label: 'Pimpalgaon', value: '50'},
  {label: 'Chopda', value: '51'},
  {label: 'Dattawadi', value: '52'},
  {label: 'Devgad', value: '53'},
  {label: 'Dhule', value: '54'},
  {label: 'Gadchiroli', value: '55'},
  {label: 'Gokul', value: '56'},
  {label: 'Hingoli', value: '57'},
  {label: 'Junnar', value: '58'},
  {label: 'Kankavli', value: '59'},
  {label: 'Karjat', value: '60'},
  {label: 'Khargone', value: '61'},
  {label: 'Kundal', value: '62'},
  {label: 'Lohgaon', value: '63'},
  {label: 'Malkapur', value: '64'},
  {label: 'Malkapur', value: '65'},
  {label: 'Mhasla', value: '66'},
  {label: 'Mokhada', value: '67'},
  {label: 'Mulund', value: '68'},
  {label: 'Mulshi', value: '69'},
  {label: 'Nandurbar', value: '70'},
  {label: 'Navi Mumbai', value: '71'},
  {label: 'Ozar', value: '72'},
  {label: 'Pachora', value: '73'},
  {label: 'Palghar', value: '74'},
  {label: 'Panchgani', value: '75'},
  {label: 'Pandharpur', value: '76'},
  {label: 'Panvel', value: '77'},
  {label: 'Pimpalgaon', value: '78'},
  {label: 'Pratapgarh', value: '79'},
  {label: 'Rajapur', value: '80'},
  {label: 'Rajgurunagar', value: '81'},
  {label: 'Ranjangaon', value: '82'},
  {label: 'Ratnagiri', value: '83'},
  {label: 'Sangli', value: '84'},
  {label: 'Sankh', value: '85'},
  {label: 'Saswad', value: '86'},
  {label: 'Sawantwadi', value: '87'},
  {label: 'Shahapur', value: '88'},
  {label: 'Shindkheda', value: '89'},
  {label: 'Sinnar', value: '90'},
  {label: 'Solapur', value: '91'},
  {label: 'Taloja', value: '92'},
  {label: 'Thane', value: '93'},
  {label: 'Tirora', value: '94'},
  {label: 'Udgir', value: '95'},
  {label: 'Vasai', value: '96'},
  {label: 'Vengurla', value: '97'},
  {label: 'Vidyanagar', value: '98'},
  {label: 'Vikhroli', value: '99'},
  {label: 'Wada', value: '100'},
  {label: 'Wadi', value: '101'},
];
const Industries = [
  {label: 'BPM', value: 'BPM'},
  {label: 'Analytics / KPO / Research', value: 'Analytics / KPO / Research'},
  {label: 'BPM / BPO', value: 'BPM / BPO'},
  {label: 'IT Services', value: 'IT Services'},
  {label: 'IT Services & Consulting', value: 'IT Services & Consulting'},
  {label: 'Technology', value: 'Technology'},
  {
    label: 'Electronic Components / Semiconductors',
    value: 'Electronic Components / Semiconductors',
  },
  {label: 'Electronics Manufacturing', value: 'Electronics Manufacturing'},
  {
    label: 'Electronic Manufacturing Services (EMS)',
    value: 'Electronic Manufacturing Services (EMS)',
  },
  {label: 'Emerging Technologies', value: 'Emerging Technologies'},
  {label: '3D Printing', value: '3D Printing'},
  {label: 'AI/ML', value: 'AI/ML'},
  {label: 'AR/VR', value: 'AR/VR'},
  {label: 'Blockchain', value: 'Blockchain'},
  {label: 'Cloud', value: 'Cloud'},
  {label: 'Cybersecurity', value: 'Cybersecurity'},
  {label: 'Drones/Robotics', value: 'Drones/Robotics'},
  {label: 'IoT', value: 'IoT'},
  {label: 'Nanotechnology', value: 'Nanotechnology'},
  {label: 'Hardware & Networking', value: 'Hardware & Networking'},
  {label: 'Internet', value: 'Internet'},
  {label: 'E-Commerce', value: 'E-Commerce'},
  {label: 'OTT', value: 'OTT'},
  {label: 'Software Product', value: 'Software Product'},
  {label: 'BFSI', value: 'BFSI'},
  {label: 'Banking', value: 'Banking'},
  {label: 'Financial Services', value: 'Financial Services'},
  {label: 'Asset Management', value: 'Asset Management'},
  {label: 'Broking', value: 'Broking'},
  {label: 'FinTech / Payments', value: 'FinTech / Payments'},
  {label: 'Insurance', value: 'Insurance'},
  {
    label: 'Investment Banking / Venture Capital / Private Equity',
    value: 'Investment Banking / Venture Capital / Private Equity',
  },
  {label: 'NBFC', value: 'NBFC'},
  {label: 'Micro Finance', value: 'Micro Finance'},
  {label: 'Education', value: 'Education'},
  {label: 'Education / Training', value: 'Education / Training'},
  {label: 'E-Learning / EdTech', value: 'E-Learning / EdTech'},
  {label: 'Manufacturing & Production', value: 'Manufacturing & Production'},
  {label: 'Auto Components', value: 'Auto Components'},
  {label: 'Tyre', value: 'Tyre'},
  {label: 'Automobile', value: 'Automobile'},
  {label: 'Automobile Dealers', value: 'Automobile Dealers'},
  {label: 'Electric Vehicle (EV)', value: 'Electric Vehicle (EV)'},
  {label: 'Building Material', value: 'Building Material'},
  {label: 'Cement', value: 'Cement'},
  {label: 'Ceramic', value: 'Ceramic'},
  {label: 'Glass', value: 'Glass'},
  {label: 'Chemicals', value: 'Chemicals'},
  {label: 'Paints', value: 'Paints'},
  {label: 'Defence & Aerospace', value: 'Defence & Aerospace'},
  {label: 'Electrical Equipment', value: 'Electrical Equipment'},
  {
    label: 'Fertilizers / Pesticides / Agro chemicals',
    value: 'Fertilizers / Pesticides / Agro chemicals',
  },
  {label: 'Industrial Automation', value: 'Industrial Automation'},
  {
    label: 'Industrial Equipment / Machinery',
    value: 'Industrial Equipment / Machinery',
  },
  {label: 'Construction Equipment', value: 'Construction Equipment'},
  {label: 'Machine Tools', value: 'Machine Tools'},
  {label: 'Iron & Steel', value: 'Iron & Steel'},
  {label: 'Metals & Mining', value: 'Metals & Mining'},
  {label: 'Packaging & Containers', value: 'Packaging & Containers'},
  {
    label: 'Petrochemical / Plastics / Rubber',
    value: 'Petrochemical / Plastics / Rubber',
  },
  {label: 'Pulp & Paper', value: 'Pulp & Paper'},
  {
    label: 'Infrastructure, Transport & Real Estate',
    value: 'Infrastructure, Transport & Real Estate',
  },
  {label: 'Aviation', value: 'Aviation'},
  {label: 'Courier / Logistics', value: 'Courier / Logistics'},
  {label: 'Logistics Tech', value: 'Logistics Tech'},
  {label: 'Engineering & Construction', value: 'Engineering & Construction'},
  {label: 'Oil & Gas', value: 'Oil & Gas'},
  {label: 'Ports & Shipping', value: 'Ports & Shipping'},
  {label: 'Shipbuilding', value: 'Shipbuilding'},
  {label: 'Power', value: 'Power'},
  {label: 'Hydro', value: 'Hydro'},
  {label: 'Nuclear', value: 'Nuclear'},
  {label: 'Solar', value: 'Solar'},
  {label: 'Wind', value: 'Wind'},
  {label: 'Railways', value: 'Railways'},
  {label: 'Real Estate', value: 'Real Estate'},
  {label: 'Co-working', value: 'Co-working'},
  {label: 'Urban Transport', value: 'Urban Transport'},
  {
    label: 'Water Treatment / Waste Management',
    value: 'Water Treatment / Waste Management',
  },
  {
    label: 'Consumer, Retail & Hospitality',
    value: 'Consumer, Retail & Hospitality',
  },
  {label: 'Beauty & Personal Care', value: 'Beauty & Personal Care'},
  {label: 'Beverage', value: 'Beverage'},
  {label: 'Brewery / Distillery', value: 'Brewery / Distillery'},
  {
    label: 'Consumer Electronics & Appliances',
    value: 'Consumer Electronics & Appliances',
  },
  {label: 'Fitness & Wellness', value: 'Fitness & Wellness'},
  {label: 'FMCG', value: 'FMCG'},
  {label: 'Tobacco', value: 'Tobacco'},
  {label: 'Food Processing', value: 'Food Processing'},
  {label: 'Dairy', value: 'Dairy'},
  {label: 'Meat / Poultry', value: 'Meat / Poultry'},
  {label: 'Sugar', value: 'Sugar'},
  {label: 'Furniture & Furnishing', value: 'Furniture & Furnishing'},
  {label: 'Gems & Jewellery', value: 'Gems & Jewellery'},
  {label: 'Hotels & Restaurants', value: 'Hotels & Restaurants'},
  {label: 'Leather', value: 'Leather'},
  {label: 'Retail', value: 'Retail'},
  {label: 'Textile & Apparel', value: 'Textile & Apparel'},
  {label: 'Fashion', value: 'Fashion'},
  {label: 'Handicraft', value: 'Handicraft'},
  {label: 'Home Textile', value: 'Home Textile'},
  {label: 'Technical Textile', value: 'Technical Textile'},
  {label: 'Yarn & Fabric', value: 'Yarn & Fabric'},
  {label: 'Travel & Tourism', value: 'Travel & Tourism'},
  {label: 'Healthcare & Life Sciences', value: 'Healthcare & Life Sciences'},
  {label: 'Biotechnology', value: 'Biotechnology'},
  {
    label: 'Clinical Research / Contract Research',
    value: 'Clinical Research / Contract Research',
  },
  {label: 'Medical Devices & Equipment', value: 'Medical Devices & Equipment'},
  {label: 'Medical Services / Hospital', value: 'Medical Services / Hospital'},
  {label: 'Diagnostics', value: 'Diagnostics'},
  {
    label: 'Pharmaceutical & Life Sciences',
    value: 'Pharmaceutical & Life Sciences',
  },
  {
    label: 'Media, Entertainment & Telecom',
    value: 'Media, Entertainment & Telecom',
  },
  {label: 'Advertising & Marketing', value: 'Advertising & Marketing'},
  {label: 'Digital Marketing', value: 'Digital Marketing'},
  {label: 'Public Relations', value: 'Public Relations'},
  {label: 'Animation & VFX', value: 'Animation & VFX'},
  {label: 'Events / Live Entertainment', value: 'Events / Live Entertainment'},
  {
    label: 'Film / Music / Entertainment',
    value: 'Film / Music / Entertainment',
  },
  {label: 'Gaming', value: 'Gaming'},
  {label: 'Printing & Publishing', value: 'Printing & Publishing'},
  {
    label: 'Sports / Leisure & Recreation',
    value: 'Sports / Leisure & Recreation',
  },
  {label: 'Telecom / ISP', value: 'Telecom / ISP'},
  {label: 'TV / Radio', value: 'TV / Radio'},
  {label: 'Professional Services', value: 'Professional Services'},
  {label: 'Accounting / Auditing', value: 'Accounting / Auditing'},
  {
    label: 'Architecture / Interior Design',
    value: 'Architecture / Interior Design',
  },
  {
    label: 'Content Development / Language',
    value: 'Content Development / Language',
  },
  {label: 'Design', value: 'Design'},
  {
    label: 'Facility Management Services',
    value: 'Facility Management Services',
  },
  {
    label: 'Law Enforcement / Security Services',
    value: 'Law Enforcement / Security Services',
  },
  {label: 'Legal', value: 'Legal'},
  {label: 'Management Consulting', value: 'Management Consulting'},
  {label: 'Recruitment / Staffing', value: 'Recruitment / Staffing'},
  {label: 'Miscellaneous', value: 'Miscellaneous'},
  {
    label: 'Agriculture / Forestry / Fishing',
    value: 'Agriculture / Forestry / Fishing',
  },
  {label: 'Agri-tech', value: 'Agri-tech'},
  {
    label: 'Government / Public Administration',
    value: 'Government / Public Administration',
  },
  {label: 'Import & Export', value: 'Import & Export'},
  {
    label: 'NGO / Social Services / Industry Associations',
    value: 'NGO / Social Services / Industry Associations',
  },
];
const Department = [
  {label: 'BFSI, Investments & Trading', value: 'BFSI, Investments & Trading'},
  {
    label: 'Customer Success, Service & Operations',
    value: 'Customer Success, Service & Operations',
  },
  {label: 'Data Science & Analytics', value: 'Data Science & Analytics'},
  {
    label: 'Engineering - Hardware & Networks',
    value: 'Engineering - Hardware & Networks',
  },
  {label: 'Engineering - Software & QA', value: 'Engineering - Software & QA'},
  {label: 'Finance & Accounting', value: 'Finance & Accounting'},
  {label: 'Human Resources', value: 'Human Resources'},
  {label: 'IT & Information Security', value: 'IT & Information Security'},
  {label: 'Marketing & Communication', value: 'Marketing & Communication'},
  {label: 'Product Management', value: 'Product Management'},
  {
    label: 'Production, Manufacturing & Engineering',
    value: 'Production, Manufacturing & Engineering',
  },
  {
    label: 'Project & Program Management',
    value: 'Project & Program Management',
  },
  {label: 'Quality Assurance', value: 'Quality Assurance'},
  {
    label: 'Sales & Business Development',
    value: 'Sales & Business Development',
  },
  {label: 'UX, Design & Architecture', value: 'UX, Design & Architecture'},
  {label: 'Administration & Facilities', value: 'Administration & Facilities'},
  {label: 'Aviation & Aerospace', value: 'Aviation & Aerospace'},
  {
    label: 'Construction & Site Engineering',
    value: 'Construction & Site Engineering',
  },
  {label: 'Consulting', value: 'Consulting'},
  {
    label: 'Content, Editorial & Journalism',
    value: 'Content, Editorial & Journalism',
  },
  {label: 'CSR & Social Service', value: 'CSR & Social Service'},
  {label: 'Energy & Mining', value: 'Energy & Mining'},
  {label: 'Environment Health & Safety', value: 'Environment Health & Safety'},
  {
    label: 'Food, Beverage & Hospitality',
    value: 'Food, Beverage & Hospitality',
  },
  {label: 'Healthcare & Life Sciences', value: 'Healthcare & Life Sciences'},
  {label: 'Legal & Regulatory', value: 'Legal & Regulatory'},
  {
    label: 'Media Production & Entertainment',
    value: 'Media Production & Entertainment',
  },
  {
    label: 'Merchandising, Retail & eCommerce',
    value: 'Merchandising, Retail & eCommerce',
  },
  {label: 'Procurement & Supply Chain', value: 'Procurement & Supply Chain'},
  {label: 'Research & Development', value: 'Research & Development'},
  {
    label: 'Risk Management & Compliance',
    value: 'Risk Management & Compliance',
  },
  {label: 'Security Services', value: 'Security Services'},
  {label: 'Shipping & Maritime', value: 'Shipping & Maritime'},
  {
    label: 'Sports, Fitness & Personal Care',
    value: 'Sports, Fitness & Personal Care',
  },
  {label: 'Strategic & Top Management', value: 'Strategic & Top Management'},
  {label: 'Teaching & Training', value: 'Teaching & Training'},
  {label: 'Other', value: 'Other'},
];
const RoleCategory = [
  {label: 'DBA / Data warehousing', value: 'DBA / Data warehousing'},
  {label: 'DevOps', value: 'DevOps'},
  {
    label: 'Quality Assurance and Testing',
    value: 'Quality Assurance and Testing',
  },
  {label: 'Software Development', value: 'Software Development'},
];
const JobRole = [
  {label: 'Automation Architect', value: 'Automation Architect'},
  {label: 'Automation Developer', value: 'Automation Developer'},
  {label: 'Back End Developer', value: 'Back End Developer'},
  {label: 'Big Data Engineer', value: 'Big Data Engineer'},
  {label: 'CRM Architect', value: 'CRM Architect'},
  {label: 'Data Engineer', value: 'Data Engineer'},
  {label: 'Data Platform Engineer', value: 'Data Platform Engineer'},
  {label: 'Embedded Systems Engineer', value: 'Embedded Systems Engineer'},
  {label: 'Engineering Manager', value: 'Engineering Manager'},
  {label: 'ERP Architect', value: 'ERP Architect'},
  {label: 'ERP Developer', value: 'ERP Developer'},
  {label: 'Front End Developer', value: 'Front End Developer'},
  {label: 'Full Stack Developer', value: 'Full Stack Developer'},
  {label: 'Game Developer / Programmer', value: 'Game Developer / Programmer'},
  {label: 'Head - Engineering', value: 'Head - Engineering'},
  {label: 'Mobile / App Developer', value: 'Mobile / App Developer'},
  {label: 'Practice Manager / Head', value: 'Practice Manager / Head'},
  {label: 'Search Engineer', value: 'Search Engineer'},
  {label: 'Solution Architect', value: 'Solution Architect'},
  {label: 'Technical Architect', value: 'Technical Architect'},
  {label: 'Technical Lead', value: 'Technical Lead'},
  {label: 'Webmaster', value: 'Webmaster'},
  {
    label: 'Software Development - Other',
    value: 'Software Development - Other',
  },
];
const NOTICEPERIOD_OPTIONS = [
  {value: 1, label: 'Immediate'},
  {value: 2, label: '15 days'},
  {value: 3, label: '1 month'},
  {value: 4, label: '2 months'},
  {value: 5, label: '3 months'},
  {value: 6, label: 'more than 3 months'},
];

// Validation Schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits')
    .required('Phone Number is required'),
  DOB: Yup.date()
    .nullable() // Allow null or empty values initially
    .required('Date of Birth is required')
    .typeError('Invalid Date of Birth') // Custom error message for invalid date format
    .max(new Date(), 'Date of Birth cannot be in the future'),
  gender: Yup.string()
    .oneOf(
      GENDER_OPTIONS.map(option => option.value),
      'Invalid gender selected',
    )
    .required('Gender is required'),
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

// Helper: Initial Values
const getInitialValues = (editingIndex, submittedData) => {
  if (editingIndex !== null) {
    return submittedData;
  }
  return {
    fullName: '',
    email: '',
    phoneNumber: '',
    DOB: new Date(),
    gender: '',
    currentLocation: '',
    selectedLocations: [],
    homeState: '',
    homeCity: '',
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
  const [submittedData, setSubmittedData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  let formikRef = null;

  const handleFormSubmit = values => {
    const formattedValues = {
      ...values,
      DOB: values.DOB ? moment(values.DOB).format('YYYY-MM-DD') : null, // Format DOB
    };
    setSubmittedData(formattedValues);
    setModalVisible(false);
    console.log('Form Submitted:', formattedValues);
  };
  // Handlers
  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    setEditingIndex(null);
  };

  const handleEdit = () => {
    setEditingIndex(0);
    openModal();
  };

  const handleDelete = () => {
    setSubmittedData(null);
    closeModal();
  };

  return (
    <View style={profileStyle.mainContainer}>
      <View style={profileStyle.editContainer}>
        <Text style={profileStyle.heading}>PERSONAL INFORMATION</Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor={colors.blackText}
          size={20}
          onPress={openModal}
          style={profileStyle.editButton}
        />
      </View>

      {submittedData ? (
        <View style={profileStyle.userDataContainer}>
          <Text style={{color: '#000'}}>Submitted Data:</Text>
          {Object.keys(submittedData).map(key => (
            <View key={key}>
              <Text style={{color: '#000'}}>{key}:</Text>
              <Text style={{color: '#000'}}>
                {key === 'DOB' && submittedData[key]
                  ? moment(submittedData[key]).format('MMMM DD, YYYY') // Display DOB in formatted form
                  : submittedData[key] || 'Not provided'}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={profileStyle.userDataContainer}>
          <Text style={profileStyle.optionalData}>No submitted data</Text>
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

                    {/* Input Fields */}
                    <ReusableTextInput
                      name="fullName"
                      label="Full Name*"
                      value={values.fullName}
                      onChangeText={handleChange('fullName')}
                    />
                    <ReusableTextInput
                      name="email"
                      label="Email Id*"
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />
                    <ReusableTextInput
                      name="phoneNumber"
                      label="Phone Number*"
                      value={values.phoneNumber}
                      keyboardType="numeric"
                      onChangeText={handleChange('phoneNumber')}
                    />
                    <ReusableDatePicker
                      label="Date of Birth*"
                      value={values.DOB}
                      onChange={date => setFieldValue('DOB', date)}
                    />
                    <CustomTabs
                      label="Gender*"
                      options={GENDER_OPTIONS}
                      selectedValue={values.gender}
                      setFieldValue={setFieldValue}
                      fieldName="gender"
                      error={errors.gender}
                      touched={touched.gender}
                    />
                    <ReusableTextInput
                      name="currentLocation"
                      label="Current Location*"
                      value={values.currentLocation}
                      onChangeText={handleChange('currentLocation')}
                    />

                    {/* Selection Modals */}
                    <CustomSelectionModal
                      title="Preferred Locations"
                      data={Citys}
                      selectedItems={values.selectedLocations}
                      setSelectedItems={items =>
                        setFieldValue('selectedLocations', items)
                      }
                      placeholder="Select Preferred Locations"
                      isMultiSelect
                    />

                    <CustomSelectionModal
                      title="Home State"
                      data={IndiaStates}
                      selectedItems={values.homeState}
                      setSelectedItems={items =>
                        setFieldValue('homeState', items)
                      }
                      placeholder="Select Home State"
                      isMultiSelect={false} // Single selection
                    />

                    <CustomSelectionModal
                      title="Home City"
                      data={MaharashtraCities}
                      selectedItems={values.homeCity}
                      setSelectedItems={items =>
                        setFieldValue('homeCity', items)
                      }
                      placeholder="Select Home City"
                      isMultiSelect={false} // Single selection
                    />

                    <CustomSelectionModal
                      title="Industry"
                      data={Industries}
                      selectedItems={values.industry}
                      setSelectedItems={items =>
                        setFieldValue('industry', items)
                      }
                      placeholder="Select Current Industry"
                      isMultiSelect={false} // Single selection
                    />

                    <CustomSelectionModal
                      title="Department"
                      data={Department}
                      selectedItems={values.department}
                      setSelectedItems={items =>
                        setFieldValue('department', items)
                      }
                      placeholder="Select Current Department"
                      isMultiSelect={false} // Single selection
                    />

                    <CustomSelectionModal
                      title="Role Category"
                      data={RoleCategory}
                      selectedItems={values.roleCategory}
                      setSelectedItems={items =>
                        setFieldValue('roleCategory', items)
                      }
                      placeholder="Select Role Category"
                      isMultiSelect={false} // Single selection
                    />

                    <CustomSelectionModal
                      title="Job Role"
                      data={JobRole}
                      selectedItems={values.jobRole}
                      setSelectedItems={items =>
                        setFieldValue('jobRole', items)
                      }
                      placeholder="Select Current Job Role"
                      isMultiSelect={false} // Single selection
                    />

                    {/* Notice Period */}
                    <CustomTabs
                      label="Notice Period*"
                      options={NOTICEPERIOD_OPTIONS}
                      selectedValue={values.noticePeriod}
                      setFieldValue={setFieldValue}
                      fieldName="noticePeriod"
                      error={errors.noticePeriod}
                      touched={touched.noticePeriod}
                    />

                    {/* Numeric Inputs */}
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
                  </View>
                )}
              </Formik>
            )}
            keyExtractor={item => item.key}
          />
          <ModalFooter
            onPress={() => formikRef?.handleSubmit()}
            onCancel={closeModal}
            onDelete={handleDelete}
            showDelete={editingIndex !== null}
          />
        </View>
      </Modal>
    </View>
  );
};
export default PersonalInformation;
