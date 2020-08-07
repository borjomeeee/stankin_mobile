import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import renderer from 'react-test-renderer';

import ScheduleNotesComponent from '../ScheduleNotes.component';

import {initialState, reducers} from '../../../redux/store';
import {INote} from '../../../models/Note.model';

describe('Schedule notes component tests', () => {
  const currDate = new Date();

  initialState.notes.set(currDate.getTime(), [
    ...(initialState.notes.get(currDate.getTime()) || []),
    {
      id: '1',
      text: 'Написать реферат',
      subject: 'Технологии программирования',
      date: currDate,
      isChecked: false,
    },
    {
      id: '2',
      text: 'Написать эссе',
      subject: 'Технологии программирования',
      date: currDate,
      isChecked: false,
    },
    {
      id: '3',
      text: 'Нарисовать рисунок',
      subject: 'Технологии программирования',
      date: currDate,
      isChecked: true,
    },
  ] as INote[]);

  const store = createStore(reducers);

  it('Schedule notes render correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ScheduleNotesComponent currDate={new Date()} />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
