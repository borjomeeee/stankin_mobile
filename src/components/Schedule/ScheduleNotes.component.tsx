import React from 'react';

import styled from 'styled-components/native';

import CommonNotesComponent from '../Common/CommonNotes.component';
import CommonNoteComponent from '../Common/CommonNote.component';

const ScheduleNotesComponent = () => {
  return (
    <ScheduleNotesComponentContainer>
      <ScheduleNotesTitle>Дедлайны</ScheduleNotesTitle>

      <ScheduleNotesContainer>
        <CommonNotesComponent noteComponent={CommonNoteComponent} />
      </ScheduleNotesContainer>
    </ScheduleNotesComponentContainer>
  );
};

const ScheduleNotesComponentContainer = styled.View``;
const ScheduleNotesTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 18px;
`;

const ScheduleNotesContainer = styled.View`
  margin-top: 30px;
`;

export default ScheduleNotesComponent;
