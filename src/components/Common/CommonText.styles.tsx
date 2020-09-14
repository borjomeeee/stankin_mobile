import * as RN from 'react-native';

import theme from '../../utils/theme';

export default RN.StyleSheet.create({
  text: {
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: theme.fonts.size.standart,

    color: theme.colors.primary.white,
  },
});
