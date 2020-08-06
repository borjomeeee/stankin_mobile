const config = require('../config.json');
const developer = config.developer_mail;

import React, {useLayoutEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, Linking} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {IInitialState} from '../redux/store';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';
import RNPickerSelect, {PickerStyle} from 'react-native-picker-select';

import {
  logoutUserAction,
  setUserGroupOnClassesAction,
} from '../actions/User.actions';
import {downloadSheduleAction} from '../actions/Shedule.actions';

import CommonHeaderIconComponent from '../components/Common/CommonHeaderIcon.component';
import CommonTagComponent from '../components/Common/CommonTag.component';
import CommonButtonComponent from '../components/Common/CommonButton.component';

import * as COLORS from '../utils/colors';
import {ScreenContainer} from '../utils/theme';
import {dateToStringExpanded} from '../utils/methods';

import {LessonGroup} from '../enums/Lesson.enums';

const IUserGroupDropdownProps: PickerStyle = {
  inputAndroid: {
    width: 100,
    height: 30,

    borderWidth: 1,
    borderColor: COLORS.BLACK,

    opacity: 0,
    zIndex: 100,
  },
  inputIOS: {
    width: 100,
    height: 30,

    borderWidth: 1,
    borderColor: COLORS.BLACK,

    opacity: 0,
    zIndex: 100,
  },
};

const DEVELOPER_URL = `mailto:${developer}`;

const SettingsScreen = ({
  app,
  user,
  logoutUser,
  setUserGroup,
  updateSchedule,
}: ConnectedProps<typeof connector>) => {
  const navigation = useNavigation();

  // Select dropdown
  let selectRef = useRef(null);

  const userGroups = [
    {label: 'Без группы', value: LessonGroup.NONE},
    {label: 'Группа А', value: LessonGroup.GROUP_A},
    {label: 'Группа Б', value: LessonGroup.GROUP_B},
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <CommonHeaderIconComponent>
          <Icon
            name="log-out"
            size={25}
            color={'#444444'}
            onPress={logoutUser}
          />
        </CommonHeaderIconComponent>
      ),
    });
  }, [logoutUser, navigation]);

  const onSelectUserGroup = (value: string | null) => {
    if (value !== null) {
      setUserGroup(value as LessonGroup);
    }
  };

  const onClickDeveloperLink = async () => {
    const supported = await Linking.canOpenURL(DEVELOPER_URL);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(DEVELOPER_URL);
    }
  };

  return (
    <ScreenContainer>
      <SettingsScreenContent showsVerticalScrollIndicator={false}>
        <SettingsOption>
          <SettingsOptionKey>Имя:</SettingsOptionKey>
          <SettingsOptionValue>
            <CommonTagComponent text={user.name} />
          </SettingsOptionValue>
        </SettingsOption>

        <SettingsOption>
          <SettingsOptionKey>Группа:</SettingsOptionKey>
          <SettingsOptionValue>
            <CommonTagComponent text={user.group.title.toUpperCase()} />
          </SettingsOptionValue>
        </SettingsOption>

        <BlockSeparator />

        <SettingsOption>
          <SettingsOptionKey>Группа на парах:</SettingsOptionKey>
          <SettingsOptionValue>
            <OptionSelectInput>
              <OptionSelectText>
                {user.lessonGroup === LessonGroup.NONE
                  ? 'Без группы'
                  : `Группа ${user.lessonGroup}`}
              </OptionSelectText>
            </OptionSelectInput>
          </SettingsOptionValue>

          <OptionSelect>
            <RNPickerSelect
              style={IUserGroupDropdownProps}
              onValueChange={onSelectUserGroup}
              items={userGroups}
              ref={selectRef}
            />
          </OptionSelect>
        </SettingsOption>

        <SettingsOption>
          <SettingsOptionKey>Последнее обновление:</SettingsOptionKey>
          <SettingsOptionValue>
            <CommonTagComponent
              text={dateToStringExpanded(new Date(app.lastUpdateSchedule))}
            />
          </SettingsOptionValue>
        </SettingsOption>

        <BlockSeparator />

        <SettingsOption>
          <SettingsOptionKey>Версия приложения:</SettingsOptionKey>
          <SettingsOptionValue>
            <SettingsOptionText>{app.version}</SettingsOptionText>
          </SettingsOptionValue>
        </SettingsOption>

        <SettingsOption>
          <SettingsOptionKey>Разработчик:</SettingsOptionKey>
          <SettingsOptionValue>
            <TouchableOpacity onPress={onClickDeveloperLink}>
              <SettingsOptionLinkText>
                spiridonov.new@gmail.com
              </SettingsOptionLinkText>
            </TouchableOpacity>
          </SettingsOptionValue>
        </SettingsOption>
      </SettingsScreenContent>

      <SettingsSubmitButton>
        <CommonButtonComponent
          text="Обновить расписание"
          onClick={updateSchedule.bind(
            null,
            user.login,
            user.password,
            user.group.id,
          )}
        />
      </SettingsSubmitButton>
    </ScreenContainer>
  );
};

// Components
const SettingsScreenContent = styled.ScrollView`
  margin-top: 10px;
`;

const SettingsOption = styled.View`
  height: 30px;

  flex-direction: row;
  justify-content: space-between;

  align-items: center;

  margin-top: 5px;
`;

const SettingsOptionKey = styled.Text`
  font-size: 16px;
`;

const SettingsOptionValue = styled.View`
  position: relative;
`;

const SettingsOptionText = styled.Text``;

const SettingsOptionLinkText = styled.Text`
  color: ${COLORS.BLUE};

  text-decoration: underline;
`;

const OptionSelect = styled.View`
  position: absolute;

  right: 0px;
  top: 0px;

  opacity: 0;
`;

const OptionSelectInput = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  border: 1px solid ${COLORS.DARK_GRAY};

  padding: 5px 8px;
  background-color: ${COLORS.WHITE};
`;

const OptionSelectText = styled.Text`
  font-family: 'Inter-Bold';
`;

const BlockSeparator = styled.View`
  height: 1px;

  margin: 20px 0px 10px 0px;

  background-color: ${COLORS.MEDIUM_GRAY};
`;

const SettingsSubmitButton = styled.View`
  margin: 20px 0px;

  align-items: center;
  justify-content: center;
`;

// State
const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  user: state.user,
});

const mapDispatchToProps = {
  logoutUser: () => logoutUserAction(),
  setUserGroup: (group: LessonGroup) => setUserGroupOnClassesAction(group),
  updateSchedule: (login: string, password: string, groupId: string) =>
    downloadSheduleAction(login, password, groupId),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SettingsScreen);
