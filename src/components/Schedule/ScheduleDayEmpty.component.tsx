import React from 'react';

import styled from 'styled-components/native';
import CommonTextComponent from '../Common/CommonText.component';

const ScheduleDayEmptyComponent = () => {
  return (
    <ScheduleEmptyDayContainer>
      <CommonTextComponent>На текущую дату пар нет</CommonTextComponent>
    </ScheduleEmptyDayContainer>
  );
};

const ScheduleEmptyDayContainer = styled.View`
  margin: 100px 0px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ScheduleDayEmptyComponent;
