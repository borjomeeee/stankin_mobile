import React from 'react';
import {FlatList} from 'react-native';

import styled from 'styled-components/native';

import {INotCheckedNote} from '../..//models/Note.model';

import NotesDayComponent from './NotesDay.component';

type INotesNotCheckedListItem = [number, INotCheckedNote[]];

interface INotesNotCheckedListComponent {
  notes: INotesNotCheckedListItem[];
}

const NotesNotCheckedListComponent: React.FC<INotesNotCheckedListComponent> = ({
  notes,
}) => {
  const renderNotesDay = (
    currDateTimestamp: number,
    notCheckedNotes: INotCheckedNote[],
  ) => {
    return (
      <NotesDayComponent
        key={currDateTimestamp}
        currDate={new Date(currDateTimestamp)}
        notes={notCheckedNotes}
      />
    );
  };

  const data = notes.filter(
    ([, dayNotes]: INotesNotCheckedListItem) => dayNotes.length !== 0,
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item: INotesNotCheckedListItem) => item[0].toString()}
      renderItem={({item}: {item: INotesNotCheckedListItem}) =>
        renderNotesDay(...item)
      }
      ItemSeparatorComponent={() => <ItemSeparator />}
    />
  );
};

const ItemSeparator = styled.View`
  height: 10px;
`;

export default NotesNotCheckedListComponent;
