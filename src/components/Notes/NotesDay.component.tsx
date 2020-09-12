import React from 'react';

import styled from 'styled-components/native';

import {INotCheckedNote} from '../../models/Note.model';

import {dateToDateString} from '../../utils/methods';
import CommonNotesListComponent from '../Common/Notes/CommonNotesList.component';

interface INotesDayComponent {
  currDate: Date;
  notes: INotCheckedNote[];
}

const NotesDayComponent: React.FC<INotesDayComponent> = ({currDate, notes}) => {
  if (notes.length === 0) {
    return <></>;
  }

  return (
    <NotesDayContainer>
      <NotesDayTitle>{dateToDateString(currDate)}</NotesDayTitle>

      <CommonNotesListComponent notes={notes} />
    </NotesDayContainer>
  );
};

const NotesDayContainer = styled.View`
  background-color: ${'#ffffff'};
`;
const NotesDayTitle = styled.Text`
  margin-top: 5px;
  font-family: 'Inter-Regular';

  font-size: 16px;

  color: ${'#444444'};

  margin-bottom: 5px;
`;

export default NotesDayComponent;
