import React, {useEffect} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs';

import {connect, ConnectedProps} from 'react-redux';

import {IInitialState} from '../redux/store';

import SheduleNavigation from './Shedule.navigation';
import NotesNavigation from './Notes.navigation';
import SettingsNavigation from './Settings.navigation';

import AuthScreen from '../screens/Auth.screen';
import LoadingScreen from '../screens/Loading.screen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {checkUpdatesAction} from '../actions/App.actions';

import * as COLORS from '../utils/colors';

const Tab = createBottomTabNavigator();

// Navigation options
const AppNavigationBarOptions: BottomTabBarOptions = {
  keyboardHidesTabBar: true,
  adaptive: true,
  showLabel: false,

  activeTintColor: COLORS.BLACK,
};

const NotesNavigationTabOptions = {
  tabBarLabel: 'Дедлайны',
  tabBarIcon: ({color, size}: {color: any; size: any}) => (
    <Icon name="turned-in-not" color={color} size={size} />
  ),
};

const SheduleNavigationTabOptions = {
  tabBarLabel: 'Расписание',
  tabBarIcon: ({color, size}: {color: any; size: any}) => (
    <Icon name="chrome-reader-mode" color={color} size={size} />
  ),
};

const SettingsNavigationTabOptions = {
  tabBarLabel: 'Настройки',
  tabBarIcon: ({color, size}: {color: any; size: any}) => (
    <Icon name="settings" color={color} size={size} />
  ),
};

// Component
const AppNavigation = ({
  app,
  user,
  sheckUpdate,
}: ConnectedProps<typeof connector>) => {
  // Check updates application
  useEffect(() => {
    if (user.group.id) {
      sheckUpdate(user.group.id);
    }
  }, [user.group.id, sheckUpdate]);

  if (app.isLoading) {
    return <LoadingScreen />;
  }

  if (!user.isAuth) {
    return <AuthScreen />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Shedule"
      tabBarOptions={AppNavigationBarOptions}>
      <Tab.Screen
        name="Notes"
        options={NotesNavigationTabOptions}
        component={NotesNavigation}
      />
      <Tab.Screen
        name="Shedule"
        options={SheduleNavigationTabOptions}
        component={SheduleNavigation}
      />
      <Tab.Screen
        name="Settings"
        options={SettingsNavigationTabOptions}
        component={SettingsNavigation}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  user: state.user,
  state,
});

const mapDispatchToProps = {
  sheckUpdate: (groupId: string) => checkUpdatesAction(groupId),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppNavigation);
