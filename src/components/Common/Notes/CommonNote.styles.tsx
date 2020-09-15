import * as RN from 'react-native';

import theme from '../../../utils/theme';

export default RN.StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.gray,

    flexDirection: 'row',
    alignItems: 'center',

    height: 60,

    paddingVertical: 8,
    paddingLeft: 10,
  },

  content: {
    marginLeft: 20,
  },

  label: {
    paddingRight: 50,
    color: theme.colors.lesson.separator,
    fontFamily: theme.fonts.semibold.fontFamily,
    fontSize: theme.fonts.size.small,
  },

  text: {color: theme.colors.primary.white, marginTop: 3, paddingRight: 50},
});
