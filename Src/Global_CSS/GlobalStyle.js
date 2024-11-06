import {StyleSheet} from 'react-native';

const GlobalStyle = StyleSheet.create({
  labelStyle: {
    color: '#ffffff',
    backgroundColor: '#407093',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    width: '100%',
  },
  savelabelStyle: {
    color: '#ffffff',
    backgroundColor: '#407093',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    // width: '200',
  },
  closelabelStyle: {
    color: 'red',
    // backgroundColor: 'red',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    height: 48,
    // width: '100',
  },
  headerStyle:{
    flexDirection:'row',
   alignItems:'center',
   marginBottom:12,
   justifyContent:"space-between",
  //  backgroundColor: '#fff',
  //  padding: 5,
    
  //   borderRadius: 6,
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: 4},
  //   shadowOpacity: 0.1,
  //   shadowRadius: 10,
  //   elevation: 5,
  //  justifyContent:'space-between',
  //   margin: 4,
  },
  headerText:{
    fontSize:20,
    color:'#000',
    // marginLeft:12,
    
  }
});

export default GlobalStyle;
