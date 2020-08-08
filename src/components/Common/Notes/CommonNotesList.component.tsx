import React from 'react';
import {connect, ConnectedProps} from 'react-redux';

import {SwipeListView} from 'react-native-swipe-list-view';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {INote} from '../../../models/Note.model';

import CommonNoteComponent from './CommonNote.component';
import CommonEmptyContainerComponent from '../CommonEmptyContainer.component';

import * as COLORS from '../../../utils/colors';

import {
  toggleIsCheckNoteAction,
  removeNoteAction,
} from '../../../actions/Notes.actions';
import CommonSwipeableItemComponent from '../CommonSwipeableItem.component';

interface ICommonNotesListComponent extends ConnectedProps<typeof connector> {
  notes: INote[];
}

const CommonNotesListComponent: React.FC<ICommonNotesListComponent> = ({
  notes,

  onToggleNote,
  onRemoveNote,
}) => {
  const onClickNotesListItem = (noteId: string) => {
    onToggleNote(noteId);
  };

  const onRemoveNotesListItem = (noteId: string) => {
    onRemoveNote(noteId);
  };

  const renderNoteItem = (note: INote) => {
    return (
      <CommonSwipeableItemComponent key={note.id}>
        <CommonNoteComponent onClick={onClickNotesListItem} {...note} />
      </CommonSwipeableItemComponent>
    );
  };

  if (notes.length === 0) {
    return (
      <CommonEmptyContainerComponent
        text={'На текущую дату нет ни одного дедлайна '}
      />
    );
  }

  return (
    <SwipeListView
      useFlatList={true}
      data={notes}
      keyExtractor={(item: INote) => item.id}
      renderItem={({item}: {item: INote}) => renderNoteItem(item)}
      ItemSeparatorComponent={() => <ItemSeparator />}
      renderHiddenItem={(rowKey) => (
        <HiddenTrashContainer
          onPress={onRemoveNotesListItem.bind(null, rowKey.item.id)}>
          <Icon name="delete" color={COLORS.WHITE} size={25} />
        </HiddenTrashContainer>
      )}
      rightOpenValue={-45}
      disableRightSwipe
    />
  );
};

const ItemSeparator = styled.View`
  height: 1px;
  background-color: ${COLORS.LIGHT_GRAY};
`;

const HiddenTrashContainer = styled.TouchableOpacity`
  background-color: ${COLORS.RED};
  height: 100%;

  align-items: flex-end;
  justify-content: center;

  padding-right: 10px;
`;

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onToggleNote: (id: string) => toggleIsCheckNoteAction(id),
  onRemoveNote: (id: string) => removeNoteAction(id),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CommonNotesListComponent);
