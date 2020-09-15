import React from 'react';
import * as RN from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import theme from '../../utils/theme';
import styles from './CommonHeaderIcon.styles';

interface ICommonHeaderIconProps {
  name: string;
  onPress: () => void;
}

const CommonHeaderIconComponent: React.FC<ICommonHeaderIconProps> = ({
  name,

  onPress,
}) => {
  return (
    <RN.TouchableOpacity
      onPress={onPress}
      delayPressIn={0}
      activeOpacity={0.6}
      style={styles.iconContainer}>
      <Icon name={name} size={24} color={theme.colors.primary.lightBlack} />
    </RN.TouchableOpacity>
  );
};

export default CommonHeaderIconComponent;
