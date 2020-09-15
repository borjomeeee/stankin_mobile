import React from 'react';
import * as RN from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {BlurView} from '@react-native-community/blur';

import theme from '../utils/theme';
import styles from './Loading.styles';

const LoadingScreen = () => {
  return (
    <RN.View style={styles.container}>
      <BlurView blurType="dark" style={styles.container} />
      <ActivityIndicator
        size="small"
        color={theme.colors.primary.white}
        style={{}}
      />
    </RN.View>
  );
};

export default LoadingScreen;
