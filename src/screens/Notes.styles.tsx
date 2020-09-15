import * as RN from 'react-native';

import theme from '../utils/theme';

export default RN.StyleSheet.create({
  container: {paddingTop: 20},
  title: {
    marginVertical: 20,
    fontSize: theme.fonts.size.large,
    fontFamily: theme.fonts.semibold.fontFamily,
  },
  submit: {marginVertical: 20, alignSelf: 'center'},
});
