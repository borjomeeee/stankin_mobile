import {IAppInitialState, initialState} from '../redux/store';

import {AppActionType} from '../utils/types';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOAD_USER_FROM_LOCAL_SUCCESS,
  LOAD_USER_FROM_LOCAL_FAILED,
  LOAD_DATA_FROM_LOCAL,
  LOGIN_USER,
} from '../utils/constants';

export default (
  state: IAppInitialState = initialState.app,
  action: AppActionType,
): IAppInitialState => {
  switch (action.type) {
    case LOAD_DATA_FROM_LOCAL:
    case LOGIN_USER:
      return {...state, isLoading: true};

    case LOGIN_USER_FAILED:
    case LOAD_USER_FROM_LOCAL_FAILED:
      return {...state, isLoading: false};

    case LOGIN_USER_SUCCESS:
    case LOAD_USER_FROM_LOCAL_SUCCESS:
      return {...state, isLoading: false};

    // case DOWNLOAD_SHEDULE_FAILED:
    // case LOAD_SHEDULE_FROM_LOCAL_FAILED:
    //   return {...state, sheduleIsLoaded: false};

    // case DOWNLOAD_SHEDULE_SUCCESS:
    // case LOAD_SHEDULE_FROM_LOCAL_SUCCESS:
    //   return {...state, sheduleIsLoaded: true};
    default:
      return state;
  }
};
