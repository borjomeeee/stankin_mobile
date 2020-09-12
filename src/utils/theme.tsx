import styled from 'styled-components/native';

import {DefaultTheme, configureFonts} from 'react-native-paper';
import {Theme, Fonts} from 'react-native-paper/lib/typescript/src/types';

import * as COLORS from './colors';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      darkGray: string;
    }

    // interface Theme {
    //   myOwnProperty: boolean;
    // }
  }
}

export const ScreenContainer = styled.View`
  flex: 1;

  padding: 0px 30px;

  background-color: ${COLORS.WHITE};
`;

export const AuthScreenContainer = styled.View`
  flex: 1;

  padding: 0px 30px;

  padding-top: 20px;
  padding-bottom: 15px;

  background-color: ${COLORS.WHITE};
`;

const fontConfig: {default: Fonts} = {
  default: {
    regular: {
      fontFamily: 'Inter-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter-Bold',
      fontWeight: 'bold',
    },
    thin: {
      fontFamily: 'Inter-Thin',
      fontWeight: '100',
    },
    light: {
      fontFamily: 'Inter-Light',
      fontWeight: '200',
    },
  },
};

export const theme = {
  ...DefaultTheme,

  dark: false,
  mode: 'adaptive',

  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#444444',
    accent: '#E4E4E4',

    background: '#ffffff',

    darkGray: '#c4c4c4',

    surface: '#ffffff',
    backdrop: '#ffffff',

    error: '#ff0000',
  },

  fonts: configureFonts(fontConfig),
};
