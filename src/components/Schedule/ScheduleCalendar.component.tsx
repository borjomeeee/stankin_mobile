import React from 'react';

import {Text, IconButton} from 'react-native-paper';
import {FlatButton} from 'react-native-material-kit';

import 'moment';
import 'moment/locale/ru';
import moment from 'moment-timezone';

moment().locale('ru');

import Calendar from 'react-native-calendar-strip';

// @ts-ignore
const CalendarStrip: React.Element = Calendar;

import styled from 'styled-components/native';

import {compareDates, dateToDateString} from '../../utils/methods';
import {StyleProp, TextStyle} from 'react-native';

interface IScheduleCalendarComponent
  extends React.ComponentProps<typeof Calendar> {
  theme: ReactNativePaper.Theme;
  todayDate: Date;
  currDate: Date;
  startDate: Date;
  setCurrDate: (newDate: Date) => void;
  onBack: () => void;
}

interface INamedDates {
  [index: string]: {timestamp: number; label: string; backButton: boolean};
}

const ScheduleCalendarComponent: React.FC<
  IScheduleCalendarComponent & {
    forwardedRef: React.Ref<typeof CalendarStrip>;
  }
> = ({
  theme,

  todayDate,
  currDate,
  startDate,
  setCurrDate,
  onBack,

  forwardedRef,

  ...props
}) => {
  // Calendar options
  const calendarHeaderStyle = {
    textTransform: 'capitalize',
    fontFamily: 'Inter-Bold',
    fontWeight: 'normal',

    alignSelf: 'flex-end',

    color: 'lightgrey',
  };

  const iconStyle = {width: 0};

  const calendarStyles = {
    height: 90,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: theme.colors.accent,
  };

  const scheduleCalendarOptionLabelStyles: StyleProp<TextStyle> = {
    color: theme.colors.darkGray,
  };

  const scheduleRightDateTextStyles: StyleProp<TextStyle> = {
    color: theme.colors.primary,
  };

  const startDayOfWeek = currDate.getDay() === 0 ? 7 : currDate.getDay();
  const calendarStartDate = new Date(currDate);

  calendarStartDate.setDate(calendarStartDate.getDate() - startDayOfWeek + 1);

  const dates = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const onChangeCurrDate = (newDate: Date) => {
    setCurrDate(newDate);
  };

  const tommorrowTimestamp = todayDate.getTime() + 86400;
  const yesterdayTimestamp = todayDate.getTime() - 86400;

  const namedDates: INamedDates = {
    '1': {
      timestamp: yesterdayTimestamp,
      label: 'Вчера',
      backButton: true,
    },
    '-1': {
      timestamp: tommorrowTimestamp,
      label: 'Завтра',
      backButton: true,
    },
  };

  const datesDiff = compareDates(todayDate, currDate);

  return (
    <ScheduleCalendarContainer>
      <ScheduleCalendarTopLine>
        <ScheduleRightDateContainer>
          {datesDiff === 0 ? (
            <ScheduleRightDateText>Сегодня</ScheduleRightDateText>
          ) : (
            <React.Fragment>
              <ScheduleRightDateIcon
                icon="arrow-left"
                size={18}
                color={theme.colors.primary}
                onPress={onBack}
              />

              <ScheduleRightDateText style={scheduleRightDateTextStyles}>
                {namedDates[datesDiff.toString()]?.label || ''}
              </ScheduleRightDateText>
            </React.Fragment>
          )}
        </ScheduleRightDateContainer>

        <ScheduleLeftDateContainer>
          <ScheduleLeftDateText style={scheduleRightDateTextStyles}>
            {dateToDateString(currDate)}
          </ScheduleLeftDateText>
        </ScheduleLeftDateContainer>
      </ScheduleCalendarTopLine>

      <CalendarStrip
        ref={forwardedRef}
        scrollable={true}
        shouldAllowFontScaling={false}
        iconRight={null}
        iconLeft={null}
        startingDate={startDate}
        selectedDate={currDate}
        calendarHeaderFormat={'MMMM YYYY'}
        calendarHeaderPosition={'below'}
        onDateSelected={(date: Date) => onChangeCurrDate(new Date(date))}
        calendarHeaderStyle={calendarHeaderStyle}
        iconStyle={iconStyle}
        dayComponent={(calProps: any) => (
          <ScheduleCalendarOption key={new Date(calProps.date).getTime()}>
            <ScheduleCalendarOptionLabel
              style={scheduleCalendarOptionLabelStyles}>
              {dates[new Date(calProps.date).getDay()]}
            </ScheduleCalendarOptionLabel>
            <ScheduleCalendarOptionDateContainer
              style={{
                backgroundColor:
                  new Date(calProps.date).getTime() === currDate.getTime()
                    ? theme.colors.primary
                    : theme.colors.white,
              }}
              onTouchEnd={onChangeCurrDate.bind(null, new Date(calProps.date))}
              maskBorderRadius={100}>
              <ScheduleCalendarOptionDate
                style={{
                  color:
                    new Date(calProps.date).getTime() === currDate.getTime()
                      ? theme.colors.white
                      : theme.colors.black,
                }}>
                {new Date(calProps.date).getDate()}
              </ScheduleCalendarOptionDate>
            </ScheduleCalendarOptionDateContainer>
          </ScheduleCalendarOption>
        )}
        {...props}
        style={calendarStyles}
      />
    </ScheduleCalendarContainer>
  );
};

const ScheduleCalendarContainer = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ScheduleCalendarTopLine = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ScheduleCalendarOption = styled.View`
  display: flex;
  align-items: center;
`;

const ScheduleCalendarOptionLabel = styled(Text)``;

const ScheduleCalendarOptionDateContainer = styled(FlatButton)`
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1px;

  box-shadow: none;

  border-radius: 14px;
`;

const ScheduleCalendarOptionDate = styled(Text)`
  font-size: 16px;
`;

const ScheduleRightDateContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;

  height: 40px;
`;

const ScheduleRightDateIcon = styled(IconButton)`
  margin-right: 5px;
`;

const ScheduleRightDateText = styled(Text)`
  font-size: 16px;
`;

const ScheduleLeftDateContainer = styled.View``;

const ScheduleLeftDateText = styled(Text)`
  font-size: 16px;
`;

export default React.forwardRef((props: IScheduleCalendarComponent, ref) => {
  return <ScheduleCalendarComponent {...props} forwardedRef={ref} />;
});

/**
 *
 */
