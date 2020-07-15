import {
  LOAD_DATA_FROM_LOCAL,
  LOAD_DATA_FROM_LOCAL_SUCCESS,
  LOAD_DATA_FROM_LOCAL_FAILED,
  CHECK_UPDATES,
  IAction,
  CHECK_UPDATES_SUCCESS,
  CHECK_UPDATES_FAILED,
} from '../utils/constants';

export interface ICheckUpdatesSagaProps extends IAction {
  paylaod: {groupId: string};
}

export const loadDataFromLocalAction = () =>
  ({
    type: LOAD_DATA_FROM_LOCAL,
  } as const);

export const loadDataFromLocalActionSuccess = () =>
  ({
    type: LOAD_DATA_FROM_LOCAL_SUCCESS,
  } as const);

export const loadDataFromLocalFailed = (error: string) =>
  ({
    type: LOAD_DATA_FROM_LOCAL_FAILED,
    payload: {err: error},
  } as const);

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

export const checkUpdatesFailedAction = (error: string) =>
  ({
    type: CHECK_UPDATES_FAILED,
    payload: {error},
  } as const);
