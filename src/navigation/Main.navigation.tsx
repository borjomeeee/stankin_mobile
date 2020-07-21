import React, {useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  createBottomTabNavigator,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {IInitialState} from '../redux/store';

import {checkUpdatesAction} from '../actions/App.actions';

import AppModalScreen from '../screens/AppModal.screen';
import LoadingScreen from '../screens/Loading.screen';
import AuthScreen from '../screens/Auth.screen';

import * as COLORS from '../utils/colors';

import SсheduleNavigation from './Schedule.navigation';
import NotesNavigation from './Notes.navigation';
import SettingsNavigation from './Settings.navigation';

import {AppErrorTypes} from '../enums/App.enums';

const MainTabs = createBottomTabNavigator();

// Main navigation options
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

const MainNavigation = ({
  app,
  user,
  checkUpdates,
}: ConnectedProps<typeof connector>) => {
  // Load updates
  useEffect(() => {
    if (user.group.id) {
      checkUpdates(user.group.id);
    }
  }, [checkUpdates, user.group]);

  if (app.error.type !== AppErrorTypes.NONE) {
    return <AppModalScreen />;
  }

  if (app.isLoading) {
    return <LoadingScreen />;
  }

  if (!user.isAuth) {
    return <AuthScreen />;
  }

  return (
    <MainTabs.Navigator
      initialRouteName="Shedule"
      tabBarOptions={AppNavigationBarOptions}>
      <MainTabs.Screen
        name="Notes"
        options={NotesNavigationTabOptions}
        component={NotesNavigation}
      />
      <MainTabs.Screen
        name="Shedule"
        options={SheduleNavigationTabOptions}
        component={SсheduleNavigation}
      />
      <MainTabs.Screen
        name="Settings"
        options={SettingsNavigationTabOptions}
        component={SettingsNavigation}
      />
    </MainTabs.Navigator>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  user: state.user,
});

const mapDispatchToProps = {
  checkUpdates: (groupId: string) => checkUpdatesAction(groupId),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainNavigation);
