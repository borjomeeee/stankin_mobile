import React from 'react';

import styled from 'styled-components/native';

import CommonToggleNoteComponent from './CommonToggleNote.component';

import {INote} from '../../models/Note.model';

import * as COLORS from '../../utils/colors';

interface ICheckedElement {
  isDone: boolean;
}

const CommonNoteComponent = ({subject, text, isChecked}: INote) => {
  return (
    <NoteContainer>
      <CommonToggleNoteComponent isDone={isChecked} size={20} />

      <NoteDataContainer>
        <NoteDataSubject numberOfLines={1} isDone={isChecked}>
          {subject}
        </NoteDataSubject>
        <NoteDataText isDone={isChecked}>{text}</NoteDataText>
      </NoteDataContainer>
    </NoteContainer>
  );
};

const NoteContainer = styled.View`
  flex-direction: row;

  align-items: center;
`;

const NoteDataContainer = styled.View`
  margin-left: 20px;
`;

const NoteDataSubject = styled.Text<ICheckedElement>`
  font-family: 'Inter-Bold';

  padding-right: 50px;
  color: ${(props) => (props.isDone ? COLORS.DARK_GRAY : COLORS.BLACK)};
`;

const NoteDataText = styled.Text<ICheckedElement>`
  font-size: 16px;

  color: ${(props) => (props.isDone ? COLORS.MEDIUM_GRAY : COLORS.BLACK)};
  text-decoration: ${(props) => (props.isDone ? 'line-through' : 'none')};
`;

export default CommonNoteComponent;
