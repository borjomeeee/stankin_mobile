import React from 'react';
import * as RN from 'react-native';

import styles from './CommonText.styles';

const CommonTextComponent: React.FC<React.ComponentProps<typeof RN.Text>> = ({
  children,
  style,
  ...otherProps
}) => {
  return (
    <RN.Text style={[styles.text, style]} {...otherProps}>
      {children}
    </RN.Text>
  );
};

export default CommonTextComponent;
