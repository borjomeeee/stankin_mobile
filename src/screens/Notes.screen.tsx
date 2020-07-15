import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';

import styled from 'styled-components/native';

import {INotesInitialState, IInitialState} from '../redux/store';

import CommonNotesComponent from '../components/CommonNotes.component';
import CommonNoteComponent from '../components/CommonNote.component';
import CommonButtonComponent from '../components/CommonButton.component';

import {ScreenContainer} from '../utils/theme';

import {
  toggleIsCheckNoteAction,
  saveNotesToLocalAction,
} from '../actions/Notes.actions';

const NotesScreen = ({}: ConnectedProps<typeof connector>) => {
  const navigation = useNavigation();

  const goAddNoteScreen = () => {
    navigation.navigate('AddNote');
  };

  return (
    <ScreenContainer>
      <NotesContent showsVerticalScrollIndicator={false}>
        <CommonNotesComponent noteComponent={CommonNoteComponent} />
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

// State
const mapStateToProps = (state: IInitialState) => ({
  notes: state.notes,
});

const mapDispatchToProps = {
  toggleDoneNote: (id: string) => toggleIsCheckNoteAction(id),
  saveNotes: (notes: INotesInitialState) => saveNotesToLocalAction(notes),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NotesScreen);
