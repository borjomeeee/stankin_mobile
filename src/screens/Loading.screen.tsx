import React from 'react';
import * as RN from 'react-native';

import {BlurView} from '@react-native-community/blur';

import theme from '../utils/theme';
import styles from './Loading.styles';

const LoadingScreen = () => {
  return (
    <RN.View style={styles.container}>
      <BlurView blurType="dark" style={styles.container} blurAmount={2} />
      <RN.ActivityIndicator size="small" color={theme.colors.primary.white} />
    </RN.View>
  );
};

export default LoadingScreen;
