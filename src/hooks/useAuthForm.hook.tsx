import {useState} from 'react';

export enum AuthFormErrors {
  INPUT_EMPTY = 'Поле не должно быть пустым',
}

const useAuthForm = () => {
  const [loginText, setLoginText] = useState('');
  const [loginError, setLoginError] = useState('');

  const [passwordText, setPasswordText] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const changeLoginText = (value: string) => {
    if (loginError) {
      setLoginError('');
    }
    setLoginText(value);
  };

  const changePasswordText = (value: string) => {
    if (passwordError) {
      setPasswordError('');
    }
    setPasswordText(value);
  };

  const checkValid = (): boolean => {
    if (loginText.length === 0) {
      setLoginError(AuthFormErrors.INPUT_EMPTY);
      return false;
    }

    if (passwordText.length === 0) {
      setPasswordError(AuthFormErrors.INPUT_EMPTY);
      return false;
    }

    return true;
  };

  return {
    loginText,
    changeLoginText,

    loginError,
    setLoginError,

    passwordText,
    changePasswordText,

    passwordError,
    setPasswordError,

    checkValid,
  };
};

export default useAuthForm;
