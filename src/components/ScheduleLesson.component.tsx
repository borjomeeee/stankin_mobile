import React from 'react';
import {TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';

import {ILesson} from '../models/Lesson.model';

import * as COLORS from '../utils/colors';
import {getLesonTimeFromNum} from '../utils/methods';

import Icon from 'react-native-vector-icons/MaterialIcons';

type IScheduleLessonComponent = {
  onClick: () => void;
};

const ScheduleLessonComponent = ({
  onClick,

  type,
  title,
  groupOnLesson,
  room,
  teacher,
  num,

  ...props
}: IScheduleLessonComponent &
  ILesson &
  React.ComponentProps<typeof TouchableOpacity>) => {
  const [startTime, endTime] = getLesonTimeFromNum(num);

  return (
    <LessonCardContainer {...props} activeOpacity={0.65} onPress={onClick}>
      <LessonCardTimeContainer>
        <LessonCardTimeItem>{startTime}</LessonCardTimeItem>
        <LessonCardTimeItemSub>{endTime}</LessonCardTimeItemSub>

        {groupOnLesson.length > 0 && (
          <LessonCardUserGroupContainer>
            <LessonCardUserGroupText>{groupOnLesson}</LessonCardUserGroupText>
          </LessonCardUserGroupContainer>
        )}
      </LessonCardTimeContainer>

      <LessonCardContent>
        <LessonCardTitle>{title}</LessonCardTitle>

        <LessonCardBottomContainer>
          <LessonCardOptions>
            {room.length > 0 && (
              <LessonCardOption>
                <Icon name="room" size={20} color={'#444444'} />

                <LessonCardOptionText>{room}</LessonCardOptionText>
              </LessonCardOption>
            )}

            {teacher.length > 0 && (
              <LessonCardOption>
                <Icon name="school" size={20} color={'#444444'} />

                <LessonCardOptionText>{teacher}</LessonCardOptionText>
              </LessonCardOption>
            )}
          </LessonCardOptions>

          <LessonCardTypeContainer>
            {type.length > 0 && <LessonCardTypeText>{type}</LessonCardTypeText>}
          </LessonCardTypeContainer>
        </LessonCardBottomContainer>
      </LessonCardContent>
    </LessonCardContainer>
  );
};

// Components
const LessonCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-content: stretch;

  border: 1px solid ${'#E4E4E4'};
  background-color: ${'#FCFCFC'};

  padding: 10px 15px 10px 10px;
`;

const LessonCardTimeContainer = styled.View`
  padding-right: 15px;
`;

const LessonCardTimeItem = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 14px;

  color: ${COLORS.BLACK};
`;

const LessonCardTimeItemSub = styled(LessonCardTimeItem)`
  color: ${COLORS.DARK_GRAY};
`;

const LessonCardUserGroupContainer = styled.View`
  border: 1px solid ${COLORS.DARK_GRAY};
  margin-top: 5px;

  align-items: center;
`;

const LessonCardUserGroupText = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 12px;
`;

const LessonCardContent = styled.View`
  flex: 1;
`;

const LessonCardTitle = styled.Text`
  font-size: 16px;
`;

const LessonCardOptions = styled.View``;

const LessonCardOption = styled.View`
  display: flex;
  flex-direction: row;

  margin-top: 2px;

  align-items: center;
`;

const LessonCardOptionText = styled.Text`
  margin-left: 14px;
`;

const LessonCardBottomContainer = styled.View`
  margin-top: 10px;

  display: flex;
  flex-direction: row;

  align-items: flex-end;
  justify-content: space-between;
`;

const LessonCardTypeContainer = styled.View`
  padding: 4px 8px;

  border-radius: 3px;
  background-color: ${'#444444'};
`;

const LessonCardTypeText = styled.Text`
  color: ${'#ffffff'};
`;

export default ScheduleLessonComponent;
