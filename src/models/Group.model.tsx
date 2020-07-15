export interface IGroup {
  id: string;
  title: string;
  lastUpdate: number;
}

export default class Group implements IGroup {
  id: string;
  title: string;
  lastUpdate: number;

  constructor(
    id: string = '',
    title: string = '',
    lastUpdate: number = new Date().getDate(),
  ) {
    this.id = id;
    this.title = title;
    this.lastUpdate = lastUpdate;
  }
}
