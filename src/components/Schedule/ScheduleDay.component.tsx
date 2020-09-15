import React from 'react';
import * as RN from 'react-native';

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

  const renderSeparator = () => {
    return <RN.View style={{height: 5}} />;
  };

  return (
    <>
      {lessons.length > 0 ? (
        <RN.SafeAreaView>
          <RN.FlatList
            data={lessons}
            keyExtractor={(item: ILesson) => item.id}
            renderItem={renderScheduleDayLesson}
            ItemSeparatorComponent={renderSeparator}
          />
        </RN.SafeAreaView>
      ) : (
        <ScheduleDayEmptyComponent />
      )}
    </>
  );
};

export default ScheduleDayComponent;
