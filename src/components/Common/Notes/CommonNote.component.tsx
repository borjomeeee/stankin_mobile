import React from 'react';

import styled from 'styled-components/native';

import CommonNoteToggleButton from './CommonNoteToggleButton.component';

import {INote} from '../../../models/Note.model';

import * as COLORS from '../../../utils/colors';

interface ICheckedElement {
  isDone: boolean;
}

interface ICommonNoteComponent extends INote {
  onClick: (noteId: string) => void;
}

const CommonNoteComponent: React.FC<ICommonNoteComponent> = ({
  id,

  subject,
  text,
  isChecked,

  onClick,
}) => {
  return (
    <NoteContainer onPress={onClick.bind(null, id)} delayPressIn={0}>
      <CommonNoteToggleButton isDone={isChecked} size={20} />

      <NoteDataContainer>
        <NoteDataSubject numberOfLines={1} isDone={isChecked}>
          {subject}
        </NoteDataSubject>
        <NoteDataText isDone={isChecked}>{text}</NoteDataText>
      </NoteDataContainer>
    </NoteContainer>
  );
};

const NoteContainer = styled.TouchableOpacity`
  flex-direction: row;

  align-items: center;
  background-color: ${'#ffffff'};

  padding: 8px 0px;
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
