import {IGroup} from './Group.model';
import {LessonGroup} from '../enums/Lesson.enums';

export interface IUser {
  group: IGroup | undefined;
  lessonGroup: LessonGroup;
}

export default class User implements IUser {
  group: IGroup | undefined;

  lessonGroup: LessonGroup;

  constructor(
    group: IGroup | undefined = undefined,
    lessonGroup: LessonGroup = LessonGroup.NONE,
  ) {
    this.group = group;
    this.lessonGroup = lessonGroup;
  }
}
