import React, {useMemo, useState} from 'react';
import {View, TouchableWithoutFeedback, Animated} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {IInitialState} from '../redux/store';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView} from 'react-native-swipe-list-view';

import {toggleIsCheckNoteAction} from '../actions/Notes.actions';

import CommonNotesEmptyComponent from './CommonNotesEmpty.component';

import {INote} from '../models/Note.model';
import {ILesson} from '../models/Lesson.model';

import {dateToDateString} from '../utils/methods';
import * as COLORS from '../utils/colors';

interface ICommomNotesComponent {
  lesson?: ILesson;

  noteComponent: (props: INote) => React.ReactElement;
}

interface INotesDatedContainerProps {
  isFirst: boolean;
}

interface INotesData {
  notCheckedNotes: Map<string, INote[]>;
  checkedNotes: INote[];
}

// TODO: Сделать анимацию для удаления дедлайнов
const CommomNotesComponent = ({
  notes,
  lesson,

  onToggleNote,

  noteComponent,
  ...props
}: ICommomNotesComponent &
  ConnectedProps<typeof connector> &
  React.ComponentProps<typeof View>) => {
  const [visibleCheckedNotes, setVisibleCheckedNotes] = useState<boolean>(true);
  const successDropState = useState(new Animated.Value(1))[0];

  const NoteComponent = noteComponent;

  // TODO: Сделать все под один reduce
  const [checkedNotes, notCheckedNotes] = useMemo(() => {
    const sortByDate = (
      [dateNum1, _1]: [number, INote[]],
      [dateNum2, _2]: [number, INote[]],
    ) => (dateNum1 < dateNum2 ? -1 : 1);

    // ************ //
    const currNotes = Array.from(notes)
      .sort(sortByDate)
      .map(([dateNum, nts]: [number, INote[]]): [number, INote[]] => [
        dateNum,
        nts.filter((note: INote) => !lesson || note.subject === lesson.title),
      ])
      .filter(([_, nts]: [number, INote[]]) => nts.length > 0);

    // ************ //
    const tmpChecked = currNotes
      .map(([dateNum, nts]: [number, INote[]]): [number, INote[]] => [
        dateNum,
        nts.filter((note: INote) => note.isChecked),
      ])
      .reduce(
        (acc: INote[], [_, nts]: [number, INote[]]) => [...acc, ...nts],
        new Array<INote>(0),
      );
    // ************ //
    const notChecked = currNotes
      .filter(
        ([_, nts]: [number, INote[]]) =>
          !nts.every((note: INote) => note.isChecked),
      )
      .map(([dateNum, nts]: [number, INote[]]) => ({
        title: dateToDateString(new Date(dateNum)),
        data: nts.filter((note: INote) => !note.isChecked),
      }));

    return [tmpChecked, notChecked];
  }, [lesson, notes]);

  // Handlers
  const onToggleVisibleCheckedNotes = () => {
    let callback;
    if (visibleCheckedNotes) {
      callback = () => setVisibleCheckedNotes(!visibleCheckedNotes);
    } else {
      setVisibleCheckedNotes(!visibleCheckedNotes);
    }

    Animated.timing(successDropState, {
      toValue: +!visibleCheckedNotes,
      duration: 200,
      useNativeDriver: true,
    }).start(callback);
  };

  return (
    <NotesBlockContainer {...props}>
      <SwipeListView
        useSectionList={true}
        useAnimatedList={true}
        sections={notCheckedNotes}
        ListEmptyComponent={() => <CommonNotesEmptyComponent />}
        keyExtractor={(item: INote) => item.id}
        renderItem={({item}: {item: INote}) => (
          <NotesElement
            key={item.id}
            onPress={onToggleNote.bind(null, item.id)}>
            <NoteComponent {...item} />
          </NotesElement>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
        SectionSeparatorComponent={() => <SectionSeparator />}
        renderSectionHeader={({section: {title}}) => (
          <NotesDatedTitle>{title}</NotesDatedTitle>
        )}
        renderHiddenItem={() => (
          <HiddenTrashContainer>
            <Icon name="delete" color={COLORS.WHITE} size={25} />
          </HiddenTrashContainer>
        )}
        rightOpenValue={-45}
        disableRightSwipe
      />

      <TouchableWithoutFeedback
        onPress={onToggleVisibleCheckedNotes.bind(null)}>
        <NotesSuccessful>
          <NotesSuccessfulTtile>{`Выполненные (${checkedNotes.length})`}</NotesSuccessfulTtile>

          <NotesSuccessfulIcon>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: successDropState.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              }}>
              <Icon name="keyboard-arrow-down" color={COLORS.BLACK} size={25} />
            </Animated.View>
          </NotesSuccessfulIcon>
        </NotesSuccessful>
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          opacity: successDropState.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1],
          }),
          transform: [
            {
              translateY: successDropState.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
        }}>
        {visibleCheckedNotes &&
          checkedNotes.map((note: INote) => (
            <NotesElement
              key={note.id}
              onPress={onToggleNote.bind(null, note.id)}>
              <NoteComponent {...note} />
            </NotesElement>
          ))}
      </Animated.View>
    </NotesBlockContainer>
  );
};

// Components
const NotesBlockContainer = styled.View`
  margin-bottom: 70px;
`;

const ItemSeparator = styled.View`
  height: 1px;
  background-color: ${COLORS.LIGHT_GRAY};
`;

const SectionSeparator = styled.View`
  margin-bottom: 30px;
`;

const HiddenTrashContainer = styled.View`
  background-color: ${COLORS.RED};
  height: 100%;

  align-items: flex-end;
  justify-content: center;
  padding-right: 10px;

  /* align-items: center; */
`;

const NotesDatedTitle = styled.Text`
  font-size: 16px;
  text-decoration: underline;
`;

const NotesElement = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  background-color: ${COLORS.WHITE};

  padding: 10px 0px;
`;

const NotesSuccessful = styled.View`
  flex-direction: row;
  align-self: flex-start;

  margin-bottom: 10px;
`;

const NotesSuccessfulTtile = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 16px;
`;

const NotesSuccessfulIcon = styled.View`
  margin-left: 30px;
`;

// State
const mapStateToProps = (state: IInitialState) => ({
  notes: state.notes,
});

const mapDispatchToProps = {
  onToggleNote: (id: string) => toggleIsCheckNoteAction(id),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CommomNotesComponent);
