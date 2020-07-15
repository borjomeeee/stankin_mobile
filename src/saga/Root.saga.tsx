import {all} from 'redux-saga/effects';

import UserSaga from './User.saga';
import SheduleSaga from './Shedule.saga';
import appSaga from './App.saga';

export default function* rootSaga() {
  yield all([appSaga(), UserSaga(), SheduleSaga()]);
}
