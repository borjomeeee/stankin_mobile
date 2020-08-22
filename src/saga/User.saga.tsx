import {takeLeading, put} from 'redux-saga/effects';

import Config from 'react-native-config';
const {SERVER_ADDRESS, SERVER_PORT} = Config;

import {
  ILoginSaga,
  loginUserSuccessAction,
  loginUserFailedAction,
} from '../actions/User.actions';
import {downloadSheduleAction} from '../actions/Shedule.actions';

import {LOGIN_USER} from '../utils/constants';

import User from '../models/User.model';
import Group from '../models/Group.model';

import {AppErrorTypes} from '../enums/App.enums';

export function* loginSaga({payload}: ILoginSaga) {
  try {
    const res = yield fetch(
      `http://${SERVER_ADDRESS}:${SERVER_PORT}/api/login`,
      {
        method: 'POST',
        body: JSON.stringify({
          login: payload.login,
          password: payload.password,
        }),
      },
    );

    if (res.status === 200) {
      const data = yield res.json();

      yield put(
        loginUserSuccessAction(
          new User(
            payload.login,
            payload.password,
            data['username'],
            new Group(
              data['group_id'],
              data['group_title'],
              +data['last_update_group'],
            ),
            true,
          ),
        ),
      );

      yield put(
        downloadSheduleAction(payload.login, payload.password, data.group_id),
      );
    } else if (res.status === 401) {
      yield put(
        loginUserFailedAction({
          type: AppErrorTypes.WARNING,
          text: 'Введены неверные логин или пароль',
        }),
      );
    } else {
      yield put(
        loginUserFailedAction({
          type: AppErrorTypes.ERROR,
          text: 'Произошла ошибка авторизации. Попробуйте еще раз.',
        }),
      );
    }
  } catch {
    yield put(
      loginUserFailedAction({
        type: AppErrorTypes.ERROR,
        text: 'Произошла ошибка авторизации. Попробуйте еще раз.',
      }),
    );
  }
}

export default function* authSaga() {
  yield takeLeading(LOGIN_USER, loginSaga);
}
