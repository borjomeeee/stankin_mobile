import {
  CREATE_NOTE,
  TOGGLE_DONE_NOTE,
  IAction,
  REMOVE_NOTE,
} from '../utils/constants';

import {INotesInitialState} from '../redux/store';

export interface ISaveNotesSaga extends IAction {
  payload: {notes: INotesInitialState};
}

// Common actions
export const createNoteAction = (subject: string, date: number, text: string) =>
  ({
    type: CREATE_NOTE,
    payload: {subject, date, text},
  } as const);

export const removeNoteAction = (noteId: string) =>
  ({
    type: REMOVE_NOTE,
    payload: {noteId},
  } as const);

export const toggleIsCheckNoteAction = (id: string) =>
  ({
    type: TOGGLE_DONE_NOTE,
    payload: {id},
  } as const);
