import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  SET_USER_GROUP_ON_CLASSES,
  SET_USER_GROUP,
} from '../utils/constants';

import {IUserInitialState, IAppError} from '../redux/store';
import {LessonGroup} from '../enums/Lesson.enums';
import {IGroup} from 'src/models/Group.model';

// Common actions
export const loginUserAction = (login: string, password: string) =>
  ({
    type: LOGIN_USER,
    payload: {login, password},
  } as const);

export const loginUserSuccessAction = (user: IUserInitialState) =>
  ({
    type: LOGIN_USER_SUCCESS,
    payload: {user},
  } as const);

export const loginUserFailedAction = (error: IAppError) =>
  ({
    type: LOGIN_USER_FAILED,
    payload: {error},
  } as const);

export const logoutUserAction = () =>
  ({
    type: LOGOUT_USER,
  } as const);

export const setUserGroupAction = (group: IGroup) =>
  ({
    type: SET_USER_GROUP,
    paylaod: {group},
  } as const);

export const setUserGroupOnClassesAction = (group: LessonGroup) =>
  ({
    type: SET_USER_GROUP_ON_CLASSES,
    payload: {group},
  } as const);
