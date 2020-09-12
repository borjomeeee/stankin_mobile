import React from 'react';
import {FlatButton} from 'react-native-material-kit';

import 'moment';
import 'moment/locale/ru';
import moment from 'moment-timezone';

moment().locale('ru');

import Calendar from 'react-native-calendar-strip';

// @ts-ignore
const CalendarStrip: React.Element = Calendar;

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {compareDates, dateToDateString} from '../../utils/methods';

interface IScheduleCalendarComponent
  extends React.ComponentProps<typeof Calendar> {
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
  todayDate,
  currDate,
  startDate,
  setCurrDate,
  onBack,

  forwardedRef,

  ...props
}) => {
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
              <ScheduleRightDateIcon onTouchEnd={onBack}>
                <Icon name="arrow-back" size={18} color={'#444444'} />
              </ScheduleRightDateIcon>

              <ScheduleRightDateText>
                {namedDates[datesDiff.toString()]?.label || ''}
              </ScheduleRightDateText>
            </React.Fragment>
          )}
        </ScheduleRightDateContainer>

        <ScheduleLeftDateContainer>
          <ScheduleLeftDateText>
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
        calendarHeaderStyle={{
          textTransform: 'capitalize',
          fontFamily: 'Inter-Bold',
          fontWeight: 'normal',

          alignSelf: 'flex-end',

          color: 'lightgrey',
        }}
        iconStyle={{width: 0}}
        dayComponent={(props: any) => (
          <ScheduleCalendarOption key={new Date(props.date).getTime()}>
            <ScheduleCalendarOptionLabel>
              {dates[new Date(props.date).getDay()]}
            </ScheduleCalendarOptionLabel>
            <ScheduleCalendarOptionDateContainer
              isSelected={new Date(props.date).getTime() === currDate.getTime()}
              onTouchEnd={onChangeCurrDate.bind(null, new Date(props.date))}
              maskBorderRadius={100}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{padding: 1}}>
              <ScheduleCalendarOptionDate
                isSelected={
                  new Date(props.date).getTime() === currDate.getTime()
                }>
                {new Date(props.date).getDate()}
              </ScheduleCalendarOptionDate>
            </ScheduleCalendarOptionDateContainer>
          </ScheduleCalendarOption>
        )}
        {...props}
        style={{
          height: 90,
          marginTop: 5,
          borderTopWidth: 1,
          borderTopColor: '#e4e4e4',
        }}
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

  /* padding: 10px 0px; */
`;

const ScheduleCalendarOption = styled.View`
  display: flex;
  align-items: center;
`;

const ScheduleCalendarOptionLabel = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 14px;

  color: ${'#C4C4C4'};
`;

const ScheduleCalendarOptionDateContainer = styled(FlatButton)<{
  isSelected: boolean;
}>`
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: none;

  border-radius: 14px;

  background-color: ${(props) => (props.isSelected ? '#444444' : '#ffffff')};
`;

const ScheduleCalendarOptionDate = styled.Text<{isSelected: boolean}>`
  font-family: 'Inter-Regular';
  font-size: 16px;

  color: ${(props) => (props.isSelected ? '#ffffff' : '#000000')};
`;

const ScheduleRightDateContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;

  height: 40px;
`;

const ScheduleRightDateIcon = styled(FlatButton)`
  margin-right: 5px;
`;

const ScheduleRightDateText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 16px;

  color: ${'#444444'};
`;

const ScheduleLeftDateContainer = styled.View``;

const ScheduleLeftDateText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 16px;

  color: ${'#444444'};
`;

export default React.forwardRef((props: IScheduleCalendarComponent, ref) => {
  return <ScheduleCalendarComponent {...props} forwardedRef={ref} />;
});
