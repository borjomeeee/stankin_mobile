import {
  CHECK_UPDATES,
  IAction,
  CHECK_UPDATES_SUCCESS,
  CHECK_UPDATES_FAILED,
  CLEAR_ERROR,
} from '../utils/constants';

import {IAppError} from '../redux/store';

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

export const checkUpdatesFailedAction = (error: IAppError) =>
  ({
    type: CHECK_UPDATES_FAILED,
    payload: {error},
  } as const);

export const clearErrorAction = () =>
  ({
    type: CLEAR_ERROR,
  } as const);
