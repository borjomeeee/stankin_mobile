import React from 'react';
import renderer from 'react-test-renderer';

import ScheduleDayComponent from '../ScheduleDay.component';

import {ILesson} from '../../../models/Lesson.model';
import {LessonType, LessonGroup} from '../../../enums/Lesson.enums';
import {shallow, mount} from 'enzyme';

describe('Schedule day tests', () => {
  const lessons: ILesson[] = [
    {
      id: '1',
      title: 'Технологии программирования',
      type: LessonType.LABA,
      groupOnLesson: LessonGroup.GROUP_A,
      groupId: '1',
      room: '0001',
      teacher: 'Иванов И.И',
      date: '01/01',
      num: 1,
    },
    {
      id: '2',
      title: 'Информационные технологии и системы',
      type: LessonType.LECTURE,
      groupOnLesson: LessonGroup.GROUP_B,
      groupId: '1',
      room: '0002',
      teacher: 'Родионов И.И',
      date: '01/01',
      num: 2,
    },
    {
      id: '3',
      title: 'Английский язык',
      type: LessonType.NO_TYPE,
      groupOnLesson: LessonGroup.NONE,
      groupId: '1',
      room: '0003',
      teacher: 'Англичанов И.И',
      date: '01/01',
      num: 3,
    },
  ];
  it('Schedule day render correctly', () => {
    const tree = renderer
      .create(<ScheduleDayComponent lessons={lessons} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Schedule day checkc correct num items', () => {
    const wrapper = mount(<ScheduleDayComponent lessons={lessons} />);

    expect(wrapper.find('ScheduleLessonComponent').length).toBe(3);
  });

  it('Schedule day empty day test', () => {
    const wrapper = shallow(<ScheduleDayComponent lessons={[]} />);

    expect(wrapper.find('ScheduleDayEmptyComponent').length).toBe(1);
  });
});
