import {LessonType, LessonGroup} from '../enums/Lesson.enums';

export interface ILesson {
  id: string;
  title: string;
  type: LessonType;
  groupOnLesson: LessonGroup;
  room: string;
  teacher: string;
  timestamp: number;
  num: number;
}

export default class Lesson implements ILesson {
  id: string;
  title: string;
  type: LessonType;
  groupOnLesson: LessonGroup;
  room: string;
  teacher: string;
  timestamp: number;
  num: number;

  static getLessonType = (type: string): LessonType => {
    switch (type) {
      case 'лекции':
        return LessonType.LECTURE;
      case 'лабораторные занятия':
        return LessonType.LABA;
      case 'семинар':
        return LessonType.SEMINAR;
      default:
        return LessonType.NO_TYPE;
    }
  };

  static getLessonGroup = (lessonGroup: string): LessonGroup => {
    switch (lessonGroup) {
      case 'а':
        return LessonGroup.GROUP_A;
      case 'б':
        return LessonGroup.GROUP_B;
      default:
        return LessonGroup.NONE;
    }
  };

  constructor(
    id: string,
    title: string,
    type: LessonType,
    groupOnLesson: LessonGroup,
    room: string,
    teacher: string,
    timestamp: number,
    num: number,
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.groupOnLesson = groupOnLesson;
    this.room = room;
    this.teacher = teacher;
    this.timestamp = timestamp;
    this.num = num;
  }
}
