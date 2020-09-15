import * as RN from 'react-native';

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

      commonBlack: '#444444',
      mediumBlack: '#404040',
      lightBlack: '#969696',

      error: '#EA4646',

      transparent: 'transparent',
    },
    accent: {
      darkWhite: '#d0d0d0',
      darkBlack: '#2B2B2B',

      evilGray: '#666666',
    },
    backButton: {
      bg: '#545454',
    },
    input: {
      bg: '#1B1B1B',
      icon: '#393939',
      borderSelected: '#21679A',
    },
    button: {
      bg: '#5C5C5C',
    },
    header: {
      bg: '#2C2C2C',
    },
    separator: {
      bg: '#454545',
    },

    calendar: {
      option: 'rgba(208, 208, 208, 0.2)',
    },
    lesson: {
      border: '#313131',
      bg: '#3C3C3C',

      card: '#222222',
      separator: '#999999',
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

    size:
      RN.Dimensions.get('screen').width > 375
        ? {
            small: 14,
            standart: 16,
            medium: 18,
            large: 20,
          }
        : {
            small: 12,
            standart: 14,
            medium: 16,
            large: 18,
          },
  },

  borderRadius: 3,
};
