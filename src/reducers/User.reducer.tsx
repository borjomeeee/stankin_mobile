import {initialState, IUserInitialState} from '../redux/store';

import User from '../models/User.model';

import {UserActionType} from '../utils/types';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  SET_USER_GROUP_ON_CLASSES,
  CHECK_UPDATES_FAILED,
  SET_USER_GROUP,
} from '../utils/constants';

export default (
  state: IUserInitialState = initialState.user,
  action: UserActionType,
): IUserInitialState => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {...action.payload.user};
    case LOGIN_USER_FAILED:
      return {...state};

    case LOGOUT_USER:
      return new User();
    case SET_USER_GROUP_ON_CLASSES:
      return {...state, lessonGroup: action.payload.group};

    case SET_USER_GROUP:
      return {...state, group: action.paylaod.group};

    case CHECK_UPDATES_FAILED:
      return {...state, isAuth: false};
  }
  return state;
};
