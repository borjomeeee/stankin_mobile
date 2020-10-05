import {
  IAction,
  DOWNLOAD_SHEDULE,
  DOWNLOAD_SHEDULE_SUCCESS,
  DOWNLOAD_SHEDULE_FAILED,
  UPDATE_SCHEDULE,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAILED,
} from '../utils/constants';

import {IScheduleInitialState, IAppError} from '../redux/store';

import {ILesson} from '../models/Lesson.model';

// Action types
export interface IDownloadSheduleSaga extends IAction {
  payload: {login: string; password: string; groupId: string};
}

export interface ISaveSheduleSaga extends IAction {
  payload: {sh: IScheduleInitialState};
}

// Common actions
export const downloadSheduleAction = (
  login: string,
  password: string,
  groupId: string,
  title: string,
) =>
  ({
    type: DOWNLOAD_SHEDULE,
    payload: {login, password, groupId, title},
  } as const);

export const downloadSheduleSuccessAction = (
  sh: Map<number, ILesson[]>,
  date: number,
) =>
  ({
    type: DOWNLOAD_SHEDULE_SUCCESS,
    payload: {sh, date},
  } as const);

export const downloadSheduleFailedAction = (err: IAppError) =>
  ({
    type: DOWNLOAD_SHEDULE_FAILED,
    payload: {err},
  } as const);

export const updateScheduleAction = (
  login: string,
  password: string,
  id: string,
) =>
  ({
    type: UPDATE_SCHEDULE,
    payload: {login, password, id},
  } as const);

export const updateScheduleSuccessAction = (
  sh: Map<number, ILesson[]>,
  date: number,
) =>
  ({
    type: UPDATE_SCHEDULE_SUCCESS,
    payload: {sh, date},
  } as const);

export const updateScheduleFailedAction = (err: IAppError) =>
  ({
    type: UPDATE_SCHEDULE_FAILED,
    payload: {err},
  } as const);
