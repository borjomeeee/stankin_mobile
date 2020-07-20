import {
  CHECK_UPDATES,
  IAction,
  CHECK_UPDATES_SUCCESS,
  CHECK_UPDATES_FAILED,
  CLEAR_ERROR,
} from '../utils/constants';

import {AppErrorTypes} from '../enums/App.enums';

export interface ICheckUpdatesSagaProps extends IAction {
  payload: {groupId: string};
}

export const checkUpdatesAction = (groupId: string) =>
  ({
    type: CHECK_UPDATES,
    payload: {groupId},
  } as const);

export const checkUpdatesSuccessAction = (
  lastUpdate: Date,
  appVersion: string,
) =>
  ({
    type: CHECK_UPDATES_SUCCESS,
    payload: {lastUpdate, appVersion},
  } as const);

export const checkUpdatesFailedAction = (error: AppErrorTypes) =>
  ({
    type: CHECK_UPDATES_FAILED,
    payload: {error},
  } as const);

export const clearErrorAction = () =>
  ({
    type: CLEAR_ERROR,
  } as const);
