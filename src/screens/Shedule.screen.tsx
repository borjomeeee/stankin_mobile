import React, {useState, useMemo, useLayoutEffect, useRef} from 'react';
import {ScrollView, Platform} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {ILesson} from '../models/Lesson.model';

import {LessonGroup} from '../enums/Lesson.enums';

import ScheduleEmptyDayComponent from '../components/ScheduleDayEmpty.component';
import SheduleLessonComponent from '../components/SheduleLesson.component';
import CommonHeaderIconComponent from '../components/CommonHeaderIcon.component';

import * as COLORS from '../utils/colors';
import {dateToDateString, getRangeDates} from '../utils/methods';
import {ScreenContainer} from '../utils/theme';

interface IDayTitleProps {
  isFirst: boolean;
}

interface ILessonBlockProps {
  isFirst: boolean;
}

const SheduleScreen = ({schedule, user}: ConnectedProps<typeof connector>) => {
  const navigation = useNavigation();

  // Datepicker
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const listLessonsRef = useRef<ScrollView | null>(null);

  const onChange = (_: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;

    setShowDatepicker(Platform.OS === 'ios');
    setStartDate(currentDate);

    listLessonsRef.current!.scrollTo({x: 0, y: 0, animated: true});
  };

  // Set header icon and title
  useLayoutEffect(() => {
    const toggleShowDatepicker = () => {
      setShowDatepicker(!showDatepicker);
    };

    navigation.setOptions({
      headerTitle: user.group.title.toUpperCase(),
      headerRight: () => (
        <CommonHeaderIconComponent onPress={toggleShowDatepicker}>
          <Icon name="today" color={COLORS.BLACK} size={25} />
        </CommonHeaderIconComponent>
      ),
    });
  }, [navigation, showDatepicker, user.group.title]);

  // Dates for display
  const currDateRange = useMemo(
    () =>
      getRangeDates(startDate).map((date: Date) => {
        const currDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );
        return currDate.getTime();
      }),
    [startDate],
  );

  const onClickLessonBlock = (lesson: ILesson) => {
    navigation.navigate('Lesson', {lesson});
  };

  return (
    <ScreenContainer>
      <ScheduleScreenContent
        showsVerticalScrollIndicator={false}
        ref={listLessonsRef}>
        {currDateRange.map((date: number, index: number) => {
          const lessons = (schedule.get(date) || []).filter(
            (lesson: ILesson) =>
              user.lessonGroup === LessonGroup.NONE ||
              lesson.groupOnLesson === LessonGroup.NONE ||
              lesson.groupOnLesson === user.lessonGroup,
          );

          const currDate = new Date(date);

          return (
            <React.Fragment key={date}>
              <DayTitle isFirst={index === 0}>
                {dateToDateString(currDate)}
              </DayTitle>

              {/* Why not working bind in navigate??? */}
              {Array.isArray(lessons) && lessons.length > 0 ? (
                lessons.map((ls: ILesson, indx: number) => (
                  <LessonBlock
                    key={ls.id}
                    isFirst={indx === 0}
                    onClick={onClickLessonBlock.bind(null, ls)}
                    {...ls}
                  />
                ))
              ) : (
                <ScheduleEmptyDayComponent key={date} text="Пар нет" />
              )}
            </React.Fragment>
          );
        })}

        {showDatepicker && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={startDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </ScheduleScreenContent>
    </ScreenContainer>
  );
};

// Components
const ScheduleScreenContent = styled.ScrollView`
  margin-top: 10px;
  margin-bottom: 30px;
`;

const DayTitle = styled.Text<IDayTitleProps>`
  font-size: 18px;

  padding-top: ${(props) => (props.isFirst ? '0px' : '15px')};
  padding-bottom: 15px;

  text-decoration: underline;
`;

const LessonBlock = styled(SheduleLessonComponent)<ILessonBlockProps>`
  margin-top: ${(props) => (props.isFirst ? '0px' : '8px')};
`;

// State
const mapStateToProps = (state: IInitialState) => ({
  app: state.app,
  schedule: state.schedule,
  user: state.user,
});

const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SheduleScreen);
