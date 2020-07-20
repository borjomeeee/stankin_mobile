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

import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Persisted from './src/redux/store';
import AppNavigation from './src/navigation/App.navigation';
import LoadingScreen from './src/screens/Loading.screen';

const App = () => {
  return (
    <Provider store={Persisted.store}>
      <PersistGate loading={<LoadingScreen />} persistor={Persisted.persistor}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
