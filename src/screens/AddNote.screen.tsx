import React, {useState, useMemo, useEffect} from 'react';
import analytics from '@react-native-firebase/analytics';

import * as RN from 'react-native';

import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';

import {IInitialState} from '../redux/store';

import DateTimePicker from '@react-native-community/datetimepicker';

import CommonButtonComponent from '../components/Common/CommonButton.component';
import CommonSubjectsModalComponent from '../components/Common/CommonSubjectsModal.component';
import CommonInputComponent from '../components/Common/CommonInput.component';
import CommonTextComponent from '../components/Common/CommonText.component';

import {createNoteAction} from '../actions/Notes.actions';

import {ILesson} from '../models/Lesson.model';

import {dateToStringExpanded} from '../utils/methods';

import theme from '../utils/theme';
import styles from './AddNote.styles';

const AddNoteScreen: React.FC<ConnectedProps<typeof connector>> = ({
  schedule,
  createNote,
}) => {
  const navigation = useNavigation();
  const route: RouteProp<
    Record<string, object | undefined>,
    string
  > = useRoute();

  const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false);

  useEffect(() => {
    RN.Keyboard.addListener('keyboardDidShow', () => setKeyboardIsOpen(true));
    RN.Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false));

    return () => {
      RN.Keyboard.removeAllListeners('keyboardDidShow');
      RN.Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const params = route.params as {title: string} | undefined;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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

    analytics().logEvent('createDeadline').catch();

    const newNoteDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
    );
    createNote(subjectNote, newNoteDate.getTime(), noteText);

    navigation.goBack();
  };

  const onChangeDate = (_: any, date: Date | undefined) => {
    const currentDate = date || selectedDate;

    setShowDatepicker(RN.Platform.OS === 'ios');

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
    <RN.View style={[theme.screen, styles.container]}>
      <RN.ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {!keyboardIsOpen && (
          <React.Fragment>
            <RN.View>
              <CommonTextComponent style={styles.selectTitle}>
                Предмет
              </CommonTextComponent>

              <RN.TouchableOpacity
                delayPressIn={0}
                activeOpacity={0.6}
                onPress={setVisibleSubjectDropdown.bind(null, true)}
                style={styles.selectSelf}>
                <CommonTextComponent numberOfLines={1}>
                  {subjectNote}
                </CommonTextComponent>
              </RN.TouchableOpacity>
            </RN.View>

            <RN.View>
              <CommonTextComponent style={styles.selectTitle}>
                Дата
              </CommonTextComponent>

              <RN.TouchableOpacity
                delayPressIn={0}
                activeOpacity={0.6}
                onPress={setShowDatepicker.bind(null, true)}
                style={styles.selectSelf}>
                <CommonTextComponent style={styles.selectTextBold}>
                  {dateToStringExpanded(selectedDate)}
                </CommonTextComponent>
              </RN.TouchableOpacity>
            </RN.View>
          </React.Fragment>
        )}
        <RN.View style={styles.inputContainer}>
          <CommonTextComponent style={[styles.selectTitle, styles.inputLabel]}>
            Текст дедлайна
          </CommonTextComponent>

          <CommonInputComponent
            containerStyles={styles.inputSelf}
            value={noteText}
            onChangeText={onChangeNoteText}
            error={noteTextError}
            placeholder="Написать реферат ..."
          />
        </RN.View>

        <RN.View>
          <CommonButtonComponent
            text="Добавить"
            onClick={onSubmitCreateNote}
            style={styles.sumbit}
          />
        </RN.View>
      </RN.ScrollView>

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
    </RN.View>
  );
};

const mapStateToProps = (state: IInitialState) => ({
  schedule: state.schedule,
});

const mapDispatchToProps = {
  createNote: (subject: string, date: number, text: string) =>
    createNoteAction(subject, date, text),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AddNoteScreen);
