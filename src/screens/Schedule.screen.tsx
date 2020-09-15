import React, {useState, useLayoutEffect, useMemo} from 'react';

import * as RN from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {IInitialState} from '../redux/store';

import {ILesson} from '../models/Lesson.model';
import {LessonGroup} from '../enums/Lesson.enums';

import ScheduleDayComponent from '../components/Schedule/ScheduleDay.component';
import ScheduleCalendarComponent from '../components/Schedule/ScheduleCalendar.component';
import ScheduleNotesComponent from '../components/Schedule/ScheduleNotes.component';
import ScheduleDayHeaderComponent from '../components/Schedule/ScheduleDayHeader.component';
import CommonHeaderIconComponent from '../components/Common/CommonHeaderIcon.component';

import theme from '../utils/theme';
import styles from './Schedule.styles';

const SсheduleScreen: React.FC<ConnectedProps<typeof connector>> = ({
  schedule,
  user,
}) => {
  const navigation = useNavigation();

  // Datepicker
  const [showDatepicker, setShowDatepicker] = useState(false);

  const [todayDate] = useState<Date>(() => {
    const date = new Date();

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  });

  const [startDate] = useState<Date>(todayDate);
  const [currPageDate, setCurrPageDate] = useState<Date>(todayDate);
  const onChangeCurrPageDate = (_: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || currPageDate;

    setShowDatepicker(RN.Platform.OS === 'ios');

    setCurrPageDate(currentDate);
  };

  // Set header icon and title
  useLayoutEffect(() => {
    const toggleShowDatepicker = () => {
      setShowDatepicker(!showDatepicker);
    };

    navigation.setOptions({
      headerRight: () => (
        <CommonHeaderIconComponent
          name="calendar"
          onPress={toggleShowDatepicker}
        />
      ),
    });
  }, [navigation, showDatepicker]);

  const onClickBackButton = () => {
    setCurrPageDate(todayDate);
  };

  // Get lessons for currDate and selected user group
  const lessons = useMemo(
    () =>
      (schedule.get(currPageDate.getTime()) || []).filter(
        (lesson: ILesson) =>
          user.lessonGroup === LessonGroup.NONE ||
          lesson.groupOnLesson === LessonGroup.NONE ||
          lesson.groupOnLesson === user.lessonGroup,
      ),
    [currPageDate, user.lessonGroup, schedule],
  );

  return (
    <RN.ScrollView style={[theme.screen, styles.container]}>
      <ScheduleCalendarComponent
        style={{}}
        currDate={currPageDate}
        startDate={startDate}
        setCurrDate={setCurrPageDate}
      />

      <RN.View style={[theme.screen, styles.content]}>
        <ScheduleDayHeaderComponent
          todayDate={todayDate}
          currDate={currPageDate}
          onBack={onClickBackButton}
        />

        <RN.View style={styles.day}>
          <ScheduleDayComponent lessons={lessons} />

          <ScheduleNotesComponent currDate={currPageDate} />
        </RN.View>
      </RN.View>

      {showDatepicker && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={currPageDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeCurrPageDate}
        />
      )}
    </RN.ScrollView>
  );
};

// State
const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  schedule: state.schedule,
  user: state.user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SсheduleScreen);
