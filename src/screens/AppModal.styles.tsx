import * as RN from 'react-native';

import theme from '../utils/theme';

export default RN.StyleSheet.create({
  container: {backgroundColor: theme.colors.primary.white, padding: 20},
  title: {
    fontFamily: theme.fonts.semibold.fontFamily,
    fontSize: theme.fonts.size.large,

    color: theme.colors.primary.commonBlack,
  },

  text: {
    color: theme.colors.primary.commonBlack,
    marginVertical: 20,
  },

  buttonContainer: {alignItems: 'flex-end'},
});
