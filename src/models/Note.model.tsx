import shortID from 'shortid';

export interface INote {
  id: string;
  text: string;
  subject: string;

  date: number;

  isChecked: boolean;
}

export interface INotCheckedNote extends INote {
  isChecked: false;
}

export interface ICheckedNote extends INote {
  isChecked: true;
}

export default class Note implements INote {
  id: string;
  text: string;
  subject: string;

  date: number;

  isChecked: boolean;

  constructor(subject: string, date: number, text: string) {
    this.id = shortID.generate();

    this.subject = subject;
    this.date = date;
    this.text = text;

    this.isChecked = false;
  }
}
