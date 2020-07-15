import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import SettingsScreen from '../screens/Settings.screen';

import * as COLORS from '../utils/colors';

const Stack = createStackNavigator();

const SettingsNavigationBarOptions: StackNavigationOptions = {
  headerTintColor: COLORS.BLACK,
  headerStyle: {
    backgroundColor: COLORS.WHITE,
    elevation: 0,

    height: 75,
  },
  headerTitleAlign: 'left',
  headerTitleStyle: {
    paddingLeft: 15,
    fontFamily: 'Inter-Bold',
    fontSize: 22,
  },
  headerRightContainerStyle: {
    marginRight: 15,
  },
  headerLeftContainerStyle: {
    marginLeft: 15,
  },
  headerBackTitle: 'Назад!',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const SettingsScreenOptions = {headerTitle: 'Настройки'};

const SettingsNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={SettingsNavigationBarOptions}>
      <Stack.Screen
        options={SettingsScreenOptions}
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
