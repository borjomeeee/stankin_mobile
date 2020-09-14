import * as RN from 'react-native';

import theme from '../../utils/theme';

export default RN.StyleSheet.create({
  buttonContainer: {
    paddingVertical: 5,
    paddingHorizontal: 29,

    backgroundColor: theme.colors.button.bg,
    borderRadius: theme.borderRadius,
  },
});
