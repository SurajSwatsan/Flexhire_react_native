import {StyleSheet} from 'react-native';
import {colors} from './TheamColors';

const JobCardStyle = StyleSheet.create({
  companyContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  jobCard: {
    backgroundColor: colors.whiteText,
    borderRadius: 8,
    marginRight: 12,
    padding: 12,
    width: '100%',
    marginBottom: 18,
  },
  companylogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 8,
    justifyContent: 'space-between',
  },
  textName: {
    flexDirection: 'column,',
  },
  companyName: {
    fontSize: 12,
    color: 'gray',
  },
  companyImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  workModeContainer: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  workModeChip: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveicon: {
    alignSelf: 'center',
    right: -14,
    top: -6,
  },

  experienceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
    gap: 6,
  },
  jobFooter: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobDetailsalary: {
    fontSize: 11,
    color: 'gray',
    fontWeight: 'bold',
  },
  jobCardLocation: {
    fontSize: 11,
    color: '#555',
    marginLeft: -4,
  },
  jobPostedDate: {
    fontSize: 12,
    color: '#808080',
    // textAlign: 'right',
  },
  noJobsContainer: {alignItems: 'center'},
  jobimage: {
    width: 200,
    height: 200,
    marginTop: 24,
    // alignSelf: 'center',
    // alignContent: 'center',
  },
  noJobsText: {
    alignSelf: 'center',
    color: colors.primary,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#f1f1f1',
  },
});

export default JobCardStyle;
