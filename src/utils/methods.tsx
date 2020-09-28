import Config from 'react-native-config';
const {SERVER_ADDRESS, SERVER_PORT} = Config;

import {AppErrorTypes} from '../enums/App.enums';

export const fetchAPI = async (
  url: string,
  method: string,
  data: object = {},
) => {
  const response = await fetch(
    `http://${SERVER_ADDRESS}:${SERVER_PORT}${url}`,
    {
      method: method,
      body: JSON.stringify(data),
    },
  );

  const status = response.status;
  const resData = await response.json();

  return {
    status,
    data: resData['data'],
    message: resData['message'],
  };
};

export const mySubstrWithPoints = (str: string, len: number): string => {
  return str.length > len ? str.substring(0, len - 3) + '...' : str;
};

export const dateToString = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day.toString().length > 1 ? day : '0' + day}/${
    month.toString().length > 1 ? month : '0' + month
  }`;
};

export const dateToStringExpanded = (date: Date) => {
  let res = dateToString(date);
  return `${res}/${date.getFullYear()}`;
};

export const dateToDateString = (date: Date): string => {
  const day =
    date.getDate().toString().length > 1
      ? date.getDate()
      : '0' + date.getDate();

  const currDate = new Date();
  return `${
    +date - +currDate === 0
      ? 'Сегодня'
      : +date - +currDate === 86400000
      ? 'Завтра'
      : getDayFromNum(date.getDay())
  }, ${+day} ${getMonthByNum(date.getMonth())}`;
};

export const dateToDateWithoutDayOfWeekString = (date: Date): string => {
  return `${date.getDate()} ${getMonthByNum(date.getMonth())}`;
};

export const getLesonTimeFromNum = (num: number): [string, string] => {
  switch (num) {
    case 1:
      return ['8:30', '10:10'];
    case 2:
      return ['10:20', '12:00'];
    case 3:
      return ['12:20', '14:00'];
    case 4:
      return ['14:10', '15:50'];
    case 5:
      return ['16:00', '17:40'];
    case 6:
      return ['18:00', '19:30'];
    case 7:
      return ['19:40', '21:10'];
    case 8:
      return ['21:20', '22:50'];
    default:
      return ['8:30', '10:10'];
  }
};

export const getRangeDates = (startDate: Date): Date[] => {
  let date = new Date(startDate.getTime());

  let res = [new Date(date.getTime())];

  for (let i = 1; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    res.push(new Date(date.getTime()));
  }
  return res;
};

export const dateStringToDate = (date: string): Date => {
  const [day, month] = date.split('/');
  return new Date(new Date(Date.now()).getFullYear(), +month - 1, +day);
};

export const getMonthByNum = (num: number): string => {
  switch (num) {
    case 0:
      return 'Января';
    case 1:
      return 'Февраля';
    case 2:
      return 'Марта';
    case 3:
      return 'Апреля';
    case 4:
      return 'Мая';
    case 5:
      return 'Июня';
    case 6:
      return 'Июля';
    case 7:
      return 'Августа';
    case 8:
      return 'Сентября';
    case 9:
      return 'Октября';
    case 10:
      return 'Ноября';
    case 11:
      return 'Декабря';
    default:
      return 'Января';
  }
};

export const getDayFromNum = (num: number): string => {
  switch (num) {
    case 0:
      return 'Воскресение';
    case 1:
      return 'Понедельник';
    case 2:
      return 'Вторник';
    case 3:
      return 'Среда';
    case 4:
      return 'Четверг';
    case 5:
      return 'Пятница';
    case 6:
      return 'Суббота';
    default:
      return 'Понедельник';
  }
};

export const convertAppErrorToString = (error: AppErrorTypes) => {
  switch (error) {
    case AppErrorTypes.ERROR:
      return 'Ошибка!';
    case AppErrorTypes.WARNING:
      return 'Предупреждение!';
    default:
      return '';
  }
};

export const compareDates = (date1: Date, date2: Date): number => {
  var t2 = date2.getTime();
  var t1 = date1.getTime();

  return Math.floor((t1 - t2) / (24 * 3600 * 1000));
};
