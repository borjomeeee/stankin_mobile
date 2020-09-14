import * as RN from 'react-native';

import theme from '../utils/theme';

export default RN.StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: theme.colors.primary.gray,

    paddingTop: 35,
    paddingBottom: 100,
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
});
