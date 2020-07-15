// DEFAULT TYPE
export interface IAction {
  type: string;
}

export type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never;

// Common actions
export const LOAD_DATA_FROM_LOCAL = '[COMMON] LOAD_DATA_FROM_LOCAL';
export const LOAD_DATA_FROM_LOCAL_SUCCESS =
  '[COMMON] LOAD_DATA_FROM_LOCAL_SUCCESS';
export const LOAD_DATA_FROM_LOCAL_FAILED =
  '[COMMON] LOAD_DATA_FROM_LOCAL_FAILED';

// App actions
export const LOAD_APP_FROM_LOCAL = '[APP] LOAD_APP_FROM_LOCAL';
export const LOAD_APP_FROM_LOCAL_SUCCESS = '[APP] LOAD_APP_FROM_LOCAL_SUCCESS';
export const LOAD_APP_FROM_LOCAL_FAILED = '[APP] LOAD_APP_FROM_LOCAL_FAILED';

export const UPDATE_SHEDULE = '[APP] UPDATE_SHEDULE';
export const UPDATE_SHEDULE_SUCCESS = '[APP] UPDATE_SHEDULE_SUCCESS';
export const UPDATE_SHEDULE_FAILED = '[APP] UPDATE_SHEDULE_FAILED';

export const CHECK_UPDATES = '[APP] CHECK_UPDATES';
export const CHECK_UPDATES_SUCCESS = '[APP] CHECK_UPDATES_SUCCESS';
export const CHECK_UPDATES_FAILED = '[APP] CHECK_UPDATES_FAILED';

// User actions
export const LOGIN_USER = '[USER] LOGIN_USER';
export const LOGIN_USER_SUCCESS = '[USER] LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = '[USER] LOGIN_USER_FAILED';

export const LOGOUT_USER = '[USER] LOGOUT_USER';

export const LOAD_USER_FROM_LOCAL = '[USER] LOAD_USER_FROM_LOCAL';
export const LOAD_USER_FROM_LOCAL_SUCCESS =
  '[USER] LOAD_USER_FROM_LOCAL_SUCCESS';
export const LOAD_USER_FROM_LOCAL_FAILED = '[USER] LOAD_USER_FROM_LOCAL_FAILED';

export const SAVE_USER_TO_LOCAL = '[USER] SAVE_USER_TO_LOCAL';
export const SAVE_USER_TO_LOCAL_SUCCESS = '[USER] SAVE_USER_TO_LOCAL_SUCCESS';
export const SAVE_USER_TO_LOCAL_FAILED = '[USER] SAVE_USER_TO_LOCAL_FAILED';

export const SET_USER_GROUP_ON_CLASSES = '[USER] SET_USER_GROUP_ON_CLASSES';
export const SET_USER_GROUP_ON_CLASSES_SUCCESS =
  '[USER] SET_USER_GROUP_ON_CLASSES_SUCCESS';
export const SET_USER_GROUP_ON_CLASSES_FAILED =
  '[USER] SET_USER_GROUP_ON_CLASSES_FAILED';

// Shedule actions
export const DOWNLOAD_SHEDULE = '[SHEDULE] DOWNLOAD_SHEDULE';
export const DOWNLOAD_SHEDULE_SUCCESS = '[SHEDULE] DOWNLOAD_SHEDULE_SUCCESS';
export const DOWNLOAD_SHEDULE_FAILED = '[SHEDULE] DOWNLOAD_SHEDULE_FAILED';

export const LOAD_SHEDULE_FROM_LOCAL = '[SHEDULE] LOAD_SHEDULE_FROM_LOCAL';
export const LOAD_SHEDULE_FROM_LOCAL_SUCCESS =
  '[SHEDULE] LOAD_SHEDULE_FROM_LOCAL_SUCCESS';
export const LOAD_SHEDULE_FROM_LOCAL_FAILED =
  '[SHEDULE] LOAD_SHEDULE_FROM_LOCAL_FAILED';

export const SAVE_SHEDULE_TO_LOCAL = '[SHEDULE] SAVE_SHEDULE_TO_LOCAL';
export const SAVE_SHEDULE_TO_LOCAL_SUCCESS =
  '[SHEDULE] SAVE_SHEDULE_TO_LOCAL_SUCCESS';
export const SAVE_SHEDULE_TO_LOCAL_FAILED =
  '[SHEDULE] SAVE_SHEDULE_TO_LOCAL_FAILED';

// Notes Actions
export const CREATE_NOTE = '[NOTES] CREATE_NOTE';
export const TOGGLE_DONE_NOTE = '[NOTES] TOGGLE_DONE_NOTE';

export const LOAD_NOTES_FROM_LOCAL = '[NOTES] LOAD_NOTES_FROM_LOCAL';
export const LOAD_NOTES_FROM_LOCAL_SUCCESS =
  '[NOTES] LOAD_NOTES_FROM_LOCAL_SUCCESS';
export const LOAD_NOTES_FROM_LOCAL_FAILED =
  '[NOTES] LOAD_NOTES_FROM_LOCAL_FAILED';

export const SAVE_NOTES_TO_LOCAL = '[NOTES] SAVE_NOTES_TO_LOCAL';
export const SAVE_NOTES_TO_LOCAL_SUCCESS =
  '[NOTES] SAVE_NOTES_TO_LOCAL_SUCCESS';
export const SAVE_NOTES_TO_LOCAL_FAILED = '[NOTES] SAVE_NOTES_TO_LOCAL_FAILED';
