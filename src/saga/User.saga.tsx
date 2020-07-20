import {takeLeading, put} from 'redux-saga/effects';

import {
  ILoginSaga,
  loginUserSuccessAction,
  loginUserFailedAction,
} from '../actions/User.actions';
import {downloadSheduleAction} from '../actions/Shedule.actions';

import {LOGIN_USER} from '../utils/constants';

import User from '../models/User.model';
import Group from '../models/Group.model';

export function* loginSaga({payload}: ILoginSaga) {
  try {
    const res = yield fetch('http://130.193.50.137:5000/api/login', {
      method: 'POST',
      body: JSON.stringify({login: payload.login, password: payload.password}),
    });

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
      yield put(loginUserFailedAction('Auth error'));
    } else {
      yield put(loginUserFailedAction('Server error'));
    }
  } catch {
    yield put(loginUserFailedAction('Ошибка авторизации'));
  }
}

export default function* authSaga() {
  yield takeLeading(LOGIN_USER, loginSaga);
}
