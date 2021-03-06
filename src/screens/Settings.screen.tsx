import Config from 'react-native-config';
const {DEVELOPER_EMAIL, APP_VERSION} = Config;

import React, {useLayoutEffect} from 'react';
import * as RN from 'react-native';

import {connect, ConnectedProps} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {IInitialState} from '../redux/store';

import {
  logoutUserAction,
  setUserGroupOnClassesAction,
} from '../actions/User.actions';

import {updateScheduleAction} from '../actions/Shedule.actions';

import CommonButtonComponent from '../components/Common/CommonButton.component';
import CommonHeaderIconComponent from '../components/Common/CommonHeaderIcon.component';
import CommonTextComponent from '../components/Common/CommonText.component';

import {dateToStringExpanded} from '../utils/methods';
import theme from '../utils/theme';

import DeadLineIcon from '../static/images/google-play.svg';

import styles from './Settings.styles';

import {LessonGroup} from '../enums/Lesson.enums';

interface IUserGroupOption {
  label: string;
  value: LessonGroup;
}

const DEVELOPER_URL = `mailto:${DEVELOPER_EMAIL}`;
const APP_PAGE_URL =
  'https://play.google.com/store/apps/details?id=com.stankinmobile';

const SettingsScreen: React.FC<ConnectedProps<typeof connector>> = ({
  app,
  user,
  logoutUser,
  setUserGroup,
  updateSchedule,
}) => {
  const navigation = useNavigation();

  const userGroups: IUserGroupOption[] = [
    {
      label: '-',
      value: LessonGroup.NONE,
    },
    {
      label: 'А',
      value: LessonGroup.GROUP_A,
    },
    {
      label: 'Б',
      value: LessonGroup.GROUP_B,
    },
  ];

  const renderUserGroupOption = (
    {label, value}: IUserGroupOption,
    index: number,
  ) => {
    const optionContainerStyles: RN.StyleProp<RN.ViewStyle> = {
      backgroundColor:
        user.lessonGroup === value
          ? theme.colors.primary.mediumBlack
          : 'transparent',
    };
    return (
      <React.Fragment key={index}>
        {index !== 0 && <RN.View style={styles.selectOptionSeparator} />}

        <RN.TouchableOpacity
          delayPressIn={0}
          activeOpacity={0.6}
          onPress={setUserGroup.bind(null, value)}
          style={[styles.selectOptionContainer, optionContainerStyles]}>
          <CommonTextComponent>{label}</CommonTextComponent>
        </RN.TouchableOpacity>
      </React.Fragment>
    );
  };

  const handleUpdateUserGroup = () => navigation.navigate('ChoiceGroup');

  const onClickDeveloperLink = async () => {
    const supported = await RN.Linking.canOpenURL(DEVELOPER_URL);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await RN.Linking.openURL(DEVELOPER_URL);
    }
  };

  const onClickRateApp = async () => {
    const supported = await RN.Linking.canOpenURL(APP_PAGE_URL);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await RN.Linking.openURL(APP_PAGE_URL);
    }
  };

  return (
    <RN.View style={[theme.screen, styles.container]}>
      <RN.ScrollView showsVerticalScrollIndicator={false}>
        <RN.View>
          <RN.View style={styles.categoryTitleContainer}>
            <CommonTextComponent style={styles.categoryTitleText}>
              О пользователе
            </CommonTextComponent>
          </RN.View>

          {user.group && (
            <RN.View style={styles.option}>
              <CommonTextComponent>Группа:</CommonTextComponent>
              <RN.View style={styles.optionValueContainer}>
                <CommonTextComponent>
                  {user.group.title.toUpperCase()}
                </CommonTextComponent>
              </RN.View>
            </RN.View>
          )}

          <RN.View style={styles.option}>
            <CommonTextComponent>Подгруппа:</CommonTextComponent>
            <RN.View
              style={[
                styles.optionValueContainer,
                styles.optionSelectContainer,
              ]}>
              {userGroups.map(renderUserGroupOption)}
            </RN.View>
          </RN.View>

          <RN.View style={styles.categoryTitleContainer}>
            <CommonTextComponent style={styles.categoryTitleText}>
              Переменные приложения
            </CommonTextComponent>
          </RN.View>

          <RN.View style={styles.option}>
            <CommonTextComponent>APP_VERSION:</CommonTextComponent>
            <RN.View style={styles.optionValueContainer}>
              <CommonTextComponent>{`v${APP_VERSION}`}</CommonTextComponent>
            </RN.View>
          </RN.View>

          <RN.View style={styles.option}>
            <CommonTextComponent>LAST_UPDATE_SCHEDULE:</CommonTextComponent>
            <RN.View style={styles.optionValueContainer}>
              <CommonTextComponent>
                {dateToStringExpanded(new Date(app.lastUpdateSchedule))}
              </CommonTextComponent>
            </RN.View>
          </RN.View>

          <RN.View style={styles.categoryTitleContainer}>
            <CommonTextComponent style={styles.categoryTitleText}>
              О разработчике
            </CommonTextComponent>
          </RN.View>

          <RN.View style={styles.option}>
            <CommonTextComponent>Почта:</CommonTextComponent>
            <RN.View
              style={styles.optionValueContainer}
              onTouchEnd={onClickDeveloperLink}>
              <CommonTextComponent style={styles.link}>
                {DEVELOPER_EMAIL}
              </CommonTextComponent>
            </RN.View>
          </RN.View>

          <RN.View style={styles.option}>
            <CommonTextComponent>Оценить приложение:</CommonTextComponent>
            <RN.View
              style={styles.optionValueContainer}
              onTouchEnd={onClickRateApp}>
              <DeadLineIcon width={14} height={16} />
            </RN.View>
          </RN.View>
        </RN.View>
      </RN.ScrollView>

      <CommonButtonComponent
        style={styles.submitButton}
        text="Обновить расписание"
        onClick={updateSchedule.bind(null, user.group!.title)}
      />

      <RN.TouchableOpacity
        style={styles.setGroupContainer}
        delayPressIn={0}
        activeOpacity={0.6}
        onPress={handleUpdateUserGroup}>
        <CommonTextComponent style={styles.setGroupText}>
          изменить группу
        </CommonTextComponent>
      </RN.TouchableOpacity>
    </RN.View>
  );
};

// State
const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  user: state.user,
});

const mapDispatchToProps = {
  logoutUser: () => logoutUserAction(),
  setUserGroup: (group: LessonGroup) => setUserGroupOnClassesAction(group),
  updateSchedule: (title: string) => updateScheduleAction(title),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SettingsScreen);
