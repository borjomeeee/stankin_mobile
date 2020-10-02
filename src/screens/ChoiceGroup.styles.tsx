import * as RN from 'react-native';

import theme from '../utils/theme';

export default RN.StyleSheet.create({
  container: {alignItems: 'center'},
  content: {minWidth: 300, maxWidth: 300, marginTop: 45, flex: 1},
  groupsList: {marginTop: 15},
  groupContainer: {
    paddingVertical: 10,
    paddingLeft: 8,
  },
  footer: {marginVertical: 20},
  separator: {height: 1, backgroundColor: theme.colors.separator.bg},
});
