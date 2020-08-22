import React from 'react';
import renderer from 'react-test-renderer';

import {shallow, ShallowWrapper} from 'enzyme';

import ScheduleCalendarComponent from '../ScheduleCalendar.component';

describe('Schedule calendar tests', () => {
  it('Schedule calendar render correctly', () => {
    const tree = renderer
      .create(
        <ScheduleCalendarComponent
          todayDate={new Date(2020, 1, 1)}
          currDate={new Date(2020, 1, 1)}
          setCurrDate={jest.fn()}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Schedule select render correctly', () => {
    const dateDay = 1;
    const date = new Date(2020, 1, dateDay);

    const wrapper = shallow(
      <ScheduleCalendarComponent
        todayDate={date}
        currDate={date}
        setCurrDate={jest.fn()}
      />,
    );

    const isSelectedWrappers = wrapper
      .find('Styled(Text)')
      .findWhere(
        (node: ShallowWrapper<any, any, React.Component<{}, {}, any>>) =>
          node.prop('isSelected') === true,
      );

    expect(isSelectedWrappers).toHaveLength(1);
    expect(isSelectedWrappers.text()).toBe(dateDay.toString());

    expect(
      wrapper.findWhere(
        (node: ShallowWrapper<any, any, React.Component<{}, {}, any>>) =>
          node.key() === date.getTime().toString(),
      ),
    ).toHaveLength(1);

    expect(
      wrapper
        .findWhere(
          (node: ShallowWrapper<any, any, React.Component<{}, {}, any>>) =>
            node.key() === date.getTime().toString(),
        )
        .find('Styled(Text)')
        .first()
        .text(),
    ).toBe('Сб');
  });

  describe('Schedule topline test', () => {
    it('Schedule topline today test', () => {
      const dateDay = 1;
      const date = new Date(2020, 1, dateDay);

      const todayDate = new Date(date);
      todayDate.setDate(date.getDate());

      const wrapper = shallow(
        <ScheduleCalendarComponent
          todayDate={todayDate}
          currDate={date}
          setCurrDate={jest.fn()}
        />,
      );

      expect(wrapper.find('Styled(Text)').first().text()).toBe('Сегодня');
    });

    it('Schedule topline tommorow test', () => {
      const dateDay = 1;
      const date = new Date(2020, 1, dateDay);

      const todayDate = new Date(date);
      todayDate.setDate(date.getDate() + 1);

      const wrapper = shallow(
        <ScheduleCalendarComponent
          todayDate={todayDate}
          currDate={date}
          setCurrDate={jest.fn()}
        />,
      );

      expect(wrapper.find('Styled(Text)').first().text()).toBe('Вчера');
    });

    it('Schedule topline yesterday test', () => {
      const dateDay = 1;
      const date = new Date(2020, 1, dateDay);

      const todayDate = new Date(date);
      todayDate.setDate(date.getDate() - 1);

      const wrapper = shallow(
        <ScheduleCalendarComponent
          todayDate={todayDate}
          currDate={date}
          setCurrDate={jest.fn()}
        />,
      );

      expect(wrapper.find('Styled(Text)').first().text()).toBe('Завтра');
    });

    it('Schedule topline happy new year test', () => {
      const dateDay = 2;
      const date = new Date(2020, 0, dateDay);

      const todayDate = new Date(date);
      todayDate.setDate(date.getDate());

      const wrapper = shallow(
        <ScheduleCalendarComponent
          todayDate={todayDate}
          currDate={date}
          setCurrDate={jest.fn()}
        />,
      );

      expect(wrapper.find('Styled(Component)').at(1).text()).toBe('31');
      expect(wrapper.find('Styled(Component)').at(2).text()).toBe('1');
    });
  });
});
