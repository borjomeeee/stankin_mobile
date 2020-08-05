import React, {useState} from 'react';
import {TextInput, View, Animated} from 'react-native';

import styled from 'styled-components/native';

import * as COLORS from '../../utils/colors';

interface ICommonInputComponent {
  label?: string;
  error?: string;

  value: string;
  onChangeText: (val: string) => void;
}

interface IInputProps {
  isErrorer: boolean;
}

const CommonInputComponent = ({
  label,
  value,
  onChangeText,
  error,
  ...props
}: ICommonInputComponent & React.ComponentProps<typeof TextInput>) => {
  const errorDropValue = useState(new Animated.Value(-10))[0];
  const errorOpacityValue = useState(new Animated.Value(0))[0];

  if (error) {
    errorDropValue.setValue(-10);
    errorOpacityValue.setValue(0);

    Animated.timing(errorDropValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(errorOpacityValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View>
      {label && <InputTitle isErrorer={!!error}>{label}</InputTitle>}

      <InputBlock
        isErrorer={!!error}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#BDBDBD"
        {...props}
      />

      <Animated.View
        style={{
          opacity: errorOpacityValue,
          transform: [{translateY: errorDropValue}],
        }}>
        {!!error && <InputError>{error}</InputError>}
      </Animated.View>
    </View>
  );
};

// Components
const InputTitle = styled.Text<IInputProps>`
  padding-left: 5px;
  align-self: flex-start;

  color: ${(props: IInputProps) =>
    props.isErrorer ? COLORS.RED : COLORS.MEDIUM_GRAY};
  font-size: 14;
`;

const InputBlock = styled.TextInput<IInputProps>`
  padding: 10px 15px;
  align-self: stretch;

  border: 1px solid
    ${(props) => (props.isErrorer ? COLORS.RED : COLORS.DARK_GRAY)};
  border-radius: 8px;

  background-color: ${COLORS.LIGHT_GRAY};
`;

const InputError = styled.Text`
  color: ${COLORS.RED};
  font-size: 12px;

  padding-left: 5px;
`;

export default CommonInputComponent;
