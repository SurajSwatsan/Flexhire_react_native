import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';
const screenWidth = Dimensions.get('window').width;
const horizontalMargin = 12 * 2; // Total margin (left + right)

const effectiveWidth = screenWidth - horizontalMargin;
const profileStyle = StyleSheet.create({
  mainContainer: {
    width: effectiveWidth,
    borderRadius: 8,
    backgroundColor: colors.cardBgcolor,
  },
  editContainer: {
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: colors.blackText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDataContainer: {
    marginHorizontal: 12,
    marginBottom: 12,
  },
  optionalData: {
    color: colors.blackText,
  },
  modalContainer: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  ScrollViewContent: {
    justifyContent: 'center',
    margin: 12,
  },

  formContainer: {
    marginVertical: 8,
  },
  formHeading: {
    fontSize: 18,
    color: colors.blackText,
    marginVertical: 12,
    fontWeight: 'bold',
  },
  formSubHeading: {
    fontSize: 14,
    color: colors.blackText,
  },
  label: {
    color: colors.blackText,
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedTab: {
    backgroundColor: colors.primary,
  },
  unselectedTab: {
    backgroundColor: 'lightgray',
  },

  selectedTabText: {
    color: '#fff',
  },
  unselectedTabText: {
    color: colors.blackText,
  },
  TabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabBtnStyle: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 4,
    marginVertical: 4,
  },
  tabBtnText: {
    color: '#fff',
    fontSize: 12,
  },
});
export default profileStyle;
