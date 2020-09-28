import * as RN from 'react-native';

import theme from '../utils/theme';

export default RN.StyleSheet.create({
  container: {
    paddingTop: 5,
  },

  categoryTitleContainer: {
    marginTop: 15,
    marginBottom: 5,
    paddingBottom: 3,

    borderBottomWidth: 1,
    borderColor: theme.colors.separator.bg,
  },
  categoryTitleText: {color: theme.colors.accent.evilGray},

  option: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  optionValueContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: theme.colors.lesson.card,
    borderRadius: theme.borderRadius,
  },

  optionSelectContainer: {
    paddingHorizontal: 2,
    paddingVertical: 2,

    flexDirection: 'row',
  },

  link: {
    textDecorationLine: 'underline',
  },

  submitButton: {alignSelf: 'center', marginTop: 20, marginBottom: 13},

  selectOptionSeparator: {
    width: 1,
    backgroundColor: theme.colors.primary.gray,

    marginVertical: 2,
  },
  selectOptionContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,

    borderRadius: theme.borderRadius,
  },

  setGroupContainer: {marginBottom: 20, alignItems: 'center'},
  setGroupText: {
    color: theme.colors.primary.blue,
    textDecorationLine: 'underline',
  },
});
