import {takeEvery, put, call} from 'redux-saga/effects';

import {DOWNLOAD_SHEDULE, UPDATE_SCHEDULE} from '../utils/constants';

import {
  IDownloadSheduleSaga,
  downloadSheduleSuccessAction,
  downloadSheduleFailedAction,
  updateScheduleAction,
} from '../actions/Shedule.actions';

import Lesson, {ILesson} from '../models/Lesson.model';

import {AppErrorTypes} from '../enums/App.enums';
import {fetchAPI} from '../utils/methods';

const processSchedule = (data: any): [Map<number, ILesson[]>, number] => {
  const updateDate = Date.now();

  const sh = data.reduce((acc: Map<number, ILesson[]>, val: any) => {
    val.dates.forEach((timestamp: number) => {
      const date = new Date(timestamp * 1000);

      const resTimestamp = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      ).getTime();

      let newLesson = new Lesson(
        val._id,
        val.title,
        Lesson.getLessonType(val.type.toLowerCase()),
        Lesson.getLessonGroup(val.user_group.toLowerCase()),
        val.room,
        val.teacher,
        resTimestamp,
        val.num,
      );

      const existedData = acc.get(resTimestamp);
      if (Array.isArray(existedData)) {
        existedData.push(newLesson);
      } else {
        acc.set(resTimestamp, [newLesson]);
      }
    });
    return acc;
  }, new Map<number, ILesson[]>());
  return [sh, updateDate];
};

export function* downloadSheduleSaga({payload}: IDownloadSheduleSaga) {
  try {
    const {status, data} = yield call(
      fetchAPI,
      `/api/load-schedule/${payload.groupId}`,
      'POST',
      {
        login: payload.login,
        password: payload.password,
      },
    );

    if (status === 200) {
      const [sh, updateDate] = processSchedule(data);
      yield put(downloadSheduleSuccessAction(sh, updateDate));
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

export function* updateScheduleSaga({
  payload,
}: ReturnType<typeof updateScheduleAction>) {
  try {
    const {status, data} = yield call(fetchAPI, `/api/load-schedule`, 'POST', {
      login: payload.login,
      password: payload.password,
      title: payload.title,
    });

    if (status === 200) {
      const [sh, updateDate] = processSchedule(data);
      yield put(downloadSheduleSuccessAction(sh, updateDate));
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
  yield takeEvery(UPDATE_SCHEDULE, updateScheduleSaga);
}
