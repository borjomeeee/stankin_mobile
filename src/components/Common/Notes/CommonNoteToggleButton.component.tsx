import React from 'react';

import * as COLORS from '../../../utils/colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

type ICommonNoteToggleButton = {
  isDone: boolean;
  size: number;
};

const CommonNoteToggleButton = ({isDone, size}: ICommonNoteToggleButton) => {
  if (isDone) {
    return <Icon color={COLORS.GREEN} name="check-box" size={size} />;
  }

  return (
    <Icon
      color={COLORS.MEDIUM_GRAY}
      name="check-box-outline-blank"
      size={size}
    />
  );
};

export default CommonNoteToggleButton;
