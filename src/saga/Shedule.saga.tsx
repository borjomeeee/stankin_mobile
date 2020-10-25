import {takeEvery, put, call} from 'redux-saga/effects';
import analytics from '@react-native-firebase/analytics';

import {DOWNLOAD_SHEDULE, UPDATE_SCHEDULE} from '../utils/constants';

import {
  downloadSheduleSuccessAction,
  downloadSheduleFailedAction,
  updateScheduleAction,
  downloadSheduleAction,
} from '../actions/Shedule.actions';

import Lesson, {ILesson} from '../models/Lesson.model';

import {AppErrorTypes} from '../enums/App.enums';
import {fetchAPI} from '../utils/methods';

const processSchedule = (data: any): [Map<number, ILesson[]>, number] => {
  const updateDate = data.last_update * 1000;

  const sh = data.sh.reduce((acc: Map<number, ILesson[]>, val: any) => {
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

// DEPRECATED
export function* downloadSheduleSaga({
  payload,
}: ReturnType<typeof downloadSheduleAction>) {
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

    if (status === 0) {
      yield analytics().logEvent('downloadSchedule', {
        groupId: payload.groupId,
      });

      const [sh, updateDate] = processSchedule(data);
      yield put(downloadSheduleSuccessAction(sh, updateDate));
    } else if (status === 101) {
      yield analytics().logEvent('userGroupNotFound', {
        groupName: payload.title,
      });

      yield put(
        downloadSheduleFailedAction({
          type: AppErrorTypes.ERROR,
          text:
            'Упс, ваша группа не найдена. В ближайшее время расписание будет добавлено!',
        }),
      );
    } else {
      yield analytics().logEvent('downloadScheduleFailed', {
        groupId: payload.groupId,
      });

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
      title: payload.title,
    });

    if (status === 0) {
      yield analytics().logEvent('updateSchedule', {
        groupName: payload.title,
      });

      const [sh, updateDate] = processSchedule(data);
      yield put(downloadSheduleSuccessAction(sh, updateDate));
    } else {
      yield analytics().logEvent('updateScheduleFailed', {
        groupName: payload.title,
      });

      yield put(
        downloadSheduleFailedAction({
          type: AppErrorTypes.ERROR,
          text: 'Ошибка загрузки расписания!',
        }),
      );
    }
  } catch {
    yield analytics().logEvent('updateScheduleFailed', {
      groupName: payload.title,
    });

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
