import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/stackNavigation';
import {PaperProvider} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Redux/store';
import {colors} from './src/Global_CSS/TheamColors';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <PaperProvider>
          <StatusBar
            barStyle="light-content"
            // backgroundColor="#004466"
            backgroundColor={colors.primary}
            // backgroundColor="#4f84c4"
            translucent={false}
          />
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </PaperProvider>
      </ToastProvider>
    </Provider>
  );
};

export default App;
