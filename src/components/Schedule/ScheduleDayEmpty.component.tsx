import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import * as COLORS from '../../utils/colors';

type IScheduleDayEmptyComponent = {
  text: string;
};

const ScheduleDayEmptyComponent = ({text}: IScheduleDayEmptyComponent) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    height: 50,
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: 'Inter-Bold',
    color: COLORS.BLACK,
  },
});

export default ScheduleDayEmptyComponent;
