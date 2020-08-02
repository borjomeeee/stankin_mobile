import React from 'react';

import styled from 'styled-components/native';
import {Text} from 'react-native';

interface IScheduleCalendarComponent {
  currDate: Date;
}

const ScheduleCalendarComponent: React.FC<IScheduleCalendarComponent> = ({
  currDate,
}) => {
  const startDayOfWeek = currDate.getDay();
  const calendarStartDate = new Date(currDate);
  calendarStartDate.setDate(currDate.getDate() - startDayOfWeek + 1);

  const dates = [0, 1, 2, 3, 4, 5, 6].map((_: any, index: number) => {
    const newDate = new Date(calendarStartDate);
    newDate.setDate(newDate.getDate() + index);

    return newDate;
  });

  return (
    <ScheduleCalendarContainer>
      {dates.map((item: Date) => (
        <ScheduleCalendarOption key={item.getTime()}>
          <Text>{item.getDay()}</Text>
          <Text>{item.getDate()}</Text>
        </ScheduleCalendarOption>
      ))}
    </ScheduleCalendarContainer>
  );
};

const ScheduleCalendarContainer = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;

const ScheduleCalendarOption = styled.View``;

export default ScheduleCalendarComponent;
