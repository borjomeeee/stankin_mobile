import {
  IAction,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  SET_USER_GROUP_ON_CLASSES,
  SET_USER_GROUP_ON_CLASSES_SUCCESS,
  SET_USER_GROUP_ON_CLASSES_FAILED,
} from '../utils/constants';

import {IUserInitialState} from '../redux/store';
import {LessonGroup} from '../enums/Lesson.enums';

// Action types
export interface ILoginSaga extends IAction {
  payload: {login: string; password: string};
}

export interface ISaveUserSaga extends IAction {
  payload: {user: IUserInitialState};
}

export interface ISaveGruopUser extends IAction {
  payload: {gruop: LessonGroup};
}

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

export const loginUserFailedAction = (error: string) =>
  ({
    type: LOGIN_USER_FAILED,
    payload: {error},
  } as const);

export const logoutUserAction = () =>
  ({
    type: LOGOUT_USER,
  } as const);

export const setUserGroupOnClassesAction = (group: LessonGroup) =>
  ({
    type: SET_USER_GROUP_ON_CLASSES,
    payload: {group},
  } as const);

export const setUserGroupOnClassesSuccessAction = () =>
  ({
    type: SET_USER_GROUP_ON_CLASSES_SUCCESS,
  } as const);

export const setUserGroupOnClassesFailedAction = () =>
  ({
    type: SET_USER_GROUP_ON_CLASSES_FAILED,
  } as const);
