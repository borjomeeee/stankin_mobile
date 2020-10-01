import React from 'react';
import * as RN from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';

import {IInitialState} from '../redux/store';

import CommonButtonComponent from '../components/Common/CommonButton.component';
import CommonNotesListComponent from '../components/Common/Notes/CommonNotesList.component';
import CommonEmptyContainerComponent from '../components/Common/CommonEmptyContainer.component';
import CommonTextComponent from '../components/Common/CommonText.component';

import NotesNotCheckedListComponent from '../components/Notes/NotesNotCheckedList.component';

import theme from '../utils/theme';
import styles from './Notes.styles';

import {toggleIsCheckNoteAction} from '../actions/Notes.actions';

import {INotCheckedNote, INote} from '../models/Note.model';

const NotesScreen: React.FC<ConnectedProps<typeof connector>> = ({notes}) => {
  const navigation = useNavigation();

  const goAddNoteScreen = React.useCallback(() => {
    navigation.navigate('AddNote');
  }, [navigation]);

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
    <RN.View style={[theme.screen, styles.container]}>
      <RN.ScrollView
        showsVerticalScrollIndicator={false}
        endFillColor="transtarent"
        overScrollMode="never">
        {notCheckedNotes.length === 0 && (
          <CommonEmptyContainerComponent text="Пока у вас не запланировано ни одного дедлайна" />
        )}

        <NotesNotCheckedListComponent notes={notCheckedNotes} />

        {checkedNotes.length > 0 && (
          <CommonTextComponent style={styles.title}>
            Выполненные
          </CommonTextComponent>
        )}

        <CommonNotesListComponent notes={checkedNotes} />
      </RN.ScrollView>
      <RN.View>
        <CommonButtonComponent
          text="Добавить дедлайн"
          onClick={goAddNoteScreen}
          style={styles.submit}
        />
      </RN.View>
    </RN.View>
  );
};

// State
const mapStateToProps = (state: IInitialState) => ({
  notes: state.notes,
});

const mapDispatchToProps = {
  toggleDoneNote: (id: string) => toggleIsCheckNoteAction(id),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(NotesScreen);
