import * as RN from 'react-native';

import theme from '../../../utils/theme';

export default RN.StyleSheet.create({
  noteContainer: {
    position: 'relative',

    backgroundColor: theme.colors.primary.error,
    height: 60,

    alignItems: 'flex-end',
    justifyContent: 'center',

    paddingRight: 10,
  },

  separator: {height: 1, backgroundColor: theme.colors.separator.bg},
});
