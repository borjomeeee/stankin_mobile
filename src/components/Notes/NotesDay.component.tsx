import React from 'react';
import * as RN from 'react-native';

import {INotCheckedNote} from '../../models/Note.model';

import CommonTextComponent from '../Common/CommonText.component';
import CommonNotesListComponent from '../Common/Notes/CommonNotesList.component';

import {dateToDateString} from '../../utils/methods';
import theme from '../../utils/theme';

interface INotesDayComponent {
  currDate: Date;
  notes: INotCheckedNote[];
}

const NotesDayComponent: React.FC<INotesDayComponent> = ({currDate, notes}) => {
  if (notes.length === 0) {
    return <></>;
  }

  const dayTitleStyles: RN.StyleProp<RN.TextStyle> = {
    fontFamily: theme.fonts.semibold.fontFamily,
    marginVertical: 5,
  };

  return (
    <RN.View>
      <CommonTextComponent style={dayTitleStyles}>
        {dateToDateString(currDate)}
      </CommonTextComponent>

      <CommonNotesListComponent notes={notes} />
    </RN.View>
  );
};
export default NotesDayComponent;
