import {IAppInitialState, initialState} from '../redux/store';

import {AppActionType} from '../utils/types';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER,
  CHECK_UPDATES_FAILED,
  DOWNLOAD_SHEDULE,
  DOWNLOAD_SHEDULE_FAILED,
  DOWNLOAD_SHEDULE_SUCCESS,
  CLEAR_ERROR,
  CHECK_UPDATES_SUCCESS,
  UPDATE_SCHEDULE,
  UPDATE_SCHEDULE_FAILED,
  UPDATE_SCHEDULE_SUCCESS,
} from '../utils/constants';

import {AppErrorTypes} from '../enums/App.enums';

export default (
  state: IAppInitialState = initialState.app,
  action: AppActionType,
): IAppInitialState => {
  switch (action.type) {
    case LOGIN_USER:
    case DOWNLOAD_SHEDULE:
    case UPDATE_SCHEDULE:
      return {...state, isLoading: true};

    case LOGIN_USER_FAILED:
      return {...state, isLoading: false, error: action.payload.error};

    case UPDATE_SCHEDULE_FAILED:
    case DOWNLOAD_SHEDULE_FAILED:
      return {...state, isLoading: false, error: action.payload.err};

    case LOGIN_USER_SUCCESS:
      return {...state, isLoading: false};

    case UPDATE_SCHEDULE_SUCCESS:
    case DOWNLOAD_SHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lastUpdateSchedule: action.payload.date,
      };

    case CHECK_UPDATES_SUCCESS:
      return {
        ...state,
        lastUpdateSchedule: +action.payload.lastUpdate,
      };

    case CHECK_UPDATES_FAILED:
      return {...state, error: action.payload.error};

    case CLEAR_ERROR:
      console.log(2);
      return {...state, error: {type: AppErrorTypes.NONE, text: ''}};
    default:
      return state;
  }
};
