import * as RN from 'react-native';

import theme from '../../utils/theme';

export default RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderColor: theme.colors.separator.bg,
    borderBottomWidth: 1,
  },

  leftContainer: {flexDirection: 'row', alignItems: 'center'},

  icon: {
    backgroundColor: theme.colors.backButton.bg,
    borderRadius: theme.borderRadius,

    marginRight: 10,
  },

  leftText: {fontFamily: theme.fonts.semibold.fontFamily},
});
