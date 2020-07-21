import {takeEvery, put} from 'redux-saga/effects';

const config = require('../config.json');
const server_ip = config['server_ip'];

import {DOWNLOAD_SHEDULE} from '../utils/constants';

import {
  IDownloadSheduleSaga,
  downloadSheduleSuccessAction,
  downloadSheduleFailedAction,
} from '../actions/Shedule.actions';

import Lesson, {ILesson} from '../models/Lesson.model';

import {dateStringToDate} from '../utils/methods';

import {AppErrorTypes} from '../enums/App.enums';

export function* downloadSheduleSaga({payload}: IDownloadSheduleSaga) {
  try {
    const res = yield fetch(
      `http://${server_ip}:5000/api/load-schedule/${payload.groupId}`,
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
        downloadSheduleSuccessAction(
          data.reduce((acc: Map<number, ILesson[]>, val: any) => {
            let dates = val.dates.split(',');

            dates.forEach((item: string) => {
              let date = dateStringToDate(item).getTime();

              let newLesson = new Lesson(
                val._id,
                val.title,
                Lesson.getLessonType(val.type.toLowerCase()),
                Lesson.getLessonGroup(val.user_group.toLowerCase()),
                val.group_id,
                val.room,
                val.teacher,
                item,
                val.num,
              );

              if (acc.get(date)) {
                acc.get(date)?.push(newLesson);
              } else {
                acc.set(date, [newLesson]);
              }
            });
            return acc;
          }, new Map<number, ILesson[]>()),
        ),
      );
    } else {
      yield put(
        downloadSheduleFailedAction({
          type: AppErrorTypes.ERROR,
          text: 'Ошибка загрузки расписания!',
        }),
      );
    }
  } catch {
    yield put(
      downloadSheduleFailedAction({
        type: AppErrorTypes.ERROR,
        text: 'Ошибка загрузки расписания!',
      }),
    );
  }
}

export default function* authSaga() {
  yield takeEvery(DOWNLOAD_SHEDULE, downloadSheduleSaga);
}
