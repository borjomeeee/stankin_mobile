import {INote} from '../models/Note.model';

export interface INoteComponentProps extends INote {
  isCompleted: boolean;
}
