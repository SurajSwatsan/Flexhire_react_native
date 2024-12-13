import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../Global_CSS/TheamColors';
const screenWidth = Dimensions.get('window').width;
// const horizontalMargin = 12 * 2; // Total margin (left + right)

// const effectiveWidth = screenWidth - horizontalMargin;
const profileStyle = StyleSheet.create({
  mainContainer: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 0.5,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  userDataContainer: {
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
    // alignSelf: 'center',
    fontSize: 18,
    color: colors.secondary,
    marginTop: 12,
    fontWeight: 'bold',
  },
  formSubHeading: {
    fontSize: 14,
    color: colors.blackText,
  },
  label: {
    fontSize: 15,
    color: colors.secondary,
  },
  selectedTab: {
    backgroundColor: colors.primary,
  },
  unselectedTab: {
    backgroundColor: colors.background,
  },
  CustomTabContainer: {
    marginTop: 12,
  },

  selectedTabText: {
    color: colors.whiteText,
  },
  unselectedTabText: {
    color: colors.primary,
  },
  TabContainer: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tabBtnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderRadius: 5,
  },
  tabBtnText: {
    color: colors.blackText,
    fontSize: 13,
  },
  textarea: {
    backgroundColor: 'white',
    // width: effectiveWidth,
    height: 48,
    borderColor: 'lightgrey',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
    marginBottom: 12,
  },
  error: {
    color: 'red',
    fontSize: 11,
  },
  iconStyle: {
    color: colors.primary,
  },
  suggestionsContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: colors.background,
    // padding: 8,
    // paddingHorizontal: 12,
    position: 'absolute',
    top: 170,
    zIndex: 1,
    width: '100%',

    // overflow: 'auto',
    borderRadius: 5,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.primary,
    padding: 8,
    borderRadius: 4,
  },
});
export default profileStyle;
