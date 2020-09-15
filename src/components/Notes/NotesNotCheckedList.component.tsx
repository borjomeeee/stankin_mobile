import React from 'react';
import * as RN from 'react-native';

import {INotCheckedNote} from '../../models/Note.model';

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

  const separatorStyles: RN.StyleProp<RN.ViewStyle> = {
    height: 10,
  };

  return (
    <RN.FlatList
      data={data}
      keyExtractor={(item: INotesNotCheckedListItem) => item[0].toString()}
      renderItem={({item}: {item: INotesNotCheckedListItem}) =>
        renderNotesDay(...item)
      }
      ItemSeparatorComponent={() => <RN.View style={separatorStyles} />}
    />
  );
};

export default NotesNotCheckedListComponent;
