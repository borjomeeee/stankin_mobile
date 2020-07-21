import React from 'react';
import {TouchableOpacity} from 'react-native';

import styled from 'styled-components/native';

import {ILesson} from '../models/Lesson.model';

import * as COLORS from '../utils/colors';
import {getLesonTimeFromNum} from '../utils/methods';

import CommonTagComponent from './CommonTag.component';

type ISheduleLessonComponent = {
  onClick: () => void;
};

const SheduleLessonComponent = ({
  onClick,

  type,
  title,
  groupOnLesson,
  room,
  teacher,
  num,

  ...props
}: ISheduleLessonComponent &
  ILesson &
  React.ComponentProps<typeof TouchableOpacity>) => {
  const [startTime, endTime] = getLesonTimeFromNum(num);

  const tags = [];
  if (type) {
    tags.push(type);
  }
  if (room) {
    tags.push(room);
  }
  if (teacher) {
    tags.push(teacher);
  }

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

        <LessonCardTags>
          {type.length > 0 && <LessonCardTag text={type} />}
          {room.length > 0 && <LessonCardTag text={room} />}
          {teacher.length > 0 && <LessonCardTag text={teacher} />}
        </LessonCardTags>
      </LessonCardContent>
    </LessonCardContainer>
  );
};

// Components
const LessonCardContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-content: stretch;

  border: 1px solid ${COLORS.LIGHT_GRAY};

  padding: 8px 15px 10px 10px;
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

const LessonCardTags = styled.View`
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: 9px;
`;

const LessonCardTag = styled(CommonTagComponent)`
  margin-top: 5px;
  margin-right: 5px;
`;

export default SheduleLessonComponent;
