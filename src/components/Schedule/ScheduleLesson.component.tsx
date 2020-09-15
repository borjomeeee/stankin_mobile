import React from 'react';
import * as RN from 'react-native';

import {ILesson} from '../../models/Lesson.model';

import {getLesonTimeFromNum} from '../../utils/methods';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CommonTextComponent from '../Common/CommonText.component';

import theme from '../../utils/theme';
import styles from './ScheduleLesson.styles';

const ScheduleLessonComponent: React.FC<ILesson> = ({
  type,
  title,
  groupOnLesson,
  room,
  teacher,
  num,
}) => {
  const [startTime, endTime] = getLesonTimeFromNum(num);

  const renderLessonOption = (iconName: string, value: string) => {
    return (
      <RN.View style={styles.optionContainer}>
        <Icon name={iconName} size={24} color={theme.colors.accent.evilGray} />

        <CommonTextComponent style={styles.optionText}>
          {value}
        </CommonTextComponent>
      </RN.View>
    );
  };

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.timeContainer}>
        <CommonTextComponent style={styles.startTime}>
          {startTime}
        </CommonTextComponent>
        <CommonTextComponent style={styles.endTime}>
          {endTime}
        </CommonTextComponent>

        {groupOnLesson.length > 0 && (
          <RN.View style={styles.groupCard}>
            <CommonTextComponent style={styles.groupCardText}>
              {groupOnLesson}
            </CommonTextComponent>
          </RN.View>
        )}
      </RN.View>

      <RN.View style={styles.mainContent}>
        <CommonTextComponent>{title}</CommonTextComponent>

        <RN.View style={styles.options}>
          <RN.View style={styles.optionsContent}>
            {room.length > 0 && renderLessonOption('map-maker', room)}

            {teacher.length > 0 &&
              renderLessonOption('school-outline', teacher)}
          </RN.View>

          {type.length > 0 && (
            <RN.View style={styles.typeContainer}>
              <CommonTextComponent style={styles.typeText}>
                {type}
              </CommonTextComponent>
            </RN.View>
          )}
        </RN.View>
      </RN.View>
    </RN.View>
  );
};

export default ScheduleLessonComponent;
