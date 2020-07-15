import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import styled from 'styled-components/native';

import {IInitialState} from '../redux/store';

import {ILesson} from '../models/Lesson.model';

import * as COLORS from '../utils/colors';
import {ScreenContainer} from '../utils/theme';

import CommonButtonComponent from '../components/CommonButton.component';
import CommonTagComponent from '../components/CommonTag.component';
import LessonNoteComponent from '../components/LessonNote.component';
import CommonNotesComponent from '../components/CommonNotes.component';

type ILessonScreen = {
  route: {params: {lesson: ILesson}};
};

const LessonScreen = ({
  route,
}: ILessonScreen & ConnectedProps<typeof connector>) => {
  const {lesson} = route.params;

  const navigation = useNavigation();

  // Tags
  const tags = [lesson.type, lesson.room, lesson.teacher];

  // Handlers
  const onAddNote = (title: string) => {
    navigation.navigate('AddNote', {title});
  };

  return (
    <ScreenContainer>
      <LessonScreenDataContainer showsVerticalScrollIndicator={false}>
        <LessonDataFirstLine>
          <LessonDataTitle>{lesson.title}</LessonDataTitle>
          {lesson.groupOnLesson.length > 0 && (
            <LessonDataUserGroupContainer>
              <LessonDataUserGroupText>
                {lesson.groupOnLesson}
              </LessonDataUserGroupText>
            </LessonDataUserGroupContainer>
          )}
        </LessonDataFirstLine>

        <LessonDataTagsContainer>
          {tags
            .filter((item: string) => item.length > 0)
            .map((item: string) => (
              <LessonDataTag key={item} text={item} />
            ))}
        </LessonDataTagsContainer>

        <NotesBlockTitle>Дедлайны</NotesBlockTitle>

        <CommonNotesComponent
          lesson={lesson}
          noteComponent={LessonNoteComponent}
        />
      </LessonScreenDataContainer>

      <AddNoteButton>
        <CommonButtonComponent
          text="Добавить дедлайн"
          onClick={onAddNote.bind(null, lesson.title)}
        />
      </AddNoteButton>
    </ScreenContainer>
  );
};

// Components
const NotesBlockTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 16px;

  margin-top: 30px;
  margin-bottom: 30px;
`;

const LessonScreenDataContainer = styled.ScrollView`
  margin-top: 5px;
`;

const LessonDataFirstLine = styled.View`
  flex-direction: row;
  align-content: stretch;
`;

const LessonDataUserGroupContainer = styled.View`
  align-self: flex-start;
  width: 45px;

  border: 1px solid ${COLORS.DARK_GRAY};

  margin-top: 5px;
  align-items: center;
`;

const LessonDataUserGroupText = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 12px;
`;

const LessonDataTitle = styled.Text`
  font-size: 18px;
  flex: 1;
`;

const LessonDataTagsContainer = styled.View`
  margin-top: 18px;

  flex-direction: row;
  flex-wrap: wrap;
`;

const LessonDataTag = styled(CommonTagComponent)`
  margin-top: 5px;
  margin-right: 5px;
`;

const AddNoteButton = styled.View`
  align-self: center;

  margin-bottom: 20px;
  margin-top: 20px;
`;

// State
const mapStateToProps = (_: IInitialState) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LessonScreen);
