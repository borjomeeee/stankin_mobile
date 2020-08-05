import React from 'react';

import styled from 'styled-components/native';

const ScheduleDayEmptyComponent: React.FC = () => {
  return (
    <ScheduleEmptyDayContainer>
      <ScheduleEmptyDayText>На текущую дату пар нет</ScheduleEmptyDayText>
    </ScheduleEmptyDayContainer>
  );
};

const ScheduleEmptyDayContainer = styled.View`
  margin: 100px 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const ScheduleEmptyDayText = styled.Text`
  font-family: 'Inter-Regular';
  color: ${'#444444'};
`;

export default ScheduleDayEmptyComponent;
