import React from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components/native';

import ScheduleLessonComponent from './ScheduleLesson.component';
import ScheduleDayEmptyComponent from './ScheduleDayEmpty.component';

import {ILesson} from '../models/Lesson.model';

interface IScheduleDayComponent {
  lessons: ILesson[];
}

const ScheduleDayComponent = ({lessons}: IScheduleDayComponent) => {
  const navigation = useNavigation();

  const onClickLesson = (lesson: ILesson) => {
    navigation.navigate('Lesson', {lesson});
  };

  const renderScheduleDayLesson = ({item}: {item: ILesson}) => {
    return (
      <ScheduleLessonComponent
        {...item}
        onClick={onClickLesson.bind(null, item)}
      />
    );
  };

  return (
    <>
      {lessons.length > 0 ? (
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

const LessonSeparator = styled.View`
  height: 5px;
`;

export default ScheduleDayComponent;
