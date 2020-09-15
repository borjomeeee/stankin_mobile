import * as RN from 'react-native';

import theme from '../../utils/theme';

export default RN.StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    maxHeight: 300,
  },
  content: {
    backgroundColor: theme.colors.primary.white,
    borderRadius: theme.borderRadius,
  },

  separator: {
    height: 1,
    backgroundColor: theme.colors.accent.darkWhite,
  },

  optionContainer: {alignItems: 'flex-start', paddingVertical: 15},
  optionText: {
    color: theme.colors.primary.commonBlack,
    paddingHorizontal: 20,
  },
});
