import styled from 'styled-components/native';
import * as COLORS from './colors';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      darkGray: string;

      white: string;
      black: string;
    }

    interface Theme {
      fonts: ThemeFonts;
    }
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

export default {
  screen: {
    flex: 1,

    backgroundColor: '#333333',
    paddingHorizontal: 20,
  },
  colors: {
    primary: {
      gray: '#333333',
      white: '#eeeeee',

      error: '#EA4646',
    },
    accent: {
      darkWhite: '#d0d0d0',
    },
    input: {
      bg: '#1B1B1B',
      icon: '#393939',
      borderSelected: '#21679A',
    },
    button: {
      bg: '#5C5C5C',
    },
  },

  fonts: {
    regular: {
      fontFamily: 'Inter-Regular',
      fontWeight: '400',
    },
    semibold: {
      fontFamily: 'Inter-SemiBold',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'Inter-Bold',
      fontWeight: 'bold',
    },

    size: {
      small: 12,
      standart: 14,
      medium: 16,
      large: 18,
    },
  },

  borderRadius: 3,
};
