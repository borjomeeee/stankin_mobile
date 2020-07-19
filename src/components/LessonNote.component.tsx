import React from 'react';

import styled from 'styled-components/native';

import CommonToggleNoteComponent from './CommonToggleNote.component';

import {INote} from '../models/Note.model';

import * as COLORS from '../utils/colors';

interface INoteTextProps {
  isDone: boolean;
}

const LessonNoteComponent = ({text, isChecked}: INote) => {
  return (
    <NoteContainer>
      <CommonToggleNoteComponent isDone={isChecked} size={20} />

      <NoteText isDone={isChecked}>{text}</NoteText>
    </NoteContainer>
  );
};

const NoteContainer = styled.View`
  flex-direction: row;
  background-color: ${COLORS.WHITE};
`;

const NoteText = styled.Text<INoteTextProps>`
  margin-left: 20px;

  color: ${(props) => (props.isDone ? COLORS.MEDIUM_GRAY : COLORS.BLACK)};
  text-decoration: ${(props) => (props.isDone ? 'line-through' : 'none')};
`;

export default LessonNoteComponent;
