import {INotesInitialState, initialState} from '../redux/store';

import {NotesActionType} from '../utils/types';
import {CREATE_NOTE, TOGGLE_DONE_NOTE} from '../utils/constants';

import Note, {INote} from '../models/Note.model';

export default (
  state: INotesInitialState = initialState.notes,
  action: NotesActionType,
): INotesInitialState => {
  switch (action.type) {
    case CREATE_NOTE:
      const createNote_newNote = new Note(
        action.payload.subject,
        action.payload.date,
        action.payload.text,
      );

      const createNote_notes = state.get(createNote_newNote.date);
      if (Array.isArray(createNote_notes)) {
        createNote_notes.push(createNote_newNote);
      } else {
        state.set(createNote_newNote.date, [createNote_newNote]);
      }

      return new Map<number, INote[]>(state);
    case TOGGLE_DONE_NOTE:
      Array.from(state).some(([_, notes]: [number, INote[]]) => {
        return notes.some((note: INote) => {
          if (note.id === action.payload.id) {
            note.isChecked = !note.isChecked;
            return true;
          }
          return false;
        });
      });

      return new Map<number, INote[]>(state);
    default:
      return state;
  }
};
