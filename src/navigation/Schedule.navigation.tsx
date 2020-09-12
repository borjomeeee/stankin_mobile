import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import ScheduleScreen from '../screens/Schedule.screen';

import * as COLORS from '../utils/colors';

const Stack = createStackNavigator();

const SсheduleNavigationBarOptions: StackNavigationOptions = {
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
