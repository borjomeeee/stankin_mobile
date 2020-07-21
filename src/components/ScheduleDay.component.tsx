import React from 'react';
import {FlatList} from 'react-native';

import styled from 'styled-components/native';

import SheduleLessonComponent from './SheduleLesson.component';
import ScheduleDayEmptyComponent from './ScheduleDayEmpty.component';

import {ILesson} from '../models/Lesson.model';

import {dateToDateString} from '../utils/methods';
import {useNavigation} from '@react-navigation/native';

interface IScheduleDayComponent {
  lessons: ILesson[];
  date: Date;
}

const ScheduleDayComponent = ({lessons, date}: IScheduleDayComponent) => {
  const navigation = useNavigation();

  const onClickLesson = (lesson: ILesson) => {
    navigation.navigate('Lesson', {lesson});
  };

  const renderScheduleDayLesson = ({item}: {item: ILesson}) => {
    return (
      <SheduleLessonComponent
        {...item}
        onClick={onClickLesson.bind(null, item)}
      />
    );
  };

  return (
    <>
      <DayTitle>{dateToDateString(date)}</DayTitle>

      {Array.isArray(lessons) && lessons.length > 0 ? (
        <FlatList
          data={lessons}
          keyExtractor={(item: ILesson) => item.id}
          renderItem={renderScheduleDayLesson}
          ItemSeparatorComponent={LessonSeparator}
        />
      ) : (
        <ScheduleDayEmptyComponent text="Пар нет" />
      )}
    </>
  );
};

const DayTitle = styled.Text`
  font-size: 18px;

  margin-bottom: 15px;

  text-decoration: underline;
`;

const LessonSeparator = styled.View`
  height: 5px;
`;

export default ScheduleDayComponent;
