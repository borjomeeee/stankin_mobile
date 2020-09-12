import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {IInitialState} from '../redux/store';

import {checkUpdatesAction} from '../actions/App.actions';

import AppModalScreen from '../screens/AppModal.screen';
import LoadingScreen from '../screens/Loading.screen';
import AuthScreen from '../screens/Auth.screen';

import SсheduleNavigation from './Schedule.navigation';
import NotesNavigation from './Notes.navigation';
import SettingsNavigation from './Settings.navigation';

import {AppErrorTypes} from '../enums/App.enums';

const MainTabs = createMaterialBottomTabNavigator();

const NotesNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Дедлайны',
  tabBarIcon: ({color}: {color: any}) => (
    <Icon name="turned-in-not" color={color} size={25} />
  ),
};

const SheduleNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Расписание',
  tabBarIcon: ({color}: {color: any}) => (
    <Icon name="chrome-reader-mode" color={color} size={25} />
  ),
};

const SettingsNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Настройки',
  tabBarIcon: ({color}: {color: any}) => (
    <Icon name="settings" color={color} size={25} />
  ),
};

const MainNavigation = ({app, user}: ConnectedProps<typeof connector>) => {
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
      labeled={false}
      activeColor="#444"
      inactiveColor="#bcbcbc"
      keyboardHidesNavigationBar={true}
      sceneAnimationEnabled={true}
      // eslint-disable-next-line react-native/no-inline-styles
      barStyle={{backgroundColor: '#fff'}}>
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
