import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import ScreenWrapperComponent from '../containers/ScreenWrapper.component';
import SettingsScreen from '../screens/Settings.screen';

import theme from '../utils/theme';

const Stack = createStackNavigator();

const SettingsNavigationBarOptions: StackNavigationOptions = {
  headerTintColor: theme.colors.primary.white,
  headerStyle: {
    backgroundColor: theme.colors.header.bg,
    elevation: 0,

    height: 60,
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: theme.fonts.semibold.fontFamily,
    fontSize: theme.fonts.size.large,
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

const SettingsScreenWrapped = () => (
  <ScreenWrapperComponent>
    <SettingsScreen />
  </ScreenWrapperComponent>
);

const SettingsNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={SettingsNavigationBarOptions}>
      <Stack.Screen
        options={SettingsScreenOptions}
        name="Settings"
        component={SettingsScreenWrapped}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
