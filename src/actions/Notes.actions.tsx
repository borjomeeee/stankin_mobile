import {
  CREATE_NOTE,
  TOGGLE_DONE_NOTE,
  LOAD_NOTES_FROM_LOCAL,
  LOAD_NOTES_FROM_LOCAL_SUCCESS,
  SAVE_NOTES_TO_LOCAL,
  SAVE_NOTES_TO_LOCAL_SUCCESS,
  IAction,
  LOAD_NOTES_FROM_LOCAL_FAILED,
  SAVE_NOTES_TO_LOCAL_FAILED,
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

export const toggleIsCheckNoteAction = (id: string) =>
  ({
    type: TOGGLE_DONE_NOTE,
    payload: {id},
  } as const);

// Local actions
export const loadNotesFromLocalAction = () =>
  ({
    type: LOAD_NOTES_FROM_LOCAL,
  } as const);

export const loadNotesFromLocalSuccessAction = (notes: INotesInitialState) =>
  ({
    type: LOAD_NOTES_FROM_LOCAL_SUCCESS,
    payload: {notes},
  } as const);

export const loadNotesFromLocalFailedAction = (error: string) =>
  ({
    type: LOAD_NOTES_FROM_LOCAL_FAILED,
    payload: {err: error},
  } as const);

export const saveNotesToLocalAction = (notes: INotesInitialState) =>
  ({
    type: SAVE_NOTES_TO_LOCAL,
    payload: {notes},
  } as const);

export const saveNotesToLocalSuccessAction = () =>
  ({
    type: SAVE_NOTES_TO_LOCAL_SUCCESS,
  } as const);

export const saveNotesToLocalFailedAction = (error: string) =>
  ({
    type: SAVE_NOTES_TO_LOCAL_FAILED,
    payload: {err: error},
  } as const);
