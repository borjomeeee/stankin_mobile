import React, {useState, useLayoutEffect, useRef} from 'react';
import {ScrollView, Platform} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import {ILesson} from '../models/Lesson.model';

import {LessonGroup} from '../enums/Lesson.enums';

import CommonHeaderIconComponent from '../components/CommonHeaderIcon.component';
import ScheduleDayComponent from '../components/ScheduleDay.component';

import {ScreenContainer} from '../utils/theme';
import ScheduleCalendarComponent from '../components/ScheduleCalendar/ScheduleCalendar.component';

interface IScheduleDay {
  key: string;
  data: ILesson;
}

const SсheduleScreen = ({schedule, user}: ConnectedProps<typeof connector>) => {
  const navigation = useNavigation();

  // Datepicker
  const [showDatepicker, setShowDatepicker] = useState(false);

  const [startDate] = useState<Date>(new Date());
  const [currPageDate, setCurrPageDate] = useState<Date>(new Date());

  const listLessonsRef = useRef<ScrollView | null>(null);

  const onChangeCurrPageDate = (_: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || currPageDate;

    setShowDatepicker(Platform.OS === 'ios');
    setCurrPageDate(currentDate);

    listLessonsRef.current!.scrollTo({x: 0, y: 0, animated: true});
  };

  // Set header icon and title
  useLayoutEffect(() => {
    const toggleShowDatepicker = () => {
      setShowDatepicker(!showDatepicker);
    };

    navigation.setOptions({
      headerRight: () => (
        <CommonHeaderIconComponent onPress={toggleShowDatepicker}>
          <Icon name="event" color={'#444444'} size={25} />
        </CommonHeaderIconComponent>
      ),
    });
  }, [navigation, showDatepicker]);

  const lessons = (
    schedule.get(
      new Date(
        currPageDate.getFullYear(),
        currPageDate.getMonth(),
        currPageDate.getDate(),
      ).getTime(),
    ) || []
  ).filter(
    (lesson: ILesson) =>
      user.lessonGroup === LessonGroup.NONE ||
      lesson.groupOnLesson === LessonGroup.NONE ||
      lesson.groupOnLesson === user.lessonGroup,
  );
  // .map((val: ILesson) => ({key: val.id, data: val} as IScheduleDay));

  return (
    <ScreenContainer>
      <ScheduleScreenContent
        showsVerticalScrollIndicator={false}
        ref={listLessonsRef}>
        <ScheduleCalendarComponent
          todayDate={startDate}
          currDate={currPageDate}
          setCurrDate={setCurrPageDate}
        />

        <ScheduleContentEmpty />

        {/* <FlatList
          data={scheduleDays}
          keyExtractor={(item: IScheduleDay) => item.key}
          renderItem={renderScheduleDay}
          ItemSeparatorComponent={DaySeparator}
        /> */}
        <ScheduleDayComponent lessons={lessons} />

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
  margin-bottom: 30px;
`;

const ScheduleContentEmpty = styled.View`
  height: 30px;
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
