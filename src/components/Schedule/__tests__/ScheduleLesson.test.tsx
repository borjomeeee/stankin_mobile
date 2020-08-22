import React from 'react';
import renderer from 'react-test-renderer';

import {ILesson} from '../../../models/Lesson.model';
import {LessonType, LessonGroup} from '../../../enums/Lesson.enums';

import ScheduleLessonComponent from '../ScheduleLesson.component';
import {shallow} from 'enzyme';

describe('Schedule lesson tests', () => {
  it('Schedule lesson render correctly', () => {
    const lesson: ILesson = {
      id: '1',
      title: 'Технологии программирования',
      type: LessonType.LABA,
      groupOnLesson: LessonGroup.GROUP_A,
      groupId: '1',
      room: '0001',
      teacher: 'Иванов И.И',
      date: '01/01',
      num: 1,
    };

    const tree = renderer
      .create(<ScheduleLessonComponent {...lesson} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Schedule lesson correct view options with full lesson', () => {
    const lesson: ILesson = {
      id: '1',
      title: 'Технологии программирования',
      type: LessonType.LABA,
      groupOnLesson: LessonGroup.GROUP_A,
      groupId: '1',
      room: '0001',
      teacher: 'Иванов И.И',
      date: '01/01',
      num: 1,
    };

    const wrapper = shallow(<ScheduleLessonComponent {...lesson} />);

    expect(wrapper.find('Styled(View)').at(5).find('Styled(Text)').length).toBe(
      2,
    );
    expect(
      wrapper.find('Styled(View)').at(5).find('Styled(Text)').at(0).text(),
    ).toBe(lesson.room);
    expect(
      wrapper.find('Styled(View)').at(5).find('Styled(Text)').at(1).text(),
    ).toBe(lesson.teacher);
  });

  it('Schedule lesson correct view options with one or more incorrect values', () => {
    const lesson: ILesson = {
      id: '1',
      title: 'Технологии программирования',
      type: LessonType.LABA,
      groupOnLesson: LessonGroup.GROUP_A,
      groupId: '1',
      room: '',
      teacher: 'Иванов И.И',
      date: '01/01',
      num: 1,
    };

    const wrapper1 = shallow(<ScheduleLessonComponent {...lesson} />);

    expect(
      wrapper1.find('Styled(View)').at(5).find('Styled(Text)').length,
    ).toBe(1);

    lesson.teacher = '';
    const wrapper2 = shallow(<ScheduleLessonComponent {...lesson} />);

    expect(
      wrapper2.find('Styled(View)').at(5).find('Styled(Text)').length,
    ).toBe(0);
  });
});
