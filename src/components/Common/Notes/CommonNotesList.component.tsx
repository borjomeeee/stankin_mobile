import React from 'react';
import {Dimensions, Animated} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {SwipeListView} from 'react-native-swipe-list-view';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {INote} from '../../../models/Note.model';

import CommonNoteComponent from './CommonNote.component';
import CommonSwipeableItemComponent from '../CommonSwipeableItem.component';

import * as COLORS from '../../../utils/colors';

import {
  toggleIsCheckNoteAction,
  removeNoteAction,
} from '../../../actions/Notes.actions';

interface ICommonNotesListComponent extends ConnectedProps<typeof connector> {
  notes: INote[];

  emptyContainer?: Element;
}

type IRowAnimationValues = {
  [index: string]: Animated.Value;
};

const CommonNotesListComponent: React.FC<ICommonNotesListComponent> = ({
  notes,
  emptyContainer,

  onToggleNote,
  onRemoveNote,
}) => {
  const rowAnimationValues: IRowAnimationValues = notes.reduce(
    (acc: IRowAnimationValues, item: INote) => {
      acc[item.id] = new Animated.Value(0);
      return acc;
    },
    {},
  );

  const onClickNotesListItem = (noteId: string) => {
    onToggleNote(noteId);
  };

  const onRemoveNotesListItem = (noteId: string) => {
    Animated.parallel([
      Animated.timing(rowAnimationValues[noteId], {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(onRemoveNote.bind(null, noteId));
  };

  const renderNoteItem = (note: INote) => {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX: rowAnimationValues[note.id].interpolate({
                inputRange: [0, 1],
                outputRange: [0, -Dimensions.get('window').width],
              }),
            },
          ],
          height: rowAnimationValues[note.id].interpolate({
            inputRange: [0, 1],
            outputRange: [55, 0],
          }),
        }}>
        <CommonSwipeableItemComponent key={note.id}>
          <Animated.View
            style={{
              opacity: rowAnimationValues[note.id].interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0, 0],
              }),
            }}>
            <CommonNoteComponent onClick={onClickNotesListItem} {...note} />
          </Animated.View>
        </CommonSwipeableItemComponent>
      </Animated.View>
    );
  };

  if (notes.length === 0) {
    return <>{emptyContainer}</>;
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
      useNativeDriver={false}
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
