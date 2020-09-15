import React from 'react';
import * as RN from 'react-native';

import styles from './CommonInput.style';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../utils/theme';

import CommonTextComponent from './CommonText.component';

type ICommonInputComponentProps = {
  icon?: string;
  error: string;

  rightIcon?: React.ReactNode;

  containerStyles?: RN.StyleProp<RN.ViewStyle>;
} & React.ComponentProps<typeof RN.TextInput>;

const CommonInputComponent: React.FC<ICommonInputComponentProps> = ({
  containerStyles,

  icon,
  error,

  rightIcon,

  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const selectInputStyles: RN.StyleProp<RN.ViewStyle> = {
    borderColor: error
      ? theme.colors.primary.error
      : isFocused
      ? theme.colors.input.borderSelected
      : 'transparent',
  };

  const inputIconColor = error
    ? theme.colors.primary.error
    : isFocused
    ? theme.colors.accent.darkWhite
    : theme.colors.input.icon;

  const handleToggleSelectTextInput = () => {
    setIsFocused((state) => !state);
  };

  return (
    <RN.View style={[styles.inputContainer, containerStyles]}>
      <RN.View style={styles.inputShadowOutsideContainer}>
        <RN.View style={[styles.inputContentContainer, selectInputStyles]}>
          <RN.View>
            {icon && <Icon name={icon} color={inputIconColor} size={20} />}
          </RN.View>
          <RN.TextInput
            selectionColor={theme.colors.accent.darkWhite}
            placeholderTextColor={theme.colors.input.icon}
            onBlur={handleToggleSelectTextInput}
            onFocus={handleToggleSelectTextInput}
            {...props}
            style={[props.style, styles.inputSelf]}
          />
          {rightIcon || <></>}
        </RN.View>
      </RN.View>

      {!!error && (
        <CommonTextComponent style={styles.errorMsg}>
          {error}
        </CommonTextComponent>
      )}
    </RN.View>
  );
};

export default CommonInputComponent;
