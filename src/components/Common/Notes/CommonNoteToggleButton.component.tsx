import React from 'react';

import * as COLORS from '../../../utils/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../../../utils/theme';

type ICommonNoteToggleButton = {
  isDone: boolean;
  size: number;
};

const CommonNoteToggleButton = ({isDone, size}: ICommonNoteToggleButton) => {
  if (isDone) {
    return (
      <Icon color={theme.colors.primary.success} name="check-box" size={size} />
    );
  }

  return (
    <Icon
      color={theme.colors.accent.evilGray}
      name="check-box-outline-blank"
      size={size}
    />
  );
};

export default CommonNoteToggleButton;
