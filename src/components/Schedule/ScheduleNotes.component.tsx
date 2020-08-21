import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import styled from 'styled-components/native';

import CommonNotesListComponent from '../Common/Notes/CommonNotesList.component';

import {IInitialState} from '../../redux/store';
import CommonEmptyContainerComponent from '../Common/CommonEmptyContainer.component';

interface IScheduleNotesComponent extends ConnectedProps<typeof connector> {
  currDate: Date;
}

const ScheduleNotesComponent: React.FC<IScheduleNotesComponent> = ({
  currDate,
  notes,
}) => {
  const notesForCurrDate = notes.get(currDate.getTime()) || [];

  return (
    <ScheduleNotesComponentContainer>
      <ScheduleNotesTitle>Дедлайны</ScheduleNotesTitle>

      <ScheduleNotesContainer>
        <CommonNotesListComponent
          notes={notesForCurrDate}
          emptyContainer={
            <CommonEmptyContainerComponent text="На текущую дату у вас нет ни одного дедлайна" />
          }
        />
      </ScheduleNotesContainer>
    </ScheduleNotesComponentContainer>
  );
};

const ScheduleNotesComponentContainer = styled.View``;
const ScheduleNotesTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 18px;

  margin-top: 20px;
  margin-bottom: 10px;
`;

const ScheduleNotesContainer = styled.View`
  margin-top: 10px;
`;

const mapStateTopProps = (state: IInitialState) => ({
  notes: state.notes,
});

const mapDispatchToProps = {};

const connector = connect(mapStateTopProps, mapDispatchToProps);

export default connector(ScheduleNotesComponent);
