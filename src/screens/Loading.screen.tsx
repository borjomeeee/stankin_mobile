import React from 'react';
import {ActivityIndicator} from 'react-native';

import styled from 'styled-components/native';

import CommonLogoComponent from '../components/CommonLogo.component';

import {AuthScreenContainer} from '../utils/theme';
import * as COLORS from '../utils/colors';

const LoadingScreen = () => {
  return (
    <AuthScreenContainer>
      <CommonLogoComponent />

      <LoadingScreenContent>
        <ActivityIndicator color={COLORS.BLACK} size="large" />
      </LoadingScreenContent>
    </AuthScreenContainer>
  );
};

// Components
const LoadingScreenContent = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export default LoadingScreen;
