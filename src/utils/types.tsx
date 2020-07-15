import {
  loginUserAction,
  loginUserSuccessAction,
  loginUserFailedAction,
  loadUserFromLocalSuccessAction,
  loadUserFromLocalAction,
  logoutUserAction,
  loadUserFromLocalFailedAction,
  setUserGroupOnClassesAction,
  setUserGroupOnClassesSuccessAction,
  setUserGroupOnClassesFailedAction,
} from '../actions/User.actions';

import {
  downloadSheduleAction,
  downloadSheduleSuccessAction,
  downloadSheduleFailedAction,
  loadSheduleFromLocalSuccessAction,
  loadSheduleFromLocalAction,
  loadSheduleFromLocalFailedAction,
} from '../actions/Shedule.actions';

import {
  createNoteAction,
  toggleIsCheckNoteAction,
  loadNotesFromLocalAction,
  loadNotesFromLocalSuccessAction,
  loadNotesFromLocalFailedAction,
} from '../actions/Notes.actions';

import {loadDataFromLocalAction} from '../actions/App.actions';

export type AppActionType =
  | ReturnType<typeof loadDataFromLocalAction>
  | ReturnType<typeof loginUserAction>
  | ReturnType<typeof loginUserFailedAction>
  | ReturnType<typeof loginUserSuccessAction>
  | ReturnType<typeof loadUserFromLocalAction>
  | ReturnType<typeof loadUserFromLocalSuccessAction>
  | ReturnType<typeof loadUserFromLocalFailedAction>
  | ReturnType<typeof downloadSheduleAction>
  | ReturnType<typeof downloadSheduleSuccessAction>
  | ReturnType<typeof downloadSheduleFailedAction>
  | ReturnType<typeof loadSheduleFromLocalAction>
  | ReturnType<typeof loadSheduleFromLocalSuccessAction>
  | ReturnType<typeof loadSheduleFromLocalFailedAction>
  | ReturnType<typeof logoutUserAction>;

export type UserActionType =
  | ReturnType<typeof loginUserAction>
  | ReturnType<typeof loginUserSuccessAction>
  | ReturnType<typeof loginUserFailedAction>
  | ReturnType<typeof logoutUserAction>
  | ReturnType<typeof loadUserFromLocalAction>
  | ReturnType<typeof loadUserFromLocalSuccessAction>
  | ReturnType<typeof setUserGroupOnClassesAction>
  | ReturnType<typeof setUserGroupOnClassesSuccessAction>
  | ReturnType<typeof setUserGroupOnClassesFailedAction>;

export type SheduleActionType =
  | ReturnType<typeof downloadSheduleAction>
  | ReturnType<typeof downloadSheduleSuccessAction>
  | ReturnType<typeof downloadSheduleFailedAction>
  | ReturnType<typeof loadSheduleFromLocalAction>
  | ReturnType<typeof loadSheduleFromLocalSuccessAction>
  | ReturnType<typeof logoutUserAction>;

export type NotesActionType =
  | ReturnType<typeof createNoteAction>
  | ReturnType<typeof toggleIsCheckNoteAction>
  | ReturnType<typeof loadNotesFromLocalAction>
  | ReturnType<typeof loadNotesFromLocalSuccessAction>
  | ReturnType<typeof loadNotesFromLocalFailedAction>
  | ReturnType<typeof logoutUserAction>;
