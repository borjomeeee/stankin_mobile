import {
  loginUserAction,
  loginUserSuccessAction,
  loginUserFailedAction,
  logoutUserAction,
  setUserGroupOnClassesAction,
  setUserGroupAction,
} from '../actions/User.actions';

import {
  downloadSheduleAction,
  downloadSheduleSuccessAction,
  downloadSheduleFailedAction,
  updateScheduleAction,
  updateScheduleSuccessAction,
  updateScheduleFailedAction,
} from '../actions/Shedule.actions';

import {
  createNoteAction,
  toggleIsCheckNoteAction,
  removeNoteAction,
} from '../actions/Notes.actions';

import {
  checkUpdatesAction,
  checkUpdatesFailedAction,
  checkUpdatesSuccessAction,
  clearErrorAction,
  loadGroupsAction,
  loadGroupsSuccessAction,
  loadGroupsFailedAction,
} from '../actions/App.actions';

export type AppActionType =
  | ReturnType<typeof loginUserAction>
  | ReturnType<typeof loginUserFailedAction>
  | ReturnType<typeof loginUserSuccessAction>
  | ReturnType<typeof downloadSheduleAction>
  | ReturnType<typeof downloadSheduleSuccessAction>
  | ReturnType<typeof downloadSheduleFailedAction>
  | ReturnType<typeof updateScheduleAction>
  | ReturnType<typeof updateScheduleSuccessAction>
  | ReturnType<typeof updateScheduleFailedAction>
  | ReturnType<typeof checkUpdatesAction>
  | ReturnType<typeof checkUpdatesSuccessAction>
  | ReturnType<typeof checkUpdatesFailedAction>
  | ReturnType<typeof loadGroupsAction>
  | ReturnType<typeof loadGroupsSuccessAction>
  | ReturnType<typeof loadGroupsFailedAction>
  | ReturnType<typeof checkUpdatesFailedAction>
  | ReturnType<typeof logoutUserAction>
  | ReturnType<typeof clearErrorAction>;

export type UserActionType =
  | ReturnType<typeof loginUserAction>
  | ReturnType<typeof loginUserSuccessAction>
  | ReturnType<typeof loginUserFailedAction>
  | ReturnType<typeof logoutUserAction>
  | ReturnType<typeof setUserGroupAction>
  | ReturnType<typeof setUserGroupOnClassesAction>
  | ReturnType<typeof checkUpdatesAction>
  | ReturnType<typeof checkUpdatesSuccessAction>
  | ReturnType<typeof checkUpdatesFailedAction>;

export type SheduleActionType =
  | ReturnType<typeof downloadSheduleAction>
  | ReturnType<typeof downloadSheduleSuccessAction>
  | ReturnType<typeof downloadSheduleFailedAction>
  | ReturnType<typeof updateScheduleAction>
  | ReturnType<typeof updateScheduleSuccessAction>
  | ReturnType<typeof updateScheduleFailedAction>
  | ReturnType<typeof logoutUserAction>;

export type NotesActionType =
  | ReturnType<typeof createNoteAction>
  | ReturnType<typeof removeNoteAction>
  | ReturnType<typeof toggleIsCheckNoteAction>
  | ReturnType<typeof logoutUserAction>;
