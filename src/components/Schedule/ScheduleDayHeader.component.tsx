import React from 'react';
import * as RN from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CommonTextComponent from '../Common/CommonText.component';

import theme from '../../utils/theme';
import styles from './ScheduleDayHeader.styles';

import {compareDates, dateToDateString} from '../../utils/methods';

interface IScheduleDayHeaderComponent {
  todayDate: Date;
  currDate: Date;

  onBack: () => void;
}

interface INamedDates {
  [index: string]: {timestamp: number; label: string; backButton: boolean};
}

const ScheduleDayHeaderComponent: React.FC<IScheduleDayHeaderComponent> = ({
  todayDate,
  currDate,

  onBack,
}) => {
  const tommorrowTimestamp = todayDate.getTime() + 86400;
  const yesterdayTimestamp = todayDate.getTime() - 86400;

  const namedDates: INamedDates = {
    '1': {
      timestamp: yesterdayTimestamp,
      label: 'Вчера',
      backButton: true,
    },
    '-1': {
      timestamp: tommorrowTimestamp,
      label: 'Завтра',
      backButton: true,
    },
  };

  const datesDiff = compareDates(todayDate, currDate);

  return (
    <RN.View style={styles.container}>
      {datesDiff === 0 ? (
        <CommonTextComponent style={styles.leftText}>
          Сегодня
        </CommonTextComponent>
      ) : (
        <RN.View style={styles.leftContainer}>
          <RN.TouchableOpacity
            delayPressIn={0}
            activeOpacity={0.6}
            onPress={onBack}
            style={styles.icon}>
            <Icon
              name="chevron-left"
              size={26}
              color={theme.colors.accent.darkWhite}
            />
          </RN.TouchableOpacity>
          <CommonTextComponent style={[styles.leftText]}>
            {namedDates[datesDiff.toString()]?.label || ''}
          </CommonTextComponent>
        </RN.View>
      )}

      <CommonTextComponent>{dateToDateString(currDate)}</CommonTextComponent>
    </RN.View>
  );
};

export default ScheduleDayHeaderComponent;
