import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import CommonButtonComponent from '../components/Common/CommonButton.component';
import CommonNotesListComponent from '../components/Common/Notes/CommonNotesList.component';
import CommonEmptyContainerComponent from '../components/Common/CommonEmptyContainer.component';

import NotesNotCheckedListComponent from '../components/Notes/NotesNotCheckedList.component';

import {ScreenContainer} from '../utils/theme';

import {toggleIsCheckNoteAction} from '../actions/Notes.actions';

import {INotCheckedNote, INote} from '../models/Note.model';

const NotesScreen: React.FC<ConnectedProps<typeof connector>> = ({notes}) => {
  const navigation = useNavigation();

  const goAddNoteScreen = () => {
    navigation.navigate('AddNote');
  };

  const notCheckedNotes = Array.from(notes.entries())
    .map(([dateTimestamp, dayNotes]: [number, INote[]]): [
      number,
      INotCheckedNote[],
    ] => [
      dateTimestamp,
      dayNotes.filter((note: INote) => !note.isChecked) as INotCheckedNote[],
    ])
    .filter((value: [number, INotCheckedNote[]]) => value[1].length > 0);

  const checkedNotes = Array.from(notes.entries()).reduce(
    (acc: INote[], [, dayNotes]: [number, INote[]]) => [
      ...acc,
      ...dayNotes.filter((note: INote) => note.isChecked),
    ],
    [],
  );

  return (
    <ScreenContainer>
      <NotesContent showsVerticalScrollIndicator={false}>
        {notCheckedNotes.length === 0 && (
          <CommonEmptyContainerComponent text="Пока у вас не запланировано ни одного дедлайна" />
        )}

        <NotesNotCheckedListComponent notes={notCheckedNotes} />

        {checkedNotes.length > 0 && (
          <CompletedTasksTitle>Выполненные</CompletedTasksTitle>
        )}

        <CommonNotesListComponent notes={checkedNotes} />
      </NotesContent>

      <NotesScreenSubmit>
        <CommonButtonComponent
          text="Добавить дедлайн"
          onClick={goAddNoteScreen}
        />
      </NotesScreenSubmit>
    </ScreenContainer>
  );
};

// Components
const NotesContent = styled.ScrollView`
  margin-top: 10px;
`;
const NotesScreenSubmit = styled.View`
  margin: 20px 0px;
  align-items: center;
`;

const CompletedTasksTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;

  margin: 20px 0px;
`;

// State
const mapStateToProps = (state: IInitialState) => ({
  notes: state.notes,
});

const mapDispatchToProps = {
  toggleDoneNote: (id: string) => toggleIsCheckNoteAction(id),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NotesScreen);
