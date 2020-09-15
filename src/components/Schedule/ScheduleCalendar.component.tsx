import React from 'react';
import * as RN from 'react-native';

import 'moment';
import 'moment/locale/ru';
import moment from 'moment-timezone';

moment().locale('ru');

import Calendar from 'react-native-calendar-strip';

// @ts-ignore
const CalendarStrip: React.Element = Calendar;

import theme from '../../utils/theme';
import styles from './ScheduleCalendar.styles';

import CommonTextComponent from '../Common/CommonText.component';

interface IScheduleCalendarComponent
  extends React.ComponentProps<typeof Calendar> {
  currDate: Date;
  startDate: Date;

  setCurrDate: (newDate: Date) => void;
}

const ScheduleCalendarComponent: React.FC<IScheduleCalendarComponent> = ({
  currDate,
  startDate,
  setCurrDate,

  ...props
}) => {
  const dates = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const onChangeCurrDate = (newDate: Date) => {
    setCurrDate(newDate);
  };

  return (
    <RN.View>
      <RN.View style={styles.separator} />
      <CalendarStrip
        scrollable={true}
        shouldAllowFontScaling={false}
        iconRight={null}
        iconLeft={null}
        startingDate={startDate}
        selectedDate={currDate}
        calendarHeaderFormat={'MMMM YYYY'}
        calendarHeaderPosition={'below'}
        onDateSelected={(date: Date) => onChangeCurrDate(new Date(date))}
        calendarHeaderStyle={styles.header}
        iconStyle={styles.icons}
        dayComponent={(calProps: any) => (
          <RN.View
            key={new Date(calProps.date).getTime()}
            style={styles.optionContainer}>
            <CommonTextComponent style={styles.optionLabel}>
              {dates[new Date(calProps.date).getDay()]}
            </CommonTextComponent>

            <RN.TouchableHighlight
              delayPressIn={0}
              activeOpacity={0.6}
              underlayColor={theme.colors.calendar.option}
              style={[
                styles.optionDateButton,
                {
                  backgroundColor:
                    new Date(calProps.date).getTime() === currDate.getTime()
                      ? theme.colors.accent.darkWhite
                      : theme.colors.primary.transparent,
                },
              ]}
              onPress={onChangeCurrDate.bind(null, new Date(calProps.date))}>
              <CommonTextComponent
                style={[
                  styles.optionDate,
                  {
                    color:
                      new Date(calProps.date).getTime() === currDate.getTime()
                        ? theme.colors.primary.mediumBlack
                        : theme.colors.primary.white,
                  },
                ]}>
                {new Date(calProps.date).getDate()}
              </CommonTextComponent>
            </RN.TouchableHighlight>
          </RN.View>
        )}
        {...props}
        style={styles.calendar}
      />
    </RN.View>
  );
};

export default ScheduleCalendarComponent;
