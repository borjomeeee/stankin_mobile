import React from 'react';

import styled from 'styled-components/native';

interface IScheduleCalendarComponent {
  currDate: Date;
}

interface IScheduleCalendarDay {
  label: string;
  date: Date;
}

const ScheduleCalendarComponent: React.FC<IScheduleCalendarComponent> = ({
  currDate,
}) => {
  const startDayOfWeek = currDate.getDay();
  const calendarStartDate = new Date(currDate);
  calendarStartDate.setDate(currDate.getDate() - startDayOfWeek + 1);

  const dates = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(
    (value: string, index: number) => {
      const newDate = new Date(calendarStartDate);
      newDate.setDate(newDate.getDate() + index);

      return {
        label: value,
        date: newDate,
      } as IScheduleCalendarDay;
    },
  );

  return (
    <ScheduleCalendarContainer>
      {dates.map((item: IScheduleCalendarDay) => (
        <ScheduleCalendarOption key={item.date.getTime()}>
          <ScheduleCalendarOptionLabel>
            {item.label}
          </ScheduleCalendarOptionLabel>
          <ScheduleCalendarOptionDate
            isSelect={item.date.getTime() === currDate.getTime()}>
            {item.date.getDate()}
          </ScheduleCalendarOptionDate>
        </ScheduleCalendarOption>
      ))}
    </ScheduleCalendarContainer>
  );
};

const ScheduleCalendarContainer = styled.View`
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
  font-size: 14px;
  font-family: 'Inter-Regular';

  color: ${'#C4C4C4'};
`;

const ScheduleCalendarOptionDate = styled.Text<{isSelect: boolean}>`
  font-size: 14px;
  font-family: 'Inter-Regular';

  margin-top: 2px;
  padding: 3px 8px;

  border-radius: 5px;

  background-color: ${(props) => (props.isSelect ? '#444444' : '#ffffff')};
  color: ${(props) => (props.isSelect ? '#ffffff' : '#000000')};
`;

export default ScheduleCalendarComponent;
