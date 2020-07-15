import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import NotesScreen from '../screens/Notes.screen';
import AddNoteScreen from '../screens/AddNote.screen';

import * as COLORS from '../utils/colors';

const Stack = createStackNavigator();

const NotesNavigationBarOptions: StackNavigationOptions = {
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

const NotesScreenOptions: StackNavigationOptions = {
  headerTitle: 'Дедлайны',
};
const AddNoteScreenOptions: StackNavigationOptions = {
  headerTitle: 'Добавить дедлайн',
};

const NotesNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notes"
      screenOptions={NotesNavigationBarOptions}>
      <Stack.Screen
        options={NotesScreenOptions}
        name="Notes"
        component={NotesScreen}
      />
      <Stack.Screen
        options={AddNoteScreenOptions}
        name="AddNote"
        component={AddNoteScreen}
      />
    </Stack.Navigator>
  );
};

export default NotesNavigation;
