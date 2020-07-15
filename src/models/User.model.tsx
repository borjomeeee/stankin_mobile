import Group, {IGroup} from './Group.model';

import {LessonGroup} from '../enums/Lesson.enums';

export interface IUser {
  login: string;
  password: string;

  name: string;
  group: IGroup;

  lessonGroup: LessonGroup;

  isAuth: boolean;
}

export default class User implements IUser {
  login: string;
  password: string;

  name: string;
  group: IGroup;

  lessonGroup: LessonGroup;

  isAuth: boolean;

  constructor(
    login: string = '',
    password: string = '',
    name: string = '',
    group: IGroup = new Group(),
    isAuth: boolean = false,
    lessonGroup: LessonGroup = LessonGroup.NONE,
  ) {
    this.login = login;
    this.password = password;

    this.name = name;
    this.group = group;

    this.lessonGroup = lessonGroup;

    this.isAuth = isAuth;
  }
}
