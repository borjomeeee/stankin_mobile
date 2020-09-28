import {takeLeading, put, call} from 'redux-saga/effects';
import analytics from '@react-native-firebase/analytics';

import {
  loginUserAction,
  loginUserFailedAction,
  loginUserSuccessAction,
} from '../actions/User.actions';
import {downloadSheduleAction} from '../actions/Shedule.actions';

import {LOGIN_USER} from '../utils/constants';

import User from '../models/User.model';
import Group from '../models/Group.model';

import {AppErrorTypes} from '../enums/App.enums';
import {fetchAPI} from '../utils/methods';

export function* loginSaga({payload}: ReturnType<typeof loginUserAction>) {
  try {
    const {status, data} = yield call(fetchAPI, '/api/login', 'POST', {
      login: payload.login,
      password: payload.password,
    });

    if (status === 200) {
      yield analytics().logEvent('signIn', {
        name: data['username'],
        groupTitle: data['group_title'],
      });

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
    } else if (status === 401) {
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
