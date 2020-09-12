/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/utils/theme';

import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Persisted from './src/redux/store';

import MainNavigation from './src/navigation/Main.navigation';
import LoadingScreen from './src/screens/Loading.screen';
import {Theme} from 'react-native-paper/lib/typescript/src/types';

// TODO: Fix bug with show modal while orientation is changed
const App = () => {
  return (
    // @ts-ignore
    <PaperProvider theme={theme as Theme}>
      <Provider store={Persisted.store}>
        <PersistGate
          loading={<LoadingScreen />}
          persistor={Persisted.persistor}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};

export default App;
