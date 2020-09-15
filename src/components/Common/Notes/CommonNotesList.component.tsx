import React from 'react';
import * as RN from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {SwipeListView} from 'react-native-swipe-list-view';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {INote} from '../../../models/Note.model';

import CommonNoteComponent from './CommonNote.component';
import CommonSwipeableItemComponent from '../CommonSwipeableItem.component';

import {
  toggleIsCheckNoteAction,
  removeNoteAction,
} from '../../../actions/Notes.actions';

import styles from './CommonNotesList.styles';
import theme from '../../../utils/theme';

interface ICommonNotesListComponent extends ConnectedProps<typeof connector> {
  notes: INote[];

  emptyContainer?: Element;
}

type IRowAnimationValues = {
  [index: string]: RN.Animated.Value;
};

const CommonNotesListComponent: React.FC<ICommonNotesListComponent> = ({
  notes,
  emptyContainer,

  onToggleNote,
  onRemoveNote,
}) => {
  const rowAnimationValues: IRowAnimationValues = notes.reduce(
    (acc: IRowAnimationValues, item: INote) => {
      acc[item.id] = new RN.Animated.Value(0);
      return acc;
    },
    {},
  );

  const onClickNotesListItem = (noteId: string) => {
    onToggleNote(noteId);
  };

  const onRemoveNotesListItem = (noteId: string) => {
    RN.Animated.parallel([
      RN.Animated.timing(rowAnimationValues[noteId], {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(onRemoveNote.bind(null, noteId));
  };

  const renderNoteItem = (note: INote) => {
    return (
      <RN.Animated.View
        style={{
          transform: [
            {
              translateX: rowAnimationValues[note.id].interpolate({
                inputRange: [0, 1],
                outputRange: [0, -RN.Dimensions.get('window').width],
              }),
            },
          ],
          height: rowAnimationValues[note.id].interpolate({
            inputRange: [0, 1],
            outputRange: [60, 0],
          }),
        }}>
        <CommonSwipeableItemComponent key={note.id}>
          <RN.Animated.View
            style={{
              opacity: rowAnimationValues[note.id].interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 0, 0],
              }),
            }}>
            <CommonNoteComponent onClick={onClickNotesListItem} {...note} />
          </RN.Animated.View>
        </CommonSwipeableItemComponent>
      </RN.Animated.View>
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
      ItemSeparatorComponent={() => <RN.View style={styles.separator} />}
      renderHiddenItem={(rowKey) => (
        <RN.TouchableOpacity
          delayPressIn={0}
          activeOpacity={0.8}
          style={styles.noteContainer}
          onPress={onRemoveNotesListItem.bind(null, rowKey.item.id)}>
          <Icon name="delete" color={theme.colors.primary.white} size={25} />
        </RN.TouchableOpacity>
      )}
      rightOpenValue={-45}
      disableRightSwipe
      useNativeDriver={false}
    />
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onToggleNote: (id: string) => toggleIsCheckNoteAction(id),
  onRemoveNote: (id: string) => removeNoteAction(id),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CommonNotesListComponent);
