import {takeEvery, put} from 'redux-saga/effects';

import Config from 'react-native-config';
const {SERVER_ADDRESS, SERVER_PORT} = Config;

import {CHECK_UPDATES, LOAD_GROUPS} from '../utils/constants';

import {
  ICheckUpdatesSagaProps,
  checkUpdatesSuccessAction,
  checkUpdatesFailedAction,
  loadGroupsAction,
  loadGroupsSuccessAction,
  loadGroupsFailedAction,
} from '../actions/App.actions';

import {AppErrorTypes} from '../enums/App.enums';
import {fetchAPI} from '../utils/methods';
import {IGroup} from '../models/Group.model';

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

export function* loadGroupsSaga({}: ReturnType<typeof loadGroupsAction>) {
  try {
    const {status, data} = yield fetchAPI('/api/load-groups', 'POST');

    if (status === 200) {
      yield put(
        loadGroupsSuccessAction(
          data.map((item: any) => ({
            id: item['_id'],
            title: item['name'],
            lastUpdate: item['last_update'] * 1000,
          })) as IGroup[],
        ),
      );
    } else {
      yield put(
        loadGroupsFailedAction({
          type: AppErrorTypes.ERROR,
          text: 'Ошибка загрузки списка групп!',
        }),
      );
    }
  } catch (e) {
    console.error(e);

    yield put(
      loadGroupsFailedAction({
        type: AppErrorTypes.ERROR,
        text: 'Ошибка загрузки списка групп!',
      }),
    );
  }
}

export default function* appSaga() {
  yield takeEvery(CHECK_UPDATES, checkUpdateSaga);
  yield takeEvery(LOAD_GROUPS, loadGroupsSaga);
}
