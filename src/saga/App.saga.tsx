import {takeEvery, put, delay} from 'redux-saga/effects';

import {CHECK_UPDATES} from '../utils/constants';

import {
  ICheckUpdatesSagaProps,
  checkUpdatesSuccessAction,
  checkUpdatesFailedAction,
} from '../actions/App.actions';

export function* checkUpdateSaga({}: ICheckUpdatesSagaProps) {
  const data = {
    last_update_schedule: new Date(1970, 1, 1),
    app_version: '1.0.0',
  };

  const error = 'Выбранной группы не существует';

  try {
    yield delay(1000);
    // Check updates application

    let ok = true;
    if (ok) {
      yield put(
        checkUpdatesSuccessAction(data.last_update_schedule, data.app_version),
      );
    } else {
      yield put(checkUpdatesFailedAction(error));
    }
  } catch {
    yield put(checkUpdatesFailedAction('Ошибка проверки авторизации'));
  }
}

export default function* appSaga() {
  yield takeEvery(CHECK_UPDATES, checkUpdateSaga);
}
