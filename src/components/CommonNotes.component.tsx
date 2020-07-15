import React, {useMemo, useState} from 'react';
import {View, TouchableWithoutFeedback, Animated} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {IInitialState} from '../redux/store';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

// TODO: Сделать пустой компонент для выполненных дедлайнов
// TODO: Сделать кнопку показать еще для выполненных дедлайнов
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

  const [
    visibleExpandedCheckedNotes,
    setVisibleExpandedCheckedNotes,
  ] = useState<boolean>(false);

  const successDropState = useState(new Animated.Value(1))[0];
  const successExpandedDropState = useState(new Animated.Value(0))[0];

  const NoteComponent = noteComponent;

  // TODO: Сделать все под один reduce
  const [checked, notCheckedNotes] = useMemo(() => {
    const sortByDate = (
      [dateNum1, _1]: [number, INote[]],
      [dateNum2, _2]: [number, INote[]],
    ) => (dateNum1 < dateNum2 ? -1 : 1);

    // ************ //
    const currNotes = Array.from(notes)
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
      .map(([dateNum, nts]: [number, INote[]]): [number, INote[]] => [
        dateNum,
        nts.filter((note: INote) => !note.isChecked),
      ])
      .sort(sortByDate);

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

  const onToggleVisibleExpandedCheckedNotes = () => {
    let callback;
    if (visibleExpandedCheckedNotes) {
      callback = () =>
        setVisibleExpandedCheckedNotes(!visibleExpandedCheckedNotes);
    } else {
      setVisibleExpandedCheckedNotes(!visibleExpandedCheckedNotes);
    }

    Animated.timing(successExpandedDropState, {
      toValue: +!visibleExpandedCheckedNotes,
      duration: 200,
      useNativeDriver: true,
    }).start(callback);
  };

  // Components
  const [checkedNotes, expandedCheckedNotes] = checked.reduce(
    (acc: [INote[], INote[]], note: INote, index: number) => {
      if (index < 5) {
        acc[0].push(note);
      } else {
        acc[1].push(note);
      }
      return acc;
    },
    [new Array<INote>(0), new Array<INote>(0)],
  );

  return (
    <NotesBlockContainer {...props}>
      {notCheckedNotes.every(
        ([_, nts]: [number, INote[]]) => nts.length === 0,
      ) ? (
        <CommonNotesEmptyComponent />
      ) : (
        Array.from(notCheckedNotes).map(
          ([dateNum, nts]: [number, INote[]], index: number) => {
            if (nts.length === 0) {
              return <React.Fragment key={dateNum} />;
            }

            return (
              <NotesDatedContainer key={dateNum} isFirst={index === 0}>
                <NotesDatedTitle>
                  {dateToDateString(new Date(dateNum))}
                </NotesDatedTitle>

                <NotesDatedElementsBlock>
                  {nts.map((note: INote) => (
                    <NotesElement
                      key={note.id}
                      onPress={onToggleNote.bind(null, note.id)}>
                      <NoteComponent {...note} />
                    </NotesElement>
                  ))}
                </NotesDatedElementsBlock>
              </NotesDatedContainer>
            );
          },
        )
      )}

      {checkedNotes.length > 0 && (
        <TouchableWithoutFeedback
          onPress={onToggleVisibleCheckedNotes.bind(null)}>
          <NotesSuccessful>
            <NotesSuccessfulTtile>Выполненные</NotesSuccessfulTtile>

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
                <Icon
                  name="keyboard-arrow-down"
                  color={COLORS.BLACK}
                  size={25}
                />
              </Animated.View>
            </NotesSuccessfulIcon>
          </NotesSuccessful>
        </TouchableWithoutFeedback>
      )}

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

        <Animated.View
          style={{
            opacity: successExpandedDropState.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0, 1],
            }),
            transform: [
              {
                translateY: successExpandedDropState.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          }}>
          {expandedCheckedNotes.length > 0 &&
            visibleExpandedCheckedNotes &&
            expandedCheckedNotes.map((note: INote) => (
              <NotesElement
                key={note.id}
                onPress={onToggleNote.bind(null, note.id)}>
                <NoteComponent {...note} />
              </NotesElement>
            ))}
        </Animated.View>
        {expandedCheckedNotes.length > 0 && (
          <ExpandedNotesContainer onPress={onToggleVisibleExpandedCheckedNotes}>
            <ExpandedNotesRow>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: successExpandedDropState.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}>
                <Icon
                  name="keyboard-arrow-down"
                  color={COLORS.MEDIUM_GRAY}
                  size={25}
                />
              </Animated.View>
              <ExpandedNotesTitle>
                {visibleExpandedCheckedNotes
                  ? 'Скрыть'
                  : `Показаьть еще ${expandedCheckedNotes.length} дедлайн`}
              </ExpandedNotesTitle>
            </ExpandedNotesRow>
          </ExpandedNotesContainer>
        )}
      </Animated.View>
    </NotesBlockContainer>
  );
};

// Components
const NotesBlockContainer = styled.View`
  margin-bottom: 70px;
`;

const NotesDatedContainer = styled.View<INotesDatedContainerProps>`
  margin-top: ${(props) => (props.isFirst ? '0px' : '20px')};
`;

const NotesDatedTitle = styled.Text`
  font-size: 16px;
  text-decoration: underline;
`;

const NotesDatedElementsBlock = styled.View`
  margin-top: 15px;
`;

const NotesElement = styled.TouchableOpacity`
  flex-direction: row;

  margin-top: 10px;
`;

const NotesSuccessful = styled.View`
  flex-direction: row;
  align-self: flex-start;

  margin-top: 30px;
`;

const NotesSuccessfulTtile = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 16px;
`;

const NotesSuccessfulIcon = styled.View`
  margin-left: 30px;
`;

const ExpandedNotesContainer = styled.TouchableOpacity`
  margin-top: 10px;
`;

const ExpandedNotesRow = styled.View`
  margin-left: 10px;
  flex-direction: row;

  align-items: center;
`;

const ExpandedNotesTitle = styled.Text`
  color: ${COLORS.MEDIUM_GRAY};
  margin-left: 10px;
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
