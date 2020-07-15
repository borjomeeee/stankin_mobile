import {IScheduleInitialState, initialState} from '../redux/store';

import {SheduleActionType} from '../utils/types';
import {DOWNLOAD_SHEDULE_SUCCESS} from '../utils/constants';

export default (
  state: IScheduleInitialState = initialState.schedule,
  action: SheduleActionType,
): IScheduleInitialState => {
  switch (action.type) {
    case DOWNLOAD_SHEDULE_SUCCESS:
      return action.payload.sh;
    default:
      return state;
  }
};
