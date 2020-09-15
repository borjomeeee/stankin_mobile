import * as RN from 'react-native';
import theme from '../../utils/theme';

export default RN.StyleSheet.create({
  container: {
    height: 92,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary.commonBlack,
    borderRadius: theme.borderRadius,
  },
  text: {
    maxWidth: 150,
    textAlign: 'center',
    color: theme.colors.lesson.separator,
    fontFamily: theme.fonts.semibold.fontFamily,
  },
});
