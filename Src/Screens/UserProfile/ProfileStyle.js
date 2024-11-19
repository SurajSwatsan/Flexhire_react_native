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
    color: colors.secodary,
    fontSize: 14,
    fontWeight: '600',
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
    padding: 12,
  },
  ScrollContent: {
    justifyContent: 'center',
    margin: 12,
  },

  formContainer: {
    marginVertical: 8,
  },
  formHeading: {
    alignSelf: 'center',
    fontSize: 18,
    color: colors.secodary,
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
    color: colors.whiteText,
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
    color: colors.whiteText,

    fontSize: 12,
  },
  textarea: {
    backgroundColor: 'white',
    width: effectiveWidth,
    height: 48,
    borderColor: 'lightgrey',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderRadius: 5,
  },
  chipText: {
    fontSize: 13,
    color: colors.primary,
  },
  outputData: {
    marginLeft: 12,
  },
  error: {
    color: 'red',
    fontSize: 11,
  },
});
export default profileStyle;
