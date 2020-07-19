import {
  loginUserAction,
  loginUserSuccessAction,
  loginUserFailedAction,
  logoutUserAction,
  setUserGroupOnClassesAction,
  setUserGroupOnClassesSuccessAction,
  setUserGroupOnClassesFailedAction,
} from '../actions/User.actions';

import {
  downloadSheduleAction,
  downloadSheduleSuccessAction,
  downloadSheduleFailedAction,
} from '../actions/Shedule.actions';

import {
  createNoteAction,
  toggleIsCheckNoteAction,
  removeNoteAction,
} from '../actions/Notes.actions';

import {loadDataFromLocalAction} from '../actions/App.actions';

export type AppActionType =
  | ReturnType<typeof loadDataFromLocalAction>
  | ReturnType<typeof loginUserAction>
  | ReturnType<typeof loginUserFailedAction>
  | ReturnType<typeof loginUserSuccessAction>
  | ReturnType<typeof downloadSheduleAction>
  | ReturnType<typeof downloadSheduleSuccessAction>
  | ReturnType<typeof downloadSheduleFailedAction>
  | ReturnType<typeof logoutUserAction>;

export type UserActionType =
  | ReturnType<typeof loginUserAction>
  | ReturnType<typeof loginUserSuccessAction>
  | ReturnType<typeof loginUserFailedAction>
  | ReturnType<typeof logoutUserAction>
  | ReturnType<typeof setUserGroupOnClassesAction>
  | ReturnType<typeof setUserGroupOnClassesSuccessAction>
  | ReturnType<typeof setUserGroupOnClassesFailedAction>;

export type SheduleActionType =
  | ReturnType<typeof downloadSheduleAction>
  | ReturnType<typeof downloadSheduleSuccessAction>
  | ReturnType<typeof downloadSheduleFailedAction>
  | ReturnType<typeof logoutUserAction>;

export type NotesActionType =
  | ReturnType<typeof createNoteAction>
  | ReturnType<typeof removeNoteAction>
  | ReturnType<typeof toggleIsCheckNoteAction>
  | ReturnType<typeof logoutUserAction>;
