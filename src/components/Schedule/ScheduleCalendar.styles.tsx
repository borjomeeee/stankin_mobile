import * as RN from 'react-native';

import theme from '../../utils/theme';

export default RN.StyleSheet.create({
  container: {
    position: 'relative',

    marginTop: 100,
  },
  separator: {
    position: 'absolute',

    bottom: 27,
    left: 0,
    right: 0,

    height: 1,
    backgroundColor: theme.colors.separator.bg,
  },
  calendar: {
    height: 82,

    justifyContent: 'center',
  },
  icons: {
    width: 0,
  },
  header: {
    marginTop: 15,
    textTransform: 'capitalize',

    fontFamily: theme.fonts.semibold.fontFamily,
    fontSize: theme.fonts.size.standart,

    alignSelf: 'center',

    color: theme.colors.primary.lightBlack,
  },
  optionContainer: {
    alignItems: 'center',
  },
  optionLabel: {
    color: theme.colors.primary.lightBlack,
  },
  optionDate: {
    color: theme.colors.primary.gray,
    fontSize: theme.fonts.size.medium,
  },
  optionDateButton: {
    width: 28,
    height: 28,

    alignItems: 'center',
    justifyContent: 'center',

    padding: 1,

    borderRadius: 14,
  },
});
