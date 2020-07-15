import {takeLeading, put, delay} from 'redux-saga/effects';

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
  const data = {
    username: 'Спиридонов Андрей',
    group_title: 'ИДБ-18-07',
    group_id: 'Группа 1',
    last_update_group: new Date(),
  };
  const message = 'Auth error';
  try {
    yield delay(1000);
    // Send data and get mini info about user

    let ok = true;
    if (ok) {
      yield put(
        loginUserSuccessAction(
          new User(
            payload.login,
            payload.password,
            data.username,
            new Group(
              data.group_id,
              data.group_title,
              data.last_update_group.getTime(),
            ),
            true,
          ),
        ),
      );

      yield put(
        downloadSheduleAction(payload.login, payload.password, data.group_id),
      );
    } else {
      yield put(loginUserFailedAction(message));
    }
  } catch {
    yield put(loginUserFailedAction('Ошибка авторизации'));
  }
}

export default function* authSaga() {
  yield takeLeading(LOGIN_USER, loginSaga);
}
