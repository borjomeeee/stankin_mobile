import React from 'react';
import {Dimensions} from 'react-native';
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
import {Animated} from 'react-native';

interface ICommonNotesListComponent extends ConnectedProps<typeof connector> {
  notes: INote[];
}

type IRowAnimationValues = {
  [index: string]: Animated.Value;
};

const CommonNotesListComponent: React.FC<ICommonNotesListComponent> = ({
  notes,

  onToggleNote,
  onRemoveNote,
}) => {
  const rowOpacityAnimationValues: IRowAnimationValues = notes.reduce(
    (acc: IRowAnimationValues, item: INote) => {
      acc[item.id] = new Animated.Value(1);
      return acc;
    },
    {},
  );
  const rowTranslateXAnimationValues: IRowAnimationValues = notes.reduce(
    (acc: IRowAnimationValues, item: INote) => {
      acc[item.id] = new Animated.Value(0);
      return acc;
    },
    {},
  );

  const rowHeightAnimationValues: IRowAnimationValues = notes.reduce(
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
      Animated.timing(rowOpacityAnimationValues[noteId], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rowTranslateXAnimationValues[noteId], {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(rowHeightAnimationValues[noteId], {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start(onRemoveNote.bind(null, noteId));
  };

  const renderNoteItem = (note: INote) => {
    return (
      <Animated.View
        style={{
          height: rowHeightAnimationValues[note.id].interpolate({
            inputRange: [0, 1],
            outputRange: [55, 0],
          }),
        }}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: rowTranslateXAnimationValues[note.id].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -Dimensions.get('window').width],
                }),
              },
            ],
          }}>
          <CommonSwipeableItemComponent key={note.id}>
            <Animated.View
              style={{
                opacity: rowOpacityAnimationValues[note.id],
              }}>
              <CommonNoteComponent onClick={onClickNotesListItem} {...note} />
            </Animated.View>
          </CommonSwipeableItemComponent>
        </Animated.View>
      </Animated.View>
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
