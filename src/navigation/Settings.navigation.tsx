import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import ScreenWrapperComponent from '../containers/ScreenWrapper.component';
import SettingsScreen from '../screens/Settings.screen';

import theme from '../utils/theme';
import ChoiceGroupScreen from '../screens/ChoiceGroup.screen';

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
const ChoiceGroupScreenOptions = {headerTitle: 'Выберите группу'};

const SettingsNavigation = () => {
  return (
    <ScreenWrapperComponent>
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={SettingsNavigationBarOptions}>
        <Stack.Screen
          options={SettingsScreenOptions}
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          options={ChoiceGroupScreenOptions}
          name="ChoiceGroup"
          component={ChoiceGroupScreen}
        />
      </Stack.Navigator>
    </ScreenWrapperComponent>
  );
};

export default SettingsNavigation;
