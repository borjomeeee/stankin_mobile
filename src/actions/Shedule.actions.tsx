import {
  IAction,
  DOWNLOAD_SHEDULE,
  DOWNLOAD_SHEDULE_SUCCESS,
  DOWNLOAD_SHEDULE_FAILED,
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
) =>
  ({
    type: DOWNLOAD_SHEDULE,
    payload: {login, password, groupId},
  } as const);

export const downloadSheduleSuccessAction = (sh: Map<number, ILesson[]>) =>
  ({
    type: DOWNLOAD_SHEDULE_SUCCESS,
    payload: {sh},
  } as const);

export const downloadSheduleFailedAction = (err: IAppError) =>
  ({
    type: DOWNLOAD_SHEDULE_FAILED,
    payload: {err},
  } as const);
