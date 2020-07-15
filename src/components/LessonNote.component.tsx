import React from 'react';

import styled from 'styled-components/native';

import {INote} from '../models/Note.model';
import CommonToggleNoteComponent from './CommonToggleNote.component';

const LessonNoteComponent = ({text, isChecked}: INote) => {
  return (
    <NoteContainer>
      <CommonToggleNoteComponent isDone={isChecked} size={20} />

      <NoteText>{text}</NoteText>
    </NoteContainer>
  );
};

const NoteContainer = styled.View`
  flex-direction: row;
`;

const NoteText = styled.Text`
  margin-left: 20px;
`;

export default LessonNoteComponent;
