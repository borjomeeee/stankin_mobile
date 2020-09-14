import * as RN from 'react-native';
import theme from '../../utils/theme';

export default RN.StyleSheet.create({
  inputShadowOutsideContainer: {
    shadowOpacity: 0.3,
    elevation: 5,

    borderRadius: 10,

    paddingBottom: 2,
    paddingRight: 2,
  },

  inputContentContainer: {
    height: 45,

    backgroundColor: theme.colors.input.bg,
    borderRadius: theme.borderRadius,

    paddingHorizontal: 8,

    flexDirection: 'row',
    alignItems: 'center',

    overflow: 'hidden',

    borderWidth: 1,
  },
  inputContainer: {
    minWidth: 280,
    maxWidth: 280,
  },
  inputIcon: {},
  inputSelf: {
    flex: 1,

    marginTop: 3,
    fontFamily: theme.fonts.regular.fontFamily,
    fontSize: theme.fonts.size.standart,

    color: theme.colors.accent.darkWhite,
  },
  errorMsg: {
    marginLeft: 10,
    color: theme.colors.primary.error,
  },
});
