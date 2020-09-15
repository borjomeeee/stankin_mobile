import * as RN from 'react-native';

import theme from '../utils/theme';

export default RN.StyleSheet.create({
  container: {paddingTop: 10},

  selectTitle: {
    fontFamily: theme.fonts.semibold.fontFamily,
    marginVertical: 10,

    color: theme.colors.accent.darkWhite,
  },
  selectSelf: {
    backgroundColor: theme.colors.accent.evilGray,

    borderRadius: theme.borderRadius,
    alignItems: 'center',

    marginHorizontal: 2,

    paddingVertical: 9,
    paddingHorizontal: 20,

    elevation: 3,
  },

  selectTextBold: {
    fontFamily: theme.fonts.semibold.fontFamily,
  },

  inputContainer: {marginTop: 30},

  inputLabel: {marginVertical: 0},

  inputSelf: {marginTop: 10},

  sumbit: {alignSelf: 'center', marginTop: 15},
});
