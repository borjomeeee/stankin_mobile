import * as RN from 'react-native';

import theme from '../utils/theme';

export default RN.StyleSheet.create({
  container: {alignItems: 'center'},
  content: {minWidth: 300, maxWidth: 300, marginTop: 45, flex: 1},
  groupsList: {marginTop: 15},
  groupContainer: {
    paddingVertical: 10,
    paddingLeft: 8,

    borderBottomWidth: 1,
    borderColor: theme.colors.separator.bg,
  },
  footer: {marginVertical: 20},
});
