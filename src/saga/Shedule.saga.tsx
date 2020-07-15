import {takeEvery, put, delay} from 'redux-saga/effects';

import {DOWNLOAD_SHEDULE} from '../utils/constants';

import {
  IDownloadSheduleSaga,
  downloadSheduleSuccessAction,
  downloadSheduleFailedAction,
} from '../actions/Shedule.actions';

import Lesson, {ILesson} from '../models/Lesson.model';

import {dateStringToDate} from '../utils/methods';

export function* downloadSheduleSaga({}: IDownloadSheduleSaga) {
  const data = [
    {
      _id: '1',
      title: 'Информатика',
      type: 'лабораторные занятия',
      user_group: '',
      room: '0308',
      teacher: 'Носовицкий В.Б',
      dates: '10/02,17/02,02/03,16/03',
      num: 1,
      group_id: 'Группа 1',
    },
    {
      _id: '2',
      title: 'Информатика',
      type: 'лекции',
      user_group: 'a',
      room: '0308',
      teacher: 'Носовицкий В.Б',
      dates: '10/02,17/02,02/03,16/03',
      num: 2,
      group_id: 'Группа 1',
    },
    {
      _id: '3',
      title:
        'Высокоэффективные технологии и оборудование современных производств',
      type: 'семинар',
      user_group: 'б',
      room: 'С/З СТАНКИН',
      teacher: 'Носовицкий В.Б',
      dates: '10/02,17/02,02/03,16/03',
      num: 3,
      group_id: 'Группа 1',
    },
  ];

  try {
    yield delay(1000);
    // Send request to get schedule

    let ok = true;
    if (ok) {
      yield put(
        downloadSheduleSuccessAction(
          data.reduce((acc, val) => {
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
      yield put(downloadSheduleFailedAction('Ошибка загрузки расписания'));
    }
  } catch {
    yield put(downloadSheduleFailedAction('Ошибка загрузки расписания'));
  }
}

export default function* authSaga() {
  yield takeEvery(DOWNLOAD_SHEDULE, downloadSheduleSaga);
}
