import React from 'react';

import styled from 'styled-components/native';

import {ILesson} from '../../models/Lesson.model';

import * as COLORS from '../../utils/colors';
import {getLesonTimeFromNum} from '../../utils/methods';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ScheduleLessonComponent: React.FC<ILesson> = ({
  type,
  title,
  groupOnLesson,
  room,
  teacher,
  num,
}) => {
  const [startTime, endTime] = getLesonTimeFromNum(num);

  return (
    <LessonCardContainer>
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

          {type.length > 0 && (
            <LessonCardTypeContainer>
              <LessonCardTypeText>{type}</LessonCardTypeText>

              <LessonCardTypeBgComponent />
            </LessonCardTypeContainer>
          )}
        </LessonCardBottomContainer>
      </LessonCardContent>
    </LessonCardContainer>
  );
};

// Components
const LessonCardContainer = styled.View`
  flex-direction: row;
  align-content: stretch;

  border: 1px solid ${'#E4E4E4'};
  border-radius: 5px;

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
  font-family: 'Inter-Regular';
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
  font-family: 'Inter-Regular';
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
  position: relative;

  padding: 4px 8px;

  border-radius: 3px;
  background-color: ${'#444444'};
`;

const LessonCardTypeText = styled.Text`
  font-family: 'Inter-Bold';
  color: ${'#ffffff'};
`;

const LessonCardTypeBgComponent = styled.View`
  position: absolute;

  top: 2px;
  bottom: -2px;
  right: -2px;
  left: 2px;

  z-index: -1;

  border: 1px solid ${'#444444'};
  border-radius: 3px;
`;

export default ScheduleLessonComponent;
