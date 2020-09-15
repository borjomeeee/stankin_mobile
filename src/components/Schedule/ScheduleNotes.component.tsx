import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import * as RN from 'react-native';

import CommonNotesListComponent from '../Common/Notes/CommonNotesList.component';

import {IInitialState} from '../../redux/store';
import CommonEmptyContainerComponent from '../Common/CommonEmptyContainer.component';
import CommonTextComponent from '../Common/CommonText.component';

import theme from '../../utils/theme';
import styles from './ScheduleNotes.styles';

interface IScheduleNotesComponent extends ConnectedProps<typeof connector> {
  currDate: Date;
}

const ScheduleNotesComponent: React.FC<IScheduleNotesComponent> = ({
  currDate,
  notes,
}) => {
  const notesForCurrDate = notes.get(currDate.getTime()) || [];

  return (
    <RN.View style={styles.container}>
      <CommonTextComponent
        style={{
          fontFamily: theme.fonts.semibold.fontFamily,
          fontSize: theme.fonts.size.large,
        }}>
        Дедлайны
      </CommonTextComponent>

      <RN.View style={styles.notes}>
        <CommonNotesListComponent
          notes={notesForCurrDate}
          emptyContainer={
            <CommonEmptyContainerComponent text="На текущую дату дедлайнов нет" />
          }
        />
      </RN.View>
    </RN.View>
  );
};

const mapStateTopProps = (state: IInitialState) => ({
  notes: state.notes,
});

const mapDispatchToProps = {};

const connector = connect(mapStateTopProps, mapDispatchToProps);

export default connector(ScheduleNotesComponent);
