import {IScheduleInitialState, initialState} from '../redux/store';

import {SheduleActionType} from '../utils/types';

import {
  DOWNLOAD_SHEDULE_SUCCESS,
  LOGOUT_USER,
  UPDATE_SCHEDULE_SUCCESS,
} from '../utils/constants';

import {ILesson} from '../models/Lesson.model';
export default (
  state: IScheduleInitialState = initialState.schedule,
  action: SheduleActionType,
): IScheduleInitialState => {
  switch (action.type) {
    case UPDATE_SCHEDULE_SUCCESS:
    case DOWNLOAD_SHEDULE_SUCCESS:
      return action.payload.sh;
    default:
      return state;
  }
};
