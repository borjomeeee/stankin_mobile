import {takeEvery, put} from 'redux-saga/effects';

import Config from 'react-native-config';
const {SERVER_ADDRESS, SERVER_PORT} = Config;

import {CHECK_UPDATES} from '../utils/constants';

import {
  ICheckUpdatesSagaProps,
  checkUpdatesSuccessAction,
  checkUpdatesFailedAction,
} from '../actions/App.actions';

import {AppErrorTypes} from '../enums/App.enums';

export function* checkUpdateSaga({payload}: ICheckUpdatesSagaProps) {
  try {
    const res = yield fetch(
      `http://${SERVER_ADDRESS}:${SERVER_PORT}/api/hello-user`,
      {
        method: 'POST',
        body: JSON.stringify({groupId: payload.groupId}),
      },
    );

    if (res.status === 200) {
      const data = yield res.json();

      yield put(
        checkUpdatesSuccessAction(
          new Date(+data['last_update_schedule']),
          data['app_version'],
        ),
      );
    } else if (res.status === 410) {
      yield put(
        checkUpdatesFailedAction({
          type: AppErrorTypes.ERROR,
          text: 'Текущей группы пользователя не сущуствует!',
        }),
      );
    } else {
      yield put(
        checkUpdatesFailedAction({
          type: AppErrorTypes.ERROR,
          text: 'Ошибка проверки обновлений!',
        }),
      );
    }
  } catch (e) {
    console.error(e);
    yield put(
      checkUpdatesFailedAction({
        type: AppErrorTypes.ERROR,
        text: 'Ошибка проверки обновлений!',
      }),
    );
  }
}

export default function* appSaga() {
  yield takeEvery(CHECK_UPDATES, checkUpdateSaga);
}
