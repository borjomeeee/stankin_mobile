import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import ScheduleScreen from '../screens/Schedule.screen';

import theme from '../utils/theme';

const Stack = createStackNavigator();

const SсheduleNavigationBarOptions: StackNavigationOptions = {
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

const SheduleScreenOptions: StackNavigationOptions = {
  headerTitle: 'Расписание',
};

const SсheduleNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Schedule"
      screenOptions={SсheduleNavigationBarOptions}>
      <Stack.Screen
        options={SheduleScreenOptions}
        name="Schedule"
        component={ScheduleScreen}
      />
    </Stack.Navigator>
  );
};

export default SсheduleNavigation;
