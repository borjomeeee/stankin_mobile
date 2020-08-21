import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';

import styled from 'styled-components/native';

import ScheduleLessonComponent from './ScheduleLesson.component';
import ScheduleDayEmptyComponent from './ScheduleDayEmpty.component';

import {ILesson} from '../../models/Lesson.model';

interface IScheduleDayComponent {
  lessons: ILesson[];
}

const ScheduleDayComponent: React.FC<IScheduleDayComponent> = ({lessons}) => {
  const renderScheduleDayLesson = ({item}: {item: ILesson}) => {
    return <ScheduleLessonComponent {...item} />;
  };

  return (
    <>
      {lessons.length > 0 ? (
        <SafeAreaView>
          <FlatList
            data={lessons}
            keyExtractor={(item: ILesson) => item.id}
            renderItem={renderScheduleDayLesson}
            ItemSeparatorComponent={LessonSeparator}
          />
        </SafeAreaView>
      ) : (
        <ScheduleDayEmptyComponent />
      )}
    </>
  );
};

const LessonSeparator = styled.View`
  height: 5px;
`;

export default ScheduleDayComponent;
