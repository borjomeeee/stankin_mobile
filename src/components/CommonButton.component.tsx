import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  GestureResponderEvent,
} from 'react-native';

import * as COLORS from '../utils/colors';

type ICommonButtonComponent = {
  text: string;
  onClick: (
    event:
      | NativeSyntheticEvent<TextInputSubmitEditingEventData>
      | GestureResponderEvent,
  ) => void;
};

const CommonButtonComponent = ({text, onClick}: ICommonButtonComponent) => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      style={styles.container}
      onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get('window').width - 100,
    backgroundColor: '#000000',

    borderRadius: 3,

    paddingVertical: 7,
    paddingHorizontal: 50,
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,

    color: COLORS.WHITE,
  },
});

export default CommonButtonComponent;
