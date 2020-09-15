import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {IInitialState} from '../redux/store';

import AuthScreen from '../screens/Auth.screen';

import SсheduleNavigation from './Schedule.navigation';
import NotesNavigation from './Notes.navigation';
import SettingsNavigation from './Settings.navigation';

import ScreenWrapperComponent from '../containers/ScreenWrapper.component';

import theme from '../utils/theme';

import DeadLineIcon from '../static/images/deadline.svg';

const MainTabs = createMaterialBottomTabNavigator();

// NotesScreen
const NotesNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Дедлайны',
  tabBarIcon: ({color}: {color: any}) => (
    <DeadLineIcon fill={color} color={color} width={25} height={25} />
  ),
};

// Schedule
const SheduleNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Расписание',
  tabBarIcon: ({color}: {color: any}) => (
    <Icon name="book-open" color={color} size={25} />
  ),
};

// Settings
const SettingsNavigationTabOptions: MaterialBottomTabNavigationOptions = {
  tabBarLabel: 'Настройки',
  tabBarIcon: ({color}: {color: any}) => (
    <Icon name="cog" color={color} size={25} />
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
      activeColor={theme.colors.primary.white}
      inactiveColor={theme.colors.accent.darkBlack}
      keyboardHidesNavigationBar={true}
      sceneAnimationEnabled={true}
      barStyle={{backgroundColor: theme.colors.accent.evilGray}}>
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
