import React from 'react';

import styled from 'styled-components/native';

const ScheduleNotesComponent = () => {
  return (
    <ScheduleNotesContainer>
      <ScheduleNoteSTitle>Дедлайны</ScheduleNoteSTitle>
    </ScheduleNotesContainer>
  );
};

const ScheduleNotesContainer = styled.View``;
const ScheduleNoteSTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 18px;
`;

export default ScheduleNotesComponent;
