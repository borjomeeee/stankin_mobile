import React, {useState, useMemo, useEffect} from 'react';
import {Platform, Keyboard} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import DateTimePicker from '@react-native-community/datetimepicker';

import CommonButtonComponent from '../components/CommonButton.component';
import CommonSubjectsModalComponent from '../components/CommonSubjectsModal.component';
import CommonInputComponent from '../components/CommonInput.component';

import {createNoteAction} from '../actions/Notes.actions';

import {ILesson} from '../models/Lesson.model';

import * as COLORS from '../utils/colors';
import {dateToStringExpanded} from '../utils/methods';
import {ScreenContainer} from '../utils/theme';

const AddNoteScreen = ({
  schedule,
  createNote,
}: ConnectedProps<typeof connector>) => {
  const navigation = useNavigation();
  const route: RouteProp<
    Record<string, object | undefined>,
    string
  > = useRoute();

  const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardIsOpen(true));
    Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false));

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const params = route.params as {title: string} | undefined;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2020, 3, 10));

  const [noteText, setNoteText] = useState<string>('');
  const [noteTextError, setNoteTextError] = useState<string>('');

  // Get list all possible subjects
  const subjects = useMemo(
    () =>
      Array.from(schedule)
        .reduce(
          (acc, item) => [...acc, ...item[1].map((ls: ILesson) => ls.title)],
          new Array<string>(0),
        )
        .filter(
          (vl: string, index: number, self: string[]) =>
            self.indexOf(vl) === index,
        ),
    [schedule],
  );

  const [subjectNote, setSubjectNote] = useState<string>(
    params ? params.title : subjects[0],
  );
  const [visibleSubjectDropdown, setVisibleSubjectDropdown] = useState<boolean>(
    false,
  );
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);

  const onSubmitCreateNote = () => {
    if (noteText.length === 0) {
      setNoteTextError('Поле не должно быть пустым!');
      return;
    }

    console.log(selectedDate);
    createNote(subjectNote, selectedDate.getTime(), noteText);

    navigation.goBack();
  };

  const onChangeDate = (_: any, date: Date | undefined) => {
    const currentDate = date || selectedDate;

    setShowDatepicker(Platform.OS === 'ios');

    setSelectedDate(currentDate);
  };

  const selectItemSubjectDropdown = (item: string) => {
    setVisibleSubjectDropdown(false);
    setSubjectNote(item);
  };

  const onChangeNoteText = (value: string) => {
    if (noteTextError) {
      setNoteTextError('');
    }
    setNoteText(value);
  };

  return (
    <ScreenContainer>
      <AddNoteContent>
        {!keyboardIsOpen && (
          <React.Fragment>
            <OptionContainer>
              <OptionTitle>Предмет</OptionTitle>

              <OptionSelectContainer
                onPress={setVisibleSubjectDropdown.bind(null, true)}>
                <OptionSelectText numberOfLines={1}>
                  {subjectNote}
                </OptionSelectText>
              </OptionSelectContainer>
            </OptionContainer>

            <OptionContainer>
              <OptionTitle>Дата</OptionTitle>

              <OptionSelectContainer
                onPress={setShowDatepicker.bind(null, true)}>
                <OptionSelectBold>
                  {dateToStringExpanded(selectedDate)}
                </OptionSelectBold>
              </OptionSelectContainer>
            </OptionContainer>
          </React.Fragment>
        )}
        <OptionInputContainer>
          <OptionTitle>Текст дедлайна</OptionTitle>

          <OptionInputElement
            value={noteText}
            onChangeText={onChangeNoteText}
            error={noteTextError}
            placeholder="Написать реферат ..."
          />
        </OptionInputContainer>

        <AddNoteSubmit>
          <CommonButtonComponent text="Добавить" onClick={onSubmitCreateNote} />
        </AddNoteSubmit>
      </AddNoteContent>

      {showDatepicker && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <CommonSubjectsModalComponent
        subjects={subjects}
        isVisible={visibleSubjectDropdown}
        onSelectSubject={selectItemSubjectDropdown}
        onHide={setVisibleSubjectDropdown.bind(null, false)}
      />
    </ScreenContainer>
  );
};

// Components
const AddNoteContent = styled.View``;

const OptionContainer = styled.View`
  margin-top: 10px;
`;

const OptionTitle = styled.Text`
  font-family: 'Inter-Bold';
`;

const OptionSelectContainer = styled.TouchableOpacity`
  margin-top: 5px;
  padding: 10px 30px;

  border: 1px solid ${COLORS.MEDIUM_GRAY};

  align-items: center;
`;

const OptionSelectText = styled.Text`
  font-size: 14px;
`;

const OptionSelectBold = styled(OptionSelectText)`
  font-family: 'Inter-Bold';
`;

const OptionInputContainer = styled.View`
  margin-top: 25px;
`;

const OptionInputElement = styled(CommonInputComponent)`
  margin-top: 5px;
`;

const AddNoteSubmit = styled.View`
  align-items: center;

  margin-top: 25px;
`;

const mapStateToProps = (state: IInitialState) => ({
  schedule: state.schedule,
});

const mapDispatchToProps = {
  createNote: (subject: string, date: number, text: string) =>
    createNoteAction(subject, date, text),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AddNoteScreen);