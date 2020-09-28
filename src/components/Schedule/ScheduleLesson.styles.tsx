import * as RN from 'react-native';

import theme from '../../utils/theme';

export default RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'stretch',
    padding: 12,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: theme.colors.lesson.border,
    borderRadius: theme.borderRadius,

    backgroundColor: theme.colors.lesson.bg,
  },

  timeContainer: {
    marginRight: 10,
  },

  startTime: {
    fontSize: theme.fonts.size.small,
    fontFamily: theme.fonts.semibold.fontFamily,

    color: theme.colors.primary.white,
  },

  endTime: {
    fontSize: theme.fonts.size.small,
    fontFamily: theme.fonts.semibold.fontFamily,

    color: theme.colors.accent.darkWhite,
  },

  groupCard: {
    marginTop: 5,
    backgroundColor: theme.colors.lesson.card,
    alignItems: 'center',
    justifyContent: 'center',
  },

  groupCardText: {
    fontSize: theme.fonts.size.small,
    fontFamily: theme.fonts.semibold.fontFamily,
  },

  mainContent: {
    flex: 1,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: theme.colors.lesson.separator,
  },

  options: {flexDirection: 'row', marginTop: 8},
  optionsContent: {flex: 1},

  optionContainer: {flexDirection: 'row', alignItems: 'center'},
  optionText: {
    marginLeft: 10,
    color: theme.colors.accent.darkWhite,
  },

  typeContainer: {
    paddingVertical: 5,
    paddingHorizontal: 8,

    alignSelf: 'flex-end',

    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.lesson.card,
  },

  typeText: {
    fontFamily: theme.fonts.semibold.fontFamily,
    fontSize: theme.fonts.size.small,
  },
});
