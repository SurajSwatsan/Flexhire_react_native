import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './Src/Navigation/stackNavigation';
import {PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <PaperProvider>
      <StatusBar
        barStyle="light-content"
        // backgroundColor="#00334d"
        backgroundColor="#4f84c4"
        translucent={false}
      />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
