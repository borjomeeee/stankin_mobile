import React from 'react';

import styled from 'styled-components/native';

import CommonToggleNoteComponent from './CommonToggleNote.component';

import {INote} from '../models/Note.model';

import * as COLORS from '../utils/colors';

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
  background-color: ${COLORS.WHITE};
`;

const NoteText = styled.Text`
  margin-left: 20px;
`;

export default LessonNoteComponent;
