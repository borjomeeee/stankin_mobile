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
} from '../utils/constants';

import {AppErrorTypes} from '../enums/App.enums';

export default (
  state: IAppInitialState = initialState.app,
  action: AppActionType,
): IAppInitialState => {
  switch (action.type) {
    case LOGIN_USER:
    case DOWNLOAD_SHEDULE:
      return {...state, isLoading: true};

    case LOGIN_USER_FAILED:
    case LOGIN_USER_SUCCESS:
    case DOWNLOAD_SHEDULE_FAILED:
    case DOWNLOAD_SHEDULE_SUCCESS:
      return {...state, isLoading: false};

    case CHECK_UPDATES_FAILED:
      return {...state, error: {type: action.payload.error, text: 'Error!'}};

    case CLEAR_ERROR:
      return {...state, error: {type: AppErrorTypes.NONE, text: ''}};
    default:
      return state;
  }
};
