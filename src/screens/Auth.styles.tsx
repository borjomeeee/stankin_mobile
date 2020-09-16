import * as RN from 'react-native';

import theme from '../utils/theme';

export default RN.StyleSheet.create({
  container: {
    position: 'relative',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: theme.colors.primary.gray,

    paddingTop: 35,
    paddingBottom: 100,
  },

  inputs: {
    maxWidth: 280,
    minWidth: 280,
  },
  monkeyIcon: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginInputContainer: {
    marginTop: 25,
  },
  passwordInputContainer: {
    marginTop: 12,
  },

  footerContainer: {
    position: 'absolute',

    maxWidth: 280,

    bottom: 20,
  },
  footerText: {
    fontSize: theme.fonts.size.small,
    color: theme.colors.accent.evilGray,

    textAlign: 'center',
  },
});
