import React, {useEffect} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarOptions,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {connect, ConnectedProps} from 'react-redux';

import {IInitialState} from '../redux/store';

import SheduleNavigation from './Shedule.navigation';
import NotesNavigation from './Notes.navigation';
import SettingsNavigation from './Settings.navigation';

import AuthScreen from '../screens/Auth.screen';
import LoadingScreen from '../screens/Loading.screen';
import AppModal from '../screens/AppModal.screen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {checkUpdatesAction} from '../actions/App.actions';

import {AppErrorTypes} from '../enums/App.enums';

import * as COLORS from '../utils/colors';

const MainTabs = createBottomTabNavigator();
const AppStack = createStackNavigator();

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

const MainNavigation = () => {
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
        component={SheduleNavigation}
      />
      <MainTabs.Screen
        name="Settings"
        options={SettingsNavigationTabOptions}
        component={SettingsNavigation}
      />
    </MainTabs.Navigator>
  );
};

// App navigation options
const MainNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

// CHANGE NAVIGATOIN (THIS ERORRED VERSION)
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

  return (
    <AppStack.Navigator
      initialRouteName="Main"
      mode="modal"
      screenOptions={MainNavigationOptions}>
      {app.error.type !== AppErrorTypes.NONE ? (
        <AppStack.Screen name="AppModal" component={AppModal} />
      ) : !user.isAuth ? (
        <AppStack.Screen name="Auth" component={AuthScreen} />
      ) : app.isLoading ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : (
        <AppStack.Screen name="Main" component={MainNavigation} />
      )}
    </AppStack.Navigator>
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
