import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', setKeyboardIsOpen.bind(null, true));
    Keyboard.addListener(
      'keyboardDidHide',
      setKeyboardIsOpen.bind(null, false),
    );

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  return {keyboardIsOpen};
};

export default useKeyboard;
