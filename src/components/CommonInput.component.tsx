import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Animated,
} from 'react-native';
import * as COLORS from '../utils/colors';

type ICommonInputComponent = {
  label?: string;
  error?: string;

  style?: StyleProp<ViewStyle>;

  value: string;
  onChangeText: (val: string) => void;
};

const CommonInputComponent = ({
  label,
  value,
  onChangeText,
  error,
  style,
  ...props
}: ICommonInputComponent & React.ComponentProps<typeof TextInput>) => {
  const errorDropValue = useState(new Animated.Value(-10))[0];
  const errorOpacityValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <View style={[style]}>
      {label && (
        <Text style={[styles.text, error ? styles.errorLabel : {}]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[styles.input, error ? styles.errorInput : {}]}
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
        {!!error && <Text style={[styles.errorText]}>{error}</Text>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingLeft: 5,
    alignSelf: 'flex-start',
    color: COLORS.BLACK,
    fontSize: 12,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,

    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
  },
  errorText: {
    color: COLORS.RED,
    fontSize: 12,
    paddingLeft: 5,
  },
  errorInput: {
    borderColor: COLORS.RED,
  },
  errorLabel: {
    color: COLORS.RED,
  },
});

export default CommonInputComponent;
