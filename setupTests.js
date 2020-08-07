import 'jsdom-global/register';

import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

global.console = {
  log: console.log, // console.log are ignored in tests

  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: console.debug,
};

configure({adapter: new Adapter()});
