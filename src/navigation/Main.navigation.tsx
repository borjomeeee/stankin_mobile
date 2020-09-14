import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
  MaterialBottomTabScreenProps,
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
import ScreenWrapperComponent from '../containers/ScreenWrapper.component';
import NotesScreen from '../screens/Notes.screen';

const MainTabs = createMaterialBottomTabNavigator();

// NotesScreen
const NotesNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Дедлайны',
  tabBarIcon: ({color}: {color: any}) => (
    <Icon name="turned-in-not" color={color} size={25} />
  ),
};

// Schedule
const SheduleNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Расписание',
  tabBarIcon: ({color}: {color: any}) => (
    <Icon name="chrome-reader-mode" color={color} size={25} />
  ),
};

// Settings
const SettingsNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Настройки',
  tabBarIcon: ({color}: {color: any}) => (
    <Icon name="settings" color={color} size={25} />
  ),
};

const MainNavigation: React.FC<ConnectedProps<typeof connector>> = ({
  isAuth,
}) => {
  if (!isAuth) {
    return (
      <ScreenWrapperComponent>
        <AuthScreen />
      </ScreenWrapperComponent>
    );
  }

  return (
    <MainTabs.Navigator
      initialRouteName="Schedule"
      labeled={false}
      activeColor="#444"
      inactiveColor="#bcbcbc"
      keyboardHidesNavigationBar={true}
      sceneAnimationEnabled={true}>
      <MainTabs.Screen
        name="Notes"
        options={NotesNavigationTabOptions}
        component={NotesNavigation}
      />
      <MainTabs.Screen
        name="Schedule"
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
  isAuth: state.user.isAuth,
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainNavigation);
