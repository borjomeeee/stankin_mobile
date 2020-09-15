import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';

import NotesScreen from '../screens/Notes.screen';
import AddNoteScreen from '../screens/AddNote.screen';

import theme from '../utils/theme';

const Stack = createStackNavigator();

const NotesNavigationBarOptions: StackNavigationOptions = {
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
