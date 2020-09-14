import React from 'react';
import * as RN from 'react-native';

import theme from '../../utils/theme';
import styles from './CommonButton.styles';

import CommonTextComponent from './CommonText.component';

type ICommonButtonComponent = {
  text: string;
  onClick: () => void;
};

const CommonButtonComponent: React.FC<
  ICommonButtonComponent & React.ComponentProps<typeof RN.View>
> = ({text, onClick, ...props}) => {
  const buttonTextStyles: RN.StyleProp<RN.TextStyle> = {
    fontFamily: theme.fonts.semibold.fontFamily,
  };

  return (
    <RN.View {...props}>
      <RN.TouchableOpacity
        style={styles.buttonContainer}
        onPress={onClick}
        delayPressIn={0}
        activeOpacity={0.6}>
        <CommonTextComponent style={buttonTextStyles}>
          {text}
        </CommonTextComponent>
      </RN.TouchableOpacity>
    </RN.View>
  );
};
export default CommonButtonComponent;
