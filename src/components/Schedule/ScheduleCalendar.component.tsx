import React from 'react';

import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {compareDates, dateToDateString} from '../../utils/methods';

interface IScheduleCalendarComponent {
  todayDate: Date;
  currDate: Date;
  setCurrDate: (newDate: Date) => void;
}

interface IScheduleCalendarDay {
  label: string;
  date: Date;
}

interface INamedDate {
  timestamp: number;
  label: string;
  backButton: boolean;
}

const ScheduleCalendarComponent: React.FC<IScheduleCalendarComponent> = ({
  todayDate,
  currDate,
  setCurrDate,
}) => {
  const startDayOfWeek = currDate.getDay() === 0 ? 7 : currDate.getDay();
  const calendarStartDate = new Date(currDate);

  calendarStartDate.setDate(calendarStartDate.getDate() - startDayOfWeek + 1);

  const dates = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(
    (value: string, index: number) => {
      const newDate = new Date(calendarStartDate);
      newDate.setDate(calendarStartDate.getDate() + index);

      return {
        label: value,
        date: newDate,
      } as IScheduleCalendarDay;
    },
  );

  const onChangeCurrDate = (newDate: Date) => {
    setCurrDate(newDate);
  };

  const onClickBackButton = () => {
    onChangeCurrDate(todayDate);
  };

  const tommorrowTimestamp = todayDate.getTime() + 86400;
  const yesterdayTimestamp = todayDate.getTime() - 86400;

  const namedDates = new Map<number, INamedDate>([
    [
      1,
      {
        timestamp: yesterdayTimestamp,
        label: 'Вчера',
        backButton: true,
      },
    ],
    [
      -1,
      {
        timestamp: tommorrowTimestamp,
        label: 'Завтра',
        backButton: true,
      },
    ],
  ]);

  const datesDiff = compareDates(todayDate, currDate);

  return (
    <ScheduleCalendarContainer>
      <ScheduleCalendarTopLine>
        <ScheduleRightDateContainer>
          {datesDiff === 0 ? (
            <ScheduleRightDateText>Сегодня</ScheduleRightDateText>
          ) : namedDates.has(datesDiff) ? (
            <React.Fragment>
              <ScheduleRightDateIcon onPress={onClickBackButton}>
                <Icon name="arrow-back" size={18} color={'#444444'} />
              </ScheduleRightDateIcon>
              <ScheduleRightDateText>
                {namedDates.get(datesDiff)?.label || ''}
              </ScheduleRightDateText>
            </React.Fragment>
          ) : (
            <ScheduleRightDateIcon onPress={onClickBackButton}>
              <Icon name="arrow-back" size={18} color={'#444444'} />
            </ScheduleRightDateIcon>
          )}
        </ScheduleRightDateContainer>

        <ScheduleLeftDateContainer>
          <ScheduleLeftDateText>
            {dateToDateString(currDate)}
          </ScheduleLeftDateText>
        </ScheduleLeftDateContainer>
      </ScheduleCalendarTopLine>

      <ScheduleCalendarDatesList>
        {dates.map((item: IScheduleCalendarDay) => (
          <ScheduleCalendarOption key={item.date.getTime()}>
            <ScheduleCalendarOptionLabel>
              {item.label}
            </ScheduleCalendarOptionLabel>
            <ScheduleCalendarOptionDateContainer
              isSelected={item.date.getTime() === currDate.getTime()}
              onPress={() => onChangeCurrDate(item.date)}>
              <ScheduleCalendarOptionDate
                isSelected={item.date.getTime() === currDate.getTime()}>
                {item.date.getDate()}
              </ScheduleCalendarOptionDate>
            </ScheduleCalendarOptionDateContainer>
          </ScheduleCalendarOption>
        ))}
      </ScheduleCalendarDatesList>
    </ScheduleCalendarContainer>
  );
};

const ScheduleCalendarContainer = styled.View``;

const ScheduleCalendarTopLine = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 5px;
`;

const ScheduleCalendarDatesList = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  border-top-width: 1px;
  border-top-color: ${'#E4E4E4'};

  padding-top: 10px;
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

const ScheduleCalendarOptionDateContainer = styled.TouchableOpacity<{
  isSelected: boolean;
}>`
  margin-top: 2px;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 5px;

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
`;

const ScheduleRightDateIcon = styled.TouchableOpacity`
  margin-right: 10px;
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

export default ScheduleCalendarComponent;
