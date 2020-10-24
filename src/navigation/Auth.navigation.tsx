import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import theme from '../utils/theme';
import ChoiceGroupScreen from '../screens/ChoiceGroup.screen';
import AuthScreen from 'src/screens/Auth.screen';

const Stack = createStackNavigator();

const AuthNavigationBarOptions: StackNavigationOptions = {
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

const AuthScreenOptions = {headerTitle: 'Выбор группы'};

const AuthNavigation = () => {
    return (
        <Stack.Navigator
          initialRouteName="Settings"
          screenOptions={AuthNavigationBarOptions}>
          <Stack.Screen
            options={AuthScreenOptions}
            name="Settings"
            component={ChoiceGroupScreen}
          />
        </Stack.Navigator>
      );
}

export default AuthNavigation;