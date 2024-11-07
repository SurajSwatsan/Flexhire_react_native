import {StyleSheet} from 'react-native';

const GlobalStyle = StyleSheet.create({
  labelStyle: {
    color: '#ffffff',
    backgroundColor: '#00334d',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    width: '100%',
  },
  savelabelStyle: {
    color: '#ffffff',
    backgroundColor: '#00334d',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
  },
  closelabelStyle: {
    color: 'red',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 18,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    color: '#000',
  },
});

export default GlobalStyle;
