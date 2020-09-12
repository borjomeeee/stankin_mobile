import React, {useState, useLayoutEffect, useRef, useMemo} from 'react';
import {Platform} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {ILesson} from '../models/Lesson.model';

import {LessonGroup} from '../enums/Lesson.enums';

import CommonHeaderIconComponent from '../components/Common/CommonHeaderIcon.component';
import ScheduleDayComponent from '../components/Schedule/ScheduleDay.component';
import ScheduleCalendarComponent from '../components/Schedule/ScheduleCalendar.component';
import ScheduleNotesComponent from '../components/Schedule/ScheduleNotes.component';

import {ScreenContainer} from '../utils/theme';

const SсheduleScreen: React.FC<ConnectedProps<typeof connector>> = ({
  schedule,
  user,
}) => {
  const navigation = useNavigation();

  const calendarRef = useRef(null);

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

    setShowDatepicker(Platform.OS === 'ios');

    setCurrPageDate(currentDate);
    // setStartDate(currentDate);
  };

  // Set header icon and title
  useLayoutEffect(() => {
    const toggleShowDatepicker = () => {
      setShowDatepicker(!showDatepicker);
    };

    navigation.setOptions({
      headerRight: () => (
        <CommonHeaderIconComponent onTouchEnd={toggleShowDatepicker}>
          <Icon name="event" color={'#444444'} size={25} />
        </CommonHeaderIconComponent>
      ),
    });
  }, [navigation, showDatepicker]);

  const onClickBackButton = () => {
    setCurrPageDate(todayDate);
    // setStartDate(todayDate);
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
    <ScreenContainer>
      <ScheduleScreenContent showsVerticalScrollIndicator={false}>
        <ScheduleCalendarComponent
          style={{}}
          todayDate={todayDate}
          currDate={currPageDate}
          startDate={startDate}
          setCurrDate={setCurrPageDate}
          onBack={onClickBackButton}
          ref={calendarRef}
        />

        <ScheduleDayContainer>
          <ScheduleDayComponent lessons={lessons} />

          <ScheduleNotesComponent currDate={currPageDate} />
        </ScheduleDayContainer>

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
      </ScheduleScreenContent>
    </ScreenContainer>
  );
};

// Components
const ScheduleScreenContent = styled.ScrollView`
  margin-top: 10px;
  padding-bottom: 15px;
`;

const ScheduleDayContainer = styled.View`
  margin: 30px 0px;
  margin-top: 15px;
`;

// State
const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  schedule: state.schedule,
  user: state.user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SсheduleScreen);
