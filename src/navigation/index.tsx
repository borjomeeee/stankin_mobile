import {StackScreenProps as Props} from '@react-navigation/stack';

export type MainNavigationProps = Props<
  {
    Auth: {};
    Main: {};
  },
  'Auth'
>;
